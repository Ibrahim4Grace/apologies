import express from 'express';
import bodyParser from 'body-parser';
import apologiesRouter from './routes/apologies.js';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use('/api/apologies', apologiesRouter);

app.listen(port, () => {
  console.log(`Apology app listening at http://localhost:${port}`);
});
