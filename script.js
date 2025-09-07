// Smooth scrolling and active nav link highlighting
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
      });
      document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
    }
  });

  // Header scroll effect
  let header = document.querySelector('.header');
  if(window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// Mobile menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
  link.onclick = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  };
});

// Typing animation effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const titleElement = document.querySelector('.home-content h1');
  if (titleElement) {
    const originalText = titleElement.textContent;
    setTimeout(() => {
      typeWriter(titleElement, originalText, 80);
    }, 1000);
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Parallax effect for background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields!', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully!', 'success');
    this.reset();
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  `;
  
  if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)';
  } else if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)';
  } else {
    notification.style.background = 'linear-gradient(135deg, #0088ff 0%, #0066cc 100%)';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Cursor trail effect
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
  mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
  
  if (mouseTrail.length > trailLength) {
    mouseTrail.shift();
  }
  
  updateTrail();
});

function updateTrail() {
  const existingTrails = document.querySelectorAll('.mouse-trail');
  existingTrails.forEach(trail => trail.remove());
  
  mouseTrail.forEach((point, index) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
      position: fixed;
      width: ${20 - index}px;
      height: ${20 - index}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 0, 0, ${0.5 - index * 0.025}) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      left: ${point.x - (20 - index) / 2}px;
      top: ${point.y - (20 - index) / 2}px;
      animation: trailFade 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
      if (trail.parentNode) {
        trail.remove();
      }
    }, 500);
  });
}

// Add CSS animation for trail fade
const trailStyle = document.createElement('style');
trailStyle.textContent = `
  @keyframes trailFade {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.5); }
  }
`;
document.head.appendChild(trailStyle);

// Portfolio image hover effects
document.querySelectorAll('.portfolio-box').forEach(box => {
  box.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.03)';
  });
  
  box.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Services box animation
document.querySelectorAll('.services-box').forEach(box => {
  box.addEventListener('mouseenter', function() {
    const icon = this.querySelector('i');
    if (icon) {
      icon.style.animation = 'bounce 0.6s ease';
    }
  });
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-15px); }
    60% { transform: translateY(-10px); }
  }
`;
document.head.appendChild(bounceStyle);

// Page loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, #ff0000 0%, #cc0000 50%, #800000 100%);
  z-index: 10000;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Add floating particles
function createParticle() {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: #ff0000;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.6;
    left: ${Math.random() * window.innerWidth}px;
    top: ${window.innerHeight + 10}px;
    animation: floatUp ${5 + Math.random() * 10}s linear forwards;
    box-shadow: 0 0 6px #ff0000;
  `;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 15000);
}

// Add float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(floatStyle);

// Create particles periodically
setInterval(createParticle, 3000);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Remove loading class after everything is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.remove('loading');
    }, 500);
  });
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    }, 0);
  });
}