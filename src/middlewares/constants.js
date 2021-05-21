exports. MIDDLEWARE = {
    VALIDATOR: {
        PATH: {
            URL_LAST_PATH_REGEX: /(?<=[\d])\/[\w]+/, // todo remove 
            URL_PATH_WITHOUT_BASE: /(?<=api\/v\d)\/[\S]+/,
            TRAILING_SLASH_REGEX: /\/$/,
        }
    },
};
