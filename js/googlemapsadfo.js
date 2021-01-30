// JavaScript Document-google maps por andresflorez12
// plugin hecho por ADFO-googlemapsadfo
(function($){
	//Inicio del plugin
			"use strict";
	$.fn.googlemapsadfo=function(options){
//Opciones de plugin
//defecto
var opcionesdefectomapa={
latitudcentro:7.136442,
longitudcentro:-73.130679,
tipomapa:google.maps.MapTypeId.ROADMAP,//google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN
caso:"default",//"default","markers_ajax","markers_array","recorrido_dos_puntos","recorrido_waypoints"
urlajax:"",
idbtnclarposition:"btnclearposition",
marcadores:[],
latitudorigen:0,
longitudorigen:0,
latituddestino:0,
longituddestino:0,
waypoints:[],
iconodefectorecorrido:true,
imagenmarcadororigen:"default",
imagenmarcadordestino:"default",
imagenmarcadorwaypoint:"default",
zoom:17,
travelmode:true,//true,false
infowindow:false,//true,false
infoWindowmensaje:"",//mensaje info window
desabilitarUI:false,//true,false
controlzoom:true,//true,false
controldeescala:true,//true,false
controltipomapa:true,//true,false
opcionescontroltipomapastyle:google.maps.MapTypeControlStyle.DEFAULT,//google.maps.MapTypeControlStyle.DEFAULT,google.maps.MapTypeControlStyle.DROPDOWN_MENU,google.maps.MapTypeControlStyle.HORIZONTAL_BAR
opcionescontroltipomapatipos:[
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.SATELLITE,
        google.maps.MapTypeId.HYBRID,
        google.maps.MapTypeId.TERRAIN
      ],
	controlvistacalle:true,
	agregarmarcador:true,
	imagenmarcador:"default",
	titulomarcador:"",
	animacionmarcador:google.maps.Animation.DROP,//google.maps.Animation.DROP,google.maps.Animation.BOUNCE
	mostrarpanelruta:false,
	mostrarelevacion:false,
	ponerzoomautomaticoajaxarray:true,
	modoviaje:google.maps.TravelMode.DRIVING//google.maps.TravelMode.WALKING,google.maps.TravelMode.BICYCLING,google.maps.TravelMode.TRANSIT
};
//opciones por defecto, opciones cliente
var opcionesmapaadfo=$.extend(opcionesdefectomapa,options);
//Eventos de plugin
return this.each(function(){
	var coordenadasorigen,coordenadasfinal,arraywaypoints;
  //idmapa  
var idmapa=$(this).attr("id");
    //ancho y altomapa
var heightmapa,widthmapa;
$(this).removeAttr("style");
		  widthmapa=$(this).outerWidth();
		  heightmapa=(widthmapa*400)/640;
		if(heightmapa<200){
		heightmapa=200;	
		}else if(heightmapa>350){
			heightmapa=350;
		}else{
			heightmapa=heightmapa;
		}
		$(this).css("height",heightmapa+"px");
		
//caso
var caso=opcionesdefectomapa.caso;
//modo de viaje usuario
var mododeviaje=opcionesdefectomapa.modoviaje;
//valor del zoom
var valorzoom=opcionesdefectomapa.zoom;
//coordenadas centro
var longitudcentro=opcionesdefectomapa.longitudcentro,latitudcentro=opcionesdefectomapa.latitudcentro;
var coordenadascentro={lat:latitudcentro, lng:longitudcentro};
    var coordenadas;//almacena coordenadas que se pasaran como parametro
	//variables para opciones de mapa
	var desabilitarUI=opcionesdefectomapa.desabilitarUI,tipomapa=opcionesdefectomapa.tipomapa,controlzoom=opcionesdefectomapa.controlzoom,controldeescala=opcionesdefectomapa.controldeescala, controlvistacalle= opcionesdefectomapa.controlvistacalle,controltipomapa=opcionesdefectomapa.controltipomapa,mapTypeControlOptions= {
      style: opcionesdefectomapa.opcionescontroltipomapastyle,
      mapTypeIds: opcionesdefectomapa.opcionescontroltipomapatipos
    };
	var opcionesdemapa,mapa;
	//variables marcador
	 var imagenmarcador, titulomarcador, animacionmarcador, marcador;
	 imagenmarcador=opcionesdefectomapa.imagenmarcador;
titulomarcador=opcionesdefectomapa.titulomarcador;
animacionmarcador=opcionesdefectomapa.animacionmarcador;
//para zoom automatico multiples marcadores
var ponerzoomautomaticoajaxarray=opcionesdefectomapa.ponerzoomautomaticoajaxarray;
//para recorridos o rutas
var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
var bounds = new google.maps.LatLngBounds();
switch(caso) {
	    case "default":
	//dibujar el mapa
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
marcador=crearmarcador(mapa,imagenmarcador, titulomarcador, animacionmarcador,coordenadascentro);
        break;
		case "geolocation":
		if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
	coordenadascentro={lat:position.coords.latitude, lng:position.coords.longitude};
	 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
marcador=crearmarcador(mapa,imagenmarcador, titulomarcador, animacionmarcador,coordenadascentro);
	
	},function(error){
	var codigoerror=error.code;
var mensajeerror=error.message;
$("#"+idmapa).html(codigoerror+"<br>"+mensajeerror);},{enableHighAccuracy:true,timeout:5000});
}else{
$("#"+idmapa).html("No funciona el GPS o la geolocalización.");
}
		break;
		case "ver_posicion":
		var idbotonclearposition=opcionesdefectomapa.idbtnclarposition;
		if(navigator.geolocation){
var watchId = navigator.geolocation.watchPosition(function(position){
	
	coordenadascentro={lat:position.coords.latitude, lng:position.coords.longitude};
	 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
marcador=crearmarcador(mapa,imagenmarcador, titulomarcador, animacionmarcador,coordenadascentro);

	},function(error){
	var codigoerror=error.code;
var mensajeerror=error.message;
$("#"+idmapa).html(codigoerror+"<br>"+mensajeerror);},{enableHighAccuracy:true,timeout:5000});
$(idbotonclearposition).click(function(){
navigator.geolocation.clearWatch(watchId);
});
}else{
$("#"+idmapa).html("No funciona el GPS o la geolocalización.");
}
	
		break;
		    case "markers_ajax":
	
	opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa); 
	   $.getJSON(opcionesdefectomapa.urlajax,function(data){
		   var maximodata=data.length-1;
		   for(var i=0;i<=maximodata;i++){
			   coordenadas=new google.maps.LatLng(data[i].latitud, data[i].longitud);
       marcador=crearmarcador(mapa,imagenmarcador,titulomarcador, animacionmarcador,coordenadas);
if(ponerzoomautomaticoajaxarray){
      bounds.extend(coordenadas); 
}
		   }
   if(ponerzoomautomaticoajaxarray){
		   mapa.fitBounds(bounds);
   }
	   });
        break;
		    case "markers_array":
			var marcadores=opcionesdefectomapa.marcadores;
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
 for (var i = 0; i < marcadores.length; i++){

      var latlng = new google.maps.LatLng(marcadores[i].lat, marcadores[i].lng);
       marcador=crearmarcador(mapa,imagenmarcador,titulomarcador, animacionmarcador,latlng);
if(ponerzoomautomaticoajaxarray){
      bounds.extend(latlng); 
}
   }
   if(ponerzoomautomaticoajaxarray){
		   mapa.fitBounds(bounds);
   }
        break;
		case "recorrido_dos_puntos":
		coordenadasorigen={lat:opcionesdefectomapa.latitudorigen, lng:opcionesdefectomapa.longitudorigen};
		coordenadasfinal={lat:opcionesdefectomapa.latituddestino, lng:opcionesdefectomapa.longituddestino};
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
  directionsDisplay.setMap(mapa);
  directionsService.route({
    origin: coordenadasorigen,
    destination: coordenadasfinal,
    travelMode: mododeviaje
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
if(!opcionesdefectomapa.iconodefectorecorrido){
				directionsDisplay.setOptions( { suppressMarkers: true } );
				directionsDisplay.setDirections(response);
			 var leg = response.routes[0].legs[0];
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadororigen, titulomarcador, animacionmarcador,leg.start_location);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadordestino, titulomarcador, animacionmarcador,leg.end_location);	  
	  }else{
		  directionsDisplay.setDirections(response);
	  }
    } else {
      $("#"+idmapa).html('Se ha producido un error en la solicitud de ' + status);
    }
  });
        break;
		case "recorrido_dos_puntos_geolocation":
		if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
	
	coordenadasorigen={lat:position.coords.latitude, lng:position.coords.longitude };
		coordenadasfinal={lat:opcionesdefectomapa.latituddestino, lng:opcionesdefectomapa.longituddestino};
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
  directionsDisplay.setMap(mapa);
  directionsService.route({
    origin: coordenadasorigen,
    destination: coordenadasfinal,
    travelMode: mododeviaje
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
if(!opcionesdefectomapa.iconodefectorecorrido){
				directionsDisplay.setOptions( { suppressMarkers: true } );
				directionsDisplay.setDirections(response);
			 var leg = response.routes[0].legs[0];
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadororigen, titulomarcador, animacionmarcador,leg.start_location);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadordestino, titulomarcador, animacionmarcador,leg.end_location);	  
	  }else{
		  directionsDisplay.setDirections(response);
	  }
    } else {
      $("#"+idmapa).html('Se ha producido un error en la solicitud de ' + status);
    }
  });
	
	},function(error){
	var codigoerror=error.code;
var mensajeerror=error.message;
$("#"+idmapa).html(codigoerror+"<br>"+mensajeerror);},{enableHighAccuracy:true,timeout:5000});
}else{
$("#"+idmapa).html("No funciona el GPS o la geolocalización.");
}

		
        break;
		case "recorrido_waypoints":
		coordenadasorigen={lat:opcionesdefectomapa.latitudorigen, lng:opcionesdefectomapa.longitudorigen};
		coordenadasfinal={lat:opcionesdefectomapa.latituddestino, lng:opcionesdefectomapa.longituddestino};
		
		var wayptsx = [];
  for (i = 0; i < opcionesdefectomapa.waypoints.length; i++) {
      wayptsx.push({
        location: opcionesdefectomapa.waypoints[i],
        stopover: true
      });
  }
 
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
  directionsDisplay.setMap(mapa);
  directionsService.route({
    origin: coordenadasorigen,
    destination: coordenadasfinal,
	waypoints: wayptsx,
    optimizeWaypoints: true,
    travelMode: mododeviaje
  }, function(response, status) {
 if (status === google.maps.DirectionsStatus.OK) {
                if(!opcionesdefectomapa.iconodefectorecorrido){
				directionsDisplay.setOptions( { suppressMarkers: true } );
				directionsDisplay.setDirections(response);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadororigen, titulomarcador, animacionmarcador,coordenadasorigen);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadordestino, titulomarcador, animacionmarcador,coordenadasfinal);	
	  for (i = 0; i < opcionesdefectomapa.waypoints.length; i++) {
      crearmarcador(mapa,opcionesdefectomapa.imagenmarcadorwaypoint, titulomarcador, animacionmarcador,opcionesdefectomapa.waypoints[i]);
  }
	   
	  }else{
		  directionsDisplay.setDirections(response);
	  }
    } else {
      $("#"+idmapa).html('Se ha producido un error en la solicitud de ' + status);
    }
  });
		break;
		default:
			//dibujar el mapa
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);    
}


