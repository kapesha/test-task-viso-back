to start backend you should:  
clonne this repo
you shold use Node v20
npm i
npx prisma migrate reset in case there is existed db, but dont forget to migrate it in case there is important information
npx prisma migrate dev --name init

Also dont forget to create .env file in the main root with: DATABASE_URL - your db URL and JWT_SECRET - your secret key (any value)
npm start

