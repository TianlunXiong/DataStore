import { Menu, Tray } from 'electron'

export default function () {
  const tray = new Tray(require('path').resolve(__dirname, '../../../static/logo.png'))
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'}
  ])
  tray.setToolTip('DateStore')
  tray.setContextMenu(contextMenu)
}
