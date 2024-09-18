const base = {
  style: { display: 'flex' },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden'
}

export const appTransitions = {
  fade: {
    variants: {
      visible: { opacity: 1, translateY: 0 },
      hidden: { opacity: 0, translateY: 12 },
    },
    ...base
  }
}