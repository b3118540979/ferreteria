// plugin hecho por ADFO-slideshow
(function($){
	//Inicio del plugin
	$.fn.slideshowadfo=function(options){
//Opciones de plugin
//defecto
var optiondefaults={
tipo:"clasico",//clasico, informativo
tema:"silver",//silver,oro, rubi, esmeralda, zafiroazul, magenta, cian, chocolate, citrino, naranja, violeta, personalizado
tiemposlide:7000,//milisegundos  1s=1000ms
tiempotransicion:500,//milisegundos 1s=1000ms
animacionslide:"entrada",//entrada, achiquealargue, basica, aleatori
transicionslide:"ease",  //ease, ease-in, linear, ease-out, ease-in-out
imagendeinicio:0, //define con que imagen inicia el slideshow, inicio desde cero hasta la ultima que seri n-1
alturaimagen:350, anchoimagen:1040 //define el ancho y la altura de la imagen originales
};
//opciones por defecto, opciones cliente
var opciones=$.extend(optiondefaults,options);
//Eventos de plugin
return this.each(function(){
		/*************Varibles***********/
	//definiendo tipo de slideshow
	var tiposlide=opciones.tipo;
	var temaslide=opciones.tema;
	var animacionslide=opciones.animacionslide;
	var transicionslide=opciones.transicionslide;
	var numslidemaximo;
	var intervalslideshowadfo;
	var i=opciones.imagendeinicio; 
		var j;
	//tiempos
	var tiemposegundos=opciones.tiemposlide;
	var tiempotransicion=opciones.tiempotransicion;
	var ts=tiempotransicion/1000;
	var tiempo=tiemposegundos+tiempotransicion;
	var idslide=$(this).attr("id");
	$("#"+idslide).css("display","none");
$(window).load(function(){
	$("#"+idslide).css("display","inherit");
	//añadiendo los controles y el contenedor
	$("#"+idslide).append("<div class='contenedorslideshowadfo contenedorslide'"+tiposlide+"></div><div class='playpauseslideshowadfo' data-id='pause'><span class='iconogaleria-adfo iconogaleria-adfo-pause'></span></div><div class='flechaslideshowadfoizquierda'><span class='sizeiconosflechas iconogaleria-adfo iconogaleria-adfo-flecha-izquierda-2'></span></div><div class='flechaslideshowadfoderecha'><span class='sizeiconosflechas iconogaleria-adfo iconogaleria-adfo-flecha-derecha-2'></span></div><div class='navegadorslideshowadfooutlet'><ul></ul></div>");
	//CLASES CSS DE SLIDESHOW
	//Clase del Slideshow
$("#"+idslide).addClass("slideshowadfo");
//Tema de colores
$("#"+idslide).addClass(temaslide);
//Introduciendo los slides en el contenedor
$("#"+idslide).children("ul").appendTo($("#"+idslide).children(".contenedorslide"));
//cantidad de slides insertados
numslidemaximo=$("#"+idslide).children(".contenedorslide").children("ul").children("li").length-1;
//Ingresar titulos y captions
var titulo, caption, is;
for(is=0;is<=numslidemaximo;is++){
	if($("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).children("img").attr("title")!=undefined){
	titulo=$("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).children("img").attr("title");
	}else{
		titulo="";
	}
	if($("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).children("img").attr("alt")!=undefined && $("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).children("img").attr("alt")!=""){
	caption=$("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).children("img").attr("alt");
	}else{	
	caption="";	
	}
	
	if(titulo!=""){
	$("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).prepend("<span class='tituloslideadfo'>"+titulo+"</span>");
	}else{
		$("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).prepend("");
	}
	$("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).children("img").removeAttr("title");
		$("#"+idslide).children(".contenedorslide").children("ul").children("li").eq(is).append("<span class='captionslideadfo'>"+caption+"</span>");
}
//Tamaños y posiciones
if(tiposlide=="clasico")
{
	//clase tipo slideshow
if($("#"+idslide).width()<=800){
	$("#"+idslide).removeClass("slideshowadfo"+tiposlide);
$("#"+idslide).addClass("slideshowadfo"+tiposlide+"movil");
}else{
	$("#"+idslide).removeClass("slideshowadfo"+tiposlide+"movil");
$("#"+idslide).addClass("slideshowadfo"+tiposlide);	
}
alturaslideshowuno(idslide,temaslide);
}else{
	$("#"+idslide).addClass("slideshowadfo"+tiposlide);
	alturaslideshowdos(idslide,temaslide);
}
centraroutlet(idslide);

//animacion numero 1
	$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
		$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css("z-index","27");
		$("#"+idslide+" .navegadorslideshowadfooutlet ul li").removeClass("activeslide");
		$("#"+idslide+" .navegadorslideshowadfooutlet ul li").eq(i).addClass("activeslide");
		
		//animacion
		intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
	//controles
	//clic en play y pause
	$("#"+idslide+" .playpauseslideshowadfo").on("click",function() {
        if($(this).attr("data-id")=="pause"){
			
			$(this).attr("data-id","play");
			$(this).html("<span class='iconogaleria-adfo iconogaleria-adfo-play'></span>");
			clearInterval(intervalslideshowadfo);
		}else{
				$(this).attr("data-id","pause");
			$(this).html("<span class='iconogaleria-adfo iconogaleria-adfo-pause'></span>");
			$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
		$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css("z-index","27");
		$("#"+idslide+" .navegadorslideshowadfooutlet ul li").removeClass("activeslide");
		$("#"+idslide+" .navegadorslideshowadfooutlet ul li").eq(i).addClass("activeslide");
		
	intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
		
		}
    });
	//swipe-Movimiento del mouse o el dedo hacia la derecha
	$("#"+idslide+"").on("swiperight",function() {
if($("#"+idslide+" .playpauseslideshowadfo").attr("data-id")=="play"){
			$("#"+idslide+" .playpauseslideshowadfo").attr("data-id","pause");
			$("#"+idslide+" .playpauseslideshowadfo").html("<span class='iconogaleria-adfo iconogaleria-adfo-pause'></span>");
		}
		$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
       j=i;
		i=i+1;
		if(i>numslidemaximo)
		{
			i=0;
			
		}else{
			i=i;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);
		clearInterval(intervalslideshowadfo);
		intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
	});
	//flecha derecha
	$("#"+idslide+" .flechaslideshowadfoderecha").on("click",function() {
		if($("#"+idslide+" .playpauseslideshowadfo").attr("data-id")=="play"){
			$("#"+idslide+" .playpauseslideshowadfo").attr("data-id","pause");
			$("#"+idslide+" .playpauseslideshowadfo").html("<span class='iconogaleria-adfo iconogaleria-adfo-pause'></span>");
		}
		$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
       j=i;
		i=i+1;
		if(i>numslidemaximo)
		{
			i=0;
			
		}else{
			i=i;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);
		clearInterval(intervalslideshowadfo);
		intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
	});
	//swipe-Movimiento del mouse o el dedo hacia la izquierda
	$("#"+idslide).on("swipeleft",function() {
if($("#"+idslide+" .playpauseslideshowadfo").attr("data-id")=="play"){
			$("#"+idslide+" .playpauseslideshowadfo").attr("data-id","pause");
			$("#"+idslide+" .playpauseslideshowadfo").html("<span class='iconogaleria-adfo iconogaleria-adfo-pause'></span>");
		}
		$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
       j=i;
		i=i-1;
		if(i<0)
		{
			i=numslidemaximo;
			
		}else{
			i=i;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);
		clearInterval(intervalslideshowadfo);
		intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
	});
	//flecha izquierda
	$("#"+idslide+" .flechaslideshowadfoizquierda").on("click",function() {
		if($("#"+idslide+" .playpauseslideshowadfo").attr("data-id")=="play"){
			$("#"+idslide+" .playpauseslideshowadfo").attr("data-id","pause");
			$("#"+idslide+" .playpauseslideshowadfo").html("<span class='iconogaleria-adfo iconogaleria-adfo-pause'></span>");
		}
		$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
       j=i;
		i=i-1;
		if(i<0)
		{
			i=numslidemaximo;
			
		}else{
			i=i;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);
		clearInterval(intervalslideshowadfo);
		intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
	});
	//clic en outlet
	$("#"+idslide+" .navegadorslideshowadfooutlet ul li").on("click",function() {
        $("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
       j=i;
		i=$(this).index();
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);
		clearInterval(intervalslideshowadfo);
		intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
    });
});
//Resize Tamaño, Responsive
$(window).resize(function() {
//Tamaños y posiciones
if(tiposlide=="clasico")
{
		//clase tipo slideshow
if($("#"+idslide).width()<=800){
	$("#"+idslide).removeClass("slideshowadfo"+tiposlide);
$("#"+idslide).addClass("slideshowadfo"+tiposlide+"movil");
}else{
	$("#"+idslide).removeClass("slideshowadfo"+tiposlide+"movil");
$("#"+idslide).addClass("slideshowadfo"+tiposlide);	
}
alturaslideshowuno(idslide,temaslide);
}else{
	alturaslideshowdos(idslide,temaslide);
}
centraroutlet(idslide);
//animacion numero 1
	$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
		$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css("z-index","27");
		$("#"+idslide+" .navegadorslideshowadfooutlet ul li").removeClass("activeslide");
		$("#"+idslide+" .navegadorslideshowadfooutlet ul li").eq(i).addClass("activeslide");
//clic en outlet
	$("#"+idslide+" .navegadorslideshowadfooutlet ul li").on("click",function() {
        $("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
       j=i;
		i=$(this).index();
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);
		clearInterval(intervalslideshowadfo);
		intervalslideshowadfo=setInterval(function(){if(i<numslidemaximo)
		{
			i=i+1;
			
		}else{
			i=0;
		}
		j=i-1;
		if(j<0)
		{
			j=numslidemaximo;
		}else{
			j=j;
		}
		animaciones(i,ts,j,idslide,animacionslide,transicionslide);},tiempo);
    });
    });	
});	
	};

})(jQuery);

//funcion para no repetir animacion
function animaciones(i,ts,j,idslide,animacionslide,transicionslide){
	"use strict";
/* animaciones */
		/*Todos*/
					$("#"+idslide+" .contenedorslideshowadfo ul li").css("z-index","25");
					$("#"+idslide+" .contenedorslideshowadfo ul li").css(
"-webkit-animation", "");
$("#"+idslide+" .contenedorslideshowadfo ul li").css(
"-moz-animation", "");
$("#"+idslide+" .contenedorslideshowadfo ul li").css(
"-o-animation", "");
$("#"+idslide+" .contenedorslideshowadfo ul li").css(
"animation", "");
/*por indice j*/
$("#"+idslide+" .contenedorslideshowadfo ul li").eq(j).css("z-index","26");
/*por indice i*/
			$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css("z-index","27");
			$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css("-webkit-animation", "entradaslide"+animacionslide+" "+ts+"s "+transicionslide);
			$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css("-moz-animation", "entradaslide"+animacionslide+" "+ts+"s "+transicionslide);
$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css("-o-animation", "entradaslide"+animacionslide+" "+ts+"s "+transicionslide);
$("#"+idslide+" .contenedorslideshowadfo ul li").eq(i).css(
"animation", "entradaslide"+animacionslide+" "+ts+"s "+transicionslide);

	//navegador outlet
			$("#"+idslide+" .navegadorslideshowadfooutlet ul li").removeClass("activeslide");
		$("#"+idslide+" .navegadorslideshowadfooutlet ul li").eq(i).addClass("activeslide");	
}

//altura slide clasico
function alturaslideshowuno(idslide,temaslide){
	var i;
	$("#"+idslide).removeAttr("style");
	$("#"+idslide+" .contenedorslideshowadfo").removeAttr("style");
	$("#"+idslide+" .contenedorslideshowadfo ul").removeAttr("style");
	$("#"+idslide+" .playpauseslideshowadfo").removeAttr("style");
	var cantidadcaption=$("#"+idslide+" .contenedorslideshowadfo ul li").length-1;
	$("#"+idslide+" .navegadorslideshowadfooutlet ul").html("");
	for (i=0;i<=cantidadcaption;i++) { 
	$("#"+idslide+" .navegadorslideshowadfooutlet ul").append("<li><span class='sizeiconosoutlet iconogaleria-adfo iconogaleria-adfo-toque-dedos-1'></span></li>");
	}
	/*Caption*/
	if($("#"+idslide).width()<=800){
		$("#"+idslide).removeClass(temaslide+"01");
		$("#"+idslide).addClass(temaslide+"02");
		
		$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").removeAttr("style");
	var alturamaxima=$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").eq(0).outerHeight();
	for (i=0;i<=cantidadcaption;i++) { 
  var alturaelemento=$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").eq(i).outerHeight();
   if(alturaelemento>alturamaxima){
	alturamaxima=alturaelemento;  
  }else{
	  alturamaxima=alturamaxima;
  }
	}
$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").css({"height":alturamaxima+"px"});
var bottomplaypause=$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").height()+$("#"+idslide+" .navegadorslideshowadfooutlet").height()+4;
$("#"+idslide+" .playpauseslideshowadfo").removeAttr("style");
$("#"+idslide+" .playpauseslideshowadfo").css("bottom",bottomplaypause+"px");	
	}else{
		$("#"+idslide+" .playpauseslideshowadfo").removeAttr("style");
		$("#"+idslide+" .playpauseslideshowadfo").css("top","2px");
		$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").removeAttr("style");	
	 $("#"+idslide).removeClass(temaslide+"02");
		$("#"+idslide).addClass(temaslide+"01");	
	}
	var alturacontenedor=$("#"+idslide+" ul li").height();
	var alturaslideshow=alturacontenedor+$(".navegadorslideshowadfooutlet").height();
	$("#"+idslide).css("height",alturaslideshow+"px");
	$("#"+idslide+" .contenedorslideshowadfo").css("height",alturacontenedor+"px");
	$("#"+idslide+" .contenedorslideshowadfo ul").css("height",alturacontenedor+"px");
	/*FLECHAS*/
	var alturacontenedorimg=$("#"+idslide+" ul li img").height();
var alturaflecha=$("#"+idslide+" .flechaslideshowadfoderecha").height();
var topflecha=(alturacontenedorimg-alturaflecha)/2;
$("#"+idslide+" .flechaslideshowadfoizquierda, #"+idslide+" .flechaslideshowadfoderecha").removeAttr("style");
$("#"+idslide+" .flechaslideshowadfoizquierda, #"+idslide+" .flechaslideshowadfoderecha").css("top",topflecha+"px");

}

//altura para informativo
function alturaslideshowdos(idslide,temaslide){
	var i;
	$("#"+idslide).removeAttr("style");
	$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").removeAttr("style");
	$("#"+idslide+" .contenedorslideshowadfo ul li .tituloslideadfo").removeAttr("style");
		$("#"+idslide+" .contenedorslideshowadfo").removeAttr("style");
		$("#"+idslide).addClass(temaslide+"03");
	$("#"+idslide+" .contenedorslideshowadfo ul").removeAttr("style");
	$("#"+idslide+" .playpauseslideshowadfo").removeAttr("style");
	var cantidadcaption=$("#"+idslide+" .contenedorslideshowadfo ul li").length-1;
	$("#"+idslide+" .navegadorslideshowadfooutlet ul").html("");
	for (i=0;i<=cantidadcaption;i++) { 
	$("#"+idslide+" .navegadorslideshowadfooutlet ul").append("<li><span class='sizeiconosoutlet iconogaleria-adfo iconogaleria-adfo-toque-dedos-1'></span></li>");
	}
	var alturamaxima=$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").eq(0).outerHeight();
		var alturamaximat=$("#"+idslide+" .contenedorslideshowadfo ul li .tituloslideadfo").eq(0).outerHeight();
	/*Caption Slideshow*/  
	for (i=0;i<=cantidadcaption;i++) { 
  var alturaelemento=$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").eq(i).outerHeight();
  var alturaelementon=$("#"+idslide+" .contenedorslideshowadfo ul li .tituloslideadfo").eq(i).outerHeight();
  if(alturaelemento>alturamaxima){
	alturamaxima=alturaelemento;  
  }else{
	  alturamaxima=alturamaxima;
  }

  if(alturaelementon>alturamaximat){
	alturamaximat=alturaelementon;  
  }else{
	  alturamaximat=alturamaximat;
  }
}
$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").css({"height":alturamaxima+"px"});
$("#"+idslide+" .contenedorslideshowadfo ul li .tituloslideadfo").css({"height":alturamaximat+"px"});
var bottomplaypause=$("#"+idslide+" .contenedorslideshowadfo ul li .captionslideadfo").height()+$("#"+idslide+" .navegadorslideshowadfooutlet").height()+20;
$("#"+idslide+" .playpauseslideshowadfo").css("bottom",bottomplaypause+"px");

	/*Contenedor*/
	var alturacontenedor2=$("#"+idslide+" ul li").height();

	var alturaslideshow=alturacontenedor2+$(".navegadorslideshowadfooutlet").height();
	$("#"+idslide).css("height",alturaslideshow+"px");
	$("#"+idslide+" .contenedorslideshowadfo").css("height",alturacontenedor2+"px");
	$("#"+idslide+" .contenedorslideshowadfo ul").css("height",alturacontenedor2+"px");
		/*FLECHAS*/
		var alturacontenedorimg2=$("#"+idslide+" ul li img").height();
var alturaflecha2=$("#"+idslide+" .flechaslideshowadfoderecha").height();
var alturatitulo=$("#"+idslide+" ul li .tituloslideadfo").height();
var topflecha2=((alturacontenedorimg2+alturatitulo+40)-(alturaflecha2))/2;
$("#"+idslide+" .flechaslideshowadfoizquierda, #"+idslide+" .flechaslideshowadfoderecha").removeAttr("style");
$("#"+idslide+" .flechaslideshowadfoizquierda, #"+idslide+" .flechaslideshowadfoderecha").css("top",topflecha2+"px");
//$("#anchoslide").html(alturaflecha2+" "+alturacontenedorimg2+" "+alturatitulo+" "+topflecha2);
}

//centra el outlet
function centraroutlet(idslide){
	/*OUTLET*/
	$("#"+idslide+" .navegadorslideshowadfooutlet ul").removeAttr("style");
var anchoslideshow=$("#"+idslide).width();
var anchooutlet=$("#"+idslide+" .navegadorslideshowadfooutlet ul").width();
var leftoutlet=((anchoslideshow-anchooutlet)/2);
$("#"+idslide+" .navegadorslideshowadfooutlet ul").css("margin-left",leftoutlet+"px");
}