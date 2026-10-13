const Mock=require('mockjs')

const Random=Mock.Random

let Result={
    code:200,
    msg:'操作成功',
    data:null
}

Mock.mock('/api/capthca','get',()=>
{
    //生成四位数字验证码
    const capthca=Mock.Random.string('number',4);

    //模拟存储验证码到Redis
    console.log('生成的验证码:',capthca);

    //
    return {
        code:200,
        message: 'success',
        data: {
            //生成随机验证码
            capthca: Mock.Random.string('number',4),
            //模拟验证码图片
            image:`https://via.placeholder.com/120x40?text=${Mock.Random.string('number', 4)}`
        }
    }
})