import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { formatJSONResponse } from '../../utils/apiGateway'
import { deleteTodo } from '../../businessLogic/todos'
import { middyfy } from '../../utils/lambda'

export const handler = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    try {
      await deleteTodo(userId, todoId)
    } catch (error) {
      return formatJSONResponse(404, { message: error.message })
    }
    return formatJSONResponse(200, {})
  }
)
