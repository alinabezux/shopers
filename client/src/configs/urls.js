const baseURL = 'http://localhost:5000/api'
// const prodURL = 'http://mejerichankabar-env.eba-qzjjjrmf.us-east-1.elasticbeanstalk.com/api/api'
const POST_URL = 'https://api.novaposhta.ua/v2.0/json/';

const urls = {
    products: '/products',
    categories: '/categories',
    types: '/types',
    users: '/users',
    auth: {
        registration: '/users/register',
        logIn: '/auth/logIn',
        refresh: '/auth/refresh',
        logOut: '/auth/logOut',
        forgotPassword: '/auth/password/forgot',
    },
    basket: '/basket',
    favorite: '/favorite',
    order: '/order',
}

export {
    baseURL, urls, POST_URL
}