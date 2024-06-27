// Função para deslizamento suave ao clicar nos links do menu
document.querySelectorAll(".nav-links").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    // Faz o deslizamento suave
    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  });
});
// Textos que serão animados
const texts = {
  h1: "Olá, eu sou o",
  span: "Fellipe França :)",
  p: "Desenvolvedor Front-End",
};

// Elementos onde o texto será exibido
const typedElements = {
  h1: document.getElementById("typed-h1"),
  span: document.getElementById("typed-span"),
  p: document.getElementById("typed-p"),
};

// Elemento para o cursor piscante
const cursorElement = document.getElementById("cursor");

let isCursorVisible = true;

// Função para simular a animação de digitação com cursor que acompanha o texto
function typeWriter(text, element, cursor, delay = 100) {
  let charIndex = 0;

  // Inicia um intervalo que adiciona caracteres ao elemento
  const interval = setInterval(() => {
    element.textContent += text.charAt(charIndex);
    charIndex++;

    // Quando o texto completo for exibido, limpa o intervalo
    if (charIndex === text.length) {
      clearInterval(interval);
    }
  }, delay);
}

// Troque o valor 500 por outro valor para ajustar a frequência do piscar

// Inicia a animação quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  typeWriter(texts.h1, typedElements.h1, cursorElement);
  setTimeout(() => {
    typeWriter(texts.span, typedElements.span, cursorElement);
  }, 1500); // Ajuste o atraso conforme necessário
  setTimeout(() => {
    typeWriter(texts.p, typedElements.p, cursorElement);
  }, 3000); // Ajuste o atraso conforme necessário
});

// Buscar repositorio do github

const username = "fellipe-franca"; // Substitua pelo seu nome de usuário
const url = `https://api.github.com/users/${username}/repos`;

const repoImages = {
  "BinarySearchTree-BST": "./src/imgs/repositorios/binary_search_tree.png",
  LinkedList: "./src/imgs/repositorios/linked_list.png",
  "Lista-de-Supermercado": "./src/imgs/repositorios/ListaSuperMercado.png",
  portfolioTest: "./src/imgs/repositorios/portfolio.png",
};

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const reposList = document.getElementById("repo-list");

    data.forEach((repo) => {
        const card = document.createElement('div');
        card.classList.add('box-card');
        
        const cover = document.createElement('div');
        cover.classList.add('cover');
        
        const img = document.createElement('img');
        img.src = repoImages[repo.name] || './src/imgs/default.jpg';
        img.alt = repo.name;
        cover.appendChild(img); // Adicionar a imagem primeiro
        
        const details = document.createElement('div');
        details.classList.add('details');
        
        const p = document.createElement('p');
        p.textContent = repo.description || 'Descrição não disponível';
        details.appendChild(p);
        
        const link = document.createElement('a');
        link.href = repo.html_url;
        link.target = '_blank';
        link.classList.add('repo-link');
        link.textContent = 'Acessar repositório';
        details.appendChild(link); // Adicionar o link depois do parágrafo
        
        cover.appendChild(details); // Adicionar os detalhes dentro do cover
        
        card.appendChild(cover);
        reposList.appendChild(card);
    });
  })
  .catch((error) => console.error("Erro ao obter repositórios", error));
