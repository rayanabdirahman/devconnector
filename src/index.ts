import express from 'express';

const PORT = process.env.PORT || '5000';
const app: express.Application  = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({"hellow": "world"});
});

// run server
app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));

