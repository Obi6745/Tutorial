/**
 * Small web app for class: logging, simple counters, and routes to experiment with.
 *
 * How to run:
 *   1. npm install
 *   2. npm start
 *   3. Open http://localhost:3000/ in the browser
 */

const express = require('express');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

const stats = {
  requests: 0,
  errors: 0,
};

app.use((req, res, next) => {
  stats.requests += 1;
  next();
});

app.get('/', (req, res) => {
  logger.info('home page requested');
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tutorial app</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 36rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    h1 { font-size: 1.35rem; }
    ul { padding-left: 1.2rem; }
    a { color: #0b57d0; }
    .note { color: #444; font-size: 0.95rem; }
  </style>
</head>
<body>
  <h1>Monitoring, logging &amp; errors — tutorial</h1>
  <p>This server is running. Follow your assignment for each route below.</p>
  <ul>
    <li><a href="/health">Health check</a></li>
    <li><a href="/work">Work</a></li>
    <li><a href="/risky-work">Risky work</a></li>
    <li><a href="/stats">Stats</a> (JSON)</li>
  </ul>
  <p class="note">Tools can call <code>/health</code> without a browser to get JSON.</p>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  logger.info('health check requested');
  if (req.accepts('html')) {
    res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>OK</title>
<style>body{font-family:system-ui,sans-serif;margin:2rem}</style>
</head>
<body>
  <p><strong>All good.</strong> The tutorial API is running.</p>
  <p><a href="/">Back to home</a></p>
</body>
</html>`);
    return;
  }
  res.json({ ok: true, service: 'tutorial-api' });
});

app.get('/work', (req, res) => {
  const result = { message: 'Task finished', stepsDone: 3 };

  res.json(result);
});

app.get('/risky-work', (req, res) => {
  const data = JSON.parse('this is not valid json {{{');
  res.json({ ok: true, data });
});

app.get('/stats', (req, res) => {
  res.json({ ...stats });
});

app.listen(PORT, () => {
  logger.info('server started', { port: PORT });
  console.log(`Open http://localhost:${PORT}/`);
});
