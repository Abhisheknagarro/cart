function getproducts(userid, done) {
    $.get("/api/cart", {user_id: userid},data => {
      console.log(data);
      done(data);
    });
  }


  function login(useremail, done) {
    $.get("/api/user",{email: useremail}, function(data) {
      console.log(data);
      done(data);
    });
  }

  function deletecartcall(productid, userid, done) {
    $.ajax({
      url: '/api/cart',    
      type: "DELETE",
      dataType: 'json',
      data: {product_id: productid.trim(), user_id: userid.trim() },
      success: function (data) {
          done(data);
      },
      error: function (data) {
          console.log('Error:', data);
      }
  });
  }
  