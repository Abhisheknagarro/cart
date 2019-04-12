function getvendor(done) {
  $.get("/api/vendor", data => {
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
  productvendor,
  productqty,
  done
) {
    $.post(
        "/api/product",
        {
          product_name: productname,
          product_price: productprice,
          product_vendor: productvendor,
          product_qty: productqty

        },
        function(data) {
          done(data);
        }
      );
}

function deleteproductcall(productname, vendorname, done) {
  $.ajax({
    url: '/api/product',    
    type: "DELETE",
    dataType: 'json',
    data: {product_name: productname.trim(), vendor_name: vendorname.trim() },
    success: function (data) {
        done(data);
    },
    error: function (data) {
        console.log('Error:', data);
    }
});
}
