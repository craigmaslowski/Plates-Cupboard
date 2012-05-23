var objectify = require('objectify');
	Plates = require('plates');

var recurseTree = function (tree) {
	for (var key in tree) {
		if (typeof tree[key] === 'object') {
			recurseTree(tree[key]);
		} else if (typeof tree[key] === 'string') {
			tree[key] = (function(html) {
				var template = {};
				template.html = html;
				template.map = Plates.Map();
				template.bind = function(data) {
					return Plates.bind(template.html, data, template.map);
				};
				return template;
			})(tree[key]);
		}
	}
	return tree;
};

module.exports = function (directory) {
	var tree = objectify(directory, { extensions: ['html'], encoding: 'utf8' }),
		cupboard = recurseTree(tree);
	return cupboard;
};