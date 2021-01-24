


const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer:');
}

const getAccessTokenFromHeader = (req) => {
    return req.headers.authorization.split(" ")[1];
}


module.exports = {
    isTokenIncluded,
    getAccessTokenFromHeader
}