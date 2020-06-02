const Koa = require('koa');
const axios = require('axios');
var WXBizDataCrypt = require('./WXBizDataCrypt')
const app = new Koa();

app.use(async ctx => {
    let code = ctx.query.code;
    let encryptedData = ctx.query.encryptedData;
    let iv = ctx.query.iv;
    let res = await axios({
        method: 'get',
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxa87305838a1f6f8b&secret=13be694504f90e6bcefd3cc79703be0b&js_code=${code}&grant_type=authorization_code`,
    })
    console.log(res.data)
    let pc = new WXBizDataCrypt('wxa87305838a1f6f8b', res.data.session_key)
    let data = pc.decryptData(encryptedData, iv)
    console.log(data)
    ctx.body = data;
});

app.listen(3000);