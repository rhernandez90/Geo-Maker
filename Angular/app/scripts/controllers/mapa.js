'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MapaCtrl', function ($scope,leafletData,$uibModal,$log,firebase,$firebaseArray) {


    $scope.geocercas = $firebaseArray(firebase);

    $scope.geojson = {
      data: []
    };



    firebase.on("value", function(snapshot) {
      $scope.geojson.data = [];


      angular.forEach(snapshot.val(), function(value,key) {
        $scope.geojson.data.push(  JSON.parse(value.geoPuntos));



      });


      console.log( $scope.geojson.data);

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
















    angular.extend($scope, {
      center: {
        lat: 15.529,
        lng: -88.027,
        zoom: 15
      },
      controls: {
        draw: {}
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
      }
    });

    leafletData.getMap().then(function(map) {
      leafletData.getLayers().then(function(baselayers) {
        var drawnItems = baselayers.overlays.draw;
        map.on('draw:created', function (e) {
          var layer = e.layer;
          drawnItems.addLayer(layer);
          console.log(JSON.stringify(layer.toGeoJSON()));
          $scope.open('md',JSON.stringify(layer.toGeoJSON()))
        });
      });
    });




    $scope.animationsEnabled = true;
    $scope.open = function (size,geoPuntos) {
      console.log("llegamos");

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return [geoPuntos];
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };



  });


angular.module('angularApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items,firebase) {
  //var ref = new Firebase("https://geomaker.firebaseio.com/");
  //$scope.data = $firebaseArray(ref);

  $scope.nombre = "IGS";
  $scope.geoPuntos = items[0];



  $scope.ok = function () {
    //
    var tmpObj = {
      nombre : $scope.nombre,
      geoPuntos: $scope.geoPuntos
    };

        var res = firebase.push(tmpObj)
        console.log(res);
        $uibModalInstance.close('close');



  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
