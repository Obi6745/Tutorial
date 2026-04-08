/**
 * Small logger: writes timestamped lines to the terminal.
 * Levels: INFO, WARN, ERROR.
 */

function line(level, message, extra = {}) {
  const ts = new Date().toISOString();
  const tail = Object.keys(extra).length ? ` ${JSON.stringify(extra)}` : '';
  return `[${ts}] ${level} ${message}${tail}`;
}

module.exports = {
  info(message, extra) {
    console.log(line('INFO', message, extra));
  },
  warn(message, extra) {
    console.warn(line('WARN', message, extra));
  },
  error(message, extra) {
    console.error(line('ERROR', message, extra));
  },
};
