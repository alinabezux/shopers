import axios from "axios";
import { POST_URL } from "../configs/urls";

const postService = {
    getCities: (searchString) => {
        const requestData = {
            apiKey: process.env.REACT_APP_API_POST_KEY,
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {
                FindByString: searchString
            }
        };

        return axios.post(POST_URL, requestData)
    },
    
    getWarehouses: (cityRef) => {
        const requestData = {
            apiKey: process.env.API_POST_KEY,
            modelName: 'AddressGeneral',
            calledMethod: 'getWarehouses',
            methodProperties: {
                CityRef: cityRef
            }
        };

        return axios.post(POST_URL, requestData)
    }
}


export { postService }