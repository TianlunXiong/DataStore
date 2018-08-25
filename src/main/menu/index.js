import { app, Menu } from 'electron'
const template = [
  {
    label: 'App',
    submenu: [
      {
        label: 'Open Server',
        type: 'checkbox',
        checked: false,
        click (menuItem, broswerWindow, e) {
          switch (menuItem.checked) {
            case true:
              app.dispatch('switchServer', 'open')
              break
            case false:
              app.dispatch('switchServer', 'close')
              break
          }
        }
      },
      {
        label: 'sendToRenderer',
        click () {
          app.dispatch('fetchObjectSignal')
        }
      },
      {
        role: 'quit',
        label: 'Exit'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)

export default menu
