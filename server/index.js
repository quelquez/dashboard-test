import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequlize from './config.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import './models/userModel.js';
import './models/orderModel.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

const port = process.env.PORT || 5000;

(async ()=>{
    try {
        await sequlize.authenticate();
        console.log('Соединение с базой данных успешно установлено');

        await sequlize.sync();
        console.log('Модели синхронизированы с базой данных');

        app.listen(port, () => {
            console.log(`Сервер запущен на http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Ошибка подключения к базе данных:', error);
    }
})();