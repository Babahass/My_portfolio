   // Preloader
   window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hide');
    }, 500);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Typing Effect
function typeText() {
    const text = "Frontend Developer";
    const typingText = document.querySelector('.typing-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (typingText.textContent.length > 0) {
            typingText.textContent = typingText.textContent.slice(0, -1);
            setTimeout(erase, 50);
        } else {
            index = 0;
            setTimeout(type, 500);
        }
    }
    
    type();
}

typeText();

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Animate skill progress if it's a skill card
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const percent = progressBar.getAttribute('data-percent') + '%';
                    setTimeout(() => {
                        progressBar.style.width = percent;
                    }, 300);
                }
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card').forEach(el => observer.observe(el));

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        navbar.style.padding = '0.7rem 2rem';
        backToTop.classList.add('show');
    } else {
        navbar.style.padding = '1rem 2rem';
        backToTop.classList.remove('show');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    if (name && email && message) {
        // In a real application, you would send this data to a server
        alert('Thank you for your message!');
        contactForm.reset();
    }
});

// emailjs
(function () {
    emailjs.init("mMdGMMz1Z8_RpNGp1"); // ✅ Your actual public key
  })();
  
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    emailjs.sendForm("service_myrcncd", "template_ge4txdv", this)
      .then(function () {
        alert("✅ Your message has been sent successfully!");
        document.getElementById("contact-form").reset();
      }, function (error) {
        alert("❌ Failed to send your message. Please try again.");
        console.error("EmailJS Error:", error);
      });
  });
  