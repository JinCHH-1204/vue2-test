import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'

//提供广告类数据接口
Mock.mock('/mock/banners', {
    code: 200,
    data: banners
})

//提供所有楼层数据的接口
Mock.mock('/mock/floors', {
    code: 200,
    data: floors
})