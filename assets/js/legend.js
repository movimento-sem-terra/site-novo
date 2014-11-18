var resizeLegend = function(){
	var widthPattern = document.getElementsByClassName("image")[0].children[0].clientWidth;
	document.getElementsByClassName("image")[0].children[1].style.width = widthPattern + "px";
};

window.onload = resizeLegend;
window.onresize = resizeLegend;