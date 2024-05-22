const baseURL = 'http://localhost:5000/api'
// const prodURL = 'http://mejerichankabar-env.eba-qzjjjrmf.us-east-1.elasticbeanstalk.com/api/api'

const urls = {
    products: '/products',
    categories: '/categories',
    types: '/types',
    // users: '/users',
    auth: {
        registration: '/account/registration',
        logIn: '/account/logIn',
        refresh: '/account/refresh',
        logOut: '/account/logOut'
    },
    basket: '/basket',
    order: '/order',
}

export {
    baseURL, urls
}