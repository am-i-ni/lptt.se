// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true"
      navToggle.setAttribute("aria-expanded", !isExpanded)
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.setAttribute("aria-expanded", "false")
        navMenu.classList.remove("active")
      }
    })

    // Close menu when pressing Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navToggle.setAttribute("aria-expanded", "false")
        navMenu.classList.remove("active")
        navToggle.focus()
      }
    })
  }
})

// Tab functionality
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetPanel = document.getElementById(this.getAttribute("aria-controls"))

      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => {
        btn.classList.remove("active")
        btn.setAttribute("aria-selected", "false")
      })
      tabPanels.forEach((panel) => {
        panel.classList.remove("active")
      })

      // Add active class to clicked button and corresponding panel
      this.classList.add("active")
      this.setAttribute("aria-selected", "true")
      if (targetPanel) {
        targetPanel.classList.add("active")
      }
    })

    // Keyboard navigation for tabs
    button.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(tabButtons).indexOf(this)
      let nextIndex

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1
          tabButtons[nextIndex].focus()
          tabButtons[nextIndex].click()
          break
        case "ArrowRight":
          event.preventDefault()
          nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0
          tabButtons[nextIndex].focus()
          tabButtons[nextIndex].click()
          break
        case "Home":
          event.preventDefault()
          tabButtons[0].focus()
          tabButtons[0].click()
          break
        case "End":
          event.preventDefault()
          tabButtons[tabButtons.length - 1].focus()
          tabButtons[tabButtons.length - 1].click()
          break
      }
    })
  })
})

// Accordion functionality
document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button")

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true"
      const content = this.nextElementSibling

      // Toggle current accordion
      this.setAttribute("aria-expanded", !isExpanded)
      content.classList.toggle("active")

      // Optional: Close other accordions in the same container
      const accordionContainer = this.closest(".accordion")
      if (accordionContainer) {
        const otherButtons = accordionContainer.querySelectorAll(".accordion-button")
        const otherContents = accordionContainer.querySelectorAll(".accordion-content")

        otherButtons.forEach((otherButton) => {
          if (otherButton !== this) {
            otherButton.setAttribute("aria-expanded", "false")
          }
        })

        otherContents.forEach((otherContent) => {
          if (otherContent !== content) {
            otherContent.classList.remove("active")
          }
        })
      }
    })

    // Keyboard support for accordions
    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        this.click()
      }
    })
  })
})

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        event.preventDefault()

        // Close mobile menu if open
        const navMenu = document.querySelector(".nav-menu")
        const navToggle = document.querySelector(".nav-toggle")
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          navToggle.setAttribute("aria-expanded", "false")
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Focus management for accessibility
        setTimeout(() => {
          targetElement.focus()
          targetElement.setAttribute("tabindex", "-1")
        }, 500)
      }
    })
  })
})

// Enhanced focus management
document.addEventListener("DOMContentLoaded", () => {
  // Add focus-visible polyfill behavior
  function addFocusVisibleClass(event) {
    if (event.target.matches(":focus-visible")) {
      event.target.classList.add("focus-visible")
    }
  }

  function removeFocusVisibleClass(event) {
    event.target.classList.remove("focus-visible")
  }

  document.addEventListener("focusin", addFocusVisibleClass)
  document.addEventListener("focusout", removeFocusVisibleClass)
})

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}


// Keyboard trap for modal-like elements (if needed in future)
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
  )
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  element.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          event.preventDefault()
        }
      }
    }
  })
}

// Performance optimization: Lazy load non-critical content
document.addEventListener("DOMContentLoaded", () => {
  // Add intersection observer for animations or lazy loading if needed
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
        }
      })
    })

    // Observe elements that might benefit from lazy loading
    const observeElements = document.querySelectorAll(".card, .section")
    observeElements.forEach((el) => observer.observe(el))
  }
})
