// formate date
function formatDate(date) {
  let dateformated = new Date(date);
  dateformated = dateformated.toLocaleDateString();
  return dateformated;
}


// apresenta modal
function chamaModal(template){
  const openModal = document.getElementById("openModal");

// carrega template modal
  openModal.innerHTML = template;

  // abrir modal
  openModal.style.display = "block";
  let urlBase = window.location.href.replace("#openModal", "");
  window.location.href = urlBase + "#openModal";
}