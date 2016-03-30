var my_map =
{
    container: document.getElementById("map_container"),
    obj: document.getElementById("map"),

    /* ---- initialisation de la map ---- */
    initialize: function() {

        this.obj.style.width = "800px";
        this.obj.style.height = "600px";
        this.obj.style.marginLeft = (this.container.offsetWidth - this.obj.offsetWidth) / 2 + "px";
        this.obj.style.marginTop = (this.container.offsetHeight - this.obj.offsetHeight) / 2 + "px";

        var styles =
        [
            {
                featureType: "city",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ];

        var styled_map = new google.maps.StyledMapType(styles, {name: "Styled Map"});

        map = new google.maps.Map(this.obj, {
            zoom: 4,
            center: new google.maps.LatLng(47.709336, 14.260239),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        map.mapTypes.set('map_style', styled_map);
        map.setMapTypeId('map_style');

        this.geolocation();
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
    }
}

var selected_city = null;

function select_city(obj)
{
    if (obj.classList.contains("success") || obj.classList.contains("fail"))
        return ;
    var selected = document.getElementById("selected");
    if (selected)
        selected.id = "";
    obj.id = "selected";
    selected_city = obj.innerHTML;
}