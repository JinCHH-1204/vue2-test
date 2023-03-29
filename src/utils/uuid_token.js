import { v4 as uuidv4 } from 'uuid'
//生成一个随机的字符串作为临时身份 要求持久存在，不变
export const getUUID = () => {
    //若已存在 则不再重新生成
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    if (!uuid_token) {
        //不存在id 随机生成一个
        uuid_token = uuidv4()
        //本地存储
        localStorage.setItem("UUIDTOKEN", uuid_token)
    }
    return uuid_token
}