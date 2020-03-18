var delpage = 1;
//获取分类value和文章状态
var fenlei = $("#allfenlei").val();
var zhuangtai = $("#allchange").val();
//获取文章列表
/** 
 * es6语法:预定义参数值，如果不传递该参数，
 * 则为默认值，如果传递就取传递的值
 **/
function render(cid,state,page = 1){
    $.ajax({
        type: "get",
        url: "/posts",
        data:{
            category:cid,
            state:state,
            page:page
        },
        success: function (res) {
            console.log(res)
            var html = template('tpl',{data:res.records});
            $("#wzlist").html(html);
            var pagehtml = template('pagemain',res);
            $("#pagelist").html(pagehtml);
            if($("#wzlist tr").length == 0){
                var str = `<tr>
                    <td colspan="6" align="center">暂无数据</td>
                </tr>`
                $("#wzlist").html(str);
            } else if($("#wzlist tr").length == 1 && page != 1){
                delpage = page - 1
            }
        }
    });
}
//渲染文章列表
render(fenlei,zhuangtai);

function pages(index) {
    delpage = index;
    render(fenlei,zhuangtai,index);
}
//获取所有分类  
$.ajax({
    type:"get",
    url:"/categories",
    success:function(res){
        var html = template('alltem',{data:res})
        $("#allfenlei").append(html);
    }
})
//分类查询
$("#shaixuan").on('click',function(){
    fenlei = $("#allfenlei").val();
    zhuangtai = $("#allchange").val();
    render(fenlei,zhuangtai);
})

//删除文章
$("#wzlist").on('click','.del',function(){
    var id = $(this).attr('data-id');
    if(confirm('是否确认删除？')) {
        $.ajax({
            type:'DELETE',
            url:'/posts/' + id,
            success:function(){
                render(fenlei,zhuangtai,delpage);
            }
        });
    }
})