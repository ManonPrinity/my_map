var gicons = [];
var infobulle;
var markerMember;

function demo2() {
  var address = 'Brest France';
  geocoder = new GClientGeocoder();
  z = 10;
  geocoder.getLatLng( address, function(point) {
    if (!point) {
      alert("- "+address+" n'existe pas");
    }
    else {
      var a =  point.lat();
      var b =  point.lng();
      initialize2(address,a,b,z);
    }
  });
}

function initialize2(address,a,b,z) {
  map = new GMap2(document.getElementById('map'));
  map.addControl(new GLargeMapControl3D());
  map.addControl(new GMenuMapTypeControl());
  map.checkResize();
  gicons[0] = new GIcon(G_DEFAULT_ICON, "http://www.weboblog.fr/flag_blue.png");
  gicons[0].iconSize = new GSize(16,16);
  gicons[0].shadow="";
  gicons[0].iconAnchor = new GPoint(9,16);
  gicons[0].infoWindowAnchor = new GPoint(9,9);

  map.setCenter(new GLatLng(a,b), z);
  if(address!=''){
    var geocoder = new GClientGeocoder();
    geocoder.getLatLng(address, function(point){ map.setCenter(point,z); });
}
infobulle  = '<table width="200px" border="0"  height="60px"><tr>';
infobulle += '<td width="70px" align="left" valign="top">';
infobulle += '<img src="http://www.weboblog.fr/package_network.png" /></td>';
infobulle += '<td align="left" valign="top">';
infobulle += '<p style=" font-family:Tahoma; font-size:10px; color: #8080ff;">';
infobulle += '<b><u>Point de recherche</u> :</b><br /> '+address+'<br />';
infobulle += '<b>Latitude</b>: '+a+'<br />';
infobulle += '<b>Longitude</b>: '+b+'</p></td></tr></table>';
markerMember = createMarker(new GLatLng(a,b),infobulle,gicons[0]); // Ajout du marqueur
map.addOverlay(markerMember);
}	

function createMarker(point,html,icon){
  var marker = new GMarker(point,icon);
  GEvent.addListener(marker, "click", function() {
    marker.openInfoWindowHtml(html);
  });
  return marker;
} 
var map = new GMap2(document.getElementById('map'), { size: new GSize(635,300)});
   /* Ici, nous déclarons l'élément html ayant pour id "map" comme conteneur de la map
   avec une taille de 635 * 300 pixel */

   var myPoints = [];
   /* Déclaration du tableau qui contiendra nos points, objets GLatLng. */

   var bounds = new GLatLngBounds();
   /* Instanciation de la classe GLatLngBounds */

   myPoints.push( new GLatLng(48.8566667, 2.3509871)); // Paris
   myPoints.push( new GLatLng(48.8123155, 2.2381535)); // Meudon
   myPoints.push( new GLatLng(48.3906042, -4.4869013)); // Brest
   myPoints.push( new GLatLng(50.6371834, 3.0630174)); // Lille 
   /* On remplit notre tableau  */

   for(var i = 0; i < myPoints.length; i++){
     bounds.extend(myPoints[i]);
     var thisMarker = addThisMarker(myPoints[i]);
     map.addOverlay(thisMarker);
   }
   /* Extension des limites de la carte afin d'y insérer tous les points
   On ajoute également un marker pour chacun
   de ces points sur la carte   */ 

   function addThisMarker(point){
     var marker = new GMarker(point, {draggable : true});
     return marker;
}         
demo2();