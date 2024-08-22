class ExpressError extends Error{

    //custom error class for handling errors and providing users a specific message
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = ExpressError;