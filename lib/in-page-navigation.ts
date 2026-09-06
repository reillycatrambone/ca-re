export const anchorRevealEvent = 'ca-re:anchor-reveal'

function samePageHash(href: string) {
  const target = new URL(href, window.location.href)
  return target.origin === window.location.origin &&
    target.pathname === window.location.pathname &&
    target.hash
    ? target.hash
    : null
}

export function revealInPageAnchor(href: string) {
  const hash = samePageHash(href)
  // App Router history updates do not emit a native hashchange event.
  if (hash) window.dispatchEvent(new CustomEvent(anchorRevealEvent, { detail: hash }))
}

export function subscribeToAnchorReveal(reveal: (hash: string) => void) {
  const onHash = () => reveal(window.location.hash)
  const onReveal = (event: Event) => {
    if (event instanceof CustomEvent && typeof event.detail === 'string') reveal(event.detail)
  }
  const onClick = (event: MouseEvent) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !(event.target instanceof Element)
    )
      return
    const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self'))
      return
    const hash = samePageHash(anchor.href)
    if (hash) reveal(hash)
  }
  window.addEventListener('hashchange', onHash)
  window.addEventListener(anchorRevealEvent, onReveal)
  document.addEventListener('click', onClick)
  onHash()
  return () => {
    window.removeEventListener('hashchange', onHash)
    window.removeEventListener(anchorRevealEvent, onReveal)
    document.removeEventListener('click', onClick)
  }
}
