import { NextFunction, Request, Response } from "express";
import Exception from "../exception";

export default function errorMiddleware(error : Exception, _request : Request, response : Response, _next : NextFunction) {
    const status = error.status || 500;
    const ok = error.ok || false;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
            ok,
            message,
        })
}
