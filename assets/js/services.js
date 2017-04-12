app.factory('roomFactory', function() {

	var localStorage = window.localStorage;
	var roomFactory = {};
	var count;
	roomFactory.getRooms = function () {

		if(localStorage.rooms==undefined|| JSON.parse(localStorage.rooms).length==0){
			localStorage.rooms=JSON.stringify(Array());
			count = 1;
		}
		else{
			var tmp = JSON.parse(localStorage.rooms);
			console.log(tmp);
			count = tmp[tmp.length-1].roomId+1;
		}
		return JSON.parse(localStorage.rooms);
	};
	
	roomFactory.insertRoom = function (Room) {
		var tmp={roomId:count,roomName:Room.roomName,todolist:Array()};
		count++;
		var tmp1 = JSON.parse(localStorage.rooms);
		tmp1.push(tmp);
		localStorage.rooms = JSON.stringify(tmp1);
	};

	roomFactory.deleteRoom = function (room) {
		var tmp1 = JSON.parse(localStorage.rooms);
		tmp1.splice( tmp1.indexOf(room), 1 );
		localStorage.rooms = JSON.stringify(tmp1);
	};

  
	return roomFactory;
});
app.factory('todoFactory', function() {
	var localStorage = window.localStorage;
	var todoFactory = {};
	todoFactory.getRoom = function(roomIndex){
		return JSON.parse(localStorage.rooms)[roomIndex];
	}
	todoFactory.getRoomIndex = function (RoomId){
		var tmp1 = JSON.parse(localStorage.rooms);
		for(var i=0;i<tmp1.length;i++){
			if(tmp1[i].roomId==RoomId){
			return i;}
		}
	};
	
	todoFactory.getTodos = function (roomIndex) {
		return JSON.parse(localStorage.rooms)[roomIndex].todolist;
	};
	
	todoFactory.insertTodo = function (roomIndex,todo) {
		var tmp1 = JSON.parse(localStorage.rooms);
		tmp1[roomIndex].todolist.push(todo);
		localStorage.rooms = JSON.stringify(tmp1);
		
	};

	todoFactory.deleteTodobyId = function (roomIndex,todo) {
		var tmp1 = JSON.parse(localStorage.rooms);
		tmp1[roomIndex].todolist.splice( tmp1[roomIndex].todolist.indexOf(todo), 1 );
		localStorage.rooms = JSON.stringify(tmp1);
		
	};
  
	return todoFactory;
});