class BaseException extends Error {
    public statusCode: number;
    public resource: string;
  
    
    constructor(message: string, resource: string, statusCode: number) {
      super(message);
      this.resource = resource;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }

class ConflictException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 409); 
    }
  }
  
  
  class NotFoundException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 404);
    }
  }
  
  
  class UnauthorizedException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 401); 
    }
  }
  

  class ValidationException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 400); 
    }
  }
class InternalServerException extends BaseException {
    constructor(resource: string) {
        super("internal Server Exception", resource, 500);
    }
}
globalThis.InternalServerException = InternalServerException as typeof InternalServerException
globalThis.BaseException = BaseException as typeof BaseException;
globalThis.NotFoundException = NotFoundException as typeof NotFoundException;
globalThis.ValidationException = ValidationException as typeof ValidationException;
globalThis.UnauthorizedException = UnauthorizedException as typeof UnauthorizedException;
globalThis.ConflictException = ConflictException as typeof ConflictException;

export { BaseException, NotFoundException, ValidationException, UnauthorizedException, ConflictException }