(function() {
  'use strict';

  var userToken;
  // get users data on load, parse it, loop over if array and append users to ui;
  var users = JSON.parse(localStorage.getItem('users'));
  if(!users){
    users = [];
  }
  users.forEach( function (key){
  $('#contributors ul')
  .append( $('<li>').text(key.user)  )
  .append( $('<img>').attr('src', key.pic) );

}) ;

  $('#search').on('submit', function (event){
    event.preventDefault();

    userToken = $('#api-key').val();
    var searchUrl =  'https://api.github.com/search/repositories?q=' + $('#query').val();


    getData(searchUrl, userToken)
    .then( dataRetrieved )
    .then( commitRetrieved )
    .fail(function searchFailed(xhr) {
      console.warn( xhr );
      $('#contributors').append( 'Ajax failure! ' + xhr.status );
    });

  });

  function getData(url, token) {
    return $.ajax({
      url: url,
      dataType: 'json',
      headers: {
        Authorization: 'token ' + token
      }
    });
  }

  function dataRetrieved( data ) {
    var randomRepo = ([Math.floor(Math.random() * data.items.length)]);
    var repo = data.items[randomRepo];
    var commitUrl = 'https://api.github.com/repos/' + repo.full_name + '/commits';
    return getCommit(commitUrl, userToken);
  }

  function getCommit (url, token) {

    return $.ajax({
      url: url,
      dataType: 'json',
      headers: {
        Authorization: 'token ' + token
      }
    });
  }

  function commitRetrieved (data){
    console.log(data);
    var randomCommit = ([Math.floor(Math.random() * data.length)]);
    var singleCommit = data[randomCommit];
    if (singleCommit.author){
      var randomUser = singleCommit.author.login;
      var randomUserPic = singleCommit.author.avatar_url;
      storeNewData(randomUser, randomUserPic);
      appendAuthor(randomUser, randomUserPic);
    } else {
      $('#contributors').append( 'Try a new search!' );
    }
  }

  function appendAuthor (user, pic) {
    $('#contributors ul')
    .append( $('<li>').text(user)  )
    .append( $('<img>').attr('src', pic) );
  }

  function storeNewData(randomUser, randomUserPic){

    var user = {
      user: randomUser,
      pic: randomUserPic
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
// $ clearbutton, event handler on click, prevent default, localStorage.clear();
})();
