// Backbone

var Message = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  username: "",
  text: "",
});

var AllMessages = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',

  model: Message,

  getMessages: function(){
    return this.fetch({data : {order: '-createdAt'}})
  },

  parse: function(response){
    var messages = [];
    for (var i = 0; i < response.results.length; i++) {
      messages.push(response.results[i])
    }
    return messages
  }
});


var MessageView = Backbone.View.extend({
  template: _.template('<div class="messageBox" "> \
    <div class="user"><%- username %></div> \
    <div class="text"><%-  text %></div> \
    </div>'),

  render: function(){
    this.model.username = this.model.username || '';
    this.model.text = this.model.text || '';
    this.$el.html(this.template(this.model))
    return this.el;
  }

})

var AllMessagesView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  render: function(){
    for (var i = 0; i < this.collection.models.length; i++) {
      this.messageRender(this.collection.models[i].attributes)
    }
  },

  messageRender: function(message){
    var message = new MessageView({model: message})
    $('#chats').append(message.render())  
  }

})

var MakeMessageView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  tagName: 'input',

  events: {'click .submit': 'handleSubmit'},

  handleSubmit: function(e){
    e.preventDefault();
    var newMessage = {
      username: window.location.search.substr(10),
      text: this.$('#message').val()
    };

    var createMessage = new Message(newMessage)
    createMessage.save();
    console.log('createMessage==', createMessage)

    this.$('#message').val('')
  },

})




// // YOUR CODE HERE:

// $(document).ready(function(){
  
//   var No = function(message){
//     this.user = window.location.search.slice(10);
//     // console.log(this.user)
//     this.text = message;
//     this.roomname = 'lobby';
//   };

//   $('#send ').on('submit', function(e){
//     e.preventDefault()
//     var m = $("#message").val();
//     var messages = new No(m)
//     // app.addMessage(messages);
//     // console.log(messages)
//     app.send(messages)
//     $("#message").val("");
//   });

//   $("select ").on('change',  function(e){
//     if (e.target["1"].className === "newRoom"){
//       var roomName = prompt("Write a room name")
//       app.addRoom(roomName)
//     };
//     console.log(e)
//   })
//   $('button').on('click', function(e){
//     e.preventDefault();
//     app.clearMessages();
//   })

//   var app = {
//     init: function(){
//     },
//     send: function(text){
//       $.ajax({
//         url: 'https://api.parse.com/1/classes/chatterbox',
//         type: 'POST',
//         data: JSON.stringify(text),
//         contentType: 'application/json',
//         success: function (data) {
//           console.log('chatterbox: Message sent');
//           app.addMessage(text)
//         },
//         error: function (data) {
//           console.error('chatterbox: Failed to send message');
//         }
//       });
//     },
//     fetch: function(){
//       $.ajax({
//         url: 'https://api.parse.com/1/classes/chatterbox',
//         type: 'GET',
//         contentType: 'application/json',
//         data: {order: '-createdAt'},
//         success: function (data) {
//           console.log('chatterbox: Message recived', data);
          
//             for (var i = data.results.length - 1; i >= 0; i--) {
//              app.addMessage(data.results[i]);
//             };
//         },
//         error: function (data) {
//           console.error('chatterbox: Failed to fetch message');
//         }
//       });
//     },
//     clearMessages: function(){
//       $("#chats").empty();
//     },
//     addMessage: function(message){
//       var messa = $("<p>" + message.text + "</p>");
//       var user = $("<h3 class=username >" + message.user + "</h3>");
//       var div = $("<div class=messageBox></div><br/>");
//       user.append(messa)
//       div.append(user)
//        $(".username").on('click', function(){
//           app.addFriend();
//         });
//       $('#chats').prepend(div)
//     },
//     addRoom: function(roomName){
//       $('#roomSelect').append("<option>" + roomName + "</option>")
//     },
//     addFriend: function(){     
//     console.log('hi')
//     },
//     handleSubmit:function(){
//     }
//   };

//   // setInterval(function(){
//     app.fetch();
    
//   // },3000)
  
// })
    


