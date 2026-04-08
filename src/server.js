/**
 * Small web app for class: logging, simple counters, and one broken route.
 *
 * How to run:
 *   1. npm install
 *   2. npm start
 *   3. Open http://localhost:3000/ in the browser
 */

// Express = library to handle HTTP requests (browser or API calls).
const express = require('express');
// Our small logger (writes INFO/WARN/ERROR lines to the terminal).
const logger = require('./logger');

// Create the web app object.
const app = express();
// Port number: use 3000, or whatever PORT says in the environment.
const PORT = process.env.PORT || 3000;

// Simple numbers we can read in the browser at /stats (like a tiny dashboard).
const stats = {
  requests: 0, // how many HTTP requests hit this server
  errors: 0, // how many errors we counted (students add to this in /risky-work)
};

// This runs before every route: count each request.
app.use((req, res, next) => {
  stats.requests += 1;
  next(); // continue to the matching route below
});

// ----- / -----
// Normal web page in the browser (not raw JSON).
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
  <p>This server is running. Use the links below for class exercises.</p>
  <ul>
    <li><a href="/health">Health check</a> — should work</li>
    <li><a href="/work">Work</a> — add logging (TODO in code)</li>
    <li><a href="/risky-work">Risky work</a> — broken until you add try/catch</li>
    <li><a href="/stats">Stats</a> — simple counters (JSON)</li>
  </ul>
  <p class="note">Programmers and tools can still call <code>/health</code> without a browser to get JSON.</p>
</body>
</html>`);
});

// ----- /health -----
// Browsers get a simple page; scripts and curl still get JSON (easier for class demos).
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

// ----- /work -----
// Happy path. Students add INFO logs at start and end.
app.get('/work', (req, res) => {
  // TODO 1: Log INFO at the start, e.g. "work started"

  // Pretend we did some work (replace with real steps in a bigger app).
  const result = { message: 'Task finished', stepsDone: 3 };

  // TODO 2: Log INFO at the end, include { stepsDone: result.stepsDone } in the extra object

  res.json(result);
});

// ----- /risky-work -----
// Broken on purpose: JSON.parse throws. Students wrap in try/catch and log the error.
app.get('/risky-work', (req, res) => {
  // Part A: visit this URL and watch the terminal (crash / error stack).
  // Part B: use try/catch, then:
  //   - logger.error('risky-work failed', { reason: err.message })  // never log passwords or tokens
  //   - stats.errors += 1
  //   - res.status(500).json({ ok: false, userMessage: 'Something went wrong. Try again later.' })

  // This string is not valid JSON, so parse throws an error.
  const data = JSON.parse('this is not valid json {{{');
  res.json({ ok: true, data });
});

// ----- /stats -----
// Returns the counters so you can "monitor" traffic without reading every log line.
app.get('/stats', (req, res) => {
  res.json({ ...stats });
});

// Start listening for HTTP connections on this computer.
app.listen(PORT, () => {
  logger.info('server started', { port: PORT });
  // Extra line so beginners see the URL even if they skip the README.
  console.log(`Open http://localhost:${PORT}/`);
});
