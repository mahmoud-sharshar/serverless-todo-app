import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

export const middyfy = (handler) => {
  return middy(handler)
    .use(httpErrorHandler())
    .use(
      cors({
        credentials: true
      })
    )
}
