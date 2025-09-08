import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://grocera-jet.vercel.app/api/v1",
});

export default apiClient;