// var previousPosition = null;

var my_map =
{
    container: document.getElementById("map_container"),
    obj: document.getElementById("map"),
    panel: document.getElementById("panel"),
    fullscreen: true,
    direction: undefined,

    /* ---- initialisation de la map ---- */
    initialize: function() {

        var traj_draggable = {
            draggable: true
        };
        if (!window.navigator.onLine) {
            alert("Vous etes deconnecte!")
            document.getElementById("box").innerHTML = "<p>Depart: " + localStorage.origin + "</p><p>Arrivé :" + localStorage.destination + "</p><p></br> etape : " + localStorage.draw_route + "</p>";
        } else {
            map = new google.maps.Map(this.obj, {
                zoom: 14,
                center: new google.maps.LatLng(48.9010177, 2.323545700000068),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            direction = new google.maps.DirectionsRenderer( {
                map : map,
                panel : panel 
            });
        }

        this.toggle_fullscreen();
        this.geolocation();
    },

    /* ---- fullscreen ---- */

    toggle_fullscreen: function() {
        if (this.fullscreen) {
            this.obj.style.width = "800px";
            this.obj.style.height = "600px";
            // this.obj.style.marginLeft = (this.container.offsetWidth - this.obj.offsetWidth) / 2 + "px";
            // this.obj.style.marginTop = (this.container.offsetHeight - this.obj.offsetHeight) / 2 + "px";
        } else {
            this.obj.style.width = "100%";
            this.obj.style.height = "100%";
            this.obj.style.marginLeft = "0px";
            this.obj.style.marginTop = "0px";
        }
        this.fullscreen = !this.fullscreen;
        google.maps.event.trigger(map, "resize");
    },

    /* ---- Geolocatlisation ---- */

    geolocation: function() {
        var self = this;
        var infoWindow = new google.maps.InfoWindow({map: map});

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent("T'es la.");
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    },

    /* ---- Tracage de l'itineraire ---- */

    draw_route: function() {
        var origin = document.getElementById('origin').value; // Le point de départ
        var destination = document.getElementById('destination').value; // Le point d'arrivé

        if (origin && destination) {
            var request = {
                origin : origin,
                destination : destination,
                travelMode  : google.maps.DirectionsTravelMode.DRIVING // Type de transport
            }

            var directionsService = new google.maps.DirectionsService();
             // Service de calcul d'itinéraire
            directionsService.route(request, function(response, status) { // Envoie de la requête pour calculer le parcours
                if(status == google.maps.DirectionsStatus.OK)
                    this.direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
            });
        }
    },

   
}
