var categorieslist = [];
//获取分类列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        categorieslist = res;
        render();
    }
});
function render(){
    var html = template('tpl',{data:categorieslist})
    $("#categories").html(html)
    if($("#categories").children().length == 0){
        $("#all").prop('checked',false);
        var str = `<tr>
            <td colspan="4" align="center">暂无数据</td>
        </tr>`
        $("#categories").html(str)
    }
    isshow()
}
function msg(m){
    $(".alert-danger").show();
    $(".alert-danger span").html(m);
}
//添加分类
$("#addcat").on('click',function(){
    var data = $("#form").serialize();
    console.log(data)
    $.ajax({
        type:'POST',
        url:'/categories',
        data:data,
        success:function(res){
            $(".alert-danger").hide();
            categorieslist.unshift(res);
            $("#title").val('');
            $("#className").val('');
            render()
        },
        error:function(err){
            msg(JSON.parse(err.responseText).message)
        }
    })
});

//编辑分类
var id;
$("#categories").on('click','.edi',function(){
    $("#addedi").text('编辑分类');
    id = $(this).parents('tr').attr('data-id');
    var tr = $(this).parents('tr');
    $("#title").val(tr.children().eq(1).text());
    $("#className").val(tr.children().eq(2).text());
    $("#addcat").hide();
    $("#edicat").show();
    
})
$("#edicat").on('click',function(){
    var formdata = $('#form').serialize();
    if($("#title").val().trim().length == 0 || $("#className").val().trim().length == 0){
        return msg('名称或图标类名不能为空!')
    }
    $.ajax({
        type:'put',
        url:'/categories/' + id,
        data:formdata,
        success:function(res){
            $("#addedi").text('添加分类');
            $(".alert-danger").hide();
            $("#addcat").show();
            $("#edicat").hide();
            var index = categorieslist.findIndex((item)=>{
                return item._id === res._id
            })
            categorieslist[index] = res;
            $("#title").val('');
            $("#className").val('');
            render();
        },
        error:function(err){
            console.log(err)
            msg(JSON.parse(err.responseText).message)
        } 
    })
})
//删除单个用户
$("#categories").on('click','.del',function(){
    var id = $(this).parents('tr').attr('data-id');
    var isdel = confirm("确认删除？");
    if(isdel){
        $.ajax({
            type:'delete',
            url:'/categories/' + id,
            success:function(res){
                $("#title").val('');
                $("#className").val('');
                var index = categorieslist.findIndex((item)=>{
                    return item._id === res._id
                })
                categorieslist.splice(index,1);
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
function isshow(){
    if($("#categories input:checked").length > 1){
        $(".dellist").show();
    } else {
        $(".dellist").hide();
    }
}

$("#all").on("click",function(){
    $('#categories [type="checkbox"]').prop('checked',$(this).prop('checked'))
    isshow()
})
$("#categories").on('change','[type="checkbox"]',function(){
    var choses = $("#categories input:checked").length === $("#categories input").length;
    $("#all").prop("checked",choses);
    isshow()
})


//点击删除按钮
$(".dellist").on('click',function(){
    var arr = [];
    $.each($("#categories input:checked"), function (index, item) { 
        arr.push($(item).parents('tr').attr('data-id'))
    });
    var isdel = confirm("确认删除？");
    if(isdel){
        $.ajax({
            type:'delete',
            url:'/categories/' + arr.join('-'),
            success:function(res){
                $("#title").val('');
                $("#className").val('');
                res.forEach((i) => {
                    var index = categorieslist.findIndex((item)=>{
                        return item._id === i._id
                    })
                    categorieslist.splice(index,1);
                });
                render()
            },
            error:function(err){
                console.log(err)
                msg(JSON.parse(err.responseText).message)
            }
        });
    }
});