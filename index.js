  const gitHub = "https://api.github.com/users";

async function listaPerfis() {
  const result = await fetch(gitHub);
  const response = await result.json();
  return response;
}

async function consultaData() {
  const list = await listaPerfis();

  let listTemplate = `
  <table border="1px" cellpadding="5px" cellspacing="0" id="alter">
      <tr>
         <th scope="col">Nome</th>
        <th scope="col">Foto do Perfil</th>
        <th scope="col">Detalhes do Perfil</th>
      </tr>
  `;

  const container = document.getElementById("container");
  list.forEach((item) => {
    listTemplate += `
      <tr>
        <td class="login">
          ${item.login}
        </td>
        <td>
          <img 
              src="${item.avatar_url}" 
              alt="${item.login}"
             width="100" height="100"
              >
        </td>
         <td>
           <div class="align-btn">
            <button class="btn third" 
              onclick="findById('${item.login}')">
              Detalhes
            </button>
           </div>
         </td>
      </tr>`;
  });
  listTemplate += `</table>`;
  container.innerHTML = listTemplate;
}

async function findById(idLogin) {
  const apiUserId = `${gitHub}/${idLogin}`;
  const result = await fetch(apiUserId);
  const user = await result.json();
  if (!user) {
    alert("Nenhum usuario encontrado");
    return;
  }

  const openModal = document.getElementById("openModal");

  let userModal = "";
  userModal += `
   <div>
    <div class="alignClose">
      <a href="/" title="Close" class="close">X</a>
    </div>
		<h2>${user.login}</h2>
		<p>Nome: ${user.name ? user.name : "-"}</p>
		<p>Companhia: ${user.company ? user.company : "-"}</p>
    <p>Localização: ${user.location ? user.location : "-"}</p>
    <p>Ultima atualização: ${
      user.updated_at ? formatDate(user.updated_at) : "-"
    }</p>
	</div>
   `;

  // carrega template modal
  openModal.innerHTML = userModal;

  // abrir modal
  openModal.style.display = "block";
  let urlBase = window.location.href.replace("#openModal", "");
  window.location.href = urlBase + "#openModal";
}

function formatDate(date) {
  let dateformated = new Date(date);
  dateformated = dateformated.toLocaleDateString();
  return dateformated;
}
