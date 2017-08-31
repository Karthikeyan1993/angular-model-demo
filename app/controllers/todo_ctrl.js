/**
 * Created by USER on 30/03/2017.
 */
angular.module('todo_app').controller('todo_ctrl', ['$scope', '$uibModal', '$log', 'todo_service', '$timeout', function ($scope, $uibModal, $log, todo_service, $timeout) {

    $scope.tasklist = {};
    $scope.message = 'Angular Tutorial';
    $scope.taskinput = {};
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/directives/model.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                taskid: function () {
                    return $scope.taskid;
                },
                taskname: function () {
                    return $scope.taskname
                },
                taskpriority: function () {
                    return $scope.taskpriority
                }
            }
        });

        modalInstance.result.then(function (p) {
            $scope.taskid = p.taskid;
            $scope.taskname = p.taskname;
            $scope.taskpriority = p.taskpriority;
            $scope.taskinput = {
                id: $scope.taskid,
                name: $scope.taskname,
                status: "progress",
                priority: $scope.taskpriority,
                active: true,
                isComplated: false
            };

            AddTodo();

            function AddTodo() {
                todo_service.PostTodo($scope.taskinput);
                console.log('Data Submitted');
            }

            $timeout(function () {
                GetTodo();
                console.log('Im Called')
            }, 500);

            console.log(p);
            console.log($scope.taskname);
            console.log($scope.taskid);
            console.log($scope.taskpriority)
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    //Get all task from service
    GetTodo();

    function GetTodo() {
        todo_service.GetTodo().then(function (data) {
            $scope.tasklist = data;
            console.log($scope.tasklist);
        })
    }

    $scope.ClickMe = function (data) {
        console.log(data);
        console.log(data.status);
        $scope.taskinput = {};
        $scope.id = '';
        if (data.status == 'progress') {
            $scope.taskinput = {
                id: data.id,
                name: data.name,
                status: "completed",
                priority: data.priority,
                active: false,
                isComplated: true
            };

            UpdateTodo();

            function UpdateTodo() {
                $scope.id = data.id;
                todo_service.UpdateTodo($scope.taskinput, $scope.id);
                console.log('Data Updated');
            }

            $timeout(function () {
                GetTodo();
                console.log('Im Called')
            }, 500);
        } else {
            $scope.taskinput = {
                id: data.id,
                name: data.name,
                status: "progress",
                priority: data.priority,
                active: true,
                isComplated: false
            };

            UpdateTodo();

            function UpdateTodo() {
                $scope.id = data.id;
                todo_service.UpdateTodo($scope.taskinput, $scope.id);
                console.log('Data Updated');
            }

            $timeout(function () {
                GetTodo();
                console.log('Im Called')
            }, 500);
        }
    };

    //Delete Completed tasks

    $scope.DeleteTodo = function (item) {
        console.log(item);
        todo_service.DeleteTodo(item.id);
        console.log('Item Deleted');
        $timeout(function () {
            GetTodo();
            console.log('Im Called')
        }, 500);
    }

    $scope.getclass = function (input) {
        return {
            'label-danger': input == 'high',
            'label-warning': input == 'medium',
            'label-default': input == 'low'
        }
    };

}]);

angular.module('todo_app').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, taskid, taskname, taskpriority) {
    $scope.taskid = taskid;
    $scope.taskname = taskname;
    $scope.taskpriority = taskpriority;
    $scope.ok = function () {
        console.log('Im Called');
        $uibModalInstance.close({
            taskid: this.taskid,
            taskname: this.taskname,
            taskpriority: this.taskpriority
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});