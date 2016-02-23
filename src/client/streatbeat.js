/**
 * Created by rachanti on 6/23/2015.
 */
'use strict'
var app =  angular.module('streatbeatmodule',['ngRoute']);

app.config(['$httpProvider','$routeProvider',function($httpProvider,$routeProvider) {
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;

    $routeProvider
        .when('/', {
            templateUrl: 'app/views/streatbeat.html',
            controller: 'streatbeatcntrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}
]);

app.directive('mapbox', [
    function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                callback: "="
            },
            template: '<div></div>',
            link: function (scope, element, attributes) {

                var currentlats;
                var currnetlong;

                L.mapbox.accessToken = 'pk.eyJ1IjoiYmx1ZWdlbmUiLCJhIjoiZjMwNzU2ZmQyMzdlMGQ3YjlkYTRmYmY3ZGY5N2RhMDMifQ.gnt0BCmgUCChF56g7kEo7Q';



                var map = L.mapbox.map(element[0],null);

                var layers = {
                    SatelliteView : L.mapbox.tileLayer('bluegene.mfl8kdhk'),
                    StreetView : L.mapbox.tileLayer('bluegene.ffdb711a'),
                    DarkView : L.mapbox.tileLayer('bluegene.mfl79iea')
                };

                layers.StreetView.addTo(map);
                L.control.layers(layers).addTo(map);
                map.locate();

                var myLayer = L.mapbox.featureLayer().addTo(map);

                map.on('locationfound', function(e) {
                    currentlats = e.latlng.lat;
                    currnetlong = e.latlng.lng;
                    map.fitBounds(e.bounds);
                    myLayer.setGeoJSON({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [e.latlng.lng, e.latlng.lat]
                        },
                        properties: {
                            'title': 'StreatBeat',
                            'marker-color': '#ff8888',
                            'marker-size': 'small',
                            'marker-symbol': 'circle'
                        }
                    });
                    map.setView([currentlats,currnetlong],50);
                });
                scope.callback(map);
            }
        };
    }
]);