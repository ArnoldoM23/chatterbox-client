// YOUR CODE HERE:

var app = Backbone.Model.extend({
  initialize: function(username, roomName){
    this.set({username: username, roomName: roomName})
    if (roomName) {
      this.set("roomName", roomName)
    }
    
  },
  defaults {
    roomName: "lobby "
  },
  send: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(this.get("message", "username")),
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
      url: "https://api.parse.com/1/classes/chatterbox",
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
});


var messageVIew = Backbone.View.extend({
  initialize: function(){

  }
})





$(document).ready(function(){
  $('#send .submit').on('submit', function(){
    app.handleSubmit()
  });
})
    



   

















