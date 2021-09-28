import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getUserId } from '../utils'
import { formatJSONResponse } from '../../utils/apiGateway'
import { getuserTodos } from '../../businessLogic/todos'
import { middyfy } from '../../utils/lambda'

// TODO: Get all TODO items for a current user
export const handler = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const todos = await getuserTodos(userId)

    return formatJSONResponse(200, { todos })
  }
)
