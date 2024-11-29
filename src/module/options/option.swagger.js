/**
 * @swagger
 * 
 * tags:
 *  name: Option
 *  description : Option module and routes    
 */

 /**
  * @swagger
  *  components:
  *     schemas:
  *         CreateOption:
  *             type : object
  *             required :
  *                 -   title
  *                 -   key
  *                 -   type
  *                 -   category
  *             properties:
  *                 title:
  *                     type : string
  *                 key:
  *                     type : string
  *                 category:
  *                     type : string
  *                 guid:
  *                     type : string
  *                 required:
  *                     type : boolean
  *                 type:
  *                     type : string
  *                     enum:
  *                         -   number
  *                         -   string
  *                         -   array
  *                         -   boolean
  *                 enum:
  *                     type: array
  *                     items:
  *                         type : string
  *         updateOption:
  *             type : object
  *             properties:
  *                 title:
  *                     type : string
  *                 key:
  *                     type : string
  *                 category:
  *                     type : string
  *                 guid:
  *                     type : string
  *                 required:
  *                     type : boolean
  *                 type:
  *                     type : string
  *                     enum:
  *                         -   number
  *                         -   string
  *                         -   array
  *                         -   boolean
  *                 enum:
  *                     type: array
  *                     items:
  *                         type : string
  */

 /**
  * @swagger
  * /option:
  *  post:
  *     summary: create new option for category
  *     tags:
  *         -   Option
  *     requestBody:
  *         content:
  *             application/x-www-form-urlencoded:
  *                 schema:
  *                     $ref : '#/components/schemas/CreateOption'
  *             application/json:
  *                 schema:
  *                     $ref : '#/components/schemas/CreateOption'
  *     responses:
  *          201:
  *              description: created
  */
 /**
  * @swagger
  * /option/category-id/{categoryId}:
  *  get:
  *     summary: get all options of category
  *     tags:
  *         -   Option
  *     parameters:
  *         -   in : path
  *             name : categoryId
  *             type : string
  *     responses:
  *         200:
  *             description: success
  * 
  */
 /**
  * @swagger
  * /option/category-slug/{categorySlug}:
  *  get:
  *     summary: get all options of category
  *     tags:
  *         -   Option
  *     parameters:
  *         -   in : path
  *             name : categorySlug
  *             type : string
  *     responses:
  *         200:
  *             description: success
  * 
  */
 /**
  * @swagger
  * /option/{id}:
  *  get:
  *     summary: get options by id of category
  *     tags:
  *         -   Option
  *     parameters:
  *         -   in : path
  *             name : id
  *             type : string
  *     responses:
  *         200:
  *             description: success
  * 
  */
 /**
  * @swagger
  * /option/{id}:
  *  put:
  *     summary: update options by id
  *     tags:
  *         -   Option
  *     parameters:
  *         -   in : path
  *             name : id
  *             type : string
  *     requestBody:
  *         content:
  *             application/x-www-form-urlencoded:
  *                 schema:
  *                     $ref : '#/components/schemas/updateOption'
  *             application/json:
  *                 schema:
  *                     $ref : '#/components/schemas/updateOption'
  *     responses:
  *         200:
  *             description: success
  * 
  */
 /**
  * @swagger
  * /option/{id}:
  *  delete:
  *     summary: delete options by id
  *     tags:
  *         -   Option
  *     parameters:
  *         -   in : path
  *             name : id
  *             type : string
  *     responses:
  *         200:
  *             description: success
  * 
  */
 /**
  * @swagger
  * /option/:
  *  get:
  *     summary: get all options 
  *     tags:
  *         -   Option
  *     responses:
  *         200:
  *             description: success
  * 
  */