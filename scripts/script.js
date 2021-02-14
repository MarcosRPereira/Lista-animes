// variaveis globais
var dadoLocal =[];
dadoLocal = localStorage.getItem('DATABASE');
//var dadoLocal = 

var isEditing = false;
// ternario - se dadoLocal tiver conteudo, vai retornar o parse do conteudo. Se não, retorna o objeto vazio.
var data = dadoLocal ?
  JSON.parse(dadoLocal):
  {
    id:0,
    list:[]
  }

var localAnime = document.getElementById("anime");
var localEpisodio = document.getElementById("episodio");
var localStatus = document.getElementById("status");

// assim que termina de carregar a página, chama a função render.
window.addEventListener('load',render())

// Renderiza a lista de registro
function render(){
  //pegando o local onde ficará a lista
  const tbody = document.getElementById('tbody');
  // limpa o tbody
  tbody.innerHTML = '';
  //pecorre os elemento em data e cria uma nova lista
  data.list.map(function(item){
    const tr = document.createElement('tr');
    tr.classList.add("linha")
    tr.innerHTML = `
      <td class="hiden">${item.id}</td>
      <td class="color-anime ">${item.anime}</td>
      <td class="color-episodio ">${item.episodio}</td>
      <td class="color-status ">${item.status}</td>
      <td>
        <button class="edit " onclick= 'edit(${item.id},"${item.anime}")'>Edit</button>
        <button class="del " onclick="deleteReg(${item.id})">Delete</button>
      </td>
    `
    // insere a nova tr e seus elemento no tbody
    tbody.appendChild(tr);
  })
}

// adiciona o registro
function add(){
  let botao = document.querySelector(".button")
  
  data.id++; // incrementa o número do id
  
  if(isEditing){
    edit()
  } else{

 //adiciona os elementos do input no array.
  data.list.push({
    id:data.id,
    anime:localAnime.value,
    episodio:localEpisodio.value,
    status:localStatus.value,
   });
   isEditing = false;
  }

  // limpa os valores do input e da foco no input anime.
  localAnime.value = "";
  localEpisodio.value = "";
  localStatus.value = "";
  localAnime.focus();


  render();
  save();
  
 
  
}

function update (novo){
  data.list[currentId] = novo;

}
// edita o registro
function edit(id, anime, episodio, status){
  data.list = data.list.map(function(item){
    if(item.id === id){
      
      
     // pega o nome do anime e coloca no input
      localAnime.value = item.anime;

     // pega o episodio e coloca no input
      localEpisodio.value = item.episodio;

      // pega o status e coloca no input
      localStatus.value = item.status

      localAnime.focus();
      
     //isEditing = true;
      currentId =id;
     //update(item.push);
     console.log(item)
     console.log(typeof(item))
     
    }
      return item;
  })
    
  render();
  save();
  
}
// deleta o registro

function deleteReg(id){
  if(!confirm('Deseja deletar o anime? ')) return;

  //se o registro for diferente do id do item selecionado, ele se mantem na lista.
   data.list=data.list.filter(function(item){
   
    return item.id !== id

  })
  
  render();
  save();
}

//salva os dados no localStorage
function save(){
  localStorage.setItem(dadoLocal, JSON.stringify (data))

}

