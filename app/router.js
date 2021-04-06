'use strict';

module.exports = app => {
	
	const { router } = app;
	
	router.get('/', router.redirect('/', '/public/index.html', 302));
};