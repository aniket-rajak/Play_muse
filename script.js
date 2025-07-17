  const playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
    </svg>
  `;

  const pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
    </svg>
  `;

  const toggleBtns = document.querySelectorAll('.toggleBtn');
  const footerBtn = document.getElementById('btn-footer');
  const footerSeek = document.getElementById('seekBar');

  let currentPlayingAudio = null;
  let currentToggleBtn = null;

  function updateUI(audio, btn) {
    toggleBtns.forEach(b => b.innerHTML = playIcon);
    if (btn) btn.innerHTML = pauseIcon;
    if (footerBtn) footerBtn.innerHTML = pauseIcon;
  }

  toggleBtns.forEach(button => {
    const audioId = button.getAttribute('data-audio-id');
    const audio = document.getElementById(audioId);

    button.innerHTML = playIcon;

    button.addEventListener('click', () => {
      if (audio.paused) {
        if (currentPlayingAudio && currentPlayingAudio !== audio) {
          currentPlayingAudio.pause();
          currentToggleBtn.innerHTML = playIcon;
        }
        audio.play();
        updateUI(audio, button);
        currentPlayingAudio = audio;
        currentToggleBtn = button;
      } else {
        audio.pause();
        button.innerHTML = playIcon;
        footerBtn.innerHTML = playIcon;
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      if (audio === currentPlayingAudio) {
        footerSeek.max = audio.duration;
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (audio === currentPlayingAudio) {
        footerSeek.value = audio.currentTime;
        footerSeek.max = audio.duration;
      }
    });

    audio.addEventListener('ended', () => {
      button.innerHTML = playIcon;
      footerBtn.innerHTML = playIcon;
    });
  });

  footerBtn.innerHTML = playIcon;
  footerBtn.addEventListener('click', () => {
    if (!currentPlayingAudio) return;

    if (currentPlayingAudio.paused) {
      currentPlayingAudio.play();
      updateUI(currentPlayingAudio, currentToggleBtn);
    } else {
      currentPlayingAudio.pause();
      currentToggleBtn.innerHTML = playIcon;
      footerBtn.innerHTML = playIcon;
    }
  });

  footerSeek.addEventListener('input', () => {
    if (currentPlayingAudio) {
      currentPlayingAudio.currentTime = footerSeek.value;
    }
  });


// Scoll-Grab

// const scrollContainer = document.getElementById("scrollContainer");
// let isDown = false;
// let startX;
// let scrollLeft;


// scrollContainer.addEventListener("mousedown", (e) => {
//     isDown = true;
//     scrollContainer.classList.add("active");
//     startX = e.pageX - scrollContainer.offsetLeft;
//     scrollLeft = scrollContainer.scrollLeft;
// });

// scrollContainer.addEventListener("mouseleave", () => {
//     isDown = false;
// });

// scrollContainer.addEventListener("mouseup", () => {
//     isDown = false;
// });

// scrollContainer.addEventListener("mousemove", (e) => {
//     if (!isDown) return;
//     e.preventDefault();
//     const x = e.pageX - scrollContainer.offsetLeft;
//     const walk = (x - startX) * 2; 
//     scrollContainer.scrollLeft = scrollLeft - walk;
// });

// let touchStartX = 0;
// let touchScrollLeft = 0;

// scrollContainer.addEventListener("touchstart", (e) => {
//     touchStartX = e.touches[0].pageX;
//     touchScrollLeft = scrollContainer.scrollLeft;
// });

// scrollContainer.addEventListener("touchmove", (e) => {
//     const touchMoveX = e.touches[0].pageX;
//     const moveX = touchStartX - touchMoveX;
//     scrollContainer.scrollLeft = touchScrollLeft + moveX;
// });


// =========

// menulist

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const iconMenu = document.getElementById("iconMenu");
const iconClose = document.getElementById("iconClose");

let menuOpen = false;

menuBtn.onclick = function () {
  menuOpen = !menuOpen;
  
  if (menuOpen) {
    menu.style.maxHeight = "500px"; 
    iconMenu.style.display = "none";
    iconClose.style.display = "inline";
  } else {
    menu.style.maxHeight = "0";
    iconMenu.style.display = "inline";
    iconClose.style.display = "none";
  }
};
 
// =============


