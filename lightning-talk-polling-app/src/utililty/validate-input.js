const validate = (key, value) => {
    const USERNAME_REGEXP = /^[a-zA-Z0-9].{4,15}$/;
    const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const CHINESE_PHONE_NUMBER_REGEXP = /^[+]\d.{5,20}$/;
    const SIX_DIGITS_AUTHCODE_REGEXP = /^[0-9].{5,5}$/;
    const VIDEO_TITLE = /.+/;
    const YOUTUBE_LINK = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

    switch (key) {
        case 'username':
            const isValidUsername =  value.match(USERNAME_REGEXP);
            return (isValidUsername ? true : false);
            break;
        case 'password':
            const isValidPassword =  value.match(PASSWORD_REGEXP);
            return (isValidPassword ? true : false);
            break;
        case 'email':
            const isValidEmail =  value.match(EMAIL_REGEXP);
            return (isValidEmail ? true : false);
            break;
        case 'phone_number':
            const isValidPhoneNumber =  value.match(CHINESE_PHONE_NUMBER_REGEXP);
            return (isValidPhoneNumber ? true : false);
        case 'authCode':
            const isValidAuthCode =  value.match(SIX_DIGITS_AUTHCODE_REGEXP);
            return (isValidAuthCode ? true : false);
            break;
        case 'title':
            const isValidTitle =  value.match(VIDEO_TITLE);
            return (isValidTitle ? true : false);
            break;
        case 'url':
            const isValidURL =  value.match(YOUTUBE_LINK);
            return (isValidURL ? true : false);
            break;
        case 'description':
            const isValidDescription =  value.match(VIDEO_TITLE);
            return (isValidDescription ? true : false);
            break;
        default:
            return false;
    }
}

export default validate;