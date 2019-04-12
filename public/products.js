$(function() {
  let productname = $("#product_name");
  let productprice = $("#product_price");
  let productvendor = $("#product_vendor");
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
          <td>Product_Name</td><td>Vendor_Name
          </td><td>Price</td><td>Quantity </td>
          <td>
            Delete</td>
        </tr>`
        );
        for (let todo of products) {
          $("#producttable").append(
            `<tr>
            <td>${todo.Product_Name}</td><td>${
              todo.vendor.Vendor_Name
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
    getvendor(function(vendors) {
      $("#product_vendor").empty();
      for (let todo of vendors) {
        console.log(todo.Vendor_Name);
        $("#product_vendor").append(
          `<option value='${todo.Vendor_Id}'
                >${todo.Vendor_Name}</option
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
      $.trim($("#product_vendor").val()) == "" ||
      $.trim($("#product_qty").val()) == ""
    ) {
      alert("not a valid value");
    } else {
      addproduct(
        productname.val(),
        productprice.val(),
        productvendor.val(),
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
        <td>Product_Name</td><td>Vendor_Name
        </td><td>Price</td><td>Quantity </td>
        <td>
          Delete</td>
      </tr>`
      );
      for (let todo of products) {
        $("#producttable").append(
          `<tr>
          <td>${todo.Product_Name}</td><td>${
            todo.vendor.Vendor_Name
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
