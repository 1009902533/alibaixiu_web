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
    url:'/users',
    success:function(res){
        var user = res.find((item)=>{
            return item._id === userId
        })
        if(user.avatar){
            $(".profile .avatar").attr('src',user.avatar);
        }
        
        $(".profile .name").html(user.nickName);
    }
});
