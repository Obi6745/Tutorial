/**
 * Logger for the tutorial.
 * Writes lines to the terminal so students can see what the app did.
 * Three levels: INFO (normal), WARN (careful), ERROR (something broke).
 */

// Builds one text line: time, level, message, and optional extra details.
function line(level, message, extra = {}) {
  // Time in a standard format (easy to sort and read).
  const ts = new Date().toISOString();
  // If extra is empty, no second part. If not, show as JSON.
  const tail = Object.keys(extra).length ? ` ${JSON.stringify(extra)}` : '';
  return `[${ts}] ${level} ${message}${tail}`;
}

module.exports = {
  // Use for normal events: "user logged in", "request finished", etc.
  info(message, extra) {
    console.log(line('INFO', message, extra));
  },
  // Use when something odd happened but the app can keep going.
  warn(message, extra) {
    console.warn(line('WARN', message, extra));
  },
  // Use when something failed; helps you debug later.
  error(message, extra) {
    console.error(line('ERROR', message, extra));
  },
};
