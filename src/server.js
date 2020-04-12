const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', error => {
  console.error(`captured error: ${error.message}`);
  throw error;
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  throw reason;
});
