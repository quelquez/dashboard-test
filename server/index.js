import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`)
})