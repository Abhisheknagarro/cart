function adduser(useremail, done) {
  $.post(
    "/api/user",
    {
      email: useremail
    },
    function(data) {
      done(data);
    }
  );
}


