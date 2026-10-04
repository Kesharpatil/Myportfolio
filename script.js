const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute(
    'aria-label',
    open ? 'Close navigation' : 'Open navigation'
  );
});

document.querySelectorAll('.nav-links a').forEach((a) => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  observer.observe(el);
});

document.querySelectorAll('a[href="#"]').forEach((a) => {
  a.addEventListener('click', (e) => e.preventDefault());
});


// ===============================
// Netlify Contact Form
// ===============================

const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending... <span>→</span>';
  }

  const formData = new FormData(contactForm);

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData).toString()
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    formNote.textContent =
      '✓ Message sent successfully! I will get back to you soon.';
    
    formNote.style.display = 'block';

    contactForm.reset();

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Message Sent ✓';
    }

  } catch (error) {
    formNote.textContent =
      'Something went wrong. Please try again or email me directly at kp827874@gmail.com.';

    formNote.style.display = 'block';

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Message <span>→</span>';
    }
  }
});
