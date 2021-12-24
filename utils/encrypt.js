let encode = (data) => {
    let buff = new Buffer.from(data);
    let base64data = buff.toString('base64');
    return base64data;
};

let decode = (encodedData) => {
    let buff = new Buffer.from(encodedData, 'base64');
    let data = buff.toString('ascii');
    return data;
};

module.exports = {
    encode,
    decode
}