const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 监听端口
const PORT = 8000;

router.get('/', (ctx, next) => {
  ctx.body = 'hello koa !'
});

router.get('/api', (ctx, next) => {
  ctx.body = 'test data'
});

// 加前缀
router.prefix('/api');

// 首页 —— 广告（超值特惠）
const homeAdData = require('./home/ad.js')
router.get('/homead', (ctx, next) => {
  console.log('## 首页 —— 广告（超值特惠）')
  ctx.body = homeAdData
});


// 首页 —— 推荐列表（猜你喜欢）
const homeListData = require('./home/list.js')
router.get('/homelist/:city/:page', (ctx, next) => {
  console.log('##首页 —— 推荐列表（猜你喜欢）')

  // 参数
  const params = ctx.params
  const paramsCity = params.city
  const paramsPage = params.page

  console.log('所在校园：' + paramsCity)
  console.log('当前页数：' + paramsPage)

  ctx.body = homeListData
});

// 搜索结果页 - 搜索结果 - 三个参数
let searchListData = require('./search/list.js')
router.get('/search/:page/:city/:category/:keyword', (ctx, next) => {
  console.log('## 搜索结果页 - 三个参数')

  // 参数
  const params = ctx.params
  const paramsPage = params.page
  const paramsCity = params.city
  const paramsCategory = params.category
  const paramsKeyword = params.keyword

  console.log('当前页数：' + paramsPage)
  console.log('所在校园：' + paramsCity)
  console.log('当前类别：' + paramsCategory)
  console.log('关键字：' + paramsKeyword)
  if (params.keyword) {
    let data = searchListData.data.find(item => item.title.includes(params.keyword))
    ctx.body = {
      hasMore: false,
      data: [data]
    }
   }else {
    ctx.body = searchListData
  }

})
// 搜索结果页 - 搜索结果 - 两个参数
router.get('/search/:page/:city/:category', (ctx, next) => {
  console.log('## 搜索结果页 - 两个参数')

  // 参数
  const params = ctx.params
  const paramsPage = params.page
  const paramsCity = params.city
  const paramsCategory = params.category

  console.log('当前页数：' + paramsPage)
  console.log('所在校园：' + paramsCity)
  console.log('当前类别：' + paramsCategory)

  ctx.body = searchListData
})

// 详情页 - 活动信息
const detailInfo = require('./detail/info.js')
router.get('/detail/info/:id', async (ctx, next) => {
  console.log('## 详情页 - 活动信息')

  const params = ctx.params
  const id = params.id

  console.log('活动id: ' + id)
  // https://github.com/koajs/koa/issues/734
  // 模拟加载中
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  })
  await next()
  ctx.body = detailInfo
})
// 详情页 - 用户评论
const detailComment = require('./detail/comment.js')
router.get('/detail/comment/:page/:id', (ctx, next) => {
  console.log('## 详情页 - 同学评价')

  const params = ctx.params
  const page = params.page
  const id = params.id

  console.log('活动id: ' + id)
  console.log('当前页数: ' + page)

  ctx.body = detailComment
})

// 订单列表
const orderList = require('./orderlist/orderList.js')
router.get('/orderlist/:username', (ctx, next) => {
  console.log('## 完成列表')

  const params = ctx.params
  const username = params.username
  console.log('用户名：' + username)

  ctx.body = orderList
})

// 提交评论
router.post('/submitComment', (ctx, next) => {
  console.log('## 提交评论')
  // 获取参数
  ctx.body = {
      errno: 0,
      msg: 'ok'
  }
})

// 开启 mock server
// 测试api的时候只开mock server，然后浏览器访问如： http://localhost:8000/api/homead
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(PORT);
console.log(`backend server is started at port ${PORT}!`);

app.on('error', err => {
  console.error('server error', err)
});
