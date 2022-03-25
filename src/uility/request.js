import myAxios from "./axios"
const get = async(id,url,...arg)=>{
    return myAxios.get(`${url}/${id}`,...arg)   
}
const find = async(url,...arg)=>{
    return myAxios.get(`${url}`,...arg)
}

const patch = async(id,url,...arg)=>{
    return myAxios.patch(`${url}/${id}`,...arg)
}

const post = async (...arg)=>{
    return myAxios.post(...arg)
}

const request = {
    get,
    patch,
    post,
    find
}

export default request;