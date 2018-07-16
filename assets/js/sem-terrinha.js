function isElementInViewport(el) {
  const { top, bottom } = el.getBoundingClientRect();
  const vHeight = (window.innerHeight || document.documentElement.clientHeight);

  return (
    (top > 0 || bottom > 0) &&
    top < vHeight
  );
}

function handler(){
  const elements = document.querySelectorAll('.lateral-img')
  elements.forEach((el) => {
    const isVisible = isElementInViewport(el)

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
