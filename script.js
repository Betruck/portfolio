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