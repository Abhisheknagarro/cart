$(function() {
  let vendername = $("#vender_name");

  function refresh() {
    getvender(function(venders) {
      $("#vendertable").empty();
      if (venders.length == 0) {
        $("#vendertable").append(
          `<li class="list-group-item"> No Item To View </li>`
        );
      } else {
        $("#vendertable").append(
          `<li class="list-group-item"><span>
            Vender_Name
         </span><p style="float:right">Delete</p></li>`
        );
        for (let todo of venders) {
          $("#vendertable").append(
            `<li class="list-group-item"><span> ${
              todo.Vender_Name
            } </span><button type="button" class="btn btn-danger btn-sm" id="deletevender" onClick="deletevender(this)">Delete</button></li>`
          );
        }
      }
    });
  }
  refresh();

  $("#submit_vender").click(function() {
    if ($.trim($("#vender_name").val()) == "") {
      alert("not a valid value");
    } else {
      addvender(vendername.val(), function(addedvender) {
        alert(addedvender.message)
        refresh();
      });
    }
  });  
  
});
function refresh() {
  getvender(function(venders) {
    $("#vendertable").empty();
    if (venders.length == 0) {
      $("#vendertable").append(
        `<li class="list-group-item"> No Item To View </li>`
      );
    } else {
      $("#vendertable").append(
        `<li class="list-group-item"><span>
          Vender_Name
       </span><p style="float:right">Delete</p></li>`
      );
      for (let todo of venders) {
        $("#vendertable").append(
          `<li class="list-group-item"><span> ${
            todo.Vender_Name
          } </span><button type="button" class="btn btn-danger btn-sm" id="deletevender" onClick="deletevender(this)">Delete</button></li>`
        );
      }
    }
  });
}

function deletevender(e){
  deletevendercall(e.closest('li').getElementsByTagName('span')[0].textContent,function(deletedvender) {
    alert(deletedvender.message)
    refresh();
  })
}


