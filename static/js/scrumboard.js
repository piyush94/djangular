(function () {
  "use strict";

  angular
    .module("scrumboard.demo", ['ngRoute'])
    .controller("ScrumboardController", [
      "$scope",
      "$http",
      "$location",
      'Login',
      ScrumboardController
    ]);

  function ScrumboardController($scope, $http, $location, Login) {
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

    //get data from REST Api
    $http.get("/scrumboard/lists/").then(function (response) {
      $scope.data = response.data;
    });

    Login.redirectIfNotLoggedIn();
    $scope.data = [];
    $scope.logout = Login.logout;
    $scope.sortBy = 'story_points';
    $scope.reverse = true;
    $scope.showFilters = false;
  }
})();
