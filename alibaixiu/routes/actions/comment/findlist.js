// 用户模块
const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 获取文章id
	var id = req.query.id
	// 根据文章id查询文章的评论
	const posts = await Comment.find({post:id}).populate('author', '-password')
	// 响应
	res.send(posts);
}