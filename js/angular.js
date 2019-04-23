let number = 0;
let tableContent = [];

let app = angular.module('mainApp', []);
app.controller('mainController', ($scope, $http) => {

  $scope.tablePartBegin = 0;
  $scope.tablePartLimit = 10;
  $scope.tableContent = [];
  $scope.buttonArray = []; // Array to create
                          // button which user change table number

  /**
   * @return Response object contains users
   */

  $scope.request = function() {
    $http({
      method: 'GET',
        url: '/js/table/js/data.json'
      }).then((response) => {
        $scope.tableContent = response.data;
        tableContent = $scope.tableContent;
        buttonArrayContent();
      });
  }
  $scope.request();


  /**
   * Show 10 elements from table content
   * @param number
   */

  $scope.setTablePart = function(number) {
    $scope.tablePartBegin = number;
  }


  /**
   * @return array $scope.buttonArray
   */
  let buttonArrayLength = $scope.tableContent.length / $scope.tablePartLimit;

  function buttonArrayContent() {
    $scope.buttonArray = [];
      for(i=0; i<($scope.tableContent.length / $scope.tablePartLimit); i++) {
        $scope.buttonArray[i] = i+1;
      }
  }


  /**
   *  Change table part
   */

  $scope.changeTablePart = function(number) {

    $scope.tablePartBegin += number;

      if($scope.tablePartBegin < 0) {
        $scope.tablePartBegin = 0;
      }

      if($scope.tablePartBegin >= $scope.tableContent.length) {
        $scope.tablePartBegin = Math.ceil($scope.tableContent.length / 10);
        $scope.tablePartBegin *= 10;
        $scope.tablePartBegin -= $scope.tablePartLimit
      }
  }


  /**
   * $sortBool define ascending or descending order by selected value
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

  let editModeContent = '';
  let editModeClass = 'class="form-control form-control-md mb-3 modalInput"';
  $scope.editMode = document.getElementById("edit-mode");

  $scope.edit = function(number) {
    number = getCorrectArrayIndex(number);

    editModeContent =
      '<input type="text" placeholder="Name" value="'
        + $scope.tableContent[number].name + '"' + editModeClass + '>'

      + '<input type="text" placeholder="Email" value="'
        + $scope.tableContent[number].email + '"' + editModeClass + '>'

      + '<input type="text" placeholder="Message" value="'
        + $scope.tableContent[number].company.catchPhrase + '"' + editModeClass + '>'

      + '<input type="text" value="'
        + $scope.tableContent[number].website + '"' + editModeClass + '>';

    $scope.numberValue = $scope.tableContent[number].id;

    $scope.editMode.innerHTML = editModeContent;
  }


  /**
   * Get value from inputs ( class modalInput )
   * and upload and change content in array $scope.tableContent
   */

  $scope.saveChanges = function(number) {

    let modalInputs = document.getElementsByClassName('modalInput');

    if(number === false) {
      number = $scope.tableContent.length;

      $scope.tableContent[number] = {
        id: number+1,
        name: "",
        email: "",
        company: {
          catchPhrase: ""
        },
        website: ""
      }

      buttonArrayContent();
    }
    else {
      number = getCorrectArrayIndex(number);
    }

    $scope.tableContent[number].name = modalInputs[0].value;
    $scope.tableContent[number].email = modalInputs[1].value;
    $scope.tableContent[number].company.catchPhrase = modalInputs[2].value;
    $scope.tableContent[number].website = modalInputs[3].value;
  }


  /**
   * Create empty inputs for new users
   */

  $scope.addTableRow = function() {
    number = $scope.tableContent.length;

    editModeContent =
      '<input type="text" placeholder="Name"' + editModeClass + '>'
      + '<input type="text" placeholder="Email"' + editModeClass + '>'
      + '<input type="text" placeholder="Message"' + editModeClass + '>'
      + '<input type="text" placeholder="Website"' + editModeClass + '>';

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
    buttonArrayContent();
  }

  $scope.showFiles = function(stringVar) {

  }
});
