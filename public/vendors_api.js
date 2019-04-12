function addvendor(vendorname, done) {
  $.post(
    "/api/vendor",
    {
      vendor_name: vendorname
    },
    function(data) {
      done(data);
    }
  );
}

function getvendor(done) {
  $.get("/api/vendor", data => {
    console.log(data);
    done(data);
  });
}

function deletevendorcall(vendorname, done) {
  $.ajax({
    url: '/api/vendor',    
    type: "DELETE",
    dataType: 'json',
    data: {vendor_name: vendorname.trim() },
    success: function (data) {
        done(data);
    },
    error: function (data) {
        console.log('Error:', data);
    }
});
}
