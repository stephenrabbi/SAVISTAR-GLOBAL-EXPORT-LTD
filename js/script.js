// Navbar Scroll Effect
function handleScroll() {
    const navbar = document.getElementById('mainNav');
    if (!navbar) return;

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    navbar.classList.toggle('scrolled', scrollPosition > 100);
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll
    window.addEventListener('scroll', handleScroll);
    
    // Initialize Bootstrap components properly
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', (e) => {
            const target = document.querySelector(navbarToggler.dataset.bsTarget);
            target.classList.toggle('show');
        });
    }
});



// Add active class to current section
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight * 0.25) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentId)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Home Page Carousel Initialization
const homeCarousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2500,
    wrap: true,
    touch: true
});

// Home Section Animation
const homeContentSection = document.querySelector('.home-content');
const homeContentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.home-text-section').classList.add('animate-slide-right');
            entry.target.querySelector('.home-carousel').classList.add('animate-slide-left');
        }
    });
});

homeContentObserver.observe(homeContentSection);

// Initialize carousel with custom settings
const homeCarousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 3000, // 3 seconds between slides
    wrap: true, // Infinite loop
    touch: true // Enable touch swiping
});

$(window).scroll(function(){
$('nav').toggleClass('scrolled', $(this).scrollTop() > 200);
});


// Department card animations
const departmentCards = document.querySelectorAll('.department-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

departmentCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    cardObserver.observe(card);
});


// Add to script.js
// Value Metrics Animation
const metricNumbers = document.querySelectorAll('.metric-number');
const valueCards = document.querySelectorAll('.value-card');

const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            metricNumbers.forEach(number => {
                const target = parseInt(number.dataset.count);
                const duration = 2000;
                const start = Date.now();
                const initial = parseInt(number.textContent);

                const update = () => {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * (target - initial) + initial);
                    
                    number.textContent = current + (target > 100 ? '+' : '');
                    
                    if(progress < 1) {
                        requestAnimationFrame(update);
                    }
                };

                requestAnimationFrame(update);
            });
        }
    });
}, { threshold: 0.5 });

valueCards.forEach(card => {
    valueObserver.observe(card);
});

// Initialize Testimonials Carousel
const testimonialCarousel = new bootstrap.Carousel('#testimonialCarousel', {
    interval: 3000,
    wrap: true,
    touch: true,
    pause: 'hover'
});




/* services page hero-section.js */

// hero-section.js

  document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('services-page')) {
      const breadcrumbOverlay = document.querySelector('.breadcrumb-overlay');
      if (breadcrumbOverlay) {
        breadcrumbOverlay.style.opacity = 0;
        setTimeout(() => {
          breadcrumbOverlay.style.transition = 'opacity 1s ease-in';
          breadcrumbOverlay.style.opacity = 1;
        }, 100);
      }
    }
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.legal-panel');
  
    function togglePanel(panel, open) {
      const header = panel.querySelector('.panel-header');
      const content = panel.querySelector('.panel-content');
      
      header.setAttribute('aria-expanded', open);
      if (open) {
        // Calculate height first
        content.style.maxHeight = 'none';
        const fullHeight = content.scrollHeight + 'px';
        content.style.maxHeight = '0';
        // Trigger transition after layout calculation
        requestAnimationFrame(() => {
          content.style.maxHeight = fullHeight;
        });
      } else {
        content.style.maxHeight = '0';
      }
    }
  
    function closeAllPanels() {
      panels.forEach(panel => {
        togglePanel(panel, false);
      });
    }
  
    panels.forEach(panel => {
      const header = panel.querySelector('.panel-header');
      header.addEventListener('click', () => {
        const wasOpen = header.getAttribute('aria-expanded') === 'true';
        closeAllPanels();
        if (!wasOpen) togglePanel(panel, true);
      });
    });
  
    // Initialize first panel
    if (panels.length > 0) togglePanel(panels[0], true);
  });


  
  document.querySelectorAll('details.legal-panel').forEach(panel => {
    panel.addEventListener('toggle', () => {
      if (panel.open) {
        document.querySelectorAll('details.legal-panel').forEach(other => {
          if (other !== panel) other.open = false;
        });
      }
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    // Keep only legal links handling if required
    document.querySelectorAll('.legal-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your link handling logic here
        console.log(`Navigating to: ${link.href}`);
      });
    });
  });