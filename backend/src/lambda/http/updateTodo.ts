import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { middyfy } from '../../utils/lambda'
import { updateTodo } from '../../businessLogic/todos'
import { formatJSONResponse } from '../../utils/apiGateway'

export const handler = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const userId = getUserId(event)
    try {
      const item = await updateTodo(userId, todoId, updatedTodo)
      return formatJSONResponse(200, { item })
    } catch (error) {
      return formatJSONResponse(404, { message: error.message })
    }
  }
)
