To run the user service at this stage:
- Run Apache & MySql on Xampp.
- Execute the following comands on cmd:
    - sequelize db:create (On the first time only)
    - sequelize db:migrate (After Each pull from git)
    - cd /microservices/user_svc
    - npm start