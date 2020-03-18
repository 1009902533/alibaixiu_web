var fenlei = $("#allfenlei").val();
var zhuangtai = $("#allchange").val();
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
            var html = template('tpl',{data:res.records});
            $("#wzlist").html(html);
            var pagehtml = template('pagemain',res);
            $("#pagelist").html(pagehtml);
        }
    });
}

render(fenlei,zhuangtai);
function pages(index) {
    render(fenlei,zhuangtai,index);
}
    
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