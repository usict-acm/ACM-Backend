export default class Exception extends Error {
    public status : number;
    public message : string;
    public ok : boolean;
    /**
    * creates new Exception
    * @param {number} status of the exception
    * @param {string} message in the exception
    * @param {boolean} [ok=false] ok or not
    */
    constructor(status: number, message: string, ok?: boolean) {
        super()
        this.status = status;
        this.message = message;
        this.ok = ok || false;
    }
}
