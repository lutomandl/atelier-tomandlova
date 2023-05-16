export default function keyboard(
  node: HTMLDivElement,
  params: { shortcut: any }
) {
  // params.shortcut
  function handleKeyDown(e: { code: string }) {
    Object.keys(params.shortcut).forEach(key => {
      if (e.code === key) {
        if (Array.isArray(params.shortcut[key])) {
          params.shortcut[key].forEach((fn: (arg0: any) => any) => fn(e))
        } else {
          params.shortcut[key](e)
        }
      }
    })
  }
  node.addEventListener('keydown', handleKeyDown)

  return {
    destroy() {
      node.removeEventListener('keydown', handleKeyDown)
    },
  }
}
