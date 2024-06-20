var listaUsuarios = []; //Comando que cria uma variável patientList e a inicializa como um array vazio. Essa variável é usada para armazenar a lista de pacientes cadastrados.
var count = 1;

function addUsuario(name, idade, cpf, intencao, email, senha) {
  var newUser = {
    id: count++,
    name: name,
    idade: idade,
    cpf: cpf,
    intencao: intencao,
    email: email,
    senha: senha,
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
      '</span> (Email: ' +
      usuario.email +
      ') <button class="delete-button" onclick="deleteUsuario(' +
      usuario.id +
      ')">Excluir</button>';
    usuarioListElement.appendChild(listItem);
  });

  if (usuariosARenderizar.length === 0 && usuarioNome) {
    usuarioListElement.innerHTML = '<li>Usuario não encontrado.</li>';
  }
}

// Event listener para o formulário de cadastro de pacientes
document
  .getElementById('usuarioForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    var nameInput = document.getElementById('nameInput');
    var idadeInput = document.getElementById('idadeInput');
    var cpfInput = document.getElementById('cpfInput');
    var intencaoInput = document.getElementById('intencaoInput');
    var emailInput = document.getElementById('emailInput');
    var senhaInput = document.getElementById('senhaInput');
    addUsuario(
      nameInput.value,
      idadeInput.value,
      cpfInput.value,
      intencaoInput.value,
      emailInput.value,
      senhaInput.value,
    );
    nameInput.value = '';
    idadeInput.value = '';
    cpfInput.value = '';
    intencaoInput.value = '';
    emailInput.value = '';
    senhaInput.value = '';
  });
document
  .getElementById('usuarioFormBusca')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    var nameInputBusca = document.getElementById('nameInputBusca');
    getUsuarioEsp(nameInputBusca.value);
    nameInputBusca.value = '';
  });

document
  .getElementById('btndeleteAll')
  .addEventListener('click', function (event) {
    event.preventDefault();
    deleteAll();
  });
