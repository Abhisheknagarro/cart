//cart.js
$(function(){    

  function refresh(userid) {
    getproducts(userid, function(products) {
      var total_price = 0;
      $("#producttable").empty();
      if (products.length == 0) {
        $("#producttable").append(
          `<tr> <td>No Item To View</td>
          </tr>`
        );
      } else {
        $("#producttable").append(
        `<tr>
            <td>Product_Id</td>
            <td>Product_Name</td><td>Vender_Name
            </td><td>Price</td><td>Quantity</td>
            <td>
              Delete</td>
          </tr>`
        );
        for (let todo of products) {
          $("#producttable").append(
            `<tr>
            <td>${todo.Product_Id}</td>
            <td>${todo.product.Product_Name}</td><td>${
              todo.product.vender.Vender_Name
            } </td><td>${todo.product.Price * todo.Quantity}</td><td> ${todo.Quantity} </td>
            <td><button
              type="button"
              class="btn btn-danger btn-sm"
              id="deleteproduct" onClick="deletecart(this)"
            >
              Delete
            </button></td>
          </tr>`
          );
          total_price += todo.product.Price * todo.Quantity;
        }
        $("#producttable").append(
          `<tr><td>Total Price = ${total_price}</td></tr>`
        );
      }
    });
  }
  refresh(0)
  if(sessionStorage.getItem("Email") != ''){
    $("#user_email").val(sessionStorage.getItem("Email"))
      refresh(sessionStorage.getItem("Id"));
  }
  
})
function refresh(userid) {
    getproducts(userid, function(products) {
      var total_price = 0;
      $("#producttable").empty();
      if (products.length == 0) {
        $("#producttable").append(
          `<tr> <td>No Item To View</td>
          </tr>`
        );
      } else {
        $("#producttable").append(
          `<tr>
              <td>Product_Id</td>
              <td>Product_Name</td><td>Vender_Name
              </td><td>Price</td><td>Quantity</td>
              <td>
                Delete</td>
            </tr>`
          );
        for (let todo of products) {
          $("#producttable").append(
            `<tr>
            <td>${todo.Product_Id}</td>
            <td>${todo.product.Product_Name}</td><td>${
              todo.product.vender.Vender_Name
            } </td><td>${todo.product.Price * todo.Quantity}</td><td> ${todo.Quantity} </td>
            <td><button
              type="button"
              class="btn btn-danger btn-sm"
              id="deleteproduct" onClick="deletecart(this)"
            >
              Delete
            </button></td>
          </tr>`
          );
          total_price += todo.product.Price * todo.Quantity;
        }
        $("#producttable").append(
          `<tr><td>Total Price = ${total_price}</td></tr>`
        );
      }
    });
  }

function loginuser() {
    let email = $.trim($("#user_email").val());
    if (email == "") {
      alert("not a valid email");
    } else {
      login(email, function(user) {
        if (user.Email === email) {
          sessionStorage.setItem("Email", email);
          sessionStorage.setItem("Id", user.User_Id);
          refresh(sessionStorage.getItem("Id").toString());
        } else {
          alert("Email is not valid");
        }
      });
    }
  }


  function deletecart(e){
    var data = e.closest('tr').getElementsByTagName('td');
    deletecartcall(data[0].textContent,sessionStorage.getItem("Id").toString(),function(deletecart) {
      alert(deletecart.message)
      refresh(sessionStorage.getItem("Id").toString());
    })
  }    
