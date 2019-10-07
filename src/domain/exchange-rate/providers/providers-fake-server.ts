import express from 'express';
import { Server } from 'http';

export function start(port: number): Promise<Server> {
  const app = express();

  app.use((req, res, next) => {
    req.query.base ? next() : next(new Error('Missing base parameter'));
  });

  app.use((req, res, next) => {
    req.query.symbols ? next() : next(new Error('Missing symbols parameter'));
  });

  app.use('/oer', (req, res, next) => {
    req.query.app_id !== 'abc' ? next(new Error('Wrong app ID')) : next();
  });

  app.get('/ecb/latest', (req, res, next) => {
    const { base, symbols } = req.query;
    const rates = symbols.split(',').reduce(
      (acc: any, curr: any) => {
        return { ...acc, [curr]: 1 };
      },
      { [base]: 1 }
    );
    res.json({ base, rates, date: new Date().toISOString() });
  });

  app.get('/oer/latest.json', (req, res, next) => {
    const { base, symbols } = req.query;
    const rates = symbols.split(',').reduce(
      (acc: any, curr: any) => {
        return { ...acc, [curr]: 1 };
      },
      { [base]: 1 }
    );
    res.json({ base, rates });
  });

  return new Promise((resolve, reject) => {
    const server = app.listen(port, err => {
      err ? reject(err) : resolve(server);
    });
  });
}

export async function stop(server: Server) {
  return new Promise((resolve, reject) =>
    server.close(err => (err ? reject(err) : resolve()))
  );
}
