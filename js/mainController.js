(function(){

    // Instantiate main app controller
    angular.module('griphos').controller('mainController', function($scope, $location){

        $scope.enlargePhoto = enlargePhoto;
        $scope.notGrid = false;

        function enlargePhoto($event) {
            var src = $event.target.attributes.src.value;
            $scope.selectedPhoto = src;
            var modal = angular.element(document.getElementsByClassName('modal'));
            modal.addClass('is-active');
        }

        $scope.$on('$routeChangeStart', function(data){
            var path = $location.path();
            if (path != "/") {
                $scope.notGrid = true;
            } else {
                $scope.notGrid = false;
            }
        });
    })
})();