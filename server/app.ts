import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export type Role = 'admin' | 'doctor';
type User = { id: string; username: string; displayName: string; role: Role; password: string };
type CaseRecord = {
  id: string; title: string; category: string; description: string; patient: { sex: string; age: number; note: string };
  status: string; favorite: boolean; updatedAt: string; thumbnail: string; structures: { id: string; name: string; color: string; visible: boolean; opacity: number }[];
  images: { id: string; name: string; count: number; width: number; height: number; spacing: number }[];
};
type Plan = { id: string; caseId: string; userId: string; name: string; note: string; state: Record<string, unknown>; createdAt: string; updatedAt: string };
type Comment = { id: string; caseId: string; userId: string; author: string; content: string; createdAt: string };
type Share = { token: string; caseId: string; createdBy: string; expiresAt: string; revoked: boolean };
type Db = { users: User[]; cases: CaseRecord[]; plans: Plan[]; comments: Comment[]; shares: Share[] };

const dbPath = path.join(process.cwd(), 'data', 'db.json');
const now = () => new Date().toISOString();
const seedDb = (): Db => ({
  users: [
    { id: 'u-admin', username: 'admin', displayName: '系统管理员', role: 'admin', password: 'admin123' },
    { id: 'u-doctor', username: 'doctor', displayName: '李医生', role: 'doctor', password: 'doctor123' }
  ],
  cases: [{
    id: 'case-knee', title: '左膝关节置换术前规划', category: '骨科', description: '示例病例：用于演示三维模型、二维影像、测量与术前方案管理。',
    patient: { sex: '男', age: 58, note: '演示数据，不含真实患者身份信息' }, status: '已发布', favorite: false, updatedAt: now(), thumbnail: 'knee',
    structures: [
      { id: 'femur', name: '股骨', color: '#f2b97d', visible: true, opacity: 1 },
      { id: 'tibia', name: '胫骨', color: '#86c7a4', visible: true, opacity: 1 },
      { id: 'implant', name: '假体参考', color: '#6ea8de', visible: false, opacity: 0.75 }
    ],
    images: [{ id: 'ct-axial', name: 'CT 横断面', count: 48, width: 512, height: 512, spacing: 0.8 }]
  }], plans: [], comments: [], shares: []
});

function readDb(): Db {
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')) as Db; } catch { const value = seedDb(); writeDb(value); return value; }
}
function writeDb(value: Db) { fs.mkdirSync(path.dirname(dbPath), { recursive: true }); fs.writeFileSync(dbPath, JSON.stringify(value, null, 2)); }
export function resetDb() { writeDb(seedDb()); }

function tokenFor(user: User) { return Buffer.from(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 1000 * 60 * 60 * 24 })).toString('base64url'); }
function getUser(req: Request): User | undefined {
  const token = req.header('authorization')?.replace(/^Bearer\s+/i, ''); if (!token) return undefined;
  try { const payload = JSON.parse(Buffer.from(token, 'base64url').toString()) as { id: string; exp: number }; if (payload.exp < Date.now()) return undefined; return readDb().users.find(u => u.id === payload.id); } catch { return undefined; }
}
function auth(required = true) { return (req: Request, res: Response, next: NextFunction) => { const user = getUser(req); if (required && !user) return res.status(401).json({ message: '请先登录' }); (req as Request & { user?: User }).user = user; next(); }; }
const userOf = (req: Request) => (req as Request & { user: User }).user;

