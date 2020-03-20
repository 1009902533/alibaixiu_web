//从浏览器获取查询参数
var urlObj = {}
var urlArr = [];
var parms = location.search.substr(1);
urlArr = parms.split('&')
urlArr.forEach(item => {
    urlObj[item.split('=')[0]] = item.split('=')[1]
})
var id = urlObj.id;
var keys = urlObj.keys;
//热门推荐
var hotTj = `
    <h3>热门推荐</h3>
    <ul>
    {{each data}}
    <li>
        <a href="detail.html?id={{$value._id}}">
        <img src="{{$value.thumbnail}}" alt="">
        <span>{{$value.title}}</span>
        </a>
    </li>
    {{/each}}
    </ul>
`
$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(res){
    var html = template.render(hotTj,{data:res});
    $(".hots").html(html)
    }
});

//随机推荐
var suiTj = `
    <h4>随机推荐</h4>
    <ul class="body random">
    {{each data}}
    <li>
        <a href="detail.html?id={{$value._id}}">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
        </div>
        </a>
    </li>
    {{/each}}
    </ul>
`
$.ajax({
    type:'get',
    url:'/posts/random',
    success:function(res){
    var html = template.render(suiTj,{data:res});
    $("#suiji").html(html)
    }
});

//最新评论
var znewlist = `
    <h4>最新评论</h4>
    <ul class="body discuz">
    {{each data}}
    <li>
        <a href="detail.html?id={{$value.post}}">
        <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
        </div>
        <div class="txt">
            <p>
            <span>{{$value.author.nickName}}</span>{{$value.createAt.substr(0,16).replace('T',' ')}}说:
            </p>
            <p>{{$value.content.length > 25 ? $value.content.substr(0,25) + '......' : $value.content}}</p>
        </div>
        </a>
    </li>
    {{/each}}
    </ul>
`
$.ajax({
    type:'get',
    url:'/comments/lasted',
    success:function(res){
        console.log(res)
    var html = template.render(znewlist,{data:res});
    $("#znewlist").html(html)
    }
});
//分类导航展示
var navlist = `
    {{each data}}
    <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
`
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html = template.render(navlist,{data:res});
        $(".qqs-nav").html(html)
    }
});

//搜索
$(".search form").on('submit',function(){
    var key = $(this).find('.keys').val();
    location.href = key ? `/search.html?keys=${key}` : 'search.html'
    return false
})