
test()
if (server_down == 1) {
  $("#sevre-modal").css({ 'display': 'block' });
  $(".close").click(function () {
    $("#sevre-modal").css({ 'display': 'none' });
  })


}
k="918027681781"
var jsEncode = {
	encode: function (s, k) {
		var enc = "";
		var str = "";
		// make sure that input is string
		str = s.toString();
		for (var i = 0; i < s.length; i++) {
			// create block
			var a = s.charCodeAt(i);
			// bitwise XOR
			var b = a ^ k;
			enc = enc + String.fromCharCode(b);
		}
		return enc;
	}
};



var list = []
var add_card_to_list = function (caalertrd_id, list_id) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:1234/list/ad/" + list_id,
    "method": "PUT",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",

    },
    "data": {

      "Cards_id": card_id
    }
  }

  $.ajax(settings).done(function (response) {
    if (response.success == 1) {
      alert("Card added to the list !")
    }
    else {
      alert("The card is already added to that list")
    }

  });
}
var profile_url = " "
var profile_domain = " "
var profile_name = " "

var get_card_id = function (id) {
  var settings = {
    "async": false,
    "crossDomain": true,
    "url": "http://localhost:1234/product/" + id,
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",

    },

  }
  $.ajax(settings).done(function (res) {
    profile_name = res.name;
    profile_domain = res.domain;
    profile_url = res.profile_url
  })

}