export function createApp() {
  const app = express();
  app.use(cors()); app.use(express.json({ limit: '10mb' })); app.use(express.urlencoded({ extended: false, limit: '10mb' }));
  app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'mediview-api' }));
  app.post('/api/auth/login', (req, res) => {
    const user = readDb().users.find(item => item.username === req.body?.username && item.password === req.body?.password);
    if (!user) return res.status(401).json({ message: '账号或密码错误' });
    return res.json({ token: tokenFor(user), user: { id: user.id, username: user.username, displayName: user.displayName, role: user.role } });
  });
  app.get('/api/me', auth(), (req, res) => { const user = userOf(req); res.json({ id: user.id, username: user.username, displayName: user.displayName, role: user.role }); });
  app.get('/api/cases', auth(false), (req, res) => {
    const query = String(req.query.search ?? '').trim().toLowerCase(); const db = readDb();
    const items = db.cases.filter(item => !query || `${item.title}${item.category}${item.description}`.toLowerCase().includes(query));
    res.json({ items: items.map(item => ({ ...item, planCount: db.plans.filter(plan => plan.caseId === item.id).length, commentCount: db.comments.filter(comment => comment.caseId === item.id).length })) });
  });
  app.get('/api/cases/:id', auth(false), (req, res) => {
    const db = readDb(); const item = db.cases.find(value => value.id === String(req.params.id)); if (!item) return res.status(404).json({ message: '案例不存在' });
    const user = getUser(req); return res.json({ ...item, plans: db.plans.filter(plan => plan.caseId === item.id && (!user || plan.userId === user.id)), comments: db.comments.filter(comment => comment.caseId === item.id), viewer: user ? { id: user.id, role: user.role } : null });
  });
  app.post('/api/cases/:id/favorite', auth(), (req, res) => { const db = readDb(); const item = db.cases.find(value => value.id === String(req.params.id)); if (!item) return res.status(404).json({ message: '案例不存在' }); item.favorite = Boolean(req.body?.favorite ?? !item.favorite); writeDb(db); res.json({ favorite: item.favorite }); });
  app.get('/api/cases/:id/comments', auth(false), (req, res) => res.json({ items: readDb().comments.filter(item => item.caseId === req.params.id) }));
  app.post('/api/cases/:id/comments', auth(), (req, res) => {
    const content = String(req.body?.content ?? '').trim(); if (!content) return res.status(400).json({ message: '评论不能为空' }); const db = readDb(); const item = db.cases.find(value => value.id === req.params.id); if (!item) return res.status(404).json({ message: '案例不存在' });
    const user = userOf(req); const comment: Comment = { id: crypto.randomUUID(), caseId: item.id, userId: user.id, author: user.displayName, content, createdAt: now() }; db.comments.push(comment); writeDb(db); res.status(201).json(comment);
  });
  app.post('/api/cases/:id/plans', auth(), (req, res) => {
    const name = String(req.body?.name ?? '').trim(); if (!name) return res.status(400).json({ message: '方案名称不能为空' }); const db = readDb(); if (!db.cases.some(item => item.id === req.params.id)) return res.status(404).json({ message: '案例不存在' }); const user = userOf(req); const timestamp = now();
    const plan: Plan = { id: crypto.randomUUID(), caseId: String(req.params.id), userId: user.id, name, note: String(req.body?.note ?? ''), state: req.body?.state ?? {}, createdAt: timestamp, updatedAt: timestamp }; db.plans.push(plan); writeDb(db); res.status(201).json(plan);
  });
  app.patch('/api/plans/:id', auth(), (req, res) => { const db = readDb(); const plan = db.plans.find(item => item.id === req.params.id); if (!plan || plan.userId !== userOf(req).id) return res.status(404).json({ message: '方案不存在' }); Object.assign(plan, { name: req.body?.name ?? plan.name, note: req.body?.note ?? plan.note, state: req.body?.state ?? plan.state, updatedAt: now() }); writeDb(db); res.json(plan); });
  app.delete('/api/plans/:id', auth(), (req, res) => { const db = readDb(); const index = db.plans.findIndex(item => item.id === req.params.id && item.userId === userOf(req).id); if (index < 0) return res.status(404).json({ message: '方案不存在' }); db.plans.splice(index, 1); writeDb(db); res.status(204).end(); });
  app.post('/api/cases/:id/share', auth(), (req, res) => { const db = readDb(); if (!db.cases.some(item => item.id === String(req.params.id))) return res.status(404).json({ message: '案例不存在' }); const hours = Math.min(Math.max(Number(req.body?.expiresInHours ?? 24), 1), 24 * 30); const share: Share = { token: crypto.randomBytes(12).toString('hex'), caseId: String(req.params.id), createdBy: userOf(req).id, expiresAt: new Date(Date.now() + hours * 3600 * 1000).toISOString(), revoked: false }; db.shares.push(share); writeDb(db); res.status(201).json(share); });
  app.delete('/api/cases/:id/share/:token', auth(), (req, res) => { const db = readDb(); const share = db.shares.find(item => item.caseId === req.params.id && item.token === req.params.token); if (!share) return res.status(404).json({ message: '分享不存在' }); share.revoked = true; writeDb(db); res.status(204).end(); });
  app.get('/api/share/:token', (req, res) => { const db = readDb(); const share = db.shares.find(item => item.token === req.params.token); if (!share || share.revoked || new Date(share.expiresAt).getTime() < Date.now()) return res.status(410).json({ message: '分享链接已失效' }); const item = db.cases.find(value => value.id === share.caseId); if (!item) return res.status(404).json({ message: '案例不存在' }); res.json({ ...item, shared: true, expiresAt: share.expiresAt, comments: db.comments.filter(comment => comment.caseId === item.id) }); });
  const upload = multer({ dest: path.join(process.cwd(), 'data', 'uploads') });
  app.post('/api/admin/cases', auth(), upload.fields([{ name: 'model', maxCount: 1 }, { name: 'dicom', maxCount: 1 }]), (req, res) => { if (userOf(req).role !== 'admin') return res.status(403).json({ message: '需要管理员权限' }); const db = readDb(); const item: CaseRecord = { id: `case-${crypto.randomUUID()}`, title: String(req.body?.title ?? '未命名案例'), category: String(req.body?.category ?? '其他'), description: String(req.body?.description ?? ''), patient: { sex: '未知', age: 0, note: '导入数据' }, status: '草稿', favorite: false, updatedAt: now(), thumbnail: 'knee', structures: [], images: [] }; db.cases.push(item); writeDb(db); res.status(201).json(item); });
  app.patch('/api/admin/cases/:id', auth(), (req, res) => { if (userOf(req).role !== 'admin') return res.status(403).json({ message: '需要管理员权限' }); const db = readDb(); const item = db.cases.find(value => value.id === req.params.id); if (!item) return res.status(404).json({ message: '案例不存在' }); Object.assign(item, { title: req.body?.title ?? item.title, category: req.body?.category ?? item.category, description: req.body?.description ?? item.description, status: req.body?.status ?? item.status, updatedAt: now() }); writeDb(db); res.json(item); });
  app.delete('/api/admin/cases/:id', auth(), (req, res) => { if (userOf(req).role !== 'admin') return res.status(403).json({ message: '需要管理员权限' }); const db = readDb(); db.cases = db.cases.filter(item => item.id !== req.params.id); writeDb(db); res.status(204).end(); });
  app.delete('/api/admin/comments/:id', auth(), (req, res) => { if (userOf(req).role !== 'admin') return res.status(403).json({ message: '需要管理员权限' }); const db = readDb(); db.comments = db.comments.filter(item => item.id !== req.params.id); writeDb(db); res.status(204).end(); });
  // Object storage does not expose CORS headers on its signed URLs. Keep the
  // viewer on the local origin by proxying those URLs through this service.
  app.get('/hexaApiServer/__resource', async (req, res) => {
    const rawUrl = String(req.query.url ?? '');
    let target: URL;
    try { target = new URL(rawUrl); } catch { return res.status(400).json({ message: '资源地址无效' }); }
    if (!['hexa3d.obs.cn-east-3.myhuaweicloud.com', 'cdn.hexalotus.com'].includes(target.hostname)) {
      return res.status(403).json({ message: '资源地址不在允许范围' });
    }
    try {
      const remote = await fetch(target, { headers: { accept: req.header('accept') ?? '*/*' } });
      res.status(remote.status);
      const responseType = remote.headers.get('content-type'); if (responseType) res.setHeader('content-type', responseType);
      res.send(Buffer.from(await remote.arrayBuffer()));
    } catch (error) {
      res.status(502).json({ message: '原站资源代理失败', detail: String(error) });
    }
  });

  const forwardToRemote = (prefix: string) => app.use(prefix, async (req, res) => {
    try {
      const target = 'https://yimiji.com.cn' + prefix + req.originalUrl.slice(prefix.length);
      const headers: Record<string, string> = {};
      const authorization = req.header('authorization'); if (authorization) headers.authorization = authorization;
      const contentType = req.header('content-type'); if (contentType) headers['content-type'] = contentType;
      const cookie = req.header('cookie'); if (cookie) headers.cookie = cookie;
      const requestedWith = req.header('x-requested-with'); if (requestedWith) headers['x-requested-with'] = requestedWith;
      const userAgent = req.header('user-agent'); if (userAgent) headers['user-agent'] = userAgent;
      const referer = req.header('referer'); if (referer) headers.referer = referer;
      const init: RequestInit = { method: req.method, headers };
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        init.body = contentType?.includes('application/x-www-form-urlencoded')
          ? new URLSearchParams(req.body as Record<string, string>).toString()
          : JSON.stringify(req.body ?? {});
      }
      const remote = await fetch(target, init);
      res.status(remote.status);
      const responseType = remote.headers.get('content-type');
      const body = Buffer.from(await remote.arrayBuffer());
      if (responseType?.includes('application/json') && req.path.includes('/api/filectl/getfileurl')) {
        try {
          const payload = JSON.parse(body.toString('utf8')) as { data?: unknown };
          if (typeof payload.data === 'string' && payload.data.length > 0) {
            const resourceUrl = payload.data.startsWith('//') ? `https:${payload.data}` : payload.data;
            const allowed = new URL(resourceUrl);
            if (['hexa3d.obs.cn-east-3.myhuaweicloud.com', 'cdn.hexalotus.com'].includes(allowed.hostname)) {
              payload.data = `//${req.get('host')}/hexaApiServer/__resource?url=${encodeURIComponent(resourceUrl)}`;
              const rewritten = Buffer.from(JSON.stringify(payload));
              res.setHeader('content-type', responseType);
              return res.send(rewritten);
            }
          }
        } catch { /* return the upstream response unchanged */ }
      }
      if (responseType) res.setHeader('content-type', responseType);
      res.send(body);
    } catch (error) {
      res.status(502).json({ message: '原站接口代理失败', detail: String(error) });
    }
  });
  forwardToRemote('/hexaApiServer'); forwardToRemote('/saleApiServer');
  const dist = path.join(process.cwd(), 'dist'); if (fs.existsSync(dist)) { app.use(express.static(dist)); app.use((req, res, next) => { if (req.method === 'GET') return res.sendFile(path.join(dist, 'index.html')); next(); }); }
  return app;
}
