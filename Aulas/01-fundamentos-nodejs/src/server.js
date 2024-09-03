import http from 'http';
import { json } from './middlewares/JSON.js';
import { routes } from './middlewares/routes.js';


const server = http.createServer(async (request, response) => {
    const {method, url} = request;

    await json(request, response); 

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParameters = url.match(route.path);

        request.parms = {...routeParameters.groups }

        console.log(parms);

        return route.handler(request, response);
    }

    return response.writeHead(404).end();
});

server.listen(3333);