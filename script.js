var listaUsuarios = []; //Comando que cria uma variável patientList e a inicializa como um array vazio. Essa variável é usada para armazenar a lista de pacientes cadastrados.
var count = 1;

function addUsuario(name, email, data) {
  var newUser = {
    id: count++,
    name: name,
    email: email,
    data: data,
  }; //cria um novo objetivo de paciente (newUsuario), com as propriedades id, name e email
  listaUsuarios.push(newUser); //comando que adiciona o novo paciente ao final da lista de pacientes
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios)); //o JSON.stringfy converte o objeto JavaScript em uma string JSON
  renderUsuariolista();
}

// Função para excluir um paciente
function deleteUsuario(usuarioId) {
  var updatedUsuariolista = listaUsuarios.filter(function (usuario) {
    return usuario.id !== usuarioId; //retorna todos os elementos que não sejam no ID selecionado
  });

  if (updatedUsuariolista.length < listaUsuarios.length) {
    //verifica se a lista atualizada é diferente da lista original
    listaUsuarios = updatedUsuariolista;
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    renderUsuariolista();
  } else {
    alert('Usuario não encontrado.');
  }
}
function deleteAll() {
  listaUsuarios = [];
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
  renderUsuariolista();
}

// Função para recuperar a lista de pacientes do localStorage
function getUsuariolista() {
  var storedList = JSON.parse(localStorage.getItem('listaUsuarios')); //converte a string JSON para objeto JavaScript
  listaUsuarios = storedList || []; //se storedList for um valor válido (não seja nulo ou indefinido). é atribuido a listaUsuarios. Caso contrário, listaUsuarios recebe um array vazio
}

// Função para encontrar um usuario espcfico
function getUsuarioEsp(usuarioName) {
  renderUsuariolista(usuarioName);
}

// Função para renderizar a lista de pacientes no HTML
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
      '</span> Email: ' +
      usuario.email +
      '<span> Cadastrado no dia: ' +
      usuario.data +
      ' <button class="delete-button" onclick="deleteUsuario(' +
      usuario.id +
      ')">Excluir</button>';
    usuarioListElement.appendChild(listItem);
  });

  if (usuariosARenderizar.length === 0 && usuarioNome) {
    usuarioListElement.innerHTML = '<li>Usuario não encontrado.</li>';
  }
}

function getData() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate(); // Dia do mês (1-31)
  const mes = dataAtual.getMonth() + 1; // Mês (0-11, janeiro é 0) + 1 para converter para o formato de 1 a 12
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`; // Retornar a data formatada corretamente
}

renderUsuariolista();

// Event listener para o formulário de cadastro de pacientes
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
