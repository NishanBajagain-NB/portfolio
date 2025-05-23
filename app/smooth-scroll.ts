"use client"

export function initSmoothScroll() {
  if (typeof window !== "undefined") {
    // Handle initial hash on page load
    setTimeout(() => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id)
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    }, 100)

    // Handle all anchor clicks
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (
        anchor &&
        anchor.hash &&
        anchor.hash.startsWith("#") &&
        anchor.origin + anchor.pathname === window.location.origin + window.location.pathname
      ) {
        e.preventDefault()

        const id = anchor.hash.substring(1)
        const element = document.getElementById(id)

        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          })

          // Update URL without scrolling
          window.history.pushState(null, "", anchor.hash)
        }
      }
    })
  }
}
