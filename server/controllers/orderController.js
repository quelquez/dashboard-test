import sequelize from '../config.js';
import orderModel from '../models/orderModel.js';

class orderController{ 
    static async getAllOrders(req,res){
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const orders = await sequelize.query('SELECT * FROM "orders" LIMIT :limit OFFSET :offset',{
                replacements: { limit: Number(limit), offset: Number(offset)},
                type: sequelize.QueryTypes.SELECT,
            });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({message: 'Ошибка при получении заказов', error});
        }
    }

    static async getOrderById (req,res){
        try {
            const { id } = req.params;
            const order = await sequelize.query('SELECT * FROM "orders" WHERE id = :id',
                {
                    replacements: {id: Number(id)},
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            if (!order.length) {
                return res.status(404).json({message: 'Заказ не найден'});
            }

            res.status(200).json(order[0]);
        } catch (error) {
            res.status(500).json({message: 'Ошибка при получении заказов', error})
        }
    }

    static async createOrder( req, res){
        try {
            const { total, status} = req.body;
            const newOrder = await orderModel.create({ total, status});

            res.status(201).json({newOrder, message: 'Заказ успешно создан'});
        } catch (error) {
            res.status(500).json({message: 'Ошибка при создании заказа', error})
        }
    }

    static async updateOrder (req, res){
        try {
            const { id } = req.params;
            const { total, status } = req.body;
            const order = await orderModel.findByPk(id);

            if(!order){
                return res.status(404).json({message: 'Заказ не найден'})
            }

            const updatedOrder = await order.update({total, status});
            res.json({updatedOrder, message: 'Заказ успешно обновлен'});
        } catch (error) {
            res.status(500).json({message: 'Ошибка обновления заказа', error});
        }
    }

    static async deleteOrder (req,res){
        try {
            const { id } = req.params;
            const order = await orderModel.findByPk(id);
            
            if(!order){
                return res.status(404).json({message: 'Заказ не найден'})
            }
            await order.destroy();
            res.json({message: 'Заказ успешно удален'});

        } catch (error) {
            res.status(500).json({message: 'Ошибка при удалении заказа', error});
        }
    }
}

export default orderController;