async function listaPerfis() {
  const gitHub = "https://api.github.com/users";
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
            <button class="btn third">
              Detalhes
            </button>
           </div>
         </td>
      </tr>`;
  });
  listTemplate += `</table>`;
  container.innerHTML = listTemplate;
}
