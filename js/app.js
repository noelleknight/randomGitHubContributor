(function() {
  'use strict';

  $('#search').on('submit', function (event){
     event.preventDefault();

    var userToken = $('#api-key').val();
    var searchUrl =  'https://api.github.com/search/repositories?q=' + $('#query').val();
    getData(searchUrl, userToken)
      .then( dataRetrieved );
    //   .then()
    // console.log('this works');

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
          console.log(data.items[randomRepo]);
          return data.items[randomRepo];
        }

        // var userData = JSON.parse(localStorage.getItem('userData'));
        // if (!userData) {
        //     userData = [];
        // }
        // userData = userData.concat( data.results );
        // localStorage.setItem( 'userData', JSON.stringify(userData) );
        //
        // $('.results').append( JSON.stringify( data.results ) );
        // if (data.next) {
        //     return getData( 'data-' + data.next + '.json' );
        // } else {
        //     return 'no more results!';
        // }


})();
