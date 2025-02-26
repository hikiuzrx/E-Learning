declare global {
    var BaseException: typeof import("../config/exceptions").BaseException;
    var ConflictException: typeof import("../config/exceptions").ConflictException;
    var NotFoundException: typeof import("../config/exceptions").NotFoundException;
    var UnauthorizedException: typeof import("../config/exceptions").UnauthorizedException;
    var ValidationException: typeof import("../config/exceptions").ValidationException;
    var InternalServerException: typeof import("../config/exceptions").InternalServerException;
  }
  
  export {}; // This ensures it is treated as a module
  