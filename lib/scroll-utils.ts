export function smoothScrollTo(targetId: string) {
  const targetElement = document.getElementById(targetId)

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80, // Adjust for navbar height
      behavior: "smooth",
    })

    // Update URL hash without scrolling
    window.history.pushState(null, "", `#${targetId}`)
  }
}
