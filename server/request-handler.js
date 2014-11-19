var utils = require('./utils');

var objectId = 1;

var messages = [
  {
    text: 'hello world',
    username: 'Rene',
    objectId: objectId,
    roomname: 'The New Lobby'
  }
];

var actions = {
  'GET': function(request, response){
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response){
   utils.collectData(request, function(message){
      message.objectId = ++objectId;
      messages.push(message);
      utils.sendResponse(response, {objectId: 1});
     });
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response);

  }
}


module.exports = function(request, response) {

  var action = actions[request.method]
  if(action){
    action(request, response);
  }else{
    utils.sendResponse(response, "not Found", 404)
  };

};
