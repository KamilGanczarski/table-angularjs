let app = angular.module('mainApp', []);
app.controller('mainController', ($scope, $http) => {

    /**
     * @return Response object contains users
     */

    function request() {

        $http({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users'
        }).then((response) => {
            $scope.tableContent = response.data;
        });
    }
    request();

    /**
     * Ascending or descending order table by selected value
     * @param sortElement
     * @return Function set sortValue and sortBool
     */

    $scope.previousElement = '';

    $scope.sort = function (sortElement) {
        if($scope.previousElement === sortElement) {
            $scope.sortBool = true;
            $scope.previousElement = '';
        }
        else {
            $scope.sortBool = false;
            $scope.previousElement = sortElement;
        }
        $scope.sortValue = sortElement;
    }

    $scope.sort('id');

    /**
     * Get selected user and write out in inputs
     * @type {HTMLElement}
     */

    let editModeContent = "";
    let editModeClass = 'class="form-control form-control-md mb-2"';
    $scope.editMode = document.getElementById("edit-mode");

    $scope.edit = function(number) {

        for(i=0; i<$scope.tableContent.length; i++) {
            if($scope.tableContent[i].id == number) {
                number = i;
            }
        }

        editModeContent =
        '<input type="text" value="'
            + $scope.tableContent[number].name + '"' + editModeClass + '>'

        + '<input type="text" value="'
            + $scope.tableContent[number].email + '"' + editModeClass + '>'

        + '<input type="text" value="'
            + $scope.tableContent[number].company.catchPhrase + '"' + editModeClass + '>'

        + '<input type="text" value="'
            + $scope.tableContent[number].website + '"' + editModeClass + '>';

        $scope.removeValue = $scope.tableContent[number].id;

        $scope.editMode.innerHTML = editModeContent;
    }

    /**
     * Remove selected person
     * @param number
     */

    $scope.remove = function(number) {
        for(i=0; i<$scope.tableContent.length; i++) {
            if($scope.tableContent[i].id === number) {
                $scope.tableContent.splice(i, 1);
            }
        }
    }

});