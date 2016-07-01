// YOUR CODE HERE:
var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
}; 


var app = {
  init: function(){
  },
  send: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function(){
    $.ajax({
      url: undefined,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
      console.log('chatterbox: Message recived');
      },
      error: function (data) {
      console.error('chatterbox: Failed to fetch message');
      }
    });
  },
  clearMessages: function(){
    $("#chats").empty();
  },
  addMessage: function(message){
    var messa = $("<div class=message >" + message.text + "</div>");
    var user = $("<div class=username >" + message.username + "</div>");
    user.append(messa)
     $(".username").on('click', function(){
        app.addFriend();
      });
    $('#chats').append(user)
  },
  addRoom: function(roomName){
    $('#roomSelect').append("<option>" + roomName + "</option>")
  },
  addFriend: function(){     
  console.log('hi')
  },
  handleSubmit:function(){
    
  }
} 

$(document).ready(function(){
  $('#send .submit').on('submit', function(){
    app.handleSubmit()
  });
})
    



   

















