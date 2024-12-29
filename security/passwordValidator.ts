import { Request, Response, NextFunction } from "express";

/**
 * Checks if the password provided in the request's headers is valid.
 * If password is invalid, return status code 401 with an error message,
 * else, return void.
 */
// Checks if the token provided in the request's headers is valid.
// If token is invalid, return status code 401 with an error message.
function validatePassword(request: Request, response: Response, next: NextFunction) {
    const authorizationHeader = request.headers["authorization"] as string | undefined;

    if (!authorizationHeader) {
        response.status(401).json({ error: "No password provided" });
        return;
    }

    // Get authorization headers and extract token from "Bearer <token>"
    const password = authorizationHeader.split(" ")[1];

    if (password !== process.env.PASSWORD) {
        response.status(401).json({ error: "Invalid password provided" });
        return;
    }

    next(); // Goes to next step (function execution)
}

export default validatePassword;
