/* ============================================================
 * Directive: pgSidebar
 * AngularJS directive for Pages Sidebar jQuery plugin
 * ============================================================ */

angular.module('app')
    .directive('pgSidebar', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var $sidebar = $(element);
            	$sidebar.sidebar($sidebar.data());
            }
        };
    });