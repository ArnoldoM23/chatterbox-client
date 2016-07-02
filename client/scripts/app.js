// YOUR CODE HERE:

$(document).ready(function(){
  
  var No = function(message){
    this.user = 'La NO';
    this.text = message;
    this.roomname = 'lobby';
  };

  $('#send ').on('submit', function(e){
    e.preventDefault()
    var m = $("#message").val();
    var messages = new No(m)
    // app.addMessage(messages);
    // console.log(messages)
    app.send(messages)
    $("#message").val("");
  });

  var app = {
    init: function(){
    },
    send: function(text){
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(text),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
          app.addMessage(text)
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetch: function(){
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message recived');
          _.each(data.results, function(obj){
            app.addMessage(obj)
          })
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
      var messa = $("<p>" + message.text + "</p>");
      var user = $("<h3 class=username >" + message.user + "</h3>");
      var div = $("<div class=messageBox></div><br/>");
      user.append(messa)
      div.append(user)
       $(".username").on('click', function(){
          app.addFriend();
        });
      $('#chats').prepend(div)
    },
    addRoom: function(roomName){
      $('#roomSelect').append("<option>" + roomName + "</option>")
    },
    addFriend: function(){     
    console.log('hi')
    },
    handleSubmit:function(){
    }
  };

  // setInterval(function(){
    app.fetch();
    
  // },3000)
  
})
    


