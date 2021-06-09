function verify(req, res, next) {
    const headerToken = req.headers['authorization']
    if (typeof headerToken != 'undefined') {
        const header = headerToken.split(' ')[0];
        req.token = header
        next();
    } else {
        return res.status(401).send({ message: "No estas autorizado para acceder a al informacion" })
    }


}
module.exports = verify