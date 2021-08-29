const gitHub = "https://api.github.com/users";

async function listaPerfis(page = 1, per_page = 5) {
  const queryPaginada = `?page=${page}&per_page=${per_page}`;
  const result = await fetch(gitHub + queryPaginada);
  const response = await result.json();
  return response;
}

async function consultaData(userFiltered) {
  let list = [];
  userFiltered ? list.push(userFiltered) : (list = await listaPerfis());
  let listTemplate = `
  <table border="1px" cellpadding="5px" cellspacing="0" id="alter">
      <tr>
         <th scope="col">Nome</th>
        <th scope="col">Foto</th>
        <th scope="col">Informações do Perfil</th>
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
  const resultUser = `${gitHub}/${idLogin}`;
  const result = await fetch(resultUser);
  const user = await result.json();
  let userModal = "";
  if (!user) {
      userModal += `
        <div>
          <div class="alignClose">
            <a href="/" title="Close" class="close">X</a>
          </div>
          <h5>Nenhum usuario encontrado</h5>
        </div>
        `;
      chamaModal(userModal);
    return;
  }
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
  chamaModal(userModal);
}

async function pesquisa() {
  const userFiltered = document
    .getElementById("search-user")
    .value.toLowerCase();
  if (userFiltered) {
    try {
      const resultFilter = `${gitHub}/${userFiltered.replaceAll(" ", "")}`;
      const userFilter = await fetch(resultFilter);
      const resFilter = await userFilter.json();
      if (resFilter.message === "Not Found") {
        throw new Error("Usuario nao encontrado");
        return;
      }
      consultaData(resFilter);
      return;
    } catch (error) {
      let userModal = "";
      userModal += `
        <div>
          <div class="alignClose">
            <a href="/" title="Close" class="close">X</a>
          </div>
          <h5>Nenhum usuario encontrado</h5>
        </div>
        `;
      chamaModal(userModal);
      consultaData();
      limparPesquisa();
    }
  }
  consultaData();
}

function limparPesquisa() {
  document.getElementById("search-user").value = "";
}
