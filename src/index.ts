import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import { getMongoDbClient } from './data_access/db_client';

const PORT = process.env.PORT || '5000';

const app: express.Application  = express(); // initialise express application
getMongoDbClient(); // connect to MongoDB Client


app.get('/', (req: express.Request, res: express.Response) => {
  res.send({"hellow": "world"});
});

// run server
app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));

