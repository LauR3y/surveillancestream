import '../bootstrap';

import glob from 'glob';

import { db } from '../registry';

glob('src/models/*.ts', function (er, files) {
  // load models
  files.forEach((f) => {
    require(`../../${f}`);
  });

  // sync
  db()
    .sync({
      alter: true,
      force: true,
      logging: console.log,
    })
    .then(() => {
      db().close();
      setTimeout(() => {
        process.exit(0);
      }, 100);
    });
});
