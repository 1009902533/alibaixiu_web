// 用户模块
const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 获取文章id
	var id = req.query.id
	// 根据文章id查询文章的评论
	if(id){
		var posts = await Comment.find({post:id}).populate('author', '-password')
	} else {
		//若没有id则返回所有评论
		var posts = await Comment.find().populate('author', '-password')
	}
	
	// 响应
	res.send(posts);
}