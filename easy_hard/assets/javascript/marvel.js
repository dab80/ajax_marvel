(function() {
  //graphical items
  let submit_button = $("#submit");

  //storage items
  let search_text = $("#search_text");
  let search_string = "";

  //jQuery equivelent to window.onload = function{}
  $(document).ready(function() {
    //-- hide the table, which has at least a header row
    hide_table();
  });

  //-- perform the marvel data search
  function perform_search(search_url) {
    //-- create a picture url variable
    let a_pic_url = "";

    //-- put the search in a var so we can perform a promise below
    let my_var = $.get(search_url, function(data) {
      $.each(data.data.results, function(index, value) {

        //create the jpg string
        a_pic_url = value.thumbnail.path + "." + value.thumbnail.extension;
        // console.log(value.name + ' has image ' + a_pic_url);
        $('#myTable').append('<tr><td><img src="' + a_pic_url + '"></td><td><a href="' + value.id + '">' + value.name + '</a></td></tr>');

        //-- this inner loop would be used for, if there was an inner array in the data
        // $.each(value, function(key, value) {
        // document.write(key + " : " + value + "<br>");
        // }) //2nd each
      }) //1st each
    });

    //-- a promise function that waits for api call to complete
    my_var.done(function() {
      show_table();
      return; //adding this so the call to this function will wait
    });

  } //end of getQuestion

  function show_table() {
    //check for no reply for a minor character
    if ($('#myTable tr').length < 2) {
      //display no events for...
      $('#noEventsMsg').show();
    } else {
      $('#noEventsMsg').hide(); //do not display, as there are events
      $('#myTable').show();
      $('#events_instructions').show();
    }
    $('#response_div').show();
  }

  //-- hide the table related text
  function hide_table() {
    //-- hide the instructions & the table div
    $('#noEventsMsg').hide(); //do not display, as there are events
    $('#response_div').hide();
    $('#myTable').hide();
    $('#events_instructions').hide();
  }

  //-- captures a keyup where we're looking for CR
  $("input").keyup(function(e) {
    //get the key from the key up event
    var key = e.which;

    //check for the enter code of 13
    if (key == 13) {
      //remove all but the header row fro mthe table
      $('#myTable tr').has('td').remove();

      //get the search string fro mthe input text area
      search_string = search_text.val();
      // console.log("Search text  = " + search_string);

      //-- make sure the search string is not empty
      if (search_text.val() !== "") {
        //-- call the perform search function, which has a return of nothing
        perform_search("http://gateway.marvel.com/v1/public/characters?nameStartsWith=" + search_string + "&limit=100&ts=1&apikey=e185f6493571559ad353cc0e62941234&hash=eca8136a22bbe0a38f0ce624596938b6");
      }

      //-- remove the focus from the search box
      search_text.blur();
    }
  });

  //--the search text area now has the focus
  search_text.focus(function() {
    //-- clear text just in case
    search_text.val("");

    //hide the lower tables
    hide_table();
  });

  //-- this event is captured on mouse out of text area or when blur is called
  search_text.focusout(function() {
    //-- clear text just in case
    search_text.val("");
  });

  //--process a table click event
  $('#myTable').on("click", "tr", function(e) {
    //-- the following is needed to prevent an <a></a> from lauanching a web page
    e.preventDefault();

    // debugger;
    //The following search works because there's only one <a></a> in a row
    //DOM = innerHTML : "<a href="1010698">Young Avengers</a>"
    var marvelID = $(this).find("a").attr("href");
    var marvelName = $(this).find("a").html();

    //The following search works because there's only one <img> in a row
    //DOM = innerHTML: "<img src="http://i.annihil.us/u/prod/marvel/i/mg/b/c0/50fec602eed20.jpg">"
    var marvelPicURL = $(this).find("img").attr("src");

    //-- if nothing is null, store popup variables into memory
    if (marvelID != null && marvelName != null && marvelPicURL != null) {
      localStorage.setItem('marvelName', marvelName);
      localStorage.setItem('marvelID', marvelID);
      localStorage.setItem('marvelPicURL', marvelPicURL);

      // console.log("###########################");
      // console.log('Pic = ' + marvelPicURL);
      // console.log("Name = " + marvelName);
      // console.log('The ID = ' + marvelID);
      // console.log("###########################");

      // open the popup window
      var w = window.open("pop-up.html", "popupWindow", "width=780, height=600, scrollbars=yes, titlebar=no, toolbar=no, location=no");
    }
  }); //--end of table was clicked

})();
