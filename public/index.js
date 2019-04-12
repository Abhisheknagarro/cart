$(function(){
    function displayproduct() {
        getproducts(function(products) {
          $("#forproductdisplaycard").empty();
          if (products.length == 0) {
            $("#forproductdisplaycard").append(
              `<div class="card">
                  <div class="card-body">
                  No Item To View</div>
                  </div>`
            );
          } else {
            for (let todo of products) {
              $("#forproductdisplaycard").append(
                `<div class="card text-center">
                      <div class="card-header" id="product_name">
                      ${todo.Product_Name}
        </div>
                  <div class="card-body" >
                  <h5 class="card-title" id="vendor_name">Vendor Name: ${todo.vendor.Vendor_Name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted" id="product_id"><span>Product Id:</span><span> ${
                    todo.Product_Id
                  }</span></h6>
                  <p class="card-text" id="product_price">Price: ${todo.Price} </p>
                  <p class="card-text" id="product_qty"><span>Quantity: </span><span>${todo.Quantity} </span></p>
                  <p><button
                      type="button"
                      class="btn btn-primary btn-sm" 
                      id="addtocart" onClick="addtocart(this)"
                    >
                      Add To Cart
                    </button></p>
                    </div>
                  </div>`
              );                           
            }
          }
        });
        
      }
      if(sessionStorage.getItem("Email") != null){
        $("#user_email").val(sessionStorage.getItem("Email")) 
        $("#login").hide();
        $("#logout").show();       
        displayproduct()        
      }
      else{
        $("#user_email").val("");
        $("#login").show();
        $("#logout").hide();        
        displayproduct() 
      }
      
})
function displayproduct() {
  getproducts(function(products) {
    $("#forproductdisplaycard").empty();
    if (products.length == 0) {
      $("#forproductdisplaycard").append(
        `<div class="card">
            <div class="card-body">
            No Item To View</div>
            </div>`
      );
    } else {
      for (let todo of products) {
        $("#forproductdisplaycard").append(
          `<div class="card text-center">
                <div class="card-header" id="product_name">
                ${todo.Product_Name}
  </div>
            <div class="card-body">
            <h5 class="card-title" id="vendor_name">Vendor Name: ${todo.vendor.Vendor_Name}</h5>
            <h6 class="card-subtitle mb-2 text-muted" id="product_id"><span>Product Id:</span><span> ${
              todo.Product_Id
            }</span></h6>
            <p class="card-text" id="product_price">Price: ${todo.Price} </p>
            <p class="card-text" id="product_qty"><span>Quantity: </span><span>${todo.Quantity}</span> </p>
            <p><button
                type="button"
                class="btn btn-primary btn-sm"
                id="addtocart" onClick="addtocart(this)"
              >
                Add To Cart
              </button></p>
              </div>
            </div>`
        );
      }
    }
  });
}

function loginuser() {
  let email = $.trim($("#user_email").val()).toLowerCase();
  if (email == "") {
    alert("not a valid email");
  } else {
    login(email, function(user) {
      if (user.Email === email) {
        sessionStorage.setItem("Email", email);
        sessionStorage.setItem("Id", user.User_Id);
        $("#login").hide();
        $("#logout").show();  
        displayproduct();
      } else {
        alert("Email is not valid");
      }
    });
  }
}

function logoutuser(){
        sessionStorage.clear("Email");
        sessionStorage.clear("Id");
        $("#user_email").val("");
        $("#logout").hide();
        $("#login").show();          
        displayproduct();
}
function addtocart(e) {
  if(sessionStorage.getItem("Id") == null){
    alert('login first')
  }
  else{
    var pro_id = e.closest('div').getElementsByTagName('h6')[0].getElementsByTagName('span')[1].textContent;
    
    addcartcall(
        parseInt(sessionStorage.getItem("Id")),parseInt(pro_id),
      function(addedproduct) {
        alert(addedproduct.message);
        displayproduct();
      }
    );
  }
}


    
