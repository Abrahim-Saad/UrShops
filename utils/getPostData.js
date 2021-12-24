let getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunck => {
                body += chunck.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (err) {
            reject(err);
        }
    })
}
module.exports = {
    getPostData
}