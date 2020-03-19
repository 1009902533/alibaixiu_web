//获取轮播列表
function render(){
    $.ajax({
        type:'get',
        url:'/slides',
        success:function(res){
            var html = template('bannerList',{data:res});
            $("#banner").html(html);
            if($("#banner").children().length == 0){
                var str = `<tr>
                    <td colspan="4" align="center">暂无数据</td>
                </tr>`
                $("#banner").html(str)
            }
        }
    });
}
render();
//删除轮播图
$("#banner").on('click','.del',function(){
    var id = $(this).attr('data-id');
    if(confirm('确认删除？')){
        $.ajax({
            type:'DELETE',
            url:'/slides/' + id,
            success:function(){
                render();
            }
        });
    }
});
//上传轮播图片
$("#image").on('change',function(){
    var formdata = new FormData();
    formdata.append('imgSrc',this.files[0]);
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
            $("#img").show().attr('src',res[0].imgSrc);
            $("#imgurl").val(res[0].imgSrc)
        },
        error:function(err){
            console.log(err)
        }
    });
});
//添加轮播图
$("#addBanner").on('click',function(){
    var formdata = $('form').serialize();
    if($("#text").val().trim().length === 0 || $("#link").val().trim().length === 0){
        return msg('标题或内容不能为空！')
    }
    $.ajax({
        type:'post',
        url:'/slides',
        data:formdata,
        success:function(){
            render();
            $(".alert-danger").hide();
            $("#img").hide().attr('src','');
            $("#imgurl,#image,#text,#link").val('');
        }
    });
});
function msg(m){
    $(".alert-danger").show();
    $(".alert-danger span").html(m);
}