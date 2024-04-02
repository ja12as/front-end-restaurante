import axios from "axios"
const query = axios.create()

query.defaults.baseURL = "http://localhost:8080"

export default query;