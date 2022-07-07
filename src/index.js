import express from 'express';
import Debug from 'debug';
import path from 'path';
import variables from './configs/env';

const debug = Debug('app:index');

const app = express();

// public files
app.use('/public', express.static(path.join(__dirname, 'public')));

// pug implementation
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(variables.port, () => {
  debug(`Server is running on port ${variables.port}`);
});
