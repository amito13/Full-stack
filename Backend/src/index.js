import {createServer} from 'node:http';
import {createApp} from './app/index.js';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import cors from 'cors';
import pg from 'pg';
const pool = new pg.Pool({
  connectionString: process.env.DB,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool);
async function main() {
   try{
     const app = createApp();
    const server = createServer(app);
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
   }
   catch(error){
    console.error('Error starting the server:', error);
    }

}

main();
