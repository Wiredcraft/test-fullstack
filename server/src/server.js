const { app } = require('./index');
const { CONFIG } = require('./config');

const x = app.listen(CONFIG.app.port, () =>
  console.log(`Server is listening on http://0.0.0.0:${CONFIG.app.port}`)
);
