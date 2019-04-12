function addvender(vendername, done) {
  $.post(
    "/api/vender",
    {
      vender_name: vendername
    },
    function(data) {
      done(data);
    }
  );
}

function getvender(done) {
  $.get("/api/vender", data => {
    console.log(data);
    done(data);
  });
}

function deletevendercall(vendername, done) {
  $.ajax({
    url: '/api/vender',    
    type: "DELETE",
    dataType: 'json',
    data: {vender_name: vendername.trim() },
    success: function (data) {
        done(data);
    },
    error: function (data) {
        console.log('Error:', data);
    }
});
}
