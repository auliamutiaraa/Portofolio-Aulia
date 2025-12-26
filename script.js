// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    navbar.style.transform = "translateY(0)"
  } else if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = "translateY(-100%)"
  } else {
    navbar.style.transform = "translateY(0)"
  }

  lastScroll = currentScroll
})

// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("active")
  } else {
    scrollTopBtn.classList.remove("active")
  }
})

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// AOS (Animate On Scroll) Implementation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((element) => {
  observer.observe(element)
})

// Skill bars animation
const skillBars = document.querySelectorAll(".skill-progress")
const skillSection = document.querySelector(".skills")

const animateSkillBars = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      skillBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      })
    }
  })
}

const skillObserver = new IntersectionObserver(animateSkillBars, {
  threshold: 0.5,
})

if (skillSection) {
  skillObserver.observe(skillSection)
}

// Contact form handling
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Simple validation
    if (name && email && subject && message) {
      // Create success message
      const successMessage = document.createElement("div")
      successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #a89968, #EEEBD9);
                color: #282427;
                padding: 2rem 3rem;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                text-align: center;
                font-weight: 600;
                font-size: 1.1rem;
                animation: fadeIn 0.3s ease-out;
            `
      successMessage.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #282427; margin-bottom: 1rem; display: block;"></i>
                Terima kasih! Pesan Anda telah terkirim.<br>
                <small style="font-size: 0.9rem; opacity: 0.8;">Saya akan segera menghubungi Anda.</small>
            `

      document.body.appendChild(successMessage)

      // Reset form
      contactForm.reset()

      // Remove message after 4 seconds
      setTimeout(() => {
        successMessage.style.animation = "fadeOut 0.3s ease-out"
        setTimeout(() => {
          document.body.removeChild(successMessage)
        }, 300)
      }, 4000)
    } else {
      // Create error message
      const errorMessage = document.createElement("div")
      errorMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
                color: white;
                padding: 2rem 3rem;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                text-align: center;
                font-weight: 600;
                font-size: 1.1rem;
                animation: fadeIn 0.3s ease-out;
            `
      errorMessage.innerHTML = `
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                Mohon lengkapi semua field!
            `

      document.body.appendChild(errorMessage)

      setTimeout(() => {
        errorMessage.style.animation = "fadeOut 0.3s ease-out"
        setTimeout(() => {
          document.body.removeChild(errorMessage)
        }, 300)
      }, 3000)
    }
  })
}

// Add active class to current nav item
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector(".hero-title")
if (heroTitle) {
  const text = heroTitle.innerHTML
  heroTitle.innerHTML = ""
  let index = 0

  function typeWriter() {
    if (index < text.length) {
      heroTitle.innerHTML += text.charAt(index)
      index++
      setTimeout(typeWriter, 50)
    }
  }

  // Start typing effect after page loads
  window.addEventListener("load", () => {
    setTimeout(typeWriter, 500)
  })
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Add hover effect to project cards
const projectCards = document.querySelectorAll(".project-card")
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Counter animation for stats
const statItems = document.querySelectorAll(".stat-item h4")
const aboutSection = document.querySelector(".about")

const animateCounter = (element) => {
  const target = Number.parseInt(element.textContent)
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current) + "+"
    }
  }, 16)
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statItems.forEach((stat) => animateCounter(stat))
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (aboutSection) {
  statsObserver.observe(aboutSection)
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in"
    document.body.style.opacity = "1"
  }, 100)
})

console.log("Portfolio website loaded successfully! 🚀")
