npm install jsonwebtoken bcryptjs
npm install @types/jsonwebtoken @types/bcryptjs --save-dev
npx prisma migrate dev --name add_password_to_user
npx prisma generate
npm install bcryptjs
docker run -p 3000:3000 jwt-api-faesa
