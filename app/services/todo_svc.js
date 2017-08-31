angular.module('todo_app').factory('todo_service', ['$http', 'APP_CONSTANTS', function ($http, APP_CONSTANTS) {
    return {
        GetTodo: function () {
            return $http(
                {
                    method: "GET",
                    url: APP_CONSTANTS.API_BASE + APP_CONSTANTS.API_TODOS
                }
            ).then(function (response) {
                return response.data;
            }, function (response) {
                console.log(response.statusText);
                console.log('Something went wrong');
            })
        },
        PostTodo: function (input) {
            return $http(
                {
                    method: "POST",
                    url: APP_CONSTANTS.API_BASE + APP_CONSTANTS.API_TODOS,
                    data: input

                }
            ).then(function (response) {
                console.log(response.status);
            }, function (response) {
                console.log(response.statusText);
            })
        },
        UpdateTodo: function (input, id) {
            return $http(
                {
                    method: "PUT",
                    url: APP_CONSTANTS.API_BASE + APP_CONSTANTS.API_TODOS + '/' + id,
                    data: input

                }
            ).then(function (response) {
                console.log(response.status);
            }, function (response) {
                console.log(response.statusText);
            })
        },

        DeleteTodo: function (id) {
            return $http(
                {
                    method: "DELETE",
                    url: APP_CONSTANTS.API_BASE + APP_CONSTANTS.API_TODOS + '/' + id
                }
            ).then(function (response) {
                console.log(response.status)
            }, function (response) {
                console.log(response.statusText);
                console.log('Something went wrong');
            })
        }
    }
}]);