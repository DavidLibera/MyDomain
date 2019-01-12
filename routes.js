const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    //var username = 'Default';
    const users = [];

    if( url === '/') {

        res.write('<html>');
        res.write('<body><header>First Application</header></body>');
        res.write('<form action="/create-users" method="POST">'); // CHANGE DIRECTORY and METHOD is POST !!! sends POST request to /users
        res.write('<input type="text" name="username">'); // SET key=username to input from user (i.e stream will look like username=David)
        res.write('<button type="submit">SEND</button>');
        res.write('</form>');
        res.write('</html>');
        return res.end();
    }

    if( url === '/create-users' && method === 'POST'){

        // For acquiring username - PART 1
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });


        // NOTE: One must return req.on() - because we do not want the event loop to proceed without executing this...
        return req.on('end',()=> {
            // For acquiring username - PART 2 
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split("=")[1];
            console.log(username);
            // Adding user to users array
            users.push(username);

            res.setHeader('Location','/users');
            res.statusCode = 302;
            return res.end();
        });
    }

    if( url === '/users'){
        // Displaying users
        res.getHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<body><header>List of users:</header></body>');
        res.write('<ul><li>User1</li><li>User2</li></ul>');
        res.write('</html>');
        res.statusCode = 302;
        return res.end();
    }

    res.getHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<body><header>Default Page</header></body>');
    res.write('</html>');
    res.end();

}; // Dont forget this ; 

module.exports = requestHandler;