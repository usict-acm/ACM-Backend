export default class Exception extends Error {
    /**
    * creates new Exception
    * @param {number} status of the exception
    * @param {string} message in the exception
    * @param {boolean} [ok=false] ok or not
    */
    constructor(status, message, ok) {
        this.status = status;
        this.message = message;
        this.ok = ok || false;
    }
}
