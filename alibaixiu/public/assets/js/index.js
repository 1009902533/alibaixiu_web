//查询文章数量
$.ajax({
    type:'get',
    url:'/posts/count',
    success:(res)=>{
        $("#postCount").html(res.postCount);
        $("#draftCount").html(res.draftCount);
    }
});

//查询分类数量
$.ajax({
    type:'get',
    url:'/categories/count',
    success:(res)=>{
        $("#categoryCount").html(res.categoryCount)
    }
});

//查询评论数量
$.ajax({
    type:'get',
    url:'/comments/count',
    success:(res)=>{
        $("#pinglun").html(res.commentCount)
    }
});
