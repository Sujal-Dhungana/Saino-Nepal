
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });



const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});



const heroContent = document.getElementById('heroContent');

function updateHeroFade() {
  const scrollY    = window.scrollY;
  const heroHeight = window.innerHeight;
  const progress = Math.min(scrollY / (heroHeight * 0.6), 1);

  heroContent.style.opacity   = (1 - progress).toFixed(3);
  heroContent.style.transform = `translateY(${progress * 65}px)`;
}

window.addEventListener('scroll', updateHeroFade, { passive: true });



const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));



const heroVideo   = document.getElementById('heroVideo');
const videoPicker = document.getElementById('videoPicker');

heroVideo.addEventListener('error', showVideoPrompt, { once: true });

function showVideoPrompt() {
  if (document.getElementById('videoHint')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'videoHint';
  wrapper.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 26px;
    background: rgba(10,10,10,0.88);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(46,204,113,0.45);
    border-radius: 50px;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 0.82rem;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    transition: opacity 0.3s;
  `;
  wrapper.innerHTML = `<span style="color:#2ecc71;font-size:1rem">▶</span> No hero video found — click to choose one from your device`;

  wrapper.addEventListener('click', () => videoPicker.click());
  document.body.appendChild(wrapper);
}

videoPicker.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);

  heroVideo.querySelectorAll('source').forEach(s => s.remove());
  heroVideo.src = objectUrl;
  heroVideo.load();
  heroVideo.play().catch(() => {});

  const hint = document.getElementById('videoHint');
  if (hint) {
    hint.style.opacity = '0';
    setTimeout(() => hint.remove(), 300);
  }

  window.addEventListener('unload', () => URL.revokeObjectURL(objectUrl), { once: true });
});



const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbClose  = document.getElementById('lbClose');

document.querySelectorAll('.gcard img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 300);
}

lbClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});



const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    sendBtn.textContent = '⚠ Please fill in all fields';
    sendBtn.style.background = '#c0392b';
    setTimeout(() => {
      sendBtn.innerHTML = '<i class="fa fa-paper-plane"></i>&nbsp; Send Message';
      sendBtn.style.background = '';
    }, 2500);
    return;
  }

  sendBtn.textContent = '✓ Message Sent!';
  sendBtn.style.background = '#27ae60';
  sendBtn.disabled = true;

  setTimeout(() => {
    sendBtn.innerHTML = '<i class="fa fa-paper-plane"></i>&nbsp; Send Message';
    sendBtn.style.background = '';
    sendBtn.disabled = false;
  }, 3500);
});
