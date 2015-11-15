'use strict';

/**
 * @ngdoc service
 * @name angularApp.firebase
 * @description
 * # firebase
 * Factory in the angularApp.
 */
angular.module('angularApp').factory('firebase', function ($firebaseArray,$q) {
    // Service logic
    // ...
    var fire = $q.defer();
    var ref = new Firebase("https://geomaker.firebaseio.com/");
    var data =  ref.child("Geo");




    return data;


  });
