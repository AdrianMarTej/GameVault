const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth Service Proxy
const authProxy = createProxyMiddleware({
  target: 'http://auth-service:4000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/api/auth',
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);

      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
});

// Mongo API Proxy
const mongoProxy = createProxyMiddleware({
  target: 'http://mongo-api:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);

      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
});

// Steam Games API Proxy
const steamProxy = createProxyMiddleware({
  target: 'http://steam-games-api:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/steam': '/games',
  },
});

// Routes
app.use('/api/auth', authProxy);
app.use('/api/games', mongoProxy);
app.use('/api/users', mongoProxy);
app.use('/api/steam', steamProxy);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

