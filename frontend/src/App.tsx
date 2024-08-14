import axios from "axios";
import Routes from "./routes";

const baseURL = `${import.meta.env.VITE_API_GATEWAY}`;
axios.defaults.baseURL = baseURL;

function App() {
  return <Routes />;
}

export default App;
