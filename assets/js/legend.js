var intervalo;

var resizeLegend = function(){
	var figure = document.querySelector(".image");
  if(!!figure && figure.length > 0){
    var widthPattern = figure.children[0].clientWidth;

    if(widthPattern !== 0 && !!figure.children[1]){
      figure.children[1].style.width = widthPattern + "px";
      clearInterval(intervalo);
    }
  }
};

intervalo = setInterval(resizeLegend, 1);

window.addEventListener('resize', resizeLegend, false);
window.addEventListener('load', function(){
	clearInterval(intervalo);
}, false);
