module.exports = {
	'USER_NOT_EXIST': {
		status: 400,
		code: '400',
		message: 'Can`t find user info',
		errorPageUrl: '',
		addtion1: ''
	},
	'NOT_FOUND': {
		errorPageUrl: (ctx, error) => {
			return '/404.html';
		}
	},
	'404': (ctx, error) => {
		ctx.redirect('/404.html');
		return false;
	}
}