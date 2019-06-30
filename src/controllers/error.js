'use strict';
var fn_error = async(ctx, next) => {    
	ctx.throw(401, 'access_denied');
};

module.exports = {
	 'GET /error': fn_error
}