(function () {
  "use strict";

  angular
    .module("scrumboard.demo", ['ngRoute'])
    .controller("ScrumboardController", [
      "$scope",
      "$http",
      ScrumboardController
    ]);

  function ScrumboardController($scope, $http) {
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

    $scope.login = function () {
      $http.post('/auth_api/login/', { "username": "osboxes", "password": "pixion123" });
    };

    $scope.data = [];

    //get data from REST Api
    $http.get("/scrumboard/lists/").then(function (response) {
      $scope.data = response.data;
    });
  }
})();
