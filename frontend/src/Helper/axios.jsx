import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const instance=axios.create({
    baseURL:"http://localhost:8080",
})
if(cookies.get("bargainc")){

    instance.defaults.headers['Authorization']=`Bearer ${cookies.get("bargainc")}`
}

export default instance