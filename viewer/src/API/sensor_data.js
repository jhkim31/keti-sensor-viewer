import axios from "axios";
import { config } from "../config.js";
const sensor_data_api = axios.create({
    baseURL: config.base_url,
    headers: {
        "Content-Type" : "application/json"
    }
});

export default sensor_data_api;