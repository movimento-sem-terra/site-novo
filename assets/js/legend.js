var intervalo;
var resizeLegend = function(){
	var figure = document.querySelector(".image");
	var widthPattern = figure.children[0].clientWidth;
	
	if(widthPattern !== 0){
		figure.children[1].style.width = widthPattern + "px";
		clearInterval(intervalo);
	}
};

intervalo = setInterval(resizeLegend, 1);
window.onresize = resizeLegend;