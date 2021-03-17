/**
 * @author Administrator
 * @date 2021-03-04 15:47
 */
const express = require('express')
const { createProxyMiddleware, Filter, Options, RequestHandler } = require('http-proxy-middleware')
const app = express()
const bodyParser = require('body-parser')
const UserModel = require('./model/users')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', req.method)
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

//设置post body数据的大小   limit
// create application/json parser
const jsonParser = bodyParser.json({limit: '100mb'})

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({limit: '100mb', extended: false})

// app.use(jsonParser)
// app.use(urlencodedParser)

app.get('/', (req, res, next) => {
  res.json({ text: 'Hello ,mongoose express!!!', ...req.query })
})

app.get('/query_user', async (req, res, next) => {
  UserModel.query(res, req.query, next)
})

app.get('/query_user_by_id', async (req, res, next) => {
  UserModel.findById(res, req.query.id, next)
})

app.post('/insert_user',urlencodedParser, function (req, res, next) {
  UserModel.insert(res, req.body, next)
})

app.delete('/delete_user', async function (req, res, next) {
  UserModel.delete(res, {_id:req.query.id}, next)
})

app.put('/update_user', urlencodedParser, async function (req, res, next) {
  UserModel.update(res, req.body, next)
})

//设置允许跨域访问该服务.
const server = app.listen(9088, '0.0.0.0', () => {
  const host = server.address().address
  const port = server.address().port
  console.log('express实例，访问地址为 http://%s:%s', host, port)
})

