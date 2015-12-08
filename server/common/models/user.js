module.exports = function(User) {
	delete User.validations.email;

	User.disableRemoteMethod('updateAll', true);
	User.disableRemoteMethod('resetPassword', true);
	User.disableRemoteMethod('findOne', true);
	User.disableRemoteMethod('count', true);
	User.disableRemoteMethod('confirm', true);
	User.disableRemoteMethod('upsert', true);
	User.disableRemoteMethod('find', true);
	User.disableRemoteMethod('deleteById', true);
	User.disableRemoteMethod('exists', true);
	User.disableRemoteMethod('updateAttributes', false);
	User.disableRemoteMethod('findById', true);
	User.disableRemoteMethod('createChangeStream', true);


	User.disableRemoteMethod('__count__accessTokens', false);
	User.disableRemoteMethod('__create__accessTokens', false);
	User.disableRemoteMethod('__delete__accessTokens', false);
	User.disableRemoteMethod('__destroyById__accessTokens', false);
	User.disableRemoteMethod('__findById__accessTokens', false);
	User.disableRemoteMethod('__get__accessTokens', false);
	User.disableRemoteMethod('__updateById__accessTokens', false);

	User.disableRemoteMethod('__findOne__likes', false);
	User.disableRemoteMethod('__get__likes', false);
	User.disableRemoteMethod('__exists__likes', false);
	User.disableRemoteMethod('__findById__likes', false);
	User.disableRemoteMethod('__updateById__likes', false);
	User.disableRemoteMethod('__destroyById__likes', false);
	User.disableRemoteMethod('__find__likes', false);
	User.disableRemoteMethod('__create__likes', false);
	User.disableRemoteMethod('__delete__likes', false);
	User.disableRemoteMethod('__deleteById__likes', false);
	User.disableRemoteMethod('__count__likes', false);

	User.disableRemoteMethod('__count__topics', false);
	User.disableRemoteMethod('__updateById__topics', false);
	User.disableRemoteMethod('__get__topics', false);
	User.disableRemoteMethod('__delete__topics', false);
	User.disableRemoteMethod('__findById__topics', false);



};