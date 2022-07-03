import axios from "axios";
import { config } from "../config";
const sensor_data_api = axios.create({
    baseURL: config.base_url.develop,
    headers: {
        "Content-Type" : "application/json"
    }
});

export default sensor_data_api;