# MediView 手机端医学影像平台演示

这是一个手机优先的影像交互演示，覆盖案例中心、三维模型、二维切片、结构分段、测量、方案、评论、二维码分享和管理员案例管理。

## 启动

执行 npm install 后运行 npm run dev，完成后访问 http://localhost:8787。也可以使用 docker compose up。需要 Vite 热更新时，可在两个终端分别运行 npm run dev:server 和 npm run dev:client，并访问 http://localhost:5173。

演示账号：普通医生 doctor / doctor123；管理员 admin / admin123。

本地数据保存在 data/db.json，首次启动会自动生成；执行 npm run seed 可以恢复内置演示数据。模型和二维影像当前使用无患者身份信息的演示数据，三维结构由 Three.js 程序化生成，接口已经预留模型与 DICOM 上传入口。

## 验证

执行 npm test 和 npm run build。OpenAPI 描述见 openapi.json。这是交互演示版本，真实生产部署前应替换本地 JSON 存储、接入 PostgreSQL/对象存储，并对上传文件做格式解析、权限和病毒扫描。

## 原站资源级阅片器

原站静态阅片器已经本地化到 public/hexaviewcase，并由生产服务直接提供。访问路径是 /hexaviewcase/viewer.html。它会加载原站的三维渲染库、DICOM 解析库、布局文件和工具图标；接口请求通过本地服务转发到原站 API，模型文件仍按原站签名地址按需读取。使用原站分享链接中的 para 参数即可打开对应病例。
