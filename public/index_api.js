  
  function getproducts(done) {
    $.get("/api/product", data => {
      console.log(data);
      done(data);
    });
  }
  
  function addcartcall(
    userid,
    productid,
    done
  ) {
      $.post(
          "/api/cart",
          {
              user_id: userid,
            product_id: productid
  
          },
          function(data) {
            done(data);
          }
        );
  }
  
  function login(useremail, done) {
    $.get("/api/user",{email: useremail}, function(data) {
      console.log(data);
      done(data);
    });
  }