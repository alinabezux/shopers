const OAuthService = require("../services/OAuthService")
const User = require('../db/models/User')

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const hashPassword = await OAuthService.hashPassword(req.body.password);

            await User.create({ ...req.body, password: hashPassword });

            res.status(201).json('Користувач зареєстрований.')
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = req.user
            console.log(user);

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            let { page } = req.query;
            page = page || 1;
            const limit = 10;
            let count;

            const users = await User.find({}).limit(limit).skip((page - 1) * limit);
            count = await User.countDocuments();

            return res.json({
                users,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
            // const users = await User.find({})
            // return res.json(users)

        } catch (e) {
            next(e);
        }
    },

}