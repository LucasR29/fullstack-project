#Full-Stack project


## 1. Technology Summary

BACK:
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

FRONT:
- [NextJS](https://nextjs.org)
- [React Hook Form](https://react-hook-form.com)
- [Axios](https://axios-http.com/docs/intro)

STYLES:
- [Chakra UI](https://chakra-ui.com)


## 2. Running Project:
To run this project you need to open 2 terminals on you IDE, one for the BACK forder and one for the FRONT folder

If you preffer you could also open each folder separately

### 2.1. RUN BACK:

#### Install Dependencies
use only one through all project

```shell
yarn or npm 
```

#### Environment Variables:

PostgreSQL: Create a .env file, copping .env.example and put your credencials on URL

SQLite3: Create a .env file, copping .env.example and put anything on URL and put <'test'> on NODE_ENV

#### Run Migrations (on postgres use):

```shell
yarn typeorm migration:run -d src/data-source.ts
```

#### Run Server:
Server will run on port 3001 by default it can be changed on server.ts file

If you do remember to change services/api.ts file on FRONT folder

```shell
yarn dev
```
 
### 2.2. RUN FRONT:

#### Install Dependencies
use only one through all project
```shell
yarn or npm
```

#### Run App:
App will run on port 3000

```shell
yarn dev
```

#### Color mode:
FRONT color mode set to dark mode, if you are crazy and want light mode just change the initialColorMode prop to light or system on theme.ts file

Styling made based on dark mode, light or system mode can turn things ugly


### 3. Dependencies Already installed:
If you are runnig this for the second time and already have both folders dependencies intalled run both of this commands on shell of the main folder

```
yarn --cwd ./front run dev

yarn --cwd ./back run dev
```

