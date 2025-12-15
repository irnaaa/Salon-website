// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
     const response = await fetch("http://127.0.0.1:4000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      alert(data.message);
      e.target.reset();
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
});

const services = {
  "Păr": [
    { name: "Ludmila Hacina", 
      photo: "images/Ludmila.jpg", 
      services: [
      { name: "Vopsire standard", price: "1000 - 3500 MDL" },
        { name: "Vopsire Balayage", price: "4000 - 6500 MDL" },
        { name: "Decolorare rădăcină", price: "1700 - 3000 MDL" },
        { name: "Tonare", price: "1000 - 3000 MDL" },
        { name: "Tonare din blond în natural", price: "1500 - 3000 MDL" },
        { name: "Frezură", price: "400 - 800 MDL" },
        { name: "Aranjare", price: "600 - 1500 MDL" },
        { name: "Tranatament Keune", price: "700 - 1400 MDL" }
    ]
  },
    { name: "Maria Pop", photo: "images/maria.jpg", services: ["Îngrijire păr", "Coafuri"] }
  ],
  "laminare": [
    { name: "Ioana Ionescu", photo: "images/ioana.jpg", services: ["Laminare gene", "Vopsire gene"] }
  ],
  "micropigmentare": [
    { name: "Elena Georgescu", photo: "images/elena.jpg", services: ["Sprâncene", "Buze", "Eyeliner"] }
  ],
  "henna": [
    { name: "Andreea Vasile", photo: "images/andreea.jpg", services: ["Henna sprâncene"] }
  ]
};


const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalList = document.getElementById('modal-list');
const workerDetails = document.getElementById('worker-details');
const workerPhoto = document.getElementById('worker-photo');
const workerName = document.getElementById('worker-name');
const workerServices = document.getElementById('worker-services');

function openModal(service) {
  modal.style.display = 'block';
  workerDetails.style.display = 'none';
  modalList.style.display = 'block';
  modalTitle.textContent = `Specialiștii pentru ${service}`;

  modalList.innerHTML = '';
  services[service].forEach(worker => {
    const li = document.createElement('li');
   li.innerHTML = `
  <span class="worker-name">${worker.name}</span>
  <button class="details-btn" onclick='showWorkerDetails(${JSON.stringify(worker)})'>
    Detalii
  </button>
`;

    modalList.appendChild(li);
  });
}

function showWorkerDetails(worker) {
  modalList.style.display = 'none';
  workerDetails.style.display = 'block';

  workerPhoto.src = worker.photo;
  workerPhoto.alt = worker.name;
  workerName.textContent = worker.name;   // ✅ show worker name

  workerServices.innerHTML = '';
  worker.services.forEach(s => {
  const serviceLi = document.createElement('li');
  serviceLi.textContent = `${s.name} - ${s.price}`;
  workerServices.appendChild(serviceLi);
});
}

function hideWorkerDetails() {
  workerDetails.style.display = 'none';
  modalList.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// Close modal if clicking outside
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}
