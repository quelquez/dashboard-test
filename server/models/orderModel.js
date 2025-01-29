import { DataTypes } from 'sequelize';
import sequlize from '../config.js';
import userModel from './userModel.js';

const orderModel = sequlize.define('Order', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    created_at:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'pending',
    },
},{
    tableName: 'orders',
    timestamps: false,
});

orderModel.belongsTo(userModel, {foreignKey: 'user_id', onDelete: 'CASCADE'});

export default orderModel;