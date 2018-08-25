import { app } from 'electron'

export default function (state) {
  app.dispatch = (action, load) => {
    if (mutation[action]) {
      mutation[action].call(null, state, load)
    }
  }
}

const mutation = {
  switchServer (state, {signal, port}) {
    switch (signal) {
      case 'open':
        state.koa.listen(port, () => {
          console.log('Koa 开启')
          app.dispatch('sendSignal', 'opened')
        })
        break
      case 'close':
        // 这样关闭 server 是不好的, 具体做法参考 http://www.html-js.com/article/The-correct-method-of-HTTP-server-nodejs-scrap-off-in-nodejs
        state.koa.close()
        app.dispatch('sendSignal', 'closed')
        break
    }
    return true
  },
  fetchObjectSignal (state, name) {
    state.mainWindow.webContents.send('objectStore', name)
  },
  sendSignal (state, signal) {
    state.mainWindow.webContents.send('switchServer', signal)
  }
}
