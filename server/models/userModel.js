import { DataTypes } from "sequelize";
import sequlize from "../config.js";

const userModel = sequlize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.DATEONLY,
    },
    registration_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
},
{
    tableName: 'users',
    timestamps: false,
});

export default userModel;