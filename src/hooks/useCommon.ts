import { usePluginsInject } from '@/store'

export function onBack () {
  const { router } = usePluginsInject()
  router.back()
}
