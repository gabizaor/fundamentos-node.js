import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberString extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed.toString());

        callback(null, transformed.toString());
    }
}

const server = http.createServer(async (request, response) => {
    const buffers = [];

    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers);

    console.log(fullStreamContent.toString());

    return response.end(fullStreamContent);
}); 

server.listen(3334);