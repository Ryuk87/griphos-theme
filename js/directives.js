(function(){

    // Fade in images on load
    angular.module('griphos').directive('fadein', function(){
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.bind("load", function(e){
                    element.addClass('in');
                });
            }
        }
    });

    // Open hamburger menu on mobile
    angular.module('griphos').directive('headerToggle', function(){
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.bind('click', function(event){
                    var el = angular.element(document.getElementsByClassName('header-menu'));
                    if (el.hasClass('is-active')) {
                        el.removeClass('is-active');
                    } else {
                        el.addClass('is-active');
                    }
                })
            }
        }
    });

    // Close modal on click
    angular.module('griphos').directive('modalClose', function(){
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.bind('click', function(event){
                    var modal = angular.element(document.getElementsByClassName('modal'));
                    modal.removeClass('is-active');
                })
            }
        }
    })

})();