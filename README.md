## DB 
Change .env File As your configuration
Setup: 9.0.0 (MySQL Community Server - GPL)
## Installation
Node Version: 14.17.3
```bash
$ npm install -g @nestjs/cli@10.0.0
$ npm install -g ioredis@5.4.1
$ npm install
```
## Create an admin user by script and other user using endpoint
{
  email: "admin@assunnahfoundation.org",
  password: "afAs`12fjsfj34343sdlfasd" // this is the admin password , below we used hash version for script . you can also create admin user by your password
}
```bash
INSERT INTO assunnah.user (
    email,
    name,
    password, 
    role,
    isTfaEnabled,
    isActive,
    createdDate,
    updatedDate
) VALUES (
    'admin@assunnahfoundation.org',
    'System Admin',
    '$2b$10$QQ11E5rVY7frtXiNzmSgau3.758.QovY6tFLgqmMWg5KYuVp0bZsq', 
    'systemadmin',
    false,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Insert Some demo data and test the all api endpoint using postman or other api client

### Postman Collection
Here is api collection please download it from [docs/postman](./docs/postman) directory.

### Import Instructions
1. Download the collection file
2. Open Postman
3. Click "Import" button
4. Select the downloaded file
5. Click "Import"



