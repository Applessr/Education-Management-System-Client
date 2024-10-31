import axios from "axios";

const PORT = import.meta.env.VITE_PORT || 6666;

console.log('port',PORT)


axios.defaults.baseURL =`http://localhost:${PORT}/`

export default axios