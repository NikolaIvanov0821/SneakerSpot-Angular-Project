import express from 'express';
import mongoose from 'mongoose';

import routes from './routes.js'
import { corsMiddleware } from './middlewares/cors.js';

console.log('It works!');

try {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'sneakerspot'})
    console.log('DB Connected!');
} catch (error) {
    console.log('Cannot connect to DB!');
}

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use(routes);

app.listen(3030, () => console.log("Server is listening on http://localhost:3030"))
