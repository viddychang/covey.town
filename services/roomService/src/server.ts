import CORS from 'cors';
import Express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net';
import { ChatServer } from './ChatServer';
import CoveyTownsStore from './lib/CoveyTownsStore';
import addTownRoutes from './router/towns';

const app = Express();
app.use(CORS());
const server = http.createServer(app);
let app2 = new ChatServer().app;

addTownRoutes(server, app);

server.listen(process.env.PORT || 8081, () => {
  const address = server.address() as AddressInfo;
  // eslint-disable-next-line no-console
  console.log(`Listening on ${address.port}`);
  if (process.env.DEMO_TOWN_ID) {
    CoveyTownsStore.getInstance().createTown(process.env.DEMO_TOWN_ID, false);
  }
});

export { app2 };
