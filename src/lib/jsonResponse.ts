export function jsonResponse(statusCode: number, body: Object | string) {
  return {
    statusCode: statusCode,
    body: body,
  };
}
