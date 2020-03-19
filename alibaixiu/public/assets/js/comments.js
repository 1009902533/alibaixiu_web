var curruntPage;
function render(page = 1){
    $.ajax({
        type: "get",
        url: "/comments",
        data:{
            page:page
        },
        success: function (res) {
            curruntPage = res.page;
            var html = template('tpl',res);
            $("#pllist").html(html)
            var pagehtml = template('pagemain',res);
            $("#pagelist").html(pagehtml)
            if($("#pllist tr").length == 0){
                var str = `<tr>
                    <td colspan="6" align="center">暂无数据</td>
                </tr>`
                $("#pllist").html(str);
            } else if($("#pllist tr").length == 1 && page != 1){
                curruntPage = page - 1
            }
        }
    });
}
render();
//分页
function pagechange(index){
    render(index)
}
//删除评论
$("#pllist").on('click','.del',function(){
    var id = $(this).attr('data-id');
    if(confirm('确认删除？')){
        $.ajax({
            type:'DELETE',
            url:'/comments/' + id,
            success:function(){
                render(curruntPage)
            }
        });
    }
});
//审核按钮
$("#pllist").on('click','.bohui',function(){
    var id = $(this).attr('data-id');
    var state = $(this).attr('data-state');
    $.ajax({
        type:'put',
        url:'/comments/' + id,
        data:{
            state:state == 0 ? 1 : 0
        },
        success:function(res){
            console.log(res)
            render(curruntPage)
        }
    });
});