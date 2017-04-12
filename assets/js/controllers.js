app.controller('roomController',
    function ($mdToast,$mdDialog,$scope, roomFactory) {

        $scope.status;
        $scope.rooms=[];
        getRooms();

    $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function showSimpleToast(message){
        $mdToast.show(
          $mdToast.simple()
          .content(message)
          .position($scope.getToastPosition())
          .hideDelay(1700)
          );
    }

    function getRooms() {
        $scope.rooms = roomFactory.getRooms();

    }
    function addRoom(room) {
        roomFactory.insertRoom(room);
        showSimpleToast(room.roomName+' was added successfully.');
		getRooms();
    }
   
     
    function deleteRoom(room) {
        roomFactory.deleteRoom(room);
        showSimpleToast(room.roomName+' was deleted successfully.');
		getRooms();
    }

    $scope.deleteConfirm = function(room) {
     // Appending dialog to document.body to cover sidenav in docs app
     var confirm = $mdDialog.confirm()
     .title('Would you like to delete '+room.roomName+'?')
     .ok('Delete')
     .cancel('Cancel')
     .targetEvent(room);
     $mdDialog.show(confirm).then(function() {

        deleteRoom(room);
        
        

        
    }, function() {
      //Nothing
  });
 };

 $scope.addingDialog = function(){

  $mdDialog.show({
			clickOutsideToClose: true,
          scope: $scope,        // use parent scope in template
          preserveScope: true,  // do not forget this if use parent scope
          // Since GreetingController is instantiated with ControllerAs syntax
          // AND we are passing the parent '$scope' to the dialog, we MUST
          // use 'vm.<xxx>' in the template markup
          template: '<md-dialog>' +
          '  <md-dialog-content>' +
          '<form  name="addingForm" role="form" novalidate>'+
          '<md-input-container flex>'+
          '<label>Room Name</label>'+
          '<input type="text" ng-model="roomtmp2.roomName" name="roomName" required ng-minlength="2" ng-maxlength="128" />'+
          '</md-input-container>'+
          '<md-button class="md-raised md-primary" ng-click="closeDialog()" class="md-primary" style="background-color: red">'+
          'Cancel'+
          '</md-button>'+
          '<md-button type="submit"  ng-click="submit(roomtmp2)" class="md-raised md-primary" ng-disabled="addingForm.$invalid" class="md-primary">'+
          'Add'+
          '</md-button>'+
          '</form>'+
          '  </md-dialog-content>' +
          '</md-dialog>',
          controller: function DialogController($scope, $mdDialog) {

            
            $scope.submit = function(roomtmp2){
                        console.log('Success');
                        console.log(roomtmp2);
                          addRoom(roomtmp2);
                          $scope.roomtmp2 = $scope.initial;
                          $mdDialog.hide();    
          };
          $scope.closeDialog = function() {
            $scope.roomtmp2 = $scope.initial;
              $mdDialog.hide();
          }
      }
  });
};
$scope.getRooms=function(){
	getRooms();
};


})
app.controller('todoController',['$mdToast','$mdDialog','$scope', 'todoFactory', '$stateParams',
    function ($mdToast,$mdDialog,$scope,todoFactory,$stateParams) {

        $scope.status;
        $scope.room;
		$scope.todos;
		var roomId = $stateParams.roomId;
		var roomIndex ;
		getRoomIndex();
		getRoom();
        getTodos();
		function getRoomIndex(){
			roomIndex = todoFactory.getRoomIndex(roomId);
		}
	function getRoom(){
		$scope.room = todoFactory.getRoom(roomIndex);
	}
    

    $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function showSimpleToast(message){
        $mdToast.show(
          $mdToast.simple()
          .content(message)
          .position($scope.getToastPosition())
          .hideDelay(1700)
          );
    }

    function getTodos() {
        $scope.todos = todoFactory.getTodos(roomIndex);
    }
    function addTodo(todo) {
        todoFactory.insertTodo(roomIndex,todo);
        getTodos();
        showSimpleToast('Todo was added successfully.');
    }
   
     
    function deleteTodo(todo) {
        todoFactory.deleteTodobyId(roomIndex,todo);
        showSimpleToast('Todo was deleted successfully.');
		getTodos();
    }

    $scope.deleteConfirm = function(todo) {
     // Appending dialog to document.body to cover sidenav in docs app
     var confirm = $mdDialog.confirm()
     .title('Would you like to delete?')
     .ok('Delete')
     .cancel('Cancel')
     .targetEvent(todo);
     $mdDialog.show(confirm).then(function() {

        deleteTodo(todo);
        
        

        
    }, function() {
      //Nothing
  });
 };

 $scope.addingDialog = function(){

  $mdDialog.show({
			clickOutsideToClose: true,
          scope: $scope,        // use parent scope in template
          preserveScope: true,  // do not forget this if use parent scope
          // Since GreetingController is instantiated with ControllerAs syntax
          // AND we are passing the parent '$scope' to the dialog, we MUST
          // use 'vm.<xxx>' in the template markup
          template: '<md-dialog>' +
          '  <md-dialog-content>' +
          '<form  name="addingForm" role="form" novalidate>'+
          '<md-input-container flex>'+
          '<label>Todo Description</label>'+
          '<input type="text" ng-model="todotmp2.todoDesc" name="todoName" required ng-minlength="2" ng-maxlength="128" />'+
          '</md-input-container>'+
          '<md-button class="md-raised md-primary" ng-click="closeDialog()" class="md-primary" style="background-color: red">'+
          'Cancel'+
          '</md-button>'+
          '<md-button type="submit"  ng-click="submit(todotmp2)" class="md-raised md-primary" ng-disabled="addingForm.$invalid" class="md-primary">'+
          'Add'+
          '</md-button>'+
          '</form>'+
          '  </md-dialog-content>' +
          '</md-dialog>',
          controller: function DialogController($scope, $mdDialog) {

            
            $scope.submit = function(todotmp2){
                        console.log('Success');
                        console.log(todotmp2);
                          addTodo(todotmp2);
                          $scope.todotmp2 = $scope.initial;
                          $mdDialog.hide();    
          };
          $scope.closeDialog = function() {
            $scope.todotmp2 = $scope.initial;
              $mdDialog.hide();
          }
      }
  });
};


}])
app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/rooms');
    
    $stateProvider
        .state('rooms', {
            url: '/rooms',
            template: '<div style="width:25%;float:left;"><md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-md\')">'+
			'<md-toolbar><h1 class="md-toolbar-tools"> <ng-md-icon  class="md-avatar" icon="menu" size="44" style="fill:white"></ng-md-icon>Menu</h1></md-toolbar>'+
'<md-content flex><md-list><md-divider></md-divider><md-list-item ng-click="getRooms()">All Rooms</md-list-item><md-divider></md-divider><md-list-item ng-click="addingDialog()">Add a New Room</md-list-item>'+
'</md-content></md-list></md-sidenav></div>'+
'<div style="width:70%;float:left;"><md-subheader class="md-no-sticky">List of Rooms</md-subheader><md-divider></md-divider><span ng-if="rooms.length==0" style="color:grey;">No rooms available.Please add a room</span><md-grid-list md-cols="3" md-row-height="120px" md-gutter="4px">'+
'<md-grid-tile ng-repeat="room in rooms"><md-card md-theme="{{ showDarkTheme ? \'dark-grey\' : \'default\' }}" md-theme-watch><md-card-title ng-style="{\'padding\':\'15px\'}">'+
'<md-card-title-text ><span class="md-subhead">{{room.roomName}}</span></md-card-title-text></md-card-title><md-card-actions layout="row" layout-align="end center">'+
'<md-button class="md-raised md-primary" ui-sref="todolist({roomId:room.roomId})">Show ToDo List</md-button><md-button ng-click="deleteConfirm(room)" class="md-raised md-primary" ng-style="{\'background-color\': \'red\'}">Delete</md-button></md-card-actions></md-card></md-grid-tile></md-grid-list></div>'

			
			,
            controller:'roomController'
        })
		.state('todolist',{
			url:'/room/{roomId:int}',
			template: '<div style="width:25%;float:left;"><md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-md\')"><md-toolbar>'+
'<h1 class="md-toolbar-tools"> <ng-md-icon  class="md-avatar" icon="menu" size="44" style="fill:white"></ng-md-icon>Menu</h1></md-toolbar><md-content flex><md-list>'+
'<md-divider></md-divider><md-list-item>Current Room - {{room.roomName}}</md-list-item><md-divider></md-divider><md-list-item ui-sref="rooms" style="cursor:pointer">All Rooms</md-list-item><md-divider></md-divider>'+
'<md-list-item ng-click="addingDialog()">Add a New Todo</md-list-item><md-divider></md-divider></md-content></md-list></md-sidenav></div><div style="width:70%;float:left;"><md-list>'+
'<md-divider></md-divider><md-subheader class="md-no-sticky">Todo List</md-subheader><span ng-if="todos.length==0" style="color:grey;">No Todos available.Please add a Todo</span><md-list-item class="md-2-line" ng-repeat="todo in todos"><ng-md-icon  class="md-avatar" icon="my_library_books" size="50"></ng-md-icon><div class="md-list-item-text">'+
'<h3>{{todo.todoDesc}}</h3></div><div><md-button  ng-style="{\'background-color\': \'red\'}" class="md-raised md-primary" ng-click="deleteConfirm(todo)" aria-label="Delete"><md-tooltip>'+
'Click button to delete this room easily.</md-tooltip>DELETE</md-button></div></md-list-item></md-list></div>'
,
			controller:'todoController'
		})
        
        // nested list with custom controller
        
});



