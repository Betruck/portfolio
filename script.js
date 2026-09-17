const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
const videoLightbox = document.getElementById('video-lightbox');
const videoLightboxPlayer = document.getElementById('video-lightbox-player');
const videoLightboxClose = document.getElementById('video-lightbox-close');

document.querySelectorAll('.thumb-video[data-video]').forEach(thumb => {
  thumb.addEventListener('click', () => {
    videoLightboxPlayer.src = thumb.dataset.video;
    videoLightbox.classList.add('active');
    videoLightboxPlayer.play();
  });
});

function closeVideoLightbox() {
  videoLightbox.classList.remove('active');
  videoLightboxPlayer.pause();
  videoLightboxPlayer.src = '';
}

videoLightboxClose.addEventListener('click', closeVideoLightbox);
videoLightbox.addEventListener('click', (e) => {
  if (e.target === videoLightbox) closeVideoLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoLightbox();
});

// Scroll-triggered reveal animations
const revealTargets = document.querySelectorAll(
  '.card, .timeline-item, .skill-category, .cyber-card, .edu-list li, .section-head'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.reveal-tag').forEach(tag => tag.classList.add('visible'));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// Staggered animation for project tags and skill-list items
document.querySelectorAll('.tags, .skill-list').forEach(group => {
  group.querySelectorAll('span, li').forEach((item, i) => {
    item.classList.add('reveal-tag');
    item.style.transitionDelay = `${i * 0.05}s`;
  });
});

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects .card');
const projectGrids = document.querySelectorAll('#projects .grid');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });

    projectGrids.forEach(grid => {
      const hasVisible = grid.querySelectorAll('.card:not(.hidden)').length > 0;
      grid.classList.toggle('hidden', !hasVisible);
      const subHead = grid.previousElementSibling;
      if (subHead && subHead.classList.contains('subsection-head')) {
        subHead.classList.toggle('hidden', !hasVisible);
      }
    });
  });
});

const scrollSections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function setActiveNav() {
  let current = '';
  scrollSections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();