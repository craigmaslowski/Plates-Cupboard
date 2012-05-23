var cupboard = require('../../lib/cupboard');

describe('cupboard', function () {
	it('should add a map object to each template property', function () {
		var templates = cupboard('./test/templates/');
		
		expect(templates.admin.dashboard.map).toBeDefined('admin.dashboard.map');
		expect(typeof templates.admin.dashboard.map).toEqual('object', 'admin.dashboard.map');

		expect(templates.blog.post.show.map).toBeDefined('templates.blog.post.show.map');
		expect(typeof templates.blog.post.show.map).toEqual('object', 'templates.blog.post.show.map');
	});

	it('should add a bind function to each template property', function () {
		var templates = cupboard('./test/templates/');
		
		expect(templates.admin.dashboard.bind).toBeDefined('admin.dashboard.bind');
		expect(typeof templates.admin.dashboard.bind).toEqual('function', 'admin.dashboard.bind');

		expect(templates.blog.post.show.bind).toBeDefined('templates.blog.post.show.bind');
		expect(typeof templates.blog.post.show.bind).toEqual('function', 'templates.blog.post.show.bind');
	});

	it("should set html property's value to contents of file", function () {
		var templates = cupboard('./test/templates/');
		
		expect(templates.admin.dashboard.html).toBeDefined('admin.dashboard.template');
		expect(templates.admin.dashboard.html).toEqual('<a href="/" class="home">Home</p>', 'admin.dashboard.template');

		expect(templates.blog.post.show.html).toBeDefined('templates.blog.post.show.template');
		expect(templates.blog.post.show.html).toEqual('<p class="title"></p>', 'templates.blog.post.show.template');
	});

	describe('bind', function () {
		it('should run plates bind', function (){
			var templates = cupboard('./test/templates/'),
				data = { title: 'post title' };

			var result = templates.blog.post.show.bind(data);
			expect(result).toEqual('<p class="title">post title</p>', 'post:show');
		});
	});

	describe('map', function () {
		it('should use a plates map', function () {
			var templates = cupboard('./test/templates/'),
				data = { home: '/home' };

			templates.admin.dashboard.map.where('href').is('/').insert('home');

			var result = templates.admin.dashboard.bind(data);
			expect(result).toEqual('<a href="/home" class="home">Home</p>', 'admin:dashboard');

		});
	});
});