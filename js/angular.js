let balanceStartScope = 500;
let balanceFinalScope = 100000;
let number = 0;
// take values from modal dialog inputs
let modalInputs = [];
let editModeContent = "";
let editModeClass = 'class="form-control form-control-md mb-3 modalInput"';

let app = angular.module('mainApp', []);
app.controller('mainController', ($scope, $http) => {

  $scope.tablePartBegin = 0;
  $scope.tableRowScope = 10;
  $scope.rowScope = 10;
  $scope.tableContent = [];
  // Array contains button to change table part
  $scope.buttonArray = [];
  // String to set edit Modal Dialog title
  $scope.editModeTitle = "";
  $scope.previousSortElement = '';
  $scope.editMode = document.getElementById("edit-mode");
  // Statement about incorrect input data
  $scope.modalDialogErrors = "";

  /**
    * Response object contains users
    */
  $scope.request = function() {
    $http({
      method: 'GET',
      url: 'js/data.json'
    }).then((response) => {
      $scope.tableContent = response.data;
    });
  }
  $scope.request();

  /**
    * @return array $scope.buttonArray
    */
  let arrayStart = 0;
  let arrayEnd = 0;
  let arrayIndex = 0;
  $scope.setButtonsUnderTable = function() {
    arrayStart = 0;
    arrayEnd = 0;
    $scope.tableRowScope = $scope.rowScope;
    $scope.buttonArrayStart = [];
    $scope.buttonArrayStart[0] = 0;
    $scope.buttonArrayMiddle = [];
    $scope.buttonArrayEnd = [];
    let tablePartNumber = Math.ceil($scope.tableContent.length / $scope.tableRowScope);
    if(tablePartNumber > 9) {
      for(i=0; i<5; i++) {
        $scope.buttonArrayStart[i] = i;
      }

      arrayStart = 5;
      arrayEnd = tablePartNumber-5;
      for(i=arrayStart; i<arrayEnd; i++) {
        arrayIndex = i - $scope.buttonArrayStart.length;
        $scope.buttonArrayMiddle[arrayIndex] = i;
      }

      arrayStart = tablePartNumber-5;
      arrayEnd = tablePartNumber;
      for(i=arrayStart; i<arrayEnd; i++) {
        arrayIndex = i - $scope.buttonArrayStart.length - $scope.buttonArrayMiddle.length;
        $scope.buttonArrayEnd[arrayIndex] = i;
      }
    }
    else {
      for(i=0; i<($scope.tableContent.length / $scope.tableRowScope); i++) {
        $scope.buttonArrayStart[i] = i;
      }
      $scope.buttonArrayMiddle = [];
      $scope.buttonArrayEnd = [];
    }
  }
  $scope.setButtonsUnderTable();

  /**
    * Change table part
    */
  $scope.changeTablePart = function(number) {
    number = $scope.tablePartBegin + number;
    if(number < 0) {
      number = 0;
    }

    if(number >= $scope.tableContent.length) {
      number = Math.ceil($scope.tableContent.length / $scope.tableRowScope);
      number *= $scope.tableRowScope;
      number -= $scope.tableRowScope;
    }

    $scope.setTablePart(number, 'ready');
  }

  /**
    *Set number of limit rows once in table
    */
  $scope.setTablePart = function(number, bool) {
    // $scope.tablePartBegin = number;
    let middleButtonsIndex = [];
    middleButtonsIndex[0] = 4 * $scope.tableRowScope;
    middleButtonsIndex[1] = $scope.buttonArrayEnd[0] * $scope.tableRowScope;

    // check if number is index of array
    if(bool === true) {
      number *= $scope.tableRowScope;
    }
    else if(bool === false) {
      number--;
      number *= $scope.tableRowScope;
    }
    if(number >= 0 && number < $scope.tableContent.length) {
      $scope.rowScopeButtons = document.getElementsByClassName("tablePartInput");
      $scope.tablePartBegin = number;
      // set all buttons to inactive
      for(i=0; i<$scope.rowScopeButtons.length; i++) {
        $scope.rowScopeButtons[i].className = 'btn btn-outline-danger m-1 tablePartInput';
      }
      if(number === 0) {
        $scope.rowScopeButtons[(number)].className = 'btn btn-danger m-1 tablePartInput';
      }
      else if(number > middleButtonsIndex[0] && number < middleButtonsIndex[1]) {
        $scope.setTablePartN = number / $scope.tableRowScope + 1;
      }
      else {
        $scope.rowScopeButtons[(number/$scope.tableRowScope)].className = 'btn btn-danger m-1 tablePartInput';
        $scope.setTablePartN = '';
      }
    }
  }

  /**
    * $sortBool define ascending or descending order by selected value
    * @param sortElement
    * @return Function set sortValue and sortBool
    */
  $scope.sort = function (sortElement) {
    if($scope.previousSortElement === sortElement) {
      $scope.sortBool = true;
      $scope.previousSortElement = '';
    }
    else {
      $scope.sortBool = false;
      $scope.previousSortElement = sortElement;
    }
    $scope.sortValue = sortElement;
  }
  $scope.sort('id');

  /**
    * Search id in $scope.tableContent (array)
    * and return correctly array index
    * @returns number
    */
  function getCorrectArrayIndex(number) {
    for(i=0; i<$scope.tableContent.length; i++) {
      if($scope.tableContent[i].id === number) {
        return i;
      }
    }
  }

  /**
    * Get selected user and write out in inputs
    * @type {HTMLElement}
    */
  $scope.edit = function(number) {
    $scope.editModeTitle = "Edit person identity";
    number = getCorrectArrayIndex(number);

    editModeContent =
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Fristname</div>' +
        '<textarea type="text" ' + editModeClass + '>'+ $scope.tableContent[number].firstname.toString() + '</textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Surname</div>' +
        '<textarea type="text" ' + editModeClass + '>'+ $scope.tableContent[number].surname.toString() + '</textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Email</div>' +
        '<textarea type="text" ' + editModeClass + '>'+ $scope.tableContent[number].email.toString() + '</textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Company</div>' +
        '<textarea type="text" ' + editModeClass + '>'+ $scope.tableContent[number].company.toString() + '</textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Balance</div>' +
        '<textarea type="text" ' + editModeClass + '>'+ $scope.tableContent[number].balance.toString() + '</textarea>' +
      '</div>';

    $scope.numberValue = $scope.tableContent[number].id;
    $scope.editMode.innerHTML = editModeContent;
  }

  $scope.checkValidInput = function() {
    $scope.modalDialogErrors = "";
    for(i=0; i<modalInputs.length; i++) {
      modalInputs[i].value.toString();
      if(modalInputs[i].value == "") {
        $scope.modalDialogErrors = 'You didn\'t enter all values';
      }
    }

    if($scope.modalDialogErrors == "") {
      if(modalInputs[0].value.includes(" ")) {
        $scope.modalDialogErrors += 'Firstname is incorrectly.';
      }
      if(modalInputs[1].value.includes(" ")) {
        $scope.modalDialogErrors += 'Surname is incorrectly. ';
      }
      if(!modalInputs[2].value.includes("@")) {
        $scope.modalDialogErrors += 'Email is incorrectly. ';
      }
      else if(!modalInputs[2].value.includes(".")) {
        $scope.modalDialogErrors += 'Email is incorrectly. ';
      }
      if(modalInputs[4].value < balanceStartScope) {
        $scope.modalDialogErrors += "Set balance between " + balanceStartScope
          + " - " + balanceFinalScope + ".";
      }else if(modalInputs[4].value > balanceFinalScope) {
        $scope.modalDialogErrors += "Set balance between " + balanceStartScope
          + " - " + balanceFinalScope + ".";
      }
    }
  }

  /**
    * Get value from inputs ( class modalInput )
    * and upload and change content in array $scope.tableContent
    */
  $scope.saveChanges = function(number, firstTime) {

    modalInputs = document.getElementsByClassName('modalInput');
    $scope.checkValidInput();

    if($scope.modalDialogErrors === "") {
      if(number === false) {
        number = $scope.tableContent.length;
        $scope.tableContent[number] = {
          "id": $scope.tableContent.length,
          "firstName": "",
          "surname": "",
          "gender": "",
          "company": "",
          "email": "",
          "phone": "",
          "address": {
            "street": "",
            "city": "",
            "state": ""
          },
          "balance": "",
          "about": "",
          "file": "space.jpg",
          "registered": ""
        }
        $scope.setButtonsUnderTable();
      }
      else {
        number = getCorrectArrayIndex(number);
      }
      $scope.tableContent[number].firstname = modalInputs[0].value;
      $scope.tableContent[number].surname = modalInputs[1].value;
      $scope.tableContent[number].email = modalInputs[2].value;
      $scope.tableContent[number].company = modalInputs[3].value;
      $scope.tableContent[number].balance = "$" + modalInputs[4].value;
    }
    else if(firstTime) {
      setTimeout(() => {
        $('#editModal').modal('show');
      }, 1000);
    }
  }


  /**
    * Create empty inputs for new users
    */
  $scope.addTableRow = function() {
    $scope.editModeTitle = "Add person identity";
    number = $scope.tableContent.length;

    editModeContent =
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Fristname</div>' +
        '<textarea type="text" ' + editModeClass + '></textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Surname</div>' +
        '<textarea type="text" ' + editModeClass + '></textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Email</div>' +
        '<textarea type="text" ' + editModeClass + '></textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Company</div>' +
        '<textarea type="text" ' + editModeClass + '></textarea>' +
      '</div>' +
      '<div class="w-100 px-0 mx-0 my-2">' +
        '<div class="w-100 px-1 mx-0 my-auto text-left text-light">Balance</div>' +
        '<textarea type="text" ' + editModeClass + '></textarea>' +
      '</div>';

    $scope.numberValue = false; //new user set value as false
    $scope.editMode.innerHTML = editModeContent;
  }

  /**
    * Remove selected person
    */
  $scope.remove = function(number) {
    if(number !== false) {
      number = getCorrectArrayIndex(number);
      $scope.tableContent.splice(number, 1);
    }
    $scope.setButtonsUnderTable();

    /**
      * Assign id numbers one more time
      */
    for(i=0; i<$scope.tableContent.length; i++) {
      $scope.tableContent[i].id = i;
    }
  }

  /**
    * Select image to show in modal fade
    */
  $scope.showFiles = function(stringVar) {
    $scope.imageSrc = stringVar;
  }

});
