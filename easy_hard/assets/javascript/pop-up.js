(function() {
  //graphical items
  let submit_button = $("#submit");

  //hide the tables while the window is requesting data
  hide_tables();

  //jQuery equivelent to window.onload = function{}
  $(document).ready(function() {
    //--populate the main heading
    $('#main_heading').html('First Five Events for "' + localStorage.getItem('marvelName') + '"');

    //populate the two column table
    $('#myTable1').append('<tr><td><img src="' + localStorage.getItem('marvelPicURL') +
      '"></td><td>' + localStorage.getItem('marvelName') + '</td></tr>');

    //create the search string
    let search_url = "http://gateway.marvel.com/v1/public/characters/" + localStorage.getItem('marvelID') + "/events?&limit=5&ts=1&apikey=e185f6493571559ad353cc0e62941234&hash=eca8136a22bbe0a38f0ce624596938b6";

    //request event data
    let my_var = $.get(search_url, function(data) {
      $.each(data.data.results, function(index, value) {
        $('#myTable2').append('<tr><td>' + value.title + '</td><td>' + value.creators.available + '</td><td><p>' + value.description + '</p><td/></tr>');
      }) //1st each
    });

    //-- a promise function that waits for api call to complete
    my_var.done(function() {
      show_tables();
    });

  });

  function hide_tables() {
    //-- hide the instructions & the table div
    $('#response_div').hide();
    $('#myTable1').hide();
    $('#myTable2').hide();
  }//end of hide_tables

  function show_tables() {
    //check for no reply for a minor character
    if ($('#myTable2 tr').length < 2) {
      //display no events for...
      $('#noEventsMsg').show();
      $('#myTable1').show();
    } else {
      $('#noEventsMsg').hide(); //do not display, as there are events
      $('#myTable1').show();
      $('#myTable2').show();
    }

    //display the table div
    $('#response_div').show();

  }//end of show tables
})();
