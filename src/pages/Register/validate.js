import Vue from "vue"
import VeeValidate from 'vee-validate'

//引入中文包
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

//配置信息
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        //修改提示语言为中文
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称（特定英文单词改为中文）
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})