// const baseURL = 'http://localhost:5000/api'
const devURL = 'http://localhost:5000/api'
const prodURL = 'https://shopersserver-q35xewgsh-alinas-projects-45a8001e.vercel.app/api'

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