import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createDynamoDBClient } from '../utils/dynamodb'

export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE
  ) {}

  async getTodo(userId: string, todoId: string): Promise<TodoItem> {
    const result = await this.docClient
      .get({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        }
      })
      .promise()
    return result.Item as TodoItem
  }

  async getTodosForUser(userId: string): Promise<TodoItem[]> {
    const result: any = await this.docClient
      .query({
        TableName: this.todosTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()
    return result.Items as TodoItem[]
  }

  async createTodo(newItem: TodoItem): Promise<TodoItem> {
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: newItem
      })
      .promise()
    return newItem
  }

  async updateTodo(
    userId: string,
    todoId: string,
    todoRequest: UpdateTodoRequest
  ): Promise<TodoItem> {
    const result = await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        },
        UpdateExpression:
          'set #todoName = :todoName, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
          '#todoName': 'name'
        },
        ExpressionAttributeValues: {
          ':todoName': todoRequest.name,
          ':dueDate': todoRequest.dueDate,
          ':done': todoRequest.done
        },
        ReturnValues: 'ALL_NEW'
      })
      .promise()
    return result.Attributes as TodoItem
  }

  async deleteTodo(userId: string, todoId: string) {
    await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        }
      })
      .promise()
  }
}
