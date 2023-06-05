export default function errorHandler(context, status, message) {
    context.response.body = {error: message, status: status};
    context.response.status = status
}