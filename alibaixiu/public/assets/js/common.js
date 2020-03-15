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