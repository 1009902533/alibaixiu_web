function msg(m){
    $(".alert-danger").show();
    $(".alert-danger span").html(m);
}
$("form input").on('keyup',function(e){
    if(e.keyCode === 13) {
        changes();
    }
})
$("#changepwd").on("click",function(){
    changes();
});
function changes(){
    var fomedata = $("form").serialize();
    $.ajax({
        type: "PUT",
        url: "/users/password",
        data: fomedata,
        success: function (res) {
            location.href = 'login.html'
        },
        error:function(err){
            console.log(err)
            msg(JSON.parse(err.responseText).message)
        }
    });
}