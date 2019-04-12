$(function() {
  let useremail = $("#user_email");
  $("#submit_email").click(function() {
    if ($.trim($("#user_email").val()).toLowerCase() == "") {
      alert("not a valid value");
    } else {
      adduser(useremail.val().toLowerCase(), function(addeduser) {
        alert(addeduser.message)
      });
    }
  });
});