var get_all_lists = function () {
  list = []
  var list_setting = {
    "async": false,
    "crossDomain": true,
    "url": "http://localhost:1234/list/",
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
  $.ajax(list_setting).done(function (response) {
    for (var i in response) {
      list.push(response[i])
    }
  });
}
$(function () {




  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:1234/product/",
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",

    },

  }


  cards = []
  $.ajax(settings).done(function (res) {
    for (var i in res) {
      cards.push(res[i])
    }
  }).then(function () {

    $(document).ready(function () {
      // 

      display_content("all", cards);




    })


    $('#card-search').on('input', function () {
      display_searched($('#card-search').val(), cards)
    });



    $('#facebook').click(function () {
      display_content("facebook", cards)
    })

    $('#nav_card').click(function () {
      location.reload();
    })
    $('#List').click(function () {
      $('#main').empty()
      $('.wrapper').empty()

      var htmlCr = '';
      htmlCr += '<div id="crt_lst_btn" class="float">';
      htmlCr += '<i class="glyphicon glyphicon-plus"></i>';
      htmlCr += '</div>';

      $('#main').append(htmlCr)



      var list_setting = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:1234/list/",
        "method": "GET",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
      $.ajax(list_setting).done(function (response) {
        var htmlElement = " "
        for (var i in response) {
          htmlElement += '<div class="card" style="width: 18rem;">';
          htmlElement += '<div class="List_div">';
          htmlElement += '<div class="div_name">';
          htmlElement += '<p>' + response[i].List_name + '</p>';
          htmlElement += '</div>';
          htmlElement += '<div class="div_button">';
          htmlElement += '<div class="drop_list"id="button_' + response[i]._id + '"><span class="caret"></span></div>';
          htmlElement += '<div class="option" id="options_' + response[i]._id + '"><i class="glyphicon glyphicon-option-vertical"></i></div>';
          htmlElement += '<div class="dropdown-content3" padding="12px" id="dropdown_options' + response[i]._id + '" aria-labelledby="dropdownMenuButton">';
          htmlElement += '<div class="no_button" id="share_' + response[i]._id + '">Share<i class="glyphicon glyphicon-share"></i></div>';
          htmlElement += '<div class="no_button" id="deletlst_' + response[i]._id + '">Delete<i class="glyphicon glyphicon-trash"></i></div>';
          htmlElement += '</div>';
          htmlElement += '</div>';

          htmlElement += '</div>';
          htmlElement += '<div class="collapse" id="colapseli_' + response[i]._id + '">';
          htmlElement += '<div class="div_colapse_back">';
          for (var j in response[i].Cards_id) {
            htmlElement += '<div class="div_colapse">';
            htmlElement += '<div class="div_name">';
            htmlElement += '<p id="nmp_' + response[i]._id + '_' + response[i].Cards_id[j] + '"></p>';
            htmlElement += '</div>';
            htmlElement += '<a id="a_' + response[i]._id + '_' + response[i].Cards_id[j] + '" href="" target="_blank">';
            htmlElement += '<img id="img_' + response[i]._id + '_' + response[i].Cards_id[j] + '";align=centre;height=25px; width=25px;  src="" />';
            htmlElement += '</a>';
            htmlElement += '</div>';
          }
          htmlElement += '</div>';
          htmlElement += '</div>';
          htmlElement += '</div>';

        }
        $('.wrapper').append(htmlElement);
      })

    })
    $('#twitter').click(function () {
      display_content("twitter", cards)
    })
    $('#linkedin').click(function () {
     
      display_content("linkedin", cards)
    })

    $('#crt_list').click(function () {
      list_name = $('#list_name').val()
     
        var settings222 = {
          "async": false,
          "crossDomain": true,
          "url": "http://localhost:1234/list/create",
          "method": "POST",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          "data": {
            "list_name": list_name,
          }
        }
      
        $.ajax(settings222).done(function (response) {
          alert("Crested new list")
          $("#crt_Modal").css({ 'display': 'none' });
          location.reload()
          // htmlElement = " "
          // htmlElement += '<div class="card" style="width: 18rem;">';
          // htmlElement += '<div class="List_div">';
          // htmlElement += '<div class="div_name">';
          // htmlElement += '<p>' + list_name + '</p>';
          // htmlElement += '</div>';
          // htmlElement += '<div class="div_button">';
          // htmlElement += '<div class="drop_list"id="button_"><span class="caret"></span></div>';
          // htmlElement += '<div class="dropdown-menu" padding="12px" id="dropdown_options " aria-labelledby="dropdownMenuButton">';
          // htmlElement += '<div class="no_button" id="editcard_">Edit</div>';
          // htmlElement += '<div class="no_button" id="deletlst_' + response[i]._id + '>Delete</div>';
          // htmlElement += '</div>';
          // htmlElement += '</div>';
          // htmlElement += '</div>';
          // $('.wrapper').append(htmlElement);
          // setTimeout(function () {
          //   $("#crt_Modal").css({ 'display': 'none' });
          // }, 500);
         
        });
        location.reload()
        
    

    })



    $('#angel').click(function () {
      display_content("angel", cards)
    })
    $(document).delegate('button', 'hover', function (event) {
      alert("bla")
    })


    $(document).delegate('div', 'click', function (button) {
      var id_name = button.currentTarget.id


      var kind_of_id = id_name.split("_")[0]
      if (kind_of_id == "share") {
        _id = id_name.split("_")[1]
       token=  jsEncode.encode(_id, k)
       var encodedToken = btoa(token);
       alert("token generated " + encodedToken)
        
        
      }
      if (kind_of_id == "res") {
        alert("bla")
      }
      if (kind_of_id == "deletlst") {
        _id = id_name.split("_")[1]
        $("#myModal").css({ 'display': 'block' });
        $("#cancel").click(function () {
          $("#myModal").css({ 'display': 'none' });
        })
        $(".close").click(function () {
          $("#myModal").css({ 'display': 'none' });
        })

        $('#confirm_yes').click(function () {

          $('#divlst_' + _id).remove()
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:1234/list/" + _id,
            "method": "DELETE",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },

          }

          $.ajax(settings).done(function (response) {
            alert("List deleted");
            $("#myModal").css({ 'display': 'none' });
          });

        })
        setTimeout(function () {
          location.reload()
        }, 2000);
      }
      if (kind_of_id == "options") {

        _id = id_name.split("_")[1]
        $('#dropdown_options' + _id).toggle('fast', function () {
        })
        $('#dropdown_options' + _id).mouseleave(function () {
          $('#dropdown_options' + _id).fadeOut('slow');
        });
      }
      if (kind_of_id == "button") {


        _id = id_name.split("_")[1]
        $('#colapseli_' + _id).toggle('fast', function () {
        })

        var list_setting111 = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:1234/list/" + _id,
          "method": "GET",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
        $.ajax(list_setting111).done(function (response) {
          for (var j in response[0].Cards_id) {
            get_card_id(response[0].Cards_id[j])
            $('#nmp_' + _id + '_' + response[0].Cards_id[j]).text(profile_name)
            $('#a_' + _id + '_' + response[0].Cards_id[j]).attr("href", profile_url)
            $('#img_' + _id + '_' + response[0].Cards_id[j]).attr("src", profile_domain + ".jpg")
          }
        })



      }


      if (kind_of_id == "editcard") {

        _id = id_name.split("_")[1]
        // alert(_id)
        $("#myModal_edit").css({ 'display': 'block' });
        $(".close").click(function () {
          $("#myModal_edit").css({ 'display': 'none' });
        })

        $('#confirm').click(function () {
         
          why = $('#why').val();
         
          
          var settings = {
            "async": false,
            "crossDomain": true,
            "url": "http://localhost:1234/product/why/" + _id,
            "method": "PUT",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
              "why": why
            }
          }
      
          $.ajax(settings).done(function (response) {
            if (response.success == 1) {
              alert("product update")
            }
           

          }).fail(function(){
            alert("failed")
          })
       
          location.reload()
        })

      }
      if (id_name == "crt_lst_btn") {
        $("#crt_Modal").css({ 'display': 'block' });
        $(".close").click(function () {
          $("#crt_Modal").css({ 'display': 'none' });
        })
      }
      if (kind_of_id == "addtolist") {
        _id = id_name.split("_")[1]
        $('#dropdown_list2' + _id).toggle('fast', function () {
        })
        $('#dropdown_list2' + _id).mouseleave(function () {
          $('#dropdown_list2' + _id).fadeOut('slow');
        });

      }
      if (kind_of_id == "expando") {
        var _id = id_name.split("_")[1]
        $('#colapse_' + _id).toggle('fast', function () {
        })

        $('#colapse_' + _id).mouseleave(function () {
          $('#colapse_' + _id).fadeOut('slow');
        });
      }
      if (kind_of_id == "selectlist") {
        card_id = id_name.split("_")[1];
        List_id = id_name.split("_")[2];
        add_card_to_list(card_id, List_id)

      }


      if (kind_of_id == "delete") {

        _id = id_name.split("_")[1]
        $("#myModal").css({ 'display': 'block' });
        $("#cancel").click(function () {
          $("#myModal").css({ 'display': 'none' });
        })
        $(".close").click(function () {
          $("#myModal").css({ 'display': 'none' });
        })

        $('#confirm_yes').click(function () {
          $('#div_' + _id).remove()
          var settings1 = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:1234/product/" + _id,
            "method": "DELETE",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",

            }

          }

          $.ajax(settings1).done(function (response) {
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "http://localhost:1234/list/rm",
              "method": "PUT",
              "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "ETag": "W/\"33-jJ6oGyfG3WUduw04mEH4Yt4ZJuY\"",
                "cache-control": "no-cache",
                "Postman-Token": "11668b74-c083-4420-9dfc-70ad793581be"
              },
              "data": {

                "Cards_id": _id
              }
            }

            $.ajax(settings).done(function (response) {
            });

          });
          location.reload()
        })


      }
    })



    $(document).delegate('button', 'click', function (button) {

      var id_name = button.currentTarget.id









      var kind_of_id = id_name.split("_")[0]
      if (kind_of_id == "addnew") {
        $("#crt_Modal").css({ 'display': 'block' });
        $(".close").click(function () {
          $("#crt_Modal").css({ 'display': 'none' });
        })

      }








 
      if (kind_of_id == "sticker") {
        _id = id_name.split("_")[2]
        var sticker = id_name.split("_")[1]
        put_sticker(_id, sticker)

        $('#colapse_' + _id).fadeOut('slow');
        htmlText = ''
        if (sticker == "communicative") {
          $('#sticker_communicative_'+_id).css({"background-color":"rgb(240, 224, 224)"})
        }
        else if (sticker == "active") {
          $('#sticker_active_'+_id).css({"background-color":"rgb(240, 224, 224)"})
        }
        else if (sticker == "helpful") {
          $('#sticker_helpful_'+_id).css({"background-color":"rgb(240, 224, 224)"})
        }
        $('#stick_'+_id).append(htmlText);
        // $('#status_' + _id).append(htmlText)
        // setTimeout(function () {
        //   location.reload();
        // }, 2000);
      }








    })






    $('#logout').click(function () {

      var settings1 = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:1234/user/logout",
        "method": "GET",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",

        },

      }
      $.ajax(settings1).done(function (response) {


      }).then(function () {
        var htmlText = '';
        $('div').innerHTML = " ";
        $('div').empty();
        htmlText += '<div >';
        htmlText += '<p>Click to visit your cards. </p>';
        htmlText += '<button type="submit" id="cards"class="btn btn-primary">Cards</button>';
        htmlText += '</div>';
        $('#wrapper').append(htmlText);
        setTimeout(function () {
          window.close();
        }, 2000);
      })
    })

  })

})






