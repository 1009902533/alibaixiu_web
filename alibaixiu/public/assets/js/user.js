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

//编辑用户
var userId;
$("#userlist").on('click','.edi',function(){
    $("#usersub").hide();
    $("#useredi").show();
    userId = $(this).attr('data-id');
    let tr = $(this).parents('tr');
    $("#img").attr('src',tr.children().eq(1).children($('img')).attr('src'));
    $("#imgurl").val(tr.children().eq(1).children($('img')).attr('src'));
    $('[name="email"]').val(tr.children().eq(2).text()).attr('disabled',true);
    $('[name="password"]').attr('disabled',true);
    $('[name="nickName"]').val(tr.children().eq(3).text());
    if (tr.children().eq(4).text() == '激活') {
        $('#status1').prop('checked', true);
    } else {
        $('#status0').prop('checked', true);
    }
    if (tr.children().eq(5).text() == '超级管理员') {
        $('#role0').prop('checked', true);
    } else {
        $('#role1').prop('checked', true);
    }
})

$("#useredi").on('click',function(){
    var formdata = $('#form').serialize();
    
    $.ajax({
        type:'PUT',
        url:'/users/'+userId,
        data:formdata,
        success:function(res){
            $(".alert-danger").hide();
            $("#resetInfo").trigger("click");
            $("#img").attr('src','../assets/img/default.png');
            $("#imgurl").val('');
            $('[name="email"]').attr('disabled',false);
            $('[name="password"]').attr('disabled',false);
            $("#usersub").show();
            $("#useredi").hide();
            var index = userlist.findIndex((item)=>{
                return item._id === res._id
            })
            userlist[index] = res;
            render();
        },
        error:function(err){
            console.log(err)
            msg(JSON.parse(err.responseText).message)
        }          
    })
});

//删除单个用户
$("#userlist").on('click','.del',function(){
    var id = $(this).attr('data-id');
    var isdel = confirm("确认删除？");
    if(isdel){
        $.ajax({
            type:'delete',
            url:'/users/' + id,
            success:function(res){
                var index = userlist.findIndex((item)=>{
                    return item._id === res._id
                })
                userlist.splice(index,1);
                render();
            },
            error:function(err){
                console.log(err)
                msg(JSON.parse(err.responseText).message)
            }
        });
    }
})

//删除多个用户
function ischeckedId(){
    var str = '';
    $.each($("#userlist input:checked"), function (index, item) { 
        str += $(item).parent('td').siblings('td').children(".edi").attr('data-id') + '-'
    });
    return str.substr(0, str.length - 1)
}
$("#all").on("click",function(){
    $(".dellist").show();
    $('[type="checkbox"]').prop('checked',$(this).prop('checked'))
    if($("#userlist input:checked").length === 0) return $(".dellist").hide();
})
$("#userlist").on('change','[type="checkbox"]',function(){
    $(".dellist").show();
    var choses = $("#userlist input:checked").length === $("#userlist input").length;
    $("#all").prop("checked",choses);
    if($("#userlist input:checked").length === 0) return $(".dellist").hide();
})
//点击删除按钮
$(".dellist").on('click',function(){
    var id = ischeckedId();
    var isdel = confirm("确认删除？");
    if(isdel){
        $.ajax({
            type:'delete',
            url:'/users/' + id,
            success:function(res){
                if(typeof res === Array) {
                    res.forEach((i) => {
                        var index = userlist.findIndex((item)=>{
                            return item._id === i._id
                        })
                        userlist.splice(index,1);
                    });
                } else {
                    var index = userlist.findIndex((item)=>{
                        return item._id === res._id
                    })
                    userlist.splice(index,1);
                }
                render()
            },
            error:function(err){
                console.log(err)
                msg(JSON.parse(err.responseText).message)
            }
        });
    }
});