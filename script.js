var listaUsuarios = [];
var count = 1;

//função para adicionar usuario
function addUsuario(name, email, data) {
  var newUser = {
    id: count++,
    name: name,
    email: email,
    data: data,
  };
  listaUsuarios.push(newUser);
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
  renderUsuariolista();
}

// função para excluir um usuario
function deleteUsuario(usuarioId) {
  var updatedUsuariolista = listaUsuarios.filter(function (usuario) {
    return usuario.id !== usuarioId;
  });

  if (updatedUsuariolista.length < listaUsuarios.length) {
    listaUsuarios = updatedUsuariolista;
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    renderUsuariolista();
  } else {
    alert('Usuario não encontrado.');
  }
}
// função para deletar todos os usuarios
function deleteAll() {
  listaUsuarios = [];
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
  renderUsuariolista();
}

// função para recuperar a lista de usuarios do localStorage
function getUsuariolista() {
  var storedList = JSON.parse(localStorage.getItem('listaUsuarios'));
  listaUsuarios = storedList || [];
}

// função para encontrar um usuario especifico
function getUsuarioEsp(usuarioName) {
  renderUsuariolista(usuarioName);
}

// função para renderizar a lista de usuarios no HTML
function renderUsuariolista(usuarioNome) {
  var usuarioListElement = document.getElementById('listaUsuarios');
  usuarioListElement.innerHTML = '';

  var usuariosARenderizar = listaUsuarios;

  if (usuarioNome) {
    usuariosARenderizar = listaUsuarios.filter(function (usuario) {
      return usuario.name.toLowerCase() === usuarioNome.toLowerCase();
    });
  }

  usuariosARenderizar.forEach(function (usuario) {
    var listItem = document.createElement('li');
    listItem.innerHTML =
      '<span class="usuario-name">' +
      usuario.name +
      '</span> -> E-mail: ' +
      usuario.email +
      '<span> -> Cadastrado no dia: ' +
      usuario.data +
      ' <input type="submit" value="Excluir" class="delete-button" onclick="deleteUsuario(' +
      usuario.id +
      ')">';
    usuarioListElement.appendChild(listItem);
  });

  if (usuariosARenderizar.length === 0 && usuarioNome) {
    usuarioListElement.innerHTML = '<li>Usuario não encontrado.</li>';
  }
}

// função getData
function getData() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

//render na hora de abrir a tela
renderUsuariolista();

// Event listener para o cadastro, busca, limpar os campos e deletar todos os usuarios
document
  .getElementById('usuarioForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    var nameInput = document.getElementById('nameInput');
    var emailInput = document.getElementById('emailInput');
    var data = getData();
    addUsuario(nameInput.value, emailInput.value, data);
    nameInput.value = '';
    emailInput.value = '';
  });
document
  .getElementById('usuarioFormBusca')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    var nameInputBusca = document.getElementById('nameInputBusca');
    getUsuarioEsp(nameInputBusca.value);
    nameInputBusca.value = '';
  });

document.getElementById('limpar').addEventListener('click', function (event) {
  event.preventDefault();
  nameInput.value = '';
  emailInput.value = '';
});

document
  .getElementById('btndeleteAll')
  .addEventListener('click', function (event) {
    event.preventDefault();
    deleteAll();
  });
