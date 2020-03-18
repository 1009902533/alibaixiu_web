function wzlist(p){
    $.ajax({
        type: "get",
        url: "/posts",
        data:{
            page:p
        },
        success: function (res) {
            var html = template('tpl',{data:res.records});
            $("#wzlist").html(html);
            var pagehtml = template('pagemain',res);
            $("#pagelist").html(pagehtml);
        }
    });
}
function pages(m) {
    wzlist(m)
}
    
wzlist(1);
$.ajax({
    type:"get",
    url:"/categories",
    success:function(res){
        var html = template('alltem',{data:res})
        $("#allfenlei").html(html);
    }
})
//分类查询
$("#shaixuan").on('click',function(){
    var fenlei = $("#allfenlei").val();
    var zhuangtai = $("#allchange").val();
    if(fenlei == 0){
        $.ajax({
            type: "get",
            url: "/posts",
            data:{
                page:1
            },
            success: function (res) {
                res = res.records;
                shaixuan(res,zhuangtai)
            }
        });
    } else {
        $.ajax({
            type:'get',
            url:'/posts/category/' + fenlei,
            success:function(res){
                shaixuan(res,zhuangtai)
            }
        })
    }
})
function shaixuan(res,zhuangtai){
    if(zhuangtai == 0) {
        var newarr = res.filter((item)=>{
            return item.state === 0
        });
        var html = template('tpl',{data:newarr});
        $("#wzlist").html(html);
    } else if(zhuangtai == 1) {
        var newarr = res.filter((item)=>{
            return item.state === 1
        });
        var html = template('tpl',{data:newarr});
        $("#wzlist").html(html);
    } else {
        var html = template('tpl',{data:res});
        $("#wzlist").html(html);
    }
}