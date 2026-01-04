// Live Match Update (Demo)
const matchStatus = document.getElementById("match-status");

if (matchStatus) {
  const updates = [
    "Kick-off! Sky FC vs Family FC",
    "15' - Family FC dominating possession",
    "30' - GOAL! Sky FC scores ⚽",
    "Half Time - Sky FC 1 : 0 Family FC",
    "75' - Great save by Sky FC goalkeeper",
    "Full Time - Sky FC wins 1 : 0 🎉"
  ];

  let index = 0;

  setInterval(() => {
    matchStatus.textContent = updates[index];
    index = (index + 1) % updates.length;
  }, 3000);
}

// Image data for each section
const galleryItems = {
  matches: [
    { type: "image", src: "images/Matches/IMG-20250914-WA0001.jpg" },
    { type: "image", src: "images/Matches/IMG-20250914-WA0020.jpg" },
    { type: "image", src: "images/Matches/IMG-20250914-WA0023.jpg" },
    { type: "image", src: "images/Matches/IMG-20250914-WA0025.jpg" },
    { type: "image", src: "images/Matches/IMG-20250914-WA0027.jpg" },
    { type: "video", src: "videos/matches/VID-20250817-WA0027.mp4" },
    { type: "video", src: "videos/matches/VID-20250817-WA0033.mp4" },
    { type: "video", src: "videos/matches/VID-20250817-WA0034.mp4" },
    { type: "video", src: "videos/matches/VID-20250817-WA0035.mp4" },
    { type: "video", src: "videos/matches/VID-20250817-WA0037.mp4" },
    { type: "video", src: "videos/matches/VID-20250817-WA0038.mp4" },
  ],
  training: [
    { type: "image", src: "images/training/IMG-20241231-WA0010.jpg"},
    { type: "image", src: "images/training/IMG-20241231-WA0016.jpg"},
    { type: "image", src: "images/training/IMG-20250423-WA0015.jpg"},
    { type: "image", src: "images/training/IMG-20250423-WA0018.jpg"},
    { type: "image", src: "images/training/IMG-20250428-WA0035.jpg"},
    { type: "image", src: "images/training/IMG-20250428-WA0017.jpg"},
    { type: "image", src: "images/training/IMG-20250626-WA0009.jpg"},
    { type: "video", src: "videos/training/VID-20250707-WA0027.mp4" },
    { type: "video", src: "videos/training/VID-20250709-WA0012.mp4" },
    { type: "video", src: "videos/training/VID-20250709-WA0014.mp4" },
    { type: "video", src: "videos/training/VID-20250709-WA0015_1.mp4" },
    { type: "video", src: "videos/training/VID-20250709-WA0018.mp4" }
  ],
  players: [
    { type: "image", src: "images/players/IMG-20241231-WA0010.jpg" },
    { type: "image", src: "images/players/IMG-20241231-WA0016.jpg" },
    { type: "image", src: "images/players/IMG-20250112-WA0002.jpg" },
    { type: "image", src: "images/players/IMG-20250201-WA0048.jpg" },
    { type: "image", src: "images/players/IMG-20250612-WA0054.jpg" },
    { type: "image", src: "images/players/IMG-20250622-WA0016.jpg" },
    { type: "image", src: "images/players/IMG-20250622-WA0019 (1).jpg" },
    { type: "image", src: "images/players/IMG-20250726-WA0010.jpg" },
    { type: "image", src: "images/players/IMG-20250726-WA0012.jpg" },
    { type: "image", src: "images/players/IMG-20250813-WA0024.jpg" },
    { type: "image", src: "images/players/IMG-20250815-WA0062.jpg" },
    { type: "image", src: "images/players/IMG-20250817-WA0019.jpg" },
  ]
};


// Current active section
let currentSection = "matches";

// Function to show a section
function showSection(sectionId) {
  currentSection = sectionId;
  const container = document.getElementById("gallery-container");
  container.innerHTML = ""; // Clear previous items

  // Highlight active button
  const buttons = document.querySelectorAll(".gallery-btn");
  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase() === sectionId) {
      btn.classList.add("active-btn");
    } else {
      btn.classList.remove("active-btn");
    }
  });

  // Load gallery items
  galleryItems[sectionId].forEach(item => {
    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Sky FC Image";
      img.onclick = () => openModal(img);
      container.appendChild(img);
    } else if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.className = "gallery-video";
      video.onclick = () => openModal(video);
      container.appendChild(video);
    }
  });
}



// Initialize gallery
showSection(currentSection);

function openModal(item) {
  // Pause all gallery videos to prevent echo
   document.querySelectorAll(".gallery-video").forEach(v => {
      v.pause();
      v.currentTime = 0;
});

  const modal = document.getElementById("mediaModal");
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = ""; // Clear previous content

  if (item.tagName === "IMG") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = "Sky FC Media";
    img.style.width = "100%";
    modalContent.appendChild(img);
  } else if (item.tagName === "VIDEO") {
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = false;
    video.muted = true;
    video.playsInline = true;

    video.autoplay = true;
    video.style.width = "100%";
    modalContent.appendChild(video);
  }

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("mediaModal");
  const modalContent = document.getElementById("modalContent");
  
  // Pause video if any
  const video = modalContent.querySelector("video");
  if (video) video.pause();

  modal.style.display = "none";
  modalContent.innerHTML = ""; // Clear content
}

// Fade-in Animation
  const faders = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  faders.forEach(fade => observer.observe(fade));




// Scroll Animation
const revealElements = document.querySelectorAll(".about, .highlights, .player-card, .gallery img");

function revealOnScroll() {
  revealElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (position < windowHeight - 100) {
      el.classList.add("reveal");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Contact Form
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    formMessage.style.color = "green";
    formMessage.textContent = "✅ Message sent successfully! Sky FC will contact you soon.";

    form.reset();
  });
}