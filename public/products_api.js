function getvender(done) {
  $.get("/api/vender", data => {
    console.log(data);
    done(data);
  });
}

function getproducts(done) {
  $.get("/api/product", data => {
    console.log(data);
    done(data);
  });
}

function addproduct(
  productname,
  productprice,
  productvender,
  productqty,
  done
) {
    $.post(
        "/api/product",
        {
          product_name: productname,
          product_price: productprice,
          product_vender: productvender,
          product_qty: productqty

        },
        function(data) {
          done(data);
        }
      );
}

function deleteproductcall(productname, vendername, done) {
  $.ajax({
    url: '/api/product',    
    type: "DELETE",
    dataType: 'json',
    data: {product_name: productname.trim(), vender_name: vendername.trim() },
    success: function (data) {
        done(data);
    },
    error: function (data) {
        console.log('Error:', data);
    }
});
}
