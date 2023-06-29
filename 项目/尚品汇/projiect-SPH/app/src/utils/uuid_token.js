import { v4 as uuidv4 } from "uuid";

//生成一个随机id用于标识游客身份,其每次执行不发生变化,采用localStorage存储
export const getUUID = () => {
    //先尝试从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有
    if (!uuid_token) {
        //生成游客临时身份
        uuid_token = uuidv4();
        //本地存储存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }

    return uuid_token;
};
