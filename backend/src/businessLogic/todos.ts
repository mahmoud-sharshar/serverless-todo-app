import { TodosAccess } from '../dataLayer/todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

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

export const deleteTodo = async (userId: string, todoId: string) => {
  if (!(await isTodoExist(userId, todoId)))
    throw new Error("Requested todo doesn't exist")

  return todosAcess.deleteTodo(userId, todoId)
}

export const updateTodo = async (userId: string, todoId: string, todoRequest: UpdateTodoRequest){
  if (!(await isTodoExist(userId, todoId)))
    throw new Error("Requested todo doesn't exist")
  return todosAcess.updateTodo(userId, todoId, todoRequest)
}

export const isTodoExist = async (userId: string, todoId: string) => {
  const item: TodoItem = await todosAcess.getTodo(userId, todoId)
  return !!item
}
