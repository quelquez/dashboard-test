import userModel from "../models/userModel.js";

class userController {
    static async getUsers(req, res) {
        const { limit = 10, offset = 0 } = req.query;
        try {
            const users = await userModel.findAll({limit: +limit, offset: +offset});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async createUser(req, res) {
        const { username, name, email, birth_date } = req.body;
        try {
            const user = await userModel.create({username, name, email, birth_date});
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

export default userController;