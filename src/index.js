import express from 'express';
import Debug from 'debug';
import path from 'path';
import cors from 'cors';
import variables from './configs/env';
import router from './router';

const debug = Debug('app:index');

const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// public files
app.use('/public', express.static(path.join(__dirname, 'public')));

// pug implementation
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// router implementation
router(app);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/not-found', (req, res) => {
  res.render('not-found');
});

app.get('*', (req, res) => {
  res.redirect('/not-found');
});

app.listen(variables.port, () => {
  debug(`Server is running on port ${variables.port}`);
});
