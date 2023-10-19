import * as express from "express"
import * as token from "../token"
import * as error from "./error"

interface IUserSessionRequest extends express.Request {
    user: token.ISession;
  }
  
  /**
   * @apiDefine AuthHeader
   *
   * @apiExample {String} Header Autorización
   *    Authorization=bearer {token}
   *
   * @apiErrorExample 401 Unauthorized
   *    HTTP/1.1 401 Unauthorized
   */
  export function validateToken(req: IUserSessionRequest, res: express.Response, next: express.NextFunction) {
    const auth = req.header("Authorization");
    if (!auth) {
      return error.handle(res, error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
    }
  
    token.validate(auth)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => error.handle(res, err));
  }