import { TodosAccess } from '../dataLayer/todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'

const todosAcess = new TodosAccess()
export const getuserTodos = (userId: string): Promise<TodoItem[]> => {
  return todosAcess.getTodosForUser(userId)
}

export const createNewTodo = (
  userId: string,
  todoRequest: CreateTodoRequest
) => {
  const todoId: string = uuid.v4()
  return todosAcess.createTodo({
    userId,
    todoId,
    name: todoRequest.name,
    done: false,
    dueDate: todoRequest.dueDate,
    createdAt: new Date().toISOString()
  })
}
