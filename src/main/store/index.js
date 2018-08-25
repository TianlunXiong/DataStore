import { app } from 'electron'

export default function (state) {
  app.dispatch = (action, load) => {
    if (mutation[action]) {
      mutation[action].call(null, state, load)
    }
  }
}

const mutation = {
  sayHello (state, words = 'Hello') {
    console.log(words)
  },
  switchServer (state, signal) {
    switch (signal) {
      case 'open':
        state.koa.listen(9081, () => {
          console.log('已开启Koa')
        })
        break
      case 'close':
        // 这样关闭 server 是不好的, 具体做法参考 http://www.html-js.com/article/The-correct-method-of-HTTP-server-nodejs-scrap-off-in-nodejs
        state.koa.close()
        break
    }
  },
  fetchObjectSignal (state, name = '用户') {
    state.mainWindow.webContents.send('objectStore', name)
  }
}
