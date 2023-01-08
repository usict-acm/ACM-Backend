export default function errorMiddleware(error, _request, response, _next) {
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
