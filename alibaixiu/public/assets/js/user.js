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
//上传头像
$("#avatar").on('change',function(){
    var formdata = new FormData();
    formdata.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formdata,
        //不解析formData
        processData:false,
        //不添文件加类型
        contentType:false,
        success:function(res){
            console.log(res)
            $("#img").attr('src',res[0].avatar);
            $("#imgurl").val(res[0].avatar)
        }
    });
})
//添加用户
$("#usersub").on('click',function(){
    var formdata = $('#form').serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formdata,
        success:function(res){
            $(".alert-danger").hide();
            $("#resetInfo").trigger("click");
            $("#img").attr('src','../assets/img/default.png');
            $("#imgurl").val('')
            userlist.unshift(res);
            render();
        },
        error:function(err){
            console.log(err)
            msg(JSON.parse(err.responseText).message)
        }          
    })
});
function msg(m){
    $(".alert-danger").show();
    $(".alert-danger span").html(m);
}