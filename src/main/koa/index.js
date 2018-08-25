import { app, ipcMain } from 'electron'
const Koa = require('koa')
const Router = require('koa-router')
const koa = new Koa()
const router = new Router()

koa.use(async (ctx, next) => {
  const origin = ctx.request.header.origin
  // 这里可以添加限制访问域名的条件
  // 比如 http://localhost:3500
  const allowences = new Set().add('http://localhost:9080')
  // .add('other else you want')
  ctx.response.set('Access-Control-Allow-Credentials', true)
  ctx.response.set('Access-Control-Allow-Origin', allowences.has(origin) ? origin : '')

  await next()
})
router.get('/', async (ctx, next) => {
  let name
  if (ctx.request.query.name) {
    name = ctx.request.query.name
    await new Promise((resolve, reject) => {
      app.dispatch('fetchObjectSignal', name)
      ipcMain.on('toKoa', (e, msg) => {
        resolve(msg)
      })
    }).then(msg => {
      ctx.response.body = msg
    }).then(() => {
      ipcMain.removeAllListeners('toKoa')
    })
  }
  ctx.type = 'application/json'
  await next()
})

koa.use(router.routes())

export default koa
