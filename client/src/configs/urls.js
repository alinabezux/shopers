const devURL = 'http://localhost:5001/api'
const prodURL = 'https://shopersvi-d6c7c2418328.herokuapp.com/api'

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
    urls, POST_URL, devURL, prodURL
}