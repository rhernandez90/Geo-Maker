'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MapaCtrl', function ($scope,leafletData) {


            angular.extend($scope, {
          center: {
              lat: 15.529,
              lng: -88.027,
              zoom: 15
          },
          layers: {
                baselayers: {
                    googleTerrain: {
                        name: 'Google Terrain',
                        layerType: 'TERRAIN',
                        type: 'google'
                    },
                    googleHybrid: {
                      name: 'Google Hybrid',
                      layerType: 'HYBRID',
                      type: 'google'
                    },
                    bingAerial: {
                            name: 'Bing Aerial',
                            type: 'bing',
                            key: 'Aj6XtE1Q1rIvehmjn2Rh1LR2qvMGZ-8vPS9Hn3jCeUiToM77JFnf-kFRzyMELDol',
                            layerOptions: {
                                type: 'Aerial'
                            }
                        },
                    googleRoadmap: {
                        name: 'Google Streets',
                        layerType: 'ROADMAP',
                        type: 'google'
                   },
                   osm: {
                         name: 'OpenStreetMap',
                         type: 'xyz',
                         url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                         layerOptions: {
                         subdomains: ['a', 'b', 'c'],
                         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                         continuousWorld: true
                     }
                   }

                 }

            },
          overlays: {
                        draw: {
                            name: 'draw',
                            type: 'group',
                            visible: true,
                            layerParams: {
                                showOnSelector: false
                            }
                        }
                    }
        });
  });
