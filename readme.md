
### install npm packages
- npm install


### start server
 - node server.js

 - default port: [http://localhost:5656](http://localhost:5656)

 - Database server, port could be change ar ./server.js
 
 - ./config.js contains key used for generating token 
### supported api

 - *Get*
    - #####Logout - http://localhost:YOUR_PORT 
                
    - #####Get all todos - http://localhost:YOUR_PORT/api/todos
        - input field:
            1. x-access-token (header) 
           
    - #####Get single todo by id - http://localhost:YOUR_PORT/api/todos/:todoId
         - input field:
            1. x-access-token (header)
            
 - *Post*
    - #####Register - http://localhost:YOUR_PORT
        - input field:
            1. email (body)
            2. username (body)
            3. password (body)
            4. passwordConf (body)
    
    - #####Login - http://localhost:YOUR_PORT
         - input field:
            1. logemail (body)
            2. logpassword (body)     
            
    - #####Create todo item - http://localhost:YOUR_PORT/api/todos
         - input field:
            1. x-access-token (header)
            2. title (body)     
            3. detail (body)
            4. date (body)
            5. status (body)
            
 - *Put*
     - #####Update todo item - http://localhost:YOUR_PORT/api/todos/:todoId
          - input field:
             1. x-access-token (header)
             2. title (body)     
             3. detail (body)
             4. date (body)
             5. status (body)
 
 - *Patch*
      - #####Update todo item - http://localhost:YOUR_PORT/api/todos/:todoId
           - input field:
              1. x-access-token (header) - **required**
              2. title (body)     - **optional**
              3. detail (body)- **optional**
              4. date (body)- **optional**
              5. status (body)- **optional**
 - *Delete*
      - #####Delete todo item - http://localhost:YOUR_PORT/api/todos/:todoId
           - input field:
              1. x-access-token (header)
 
