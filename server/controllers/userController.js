const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJwt = (id, name, email) => {
    return jwt.sign({ id, name, email }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class UserController {
    async registration(req, res, next) {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Invalid password or login"));
        }

        //проверка, существует ли пользователь с таким email в системе
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest("This email already exists"));
        }

        //если пользователя с таким email мы не нашли в базе, то хешируем пароль
        const hashPassword = await bcrypt.hash(password, 5);

        //создаем пользователя в БД
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        const token = generateJwt(user.id, user.name, user.email);

        //возвращаем токен на клиент
        return res.json({ token });
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.badRequest("User is not found"));
        }

        //убедиться, что пароль, который ввел пользователь, совпадает с тем, который лежит в БД
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest("Wrong password"));
        }

        const token = generateJwt(user.id, user.name, user.email);
        return res.json({ token });
    }

    //есть ли такой пользователь в БД
    async check(req, res, next) {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            // Возвращаем true, если пользователь найден
            return res.json({ exists: true });
        }
        // Возвращаем false, если пользователь не найден
        return res.json({ exists: false });
    }

    async getAll(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async deleteUser(req, res, next) {
        const { id } = req.body;
        const deletedUser = await User.destroy({ where: { id } });

        // Если количество удаленных строк равно 0, то пользователя с таким id не нашли
        if (deletedUser === 0) {
            return next(ApiError.badRequest("User not found"));
        }

        // Если удаление прошло успешно, отправляем статус 204 (No Content)
        return res.status(204).send();
    }
}

module.exports = new UserController();
