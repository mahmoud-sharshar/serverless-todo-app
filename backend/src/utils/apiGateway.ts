export const formatJSONResponse = (
  statusCode,
  response: Record<string, unknown>
) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response)
  }
}
