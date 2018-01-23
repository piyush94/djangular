(function() {
  "use strict";

  angular.module("scrumboard.demo").directive("scrumboard-card", CardDirective);

  function CardDirective() {
    return {
      templateUrl: "/static/scrumboard/card.html",
      restrict: "E"
    };
  }
})();
