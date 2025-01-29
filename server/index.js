import sequlize from './config.js';
import userModel from './models/userModel.js';
import orderModel from './models/orderModel.js';

(async () => {
    try {
        await sequlize.authenticate();
        console.log('Соединение с базой данных успешно установлено.')

        await sequlize.sync();
        console.log('Модели синхронизированы с базой данных.')

    } catch (error) {
        console.log('Ошибка подключения к базе данных:', error)
    }
})();