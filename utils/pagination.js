const template = require('art-template')
const path = require('path')
const url = require('url')
/* 
生成分页的HTML
/**
 * @description: 描述
 * @param 参数  options {page:'',tatal:'',btnNum:''}
 * @return: 
 */
module.exports = (options) => {
    //思考: 生成分页的时候需要哪些数据
    // 1. 当前页码    page 
    // 2. 总页数      total
    // 3. 显示多少个页码的按钮   btnNum    默认5 个
    // 规则:当前页码的按钮尽可能在中间
    // 4.请求对象 req
    // 我们需要在进行分页跳转的时候 带上之前的传参 去修改当前页码
    const req = options.req
    // 获取当前请求的地址
    // a. 需求 /list/1?page=2&sort=price  地址转换出里面的传参
    // b. url.parse(url) 转换url字符串地址为对象 query属性只是键值对字符串
    // c. url.parse(url,true) 转换url字符串地址为对象 query属性包含所有传参而是对象
    const urlObject = url.parse(req.url, true)//转成url对象 query search pathname

    const getUrl = (page) => {
        urlObject.query.page = page
        urlObject.search = undefined
        return url.format(urlObject)
    }

    
    
    const {page,total} = options
    const btnNum = options.btnNum || 5

    // 计算起始按钮的页码
    // 计算结束按钮的页码

    // 理想情况
    let begin = page - Math.floor(btnNum / 2)
    // 起始的页码小于1的时候query
    begin = begin < 1 ? 1 : begin

    //理想情况结束的页码
    let end = begin + btnNum - 1
    //结束的页码大于总页数
    end = end > total ? total : end
    // 如果结束按钮的页码换了  起始的页码也需要换
    begin = end - btnNum + 1
    //起始的页码小于1的时候
    begin = begin < 1 ? 1 : begin 

    // 生成HTML格式的字符串(分页) 使用模板引擎
    // 通过路径找到模板结合数据动态生成 HTML格式的分页
    const urlTemplate = path.join(__dirname,'../views/component/pagination.art')
    return template(urlTemplate,{page,total,begin,end,getUrl,query:req.query})
}