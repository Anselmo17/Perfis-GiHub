// formate date
function formatDate(date) {
  let dateformated = new Date(date);
  dateformated = dateformated.toLocaleDateString();
  return dateformated;
}
