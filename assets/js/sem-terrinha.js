// O que este código faz?
// Ele verifica quando determinados elementos 
// com a classe latera-img estao visiveis na tela
// se estiver visivel ele adiciona a classe efeito
// se nao estiver visivel, remove a classe efeito.

function isElementInViewport(el) {
    const { top, bottom } = el.getBoundingClientRect();
    const vHeight = (window.innerHeight || document.documentElement.clientHeight);
  
    return (
      (top > 0 || bottom > 0) &&
      top < vHeight
    );
  }
    
  function handler(){
    // obtém todos os elementos que possuem a classe
    // lateral-img 
    const elements = document.querySelectorAll('.lateral-img')  
    elements.forEach((el) => {
      const isVisible = isElementInViewport(el)
      // isElementInViewport é uma funcao que recebe como parametro um elemento
      // retorna true se o elemento estiver visivel para o usuario
      // ou retorna false se o elemento nao estiver visivel
      // VERIFICA SE UM ELEMENTO ESTÁ VISIVEL*. 
      if (isVisible) {
        el.classList.add('efeito')  
      } else {
        el.classList.remove('efeito') 
      }
    })
  }
  
  if (window.addEventListener) {
    addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);
  } else if (window.attachEvent) {
    attachEvent('onDOMContentLoaded', handler); // IE9+ :(
    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
  }