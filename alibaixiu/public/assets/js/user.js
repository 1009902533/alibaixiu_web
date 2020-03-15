var userlist = [];
//获取用户列表
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        userlist = res;
        render();
    }
});
function render(){
    var html = template('tpl',{data:userlist})
    $("#userlist").html(html)
}
