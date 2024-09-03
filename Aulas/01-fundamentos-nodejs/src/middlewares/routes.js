import { buildRoutePath } from "../utils/build-route-path.js";
import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';


const database = new Database();


export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (request, response) => {
            const users = database.select('users');
            return response
            .end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (request, response) => {
            const {name, email} = request.body;
            const users = {
                id: randomUUID(),
                name,
                email,
            }
            database.insert('users', users);
            return response.writeHead(201).end()
            }
    }, 
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const {id} = request.params;
            return response.writeHead(204).end()
        }
    }

]