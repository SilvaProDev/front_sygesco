import axios from "axios";

const Api = axios.create({
    baseURL:"https://b-sygesco.herokuapp.com/api"
});

export default Api;