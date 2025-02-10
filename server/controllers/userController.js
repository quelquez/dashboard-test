import sequelize from '../config.js';

class userController {
    static async getAllUsers(req, res) {
        try {
            const { page = 1, limit = 10} = req.query;
            const offset = (page - 1)*limit;

            const users = await sequelize.query('SELECT * FROM "users" LIMIT :limit OFFSET :offset',{
                replacements: {limit: Number(limit), offset: Number(offset)},
                type: sequelize.QueryTypes.SELECT,
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: 'Ошибка при получении пользователей', error});
        }
    }

    static async getUserById (req,res) {
        try {
            const { id } = req.params;
            const user = await sequelize.query('SELECT * FROM "users" WHERE id = :id',
                {
                    replacements: {id: Number(id)},
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            if (!user.length) {
                return res.status(404).json({message: 'Пользователь не найден'});
            }

            res.status(200).json(user[0]);
        } catch (error) {
            res.status(500).json({message: 'Ошибка при получении данных о пользователе', error})
        }
    }

    static async createUser(req, res) {
        const { username, name, email, birth_date } = req.body;
        try {
            const newUser = await sequelize.query('INSERT INTO "users" (username, name, email, birth_date) VALUES (:username, :name, :email, :birth_date) RETURNING *', 
                {
                    replacements: {username, name, email, birth_date},
                    type: sequelize.QueryTypes.INSERT,
                });
            res.status(201).json(newUser[0]);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании пользователя', error });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, name, email, birth_date } = req.body;
            const user = await sequelize.query('UPDATE "users" SET username = :username, name = :name, email = :email, birth_date = :birth_date WHERE id = :id RETURNING *',
                {
                    replacements: {id: Number(id), username, name, email, birth_date},
                    type: sequelize.QueryTypes.UPDATE,
                }
            )

            if (!user.length) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            res.status(200).json(user[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const delUser = await sequelize.query('DELETE FROM "users" WHERE id = :id RETURNING *',
                {
                    replacements: {id: Number(id)},
                    type: sequelize.QueryTypes.DELETE,
                }
            )

            if (!delUser.length) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            res.status(200).json({ message: "Пользователь успешно удалён" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default userController;