import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { formatJSONResponse } from '../../utils/apiGateway'
import { middyfy } from '../../utils/lambda'
import { createNewTodo } from '../../businessLogic/todos'

export const handler = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    const userId = getUserId(event)
    const item = await createNewTodo(userId, newTodo)
    return formatJSONResponse(200, { item })
  }
)
