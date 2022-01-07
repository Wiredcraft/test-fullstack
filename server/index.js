import express from 'express';
import path from 'path';

import router from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.send('An error occurred');
});

app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
