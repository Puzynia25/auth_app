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

    //проверка: авторизован пользователь или нет
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email);
        return res.json({ token });
    }

    // async create(req, res) {}
    // async getAll(req, res) {}
    // async delete(req, res) {}
}

module.exports = new UserController();

//добавить поля в user: registration_date, last_login_date, status
