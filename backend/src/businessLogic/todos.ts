import { TodosAccess } from '../dataLayer/todosAcess'

const todosAcess = new TodosAccess()
export const getuserTodos = (userId: string) => {
  return todosAcess.getTodosForUser(userId)
}
