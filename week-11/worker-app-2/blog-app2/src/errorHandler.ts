import { StatusCode } from "hono/utils/http-status";

class ApiError extends Error {
    constructor(public status: StatusCode, public message: string, public success: boolean = false) {
        super(message)
        this.status = status
        this.success = false

    }
}


export {ApiError}