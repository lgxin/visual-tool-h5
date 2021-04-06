
import axios from 'axios'
import qs from 'qs'
import {proxy} from './../../config/index'

const instance =  axios.create({
    baseURL:proxy.api,
    timeout:50000
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(function(config){
    return config;
},function(error){
    return Promise.reject(error)
})

//请求响应拦截
instance.interceptors.response.use(function(response){
    console.log(response);
    return response.data;
},function(error){
    return Promise.reject(error)
})
 
function get(url,params){
    return instance.get(url,{
        params
    })
}
 
function post(url, data){
     return new Promise((resolve, reject) => {
        instance.post(url,qs.stringify(data)).then(res=>{
            resolve(res);
        }).catch(err => {
            reject(err);
        });
     })
}
export default {
    get,
    post
}