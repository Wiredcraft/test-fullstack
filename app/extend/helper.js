module.exports = {
	toInt (str) {
		if (typeof str === 'number')
			return str;
		if (!str)
			return str;
		return parseInt(str, 10) || 0;
	},
	replaceUrlPageNumber (url, oldPageNum, newPageNum) {
		if (url.match(/\?page=/i))
			return url.replace('?page='+oldPageNum, '?page='+newPageNum);
		else if (url.match(/\&page=/i))
			return url.replace('&page='+oldPageNum, '&page='+newPageNum);
		else
			return url;
	}
};