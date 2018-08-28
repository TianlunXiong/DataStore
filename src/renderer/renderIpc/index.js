import {ipcRenderer} from 'electron'

export default function ($store) {
  ipcRenderer.on('objectStore', (e, msg) => {
    $store.dispatch('creator/buildObject', msg).then(r => {
      return r
    }).then(r => {
      ipcRenderer.send('toKoa', r)
    })
  })
}
