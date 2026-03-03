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
      {
          name: "Elena Radu",
          photo: "images/hair_1.jpg",
          services: [
              { name: "Tuns", price: "300 - 700 MDL" },
              { name: "Spălat și uscat", price: "200 - 500 MDL" },
              { name: "Vopsire Ombre", price: "3500 - 6000 MDL" },
              { name: "Tratament Nutritiv", price: "800 - 1500 MDL" }
          ]
      },
      {
          name: "Andrei Ciobanu",
          photo: "images/hair_2.jpg",
          services: [
              { name: "Tuns bărbați", price: "200 - 400 MDL" },
              { name: "Tuns și contur", price: "300 - 500 MDL" },
              { name: "Vopsire păr scurt", price: "1000 - 2000 MDL" }
          ]
      }
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
        li.className = "worker-item";

        li.innerHTML = `
      <span class="worker-name">${worker.name}</span>
      <button class="details-btn">Detalii</button>
    `;

        // Add event listener properly
        li.querySelector('.details-btn').addEventListener('click', () => {
            showWorkerDetails(worker);
            modalList.style.display = 'none';
            workerDetails.style.display = 'block';
            workerPhoto.src = worker.photo;
            workerName.textContent = worker.name;
        });

        modalList.appendChild(li);
    });
}

function showWorkerDetails(worker) {
    const servicesList = document.getElementById("worker-services");
    servicesList.innerHTML = ""; // clear previous

    worker.services.forEach(service => {
        const div = document.createElement("div");
        div.className = "service-item";

        // If service has name & price
        if (typeof service === "object") {
            div.innerHTML = `
        <span class="service-name">${service.name}</span>
        <span class="service-price">${service.price}</span>
      `;
        } else {
            // fallback for plain text services
            div.innerHTML = `<span class="service-name">${service}</span>`;
        }

        servicesList.appendChild(div);
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


