//退出登录
$("#logout").on("click",function(){
    var config = confirm("你真的要退出登录吗？");
    if(config) {
        $.ajax({
            type:'post',
            url:'/logout',
            success:function(){
                location.href = 'login.html'
            },
            error:()=>{
                alert("退出失败")
            }
        });
    }
});

//用户信息展示
$.ajax({
    type:'get',
    url:'/users/' + userId,
    success:function(res){
        if(res.avatar){
            $(".profile .avatar,#myphoto").attr('src',res.avatar);
            $("#myavatar").val(res.avatar);
        }
        $("#myemail").val(res.email);
        $("#mynickname").val(res.nickName);
        $(".profile .name").html(res.nickName);
    }
});