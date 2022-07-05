import express from 'express';
import Debug from 'debug';

import variables from './configs/env';

const debug = Debug('app:index');

const app = express();

app.listen(variables.port, () => {
  debug(`Server is running on port ${variables.port}`);
});
