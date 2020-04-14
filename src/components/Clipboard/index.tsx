import { defineComponent, SetupContext } from '@vue/composition-api'
import clipboard from '@/utils/clipboard'

type ClipboardProps = {
  text: string,
  container?: object,
  success?: (e: any) => void,
  error?: (e: Error) => void
}

export default defineComponent({
  name: 'Clipboard',
  props: {
    text: {
      type: String,
      required: true
    },
    container: {
      type: Object,
      required: false
    },
    onSuccess: {
      type: Function,
      required: false
    },
    onError: {
      type: Function,
      required: false
    }
  },
  setup (props: ClipboardProps, content: SetupContext) {
    const handleCopy = () => {
      clipboard(props.text, props.container).then((res: any) => {
        content.emit('success', res)
      }).catch((error: Error) => {
        content.emit('error', error)
      })
    }
    return () => (
      <div onClick={handleCopy}>
        {content.slots.default()}
      </div>
    )
  }
})
