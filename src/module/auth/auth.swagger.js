/**
 * @swagger
 * tags:
 *  name : Auth
 *  description : auth module and routes 
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 * 
 * /auth/send-otp/?mobile:
 *  post:
 *      summary: login with OTP in this end-point
 *      tags:
 *          -   Auth
 *      parameters:
 *          -   in: query
 *              name : mobile
 *              type : string
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * 
 * /auth/check-otp:
 *  post:
 *      summary: check for login user
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * 
 * /auth/logout:
 *  get:
 *      summary: logout user from account
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: success
 */