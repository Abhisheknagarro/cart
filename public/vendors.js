$(function() {
  let vendorname = $("#vendor_name");

  function refresh() {
    getvendor(function(vendors) {
      $("#vendortable").empty();
      if (vendors.length == 0) {
        $("#vendortable").append(
          `<li class="list-group-item"> No Item To View </li>`
        );
      } else {
        $("#vendortable").append(
          `<li class="list-group-item"><span>
            Vendor_Name
         </span><p style="float:right">Delete</p></li>`
        );
        for (let todo of vendors) {
          $("#vendortable").append(
            `<li class="list-group-item"><span> ${
              todo.Vendor_Name
            } </span><button type="button" class="btn btn-danger btn-sm" id="deletevendor" onClick="deletevendor(this)">Delete</button></li>`
          );
        }
      }
    });
  }
  refresh();

  $("#submit_vendor").click(function() {
    if ($.trim($("#vendor_name").val()) == "") {
      alert("not a valid value");
    } else {
      addvendor(vendorname.val(), function(addedvendor) {
        alert(addedvendor.message)
        refresh();
      });
    }
  });  
  
});
function refresh() {
  getvendor(function(vendors) {
    $("#vendortable").empty();
    if (vendors.length == 0) {
      $("#vendortable").append(
        `<li class="list-group-item"> No Item To View </li>`
      );
    } else {
      $("#vendortable").append(
        `<li class="list-group-item"><span>
          Vendor_Name
       </span><p style="float:right">Delete</p></li>`
      );
      for (let todo of vendors) {
        $("#vendortable").append(
          `<li class="list-group-item"><span> ${
            todo.Vendor_Name
          } </span><button type="button" class="btn btn-danger btn-sm" id="deletevendor" onClick="deletevendor(this)">Delete</button></li>`
        );
      }
    }
  });
}

function deletevendor(e){
  deletevendorcall(e.closest('li').getElementsByTagName('span')[0].textContent,function(deletedvendor) {
    alert(deletedvendor.message)
    refresh();
  })
}


