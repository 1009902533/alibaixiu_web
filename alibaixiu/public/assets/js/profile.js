function msg(m){
    $(".alert-danger").show();
    $(".alert-danger span").html(m);
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
            $("#myphoto").attr('src',res[0].avatar);
            $("#myavatar").val(res[0].avatar)
        }
    });
})
$("#gengxin").on("click",function(){
    var myavatar = $("#myavatar").val();
    var mynickname = $("#mynickname").val();
    if(mynickname.trim().length < 2 || mynickname.trim().length > 16) {
        return msg("昵称限制在 2-16 个字符!");
    }
    $.ajax({
        type: "PUT",
        url: "/users/" + userId,
        data: {
            nickName:mynickname,
            avatar:myavatar
        },
        success: function (res) {
            $(".alert-danger").hide();
            console.log(res)
        }
    });
})