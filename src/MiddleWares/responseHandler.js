module.exports = async (req, res, next) => {
    /** all kind of responses */
    res.globalResponse = function (successParam, responseParam, messageParam = '') {
        if (successParam == true) {
            if (messageParam == '') {
                this.status(200).send({ success: successParam, response: responseParam });
            } else if (responseParam == '') {
                this.status(200).send({ success: successParam, message: messageParam });
            } else {
                this.status(200).send({ success: successParam, message: messageParam, response: responseParam });
            }
        }
        else {
            if (messageParam == '') {
                this.status(502).send({ success: successParam, response: responseParam });
            } else if (responseParam == '') {
                this.status(502).send({ success: successParam, message: messageParam });
            } else {
                this.status(502).send({ success: successParam, message: messageParam, response: responseParam });
            }
        }
    }
    next();
}