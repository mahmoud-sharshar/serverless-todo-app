import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  generateTodoAttachmentUrl,
  isTodoExist
} from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { formatJSONResponse } from '../../utils/apiGateway'
import { middyfy } from '../../utils/lambda'

export const handler = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    if (!(await isTodoExist(userId, todoId)))
      return formatJSONResponse(404, { message: 'Todo item is not found' })
    const uploadUrl = await generateTodoAttachmentUrl(userId, todoId)
    return formatJSONResponse(200, { uploadUrl })
  }
)
