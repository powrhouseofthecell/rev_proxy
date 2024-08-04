import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import service_ip_map from './ip_addr';

const app = express();

app.use((req: any, res: any, next: any) => {
  const path = req.originalUrl;
  const parts = path.split('/').filter(Boolean);

  console.log('Path parts:', parts);

  if (parts.length >= 2) {
    req.target_ip = service_ip_map[parts[0]];
    req.target_route = parts.slice(1).join('/');
    console.log(req.target_ip, req.target_route)
  } else {
    return res.status(400).send('Invalid request path');
  }

  next();
});

app.use('*', (req: any, res: any, next: any) => {
  if (!req.target_ip) {
    return res.status(500).send('Target IP not found');
  }

  const target_url = `${req.target_ip}/${req.target_route}`;
  console.log(`Proxying request to: ${target_url}`);

  const Proxy = createProxyMiddleware({
    target: target_url,
    changeOrigin: true,
    secure: false
  });

  Proxy(req, res, next);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
