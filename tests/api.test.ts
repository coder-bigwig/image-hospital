import { describe, expect, it, beforeEach } from 'vitest';
import { createApp, resetDb } from '../server/app';
import request from 'supertest';

describe('MediView API', () => {
  beforeEach(() => resetDb());

  it('logs in with the demo account and returns a role token', async () => {
    const response = await request(createApp()).post('/api/auth/login').send({ username: 'admin', password: 'admin123' });
    expect(response.status).toBe(200);
    expect(response.body.user.role).toBe('admin');
    expect(response.body.token).toBeTypeOf('string');
  });

  it('lists seeded cases and filters by search', async () => {
    const response = await request(createApp()).get('/api/cases?search=膝');
    expect(response.status).toBe(200);
    expect(response.body.items.length).toBeGreaterThan(0);
    expect(response.body.items[0].title).toContain('膝');
  });

  it('persists a plan and comments for a case', async () => {
    const app = createApp();
    const login = await request(app).post('/api/auth/login').send({ username: 'doctor', password: 'doctor123' });
    const auth = { Authorization: `Bearer ${login.body.token}` };
    const plan = await request(app).post('/api/cases/case-knee/plans').set(auth).send({ name: '术前测量', note: '保留测量线', state: { zoom: 1.4 } });
    expect(plan.status).toBe(201);
    const comment = await request(app).post('/api/cases/case-knee/comments').set(auth).send({ content: '模型结构清晰' });
    expect(comment.status).toBe(201);
    const detail = await request(app).get('/api/cases/case-knee');
    expect(detail.body.plans).toHaveLength(1);
    expect(detail.body.comments[0].content).toBe('模型结构清晰');
  });

  it('creates a share link that can be revoked', async () => {
    const app = createApp();
    const login = await request(app).post('/api/auth/login').send({ username: 'admin', password: 'admin123' });
    const auth = { Authorization: `Bearer ${login.body.token}` };
    const created = await request(app).post('/api/cases/case-knee/share').set(auth).send({ expiresInHours: 24 });
    expect(created.status).toBe(201);
    const shared = await request(app).get(`/api/share/${created.body.token}`);
    expect(shared.status).toBe(200);
    await request(app).delete(`/api/cases/case-knee/share/${created.body.token}`).set(auth);
    expect((await request(app).get(`/api/share/${created.body.token}`)).status).toBe(410);
  });
});
