import express from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

import { getMongoDbClient } from './data_access/db_client';
import { router as auth } from './api/auth/auth';
import { router as post } from './api/post/post';
import { router as profile } from './api/profile/profile';
import { router as user } from './api/user/user.route';

const PORT = process.env.PORT || '5000';

const app: express.Application  = express(); // initialise express application
getMongoDbClient(); // connect to MongoDB client

// use middleware
app.use(express.json()); // use express body parser

// set routes
app.use('/api/auth', auth); // use authentication route
app.use('/api/post', post); // use post route
app.use('/api/profile', profile); // use profile route
app.use('/api/user', user); // use route route


app.get('/', (req: express.Request, res: express.Response) => {
  res.send({"hellow": "world"});
});

// run server
app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));

