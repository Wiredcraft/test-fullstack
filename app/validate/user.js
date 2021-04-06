 module.exports = app => {
	
	let { validator } = app;
	
	validator.addRule(
		'userName',
		(rule, value) => {
			if (! /^[a-zA-Z0-9_-]+$/.test(value)) {
				return 'Username must be alphanumeric';
			} else if (value.length < 6 || value.length > 16) {
				return 'Username`s length must be between 6 to 16';
			}
		}
	);
}