$(window).resize(function() {
	$("#"+idmapa).removeAttr("style");
		  widthmapa=$("#"+idmapa).outerWidth();
		  heightmapa=(widthmapa*400)/640;
		if(heightmapa<200){
		heightmapa=200;	
		}else if(heightmapa>350){
			heightmapa=350;
		}else{
			heightmapa=heightmapa;
		}
		$("#"+idmapa).css("height",heightmapa+"px");
    switch(caso) {
	    case "default":
	//dibujar el mapa
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
marcador=crearmarcador(mapa,imagenmarcador, titulomarcador, animacionmarcador,coordenadascentro);
        break;
		case "geolocation":
		if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
	coordenadascentro={lat:position.coords.latitude, lng:position.coords.longitude};
	 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
marcador=crearmarcador(mapa,imagenmarcador, titulomarcador, animacionmarcador,coordenadascentro);
	
	},function(error){
	var codigoerror=error.code;
var mensajeerror=error.message;
$("#"+idmapa).html(codigoerror+"<br>"+mensajeerror);},{enableHighAccuracy:true,timeout:5000});
}else{
$("#"+idmapa).html("No funciona el GPS o la geolocalización.");
}
		break;
		case "ver_posicion":
		var idbotonclearposition=opcionesdefectomapa.idbtnclarposition;
		if(navigator.geolocation){
var watchId = navigator.geolocation.watchPosition(function(position){
	
	coordenadascentro={lat:position.coords.latitude, lng:position.coords.longitude};
	 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
marcador=crearmarcador(mapa,imagenmarcador, titulomarcador, animacionmarcador,coordenadascentro);

	},function(error){
	var codigoerror=error.code;
var mensajeerror=error.message;
$("#"+idmapa).html(codigoerror+"<br>"+mensajeerror);},{enableHighAccuracy:true,timeout:5000});
$(idbotonclearposition).click(function(){
navigator.geolocation.clearWatch(watchId);
});
}else{
$("#"+idmapa).html("No funciona el GPS o la geolocalización.");
}
	
		break;
		    case "markers_ajax":
	
	opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa); 
	   $.getJSON(opcionesdefectomapa.urlajax,function(data){
		   var maximodata=data.length-1;
		   for(var i=0;i<=maximodata;i++){
			   coordenadas=new google.maps.LatLng(data[i].latitud, data[i].longitud);
       marcador=crearmarcador(mapa,imagenmarcador,titulomarcador, animacionmarcador,coordenadas);
if(ponerzoomautomaticoajaxarray){
      bounds.extend(coordenadas); 
}
		   }
   if(ponerzoomautomaticoajaxarray){
		   mapa.fitBounds(bounds);
   }
	   });
        break;
		    case "markers_array":
			var marcadores=opcionesdefectomapa.marcadores;
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
 for (var i = 0; i < marcadores.length; i++){

      var latlng = new google.maps.LatLng(marcadores[i].lat, marcadores[i].lng);
       marcador=crearmarcador(mapa,imagenmarcador,titulomarcador, animacionmarcador,latlng);
if(ponerzoomautomaticoajaxarray){
      bounds.extend(latlng); 
}
   }
   if(ponerzoomautomaticoajaxarray){
		   mapa.fitBounds(bounds);
   }
        break;
		case "recorrido_dos_puntos":
		coordenadasorigen={lat:opcionesdefectomapa.latitudorigen, lng:opcionesdefectomapa.longitudorigen};
		coordenadasfinal={lat:opcionesdefectomapa.latituddestino, lng:opcionesdefectomapa.longituddestino};
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
  directionsDisplay.setMap(mapa);
  directionsService.route({
    origin: coordenadasorigen,
    destination: coordenadasfinal,
    travelMode: mododeviaje
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
if(!opcionesdefectomapa.iconodefectorecorrido){
				directionsDisplay.setOptions( { suppressMarkers: true } );
				directionsDisplay.setDirections(response);
			 var leg = response.routes[0].legs[0];
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadororigen, titulomarcador, animacionmarcador,leg.start_location);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadordestino, titulomarcador, animacionmarcador,leg.end_location);	  
	  }else{
		  directionsDisplay.setDirections(response);
	  }
    } else {
      $("#"+idmapa).html('Se ha producido un error en la solicitud de ' + status);
    }
  });
        break;
		case "recorrido_dos_puntos_geolocation":
		if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
	
	coordenadasorigen={lat:position.coords.latitude, lng:position.coords.longitude };
		coordenadasfinal={lat:opcionesdefectomapa.latituddestino, lng:opcionesdefectomapa.longituddestino};
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
  directionsDisplay.setMap(mapa);
  directionsService.route({
    origin: coordenadasorigen,
    destination: coordenadasfinal,
    travelMode: mododeviaje
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
if(!opcionesdefectomapa.iconodefectorecorrido){
				directionsDisplay.setOptions( { suppressMarkers: true } );
				directionsDisplay.setDirections(response);
			 var leg = response.routes[0].legs[0];
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadororigen, titulomarcador, animacionmarcador,leg.start_location);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadordestino, titulomarcador, animacionmarcador,leg.end_location);	  
	  }else{
		  directionsDisplay.setDirections(response);
	  }
    } else {
      $("#"+idmapa).html('Se ha producido un error en la solicitud de ' + status);
    }
  });
	
	},function(error){
	var codigoerror=error.code;
var mensajeerror=error.message;
$("#"+idmapa).html(codigoerror+"<br>"+mensajeerror);},{enableHighAccuracy:true,timeout:5000});
}else{
$("#"+idmapa).html("No funciona el GPS o la geolocalización.");
}

		
        break;
		case "recorrido_waypoints":
		coordenadasorigen={lat:opcionesdefectomapa.latitudorigen, lng:opcionesdefectomapa.longitudorigen};
		coordenadasfinal={lat:opcionesdefectomapa.latituddestino, lng:opcionesdefectomapa.longituddestino};
		
		var wayptsx = [];
  for (i = 0; i < opcionesdefectomapa.waypoints.length; i++) {
      wayptsx.push({
        location: opcionesdefectomapa.waypoints[i],
        stopover: true
      });
  }
 
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);     
  directionsDisplay.setMap(mapa);
  directionsService.route({
    origin: coordenadasorigen,
    destination: coordenadasfinal,
	waypoints: wayptsx,
    optimizeWaypoints: true,
    travelMode: mododeviaje
  }, function(response, status) {
 if (status === google.maps.DirectionsStatus.OK) {
                if(!opcionesdefectomapa.iconodefectorecorrido){
				directionsDisplay.setOptions( { suppressMarkers: true } );
				directionsDisplay.setDirections(response);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadororigen, titulomarcador, animacionmarcador,coordenadasorigen);
	  crearmarcador(mapa,opcionesdefectomapa.imagenmarcadordestino, titulomarcador, animacionmarcador,coordenadasfinal);	
	  for (i = 0; i < opcionesdefectomapa.waypoints.length; i++) {
      crearmarcador(mapa,opcionesdefectomapa.imagenmarcadorwaypoint, titulomarcador, animacionmarcador,opcionesdefectomapa.waypoints[i]);
  }
	   
	  }else{
		  directionsDisplay.setDirections(response);
	  }
    } else {
      $("#"+idmapa).html('Se ha producido un error en la solicitud de ' + status);
    }
  });
		break;
		default:
			//dibujar el mapa
 opcionesdemapa=obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions);  
 mapa=crearmapa(idmapa,opcionesdemapa);    
}
});
});	
	};
})(jQuery);
function crearmapa(idmapa,opcionesmapa){
	"use strict";
	var mapa= new google.maps.Map(document.getElementById(idmapa), opcionesmapa);
	//refrescar mapa
google.maps.event.trigger(mapa, 'resize');
	return mapa;
}
function crearmarcador(mapa,imagenmarcador, titulomarcador, animacionmarcador,coordenadas){
	"use strict";
	var opcionesmarcador;
				   if(imagenmarcador==="default"){
			 if(titulomarcador===""){
				opcionesmarcador={
    position: coordenadas,
    map: mapa,
	animation: animacionmarcador
  }; 
			 }else{
			opcionesmarcador={
    position: coordenadas,
    map: mapa,
    title: titulomarcador,
	animation: animacionmarcador
  }; 	 
			 }
			 
		 }else{
			 if(titulomarcador==""){
							 opcionesmarcador={
   position: coordenadas,
    map: mapa,
	animation: animacionmarcador,
	icon: imagenmarcador
  };  
			 }else{
							opcionesmarcador={
    position: coordenadas,
    map: mapa,
    title: titulomarcador,
	animation: animacionmarcador,
	icon: imagenmarcador
  }; 
			 }
 
		 }
		 var marker = new google.maps.Marker(opcionesmarcador);
		 return marker;
}
function obteneropcionesdemapa(desabilitarUI,tipomapa,controlzoom,controldeescala, controlvistacalle,controltipomapa,coordenadascentro,valorzoom,mapTypeControlOptions){

	"use strict";
		var opcionesmapa;
if(desabilitarUI===true){
opcionesmapa={
              center: coordenadascentro,
              zoom: valorzoom,
              mapTypeId: tipomapa,
              disableDefaultUI: desabilitarUI
          };
}else{
opcionesmapa={
              center: coordenadascentro,
              zoom: valorzoom,
              mapTypeId: tipomapa,
zoomControl: controlzoom,
    scaleControl: controldeescala,
streetViewControl: controlvistacalle,
mapTypeControl: controltipomapa,
  mapTypeControlOptions:  mapTypeControlOptions
          };
}
return opcionesmapa;	
}
