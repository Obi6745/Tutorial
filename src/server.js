/**
 * Small web app for class: logging, simple counters, and one broken route.
 *
 * How to run:
 *   1. npm install
 *   2. npm start
 *   3. Open http://localhost:3000/health in the browser
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

// ----- /health -----
// Example route: always works, logs one INFO line, returns JSON "ok".
app.get('/health', (req, res) => {
  logger.info('health check requested');
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
  console.log(`Open http://localhost:${PORT}/health`);
});
