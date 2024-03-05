export interface WindowWrapper {
  scrollToTop: () => void
}

export const windowWrapper: WindowWrapper = {
  scrollToTop() {
    window.scrollTo(0, 0)
  }
}
