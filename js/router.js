let pageUrls = {
  about: "/index.html?about",
  contact: "/index.html?contact",
  gallery: "/index.html?gallery",
};

function OnStartUp() {
  popStateHandler();
}

OnStartUp();

document.querySelector("#about-link").addEventListener("click", (event) => {
  let stateObj = { page: "about" };
  document.title = "About";
  history.pushState(stateObj, "about", "?about");
  RenderAboutPage();
});

document.querySelector("#contact-link").addEventListener("click", (event) => {
  let stateObj = { page: "contact" };
  document.title = "Contact";
  history.pushState(stateObj, "contact", "?contact");
  RenderContactPage();
});

document.querySelector("#gallery-link").addEventListener("click", () => {
  history.pushState({ page: "gallery" }, "gallery", "?gallery");
  RenderGalleryPage();
});

function RenderAboutPage() {
  document.querySelector("main").innerHTML = ` 
        <h1 class="title">About Me</h1> 
        <p>Lorem Ipsum...</p>`;
}

function RenderContactPage() {
  document.querySelector("main").innerHTML = `
      <h1 class="title">Contact with me</h1>
      <form id="contact-form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>

          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>

          <!-- CAPTCHA container -->
          <div class="g-recaptcha" data-sitekey="6LdllykrAAAAAJf8BdJE5d4oftnoxqHvwUa0rtDe"></div>

          <button type="submit">Send</button>
      </form>
  `;

  // Re-inicjalizacja reCAPTCHA, jeśli już załadowana
  if (typeof grecaptcha !== "undefined") {
    grecaptcha.render(document.querySelector(".g-recaptcha"), {
      sitekey: "6LdllykrAAAAAJf8BdJE5d4oftnoxqHvwUa0rtDe",
    });
  }

  document
    .getElementById("contact-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const captcha = grecaptcha.getResponse();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      if (!captcha) {
        alert("Please verify you're not a robot.");
        return;
      }

      alert("Form submitted!");
    });
}

function popStateHandler() {
  let loc = window.location.href.toString().split(window.location.host)[1];

  if (loc === pageUrls.contact) {
    RenderContactPage();
  }
  if (loc === pageUrls.about) {
    RenderAboutPage();
  }
  if (loc === pageUrls.gallery) {
    RenderGalleryPage();
  }
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

function RenderGalleryPage() {
  document.querySelector("main").innerHTML = `
        <h1 class="title">Gallery</h1>
        <div id="gallery" class="gallery-grid"></div>
        <div id="modal" class="modal hidden">
            <span id="closeModal" class="close-button">×</span>
            <img id="modalImage" src="" alt="Full Image">
        </div>
    `;

  const gallery = document.getElementById("gallery");
  const imageCount = 9;
  for (let i = 1; i <= imageCount; i++) {
    const img = new Image();
    img.src = `images/img${i}.jpg`;
    img.alt = `Gallery Image ${i}`;
    img.loading = "lazy";
    img.className = "thumbnail";
    img.onclick = () => openModal(img.src);
    gallery.appendChild(img);
  }

  document.getElementById("closeModal").onclick = closeModal;
  document.getElementById("modal").onclick = (e) => {
    if (e.target.id === "modal") closeModal();
  };
}

function openModal(src) {
  const modal = document.getElementById("modal");
  document.getElementById("modalImage").src = src;
  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

window.onpopstate = popStateHandler;
