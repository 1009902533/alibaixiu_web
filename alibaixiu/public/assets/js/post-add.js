var date = new Date();
var y = date.getFullYear();
var m = (date.getMonth() + 1).toString().padStart(2,'0');
var d = date.getDate().toString().padStart(2,'0');
var h = date.getHours().toString().padStart(2,'0');
var M = date.getMinutes().toString().padStart(2,'0');
$("#created").val(y + '-' + m + '-' + d + 'T' + h + ':' + M);
$.ajax({
    type: "get",
    url: "/categories",
    success: function (res) {
        var html = template('cate',{data:res});
        $("#category").html(html)
    }
});

//选择文件
$("#feature").on('change',function(){
    var file = this.files[0];
    var formdata = new FormData();
    formdata.append('cover',file);
    //文章封面上传
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
            $(".thumbnail").show().attr('src',res[0].cover);
            $("#thumbnail").val(res[0].cover)
        }
    })
});
function msg(m){
    $(".alert-danger").show();
    $(".alert-danger span").html(m);
}
//文章添加
$("#btnadd").on('click',function(){
    var data = $('form').serialize();
    if($("#title").val().trim().length === 0 || $("#content").val().trim().length === 0){
        return msg('标题或内容不能为空！')
    }
    $.ajax({
        type:'post',
        url:'/posts',
        data:data,
        success:function(res){
            location.href = 'posts.html'
            console.log(res)
        },
        error:function(err){
            console.log(err)
        }
    })
    console.log(data)
})
//从浏览器获取查询参数
var urlObj = {}
var urlArr = [];
var parms = location.search.substr(1);
urlArr = parms.split('&')
urlArr.forEach(item => {
    urlObj[item.split('=')[0]] = item.split('=')[1]
})
var id = urlObj.id;
if(id) {
    $(".page-title h1").text("编辑文章");
    $("#btnadd").hide();
    $("#btnedi").show();
    $.ajax({
        type:'get',
        url:'/posts/' + id,
        success:function(res){
            $("#title").val(res.title);
            $("#content").val(res.content);
            res.thumbnail ? $(".thumbnail").show().attr('src',res.thumbnail) : ''
            $("#thumbnail").val(res.thumbnail);
            $("#created").val(res.createAt.substr(0,16))
            $.each($("#category option"), function (index, item) { 
                if($(item).val() == res.category._id){
                    $(item).prop('selected',true)
                }
            });
            $.each($("#status option"), function (index, item) { 
                if($(item).val() == res.state){
                    $(item).prop('selected',true)
                }
            });
        }
    })
}
//点击修改按钮
$("#btnedi").on('click',function(){
    var data = $('form').serialize();
    if($("#title").val().trim().length === 0 || $("#content").val().trim().length === 0){
        return msg('标题或内容不能为空！')
    }
    $.ajax({
        type:'PUT',
        url:'/posts/' + id,
        data:data,
        success:function(res){
            location.href = 'posts.html'
            console.log(res)
        },
        error:function(err){
            console.log(err)
        }
    })
});