import axios from "axios"

const myAxios = axios.create();

myAxios.interceptors.request.use(function (config) {
        const token = sessionStorage.getItem("token")
        if(token){
            config.headers.Authorization = 'Bearer ' + token     
        }
        return config;
    })

myAxios.interceptors.response.use((res) => {
    if(res.data.errorCode){
        alert(res.data.errorMessage)
        return
    }
    return res;
});

export default myAxios;