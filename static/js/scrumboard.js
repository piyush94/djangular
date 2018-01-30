(function () {
  "use strict";

  angular
    .module("scrumboard.demo", ['ngRoute'])
    .controller("ScrumboardController", [
      "$scope",
      "$http",
      "$location",
      ScrumboardController
    ]);

  function ScrumboardController($scope, $http, $location) {
    $scope.add = function (list, title) {
      var card = {
        title: title,
        list: list.id
      };

      $http.post("/scrumboard/cards/", card).then(
        //handle correct response
        function (response) {
          list.cards.push(response.data);
        },
        //handle error
        function () {
          alert("Could not create card!");
        }
      );
    };

    $scope.logout = function () {
      $http.get('/auth_api/logout/')
        .then(function () {
          $location.url('/login');
        });
    }

    $scope.data = [];

    //get data from REST Api
    $http.get("/scrumboard/lists/").then(function (response) {
      $scope.data = response.data;
    });

    $scope.sortBy = 'story_points';
    $scope.reverse = true;
    $scope.showFilters = false;
  }
})();
