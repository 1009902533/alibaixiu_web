// 用户模块
const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 查询用户信息
	var id = req.query.id
	// 查询用户信息
	const posts = await Comment.find({post:id}).populate('author', '-password')
	// 响应
	res.send(posts);
}