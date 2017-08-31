/**
 * Created by USER on 30/03/2017.
 */
angular.module('todo_app', ['ui.bootstrap']);
var app = angular.module('MainApp', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'todo_app']);
app.constant('APP_CONSTANTS', {
    "API_BASE": "http://localhost:3000",
    "API_TODOS": "/tasks"
});
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when('/', {
            templateUrl: 'app/partials/tasks.html',
            controller: 'todo_ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
