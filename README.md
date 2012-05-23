Cupboard
========
[![Build Status](https://secure.travis-ci.org/craigmaslowski/cupboard.png)](http://travis-ci.org/craigmaslowski/cupboard)

Cupboard is a wrapper around [Plates](https://github.com/flatiron/plates). It loads templates from disk and wraps them in an object with a map and bind function.

~~~
npm install cupboard
~~~

## Usage

To use Cupboard, tell it where to find your template folder.

```JavaScript
var cupboard = require('cupboard');

var templates = cupboard('./templates');
```

Cupboard will recurse through the folder creating an object tree which matches the directory layout. All html files will be loaded from disk, and plates map and bind function become available on the returned objects.

For example, assuming the following directory structure:
~~~
	templates
		dashboard
			index.html
~~~

You'd be able to do this with Cupboard:
```JavaScript
var templates = cupboard('./templates/'),
	data = { home: '/home' };

templates.dashboard.index.map.where('href').is('/').insert('home'); // call Plates' map functions
templates.dashboard.index.bind(data); // call Plates' bind function, passing the map in as well.
```