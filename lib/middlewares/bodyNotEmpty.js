function bodyNotEmpty(){
    return (req, res, next) => {
        if(!Object.keys(req.body).length){
            const e = new Error("Body should not be empty");
            e.status = 400;
            return next(e);
        }
        next();
    }
}

module.exports = bodyNotEmpty;