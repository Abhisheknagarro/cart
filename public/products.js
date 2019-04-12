$(function() {
  let productname = $("#product_name");
  let productprice = $("#product_price");
  let productvender = $("#product_vender");
  let productqty = $("#product_qty");

  function refresh() {
    getproducts(function(products) {
      $("#producttable").empty();
      if (products.length == 0) {
        $("#producttable").append(
          `<tr> <td>No Item To View</td>
          </tr>`
        );
      } else {
        $("#producttable").append(
          `<tr>
          <td>Product_Name</td><td>Vender_Name
          </td><td>Price</td><td>Quantity </td>
          <td>
            Delete</td>
        </tr>`
        );
        for (let todo of products) {
          $("#producttable").append(
            `<tr>
            <td>${todo.Product_Name}</td><td>${
              todo.vender.Vender_Name
            } </td><td>${todo.Price}</td><td> ${todo.Quantity} </td>
            <td><button
              type="button"
              class="btn btn-danger btn-sm"
              id="deleteproduct" onClick="deleteproduct(this)"
            >
              Delete
            </button></td>
          </tr>`
          );
        }
      }
    });
  }
  refresh();
  function dropdownval() {
    getvender(function(venders) {
      $("#product_vender").empty();
      for (let todo of venders) {
        console.log(todo.Vender_Name);
        $("#product_vender").append(
          `<option value='${todo.Vender_Id}'
                >${todo.Vender_Name}</option
              >`
        );
      }
    });
  }

  dropdownval();

  $("#submit_product").click(function() {
    if (
      $.trim($("#product_name").val()) == "" ||
      $.trim($("#product_price").val()) == "" ||
      $.trim($("#product_vender").val()) == "" ||
      $.trim($("#product_qty").val()) == ""
    ) {
      alert("not a valid value");
    } else {
      addproduct(
        productname.val(),
        productprice.val(),
        productvender.val(),
        productqty.val(),
        function(addedproduct) {
          alert(addedproduct.message)
          refresh();
        }
      );
    }
  });
});

function refresh() {
  getproducts(function(products) {
    $("#producttable").empty();
    if (products.length == 0) {
      $("#producttable").append(
        `<tr> <td>No Item To View</td>
        </tr>`
      );
    } else {
      $("#producttable").append(
        `<tr>
        <td>Product_Name</td><td>Vender_Name
        </td><td>Price</td><td>Quantity </td>
        <td>
          Delete</td>
      </tr>`
      );
      for (let todo of products) {
        $("#producttable").append(
          `<tr>
          <td>${todo.Product_Name}</td><td>${
            todo.vender.Vender_Name
          } </td><td>${todo.Price}</td><td> ${todo.Quantity} </td>
          <td><button
            type="button"
            class="btn btn-danger btn-sm"
            id="deleteproduct" onClick="deleteproduct(this)"
          >
            Delete
          </button></td>
        </tr>`
        );
      }
    }
  });
}


function deleteproduct(e){
  var data = e.closest('tr').getElementsByTagName('td');
  deleteproductcall(data[0].textContent, data[1].textContent,function(deleteproduct) {
    alert(deleteproduct.message)
    refresh();
  })
}
