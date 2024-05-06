import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({ baseURL });

export default instance;
// export default baseURL;