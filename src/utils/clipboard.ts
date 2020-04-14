import Clipboard from 'clipboard'

export default function (text: string, container?: any) {
  return new Promise((resolve, reject) => {
    const ClipboardConfig = {
      autoSetContainer: false,
      appendToBody: true // This fixes IE, see #50
    }
    const fakeElement: any = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
      text: () => text,
      action: () => 'copy',
      container: typeof container === 'object' ? container : document.body
    })
    clipboard.on('success', (e: any) => {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', (e: any) => {
      clipboard.destroy()
      reject(e)
    })
    if (ClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
    fakeElement.click()
    if (ClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
  })
}
