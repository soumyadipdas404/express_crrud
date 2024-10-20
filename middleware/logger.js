const logRoute = (req, res, next) => {
    const startTime = Date.now(); // Track the start time for calculating response time

    // After response is sent, capture additional details
    res.on('finish', () => {
        const { method, originalUrl, query, body } = req;
        const statusCode = res.statusCode;
        const clientIp = req.ip || req.connection.remoteAddress;
        const responseTime = Date.now() - startTime;

        // Function to pad strings for table-like formatting
        const padString = (str, length) => str.padEnd(length, ' ');

        // Log details in table format
        console.log('\n==================== API Request Log ====================');
        console.log(`| ${padString('Property', 16)} | ${padString('Value', 50)} |`);
        console.log('---------------------------------------------------------');
        console.log(`| ${padString('Method', 16)} | ${padString(method, 50)} |`);
        console.log(`| ${padString('Endpoint', 16)} | ${padString(originalUrl, 50)} |`);
        console.log(`| ${padString('Status', 16)} | ${padString(statusCode.toString(), 50)} |`);
        console.log(`| ${padString('Client IP', 16)} | ${padString(clientIp, 50)} |`);
        console.log(`| ${padString('Query Params', 16)} | ${padString(JSON.stringify(query), 50)} |`);

        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            console.log(`| ${padString('Request Body', 16)} | ${padString(JSON.stringify(body), 50)} |`);
        }

        console.log(`| ${padString('Response Time', 16)} | ${padString(`${responseTime} ms`, 50)} |`);
        console.log(`| ${padString('Timestamp', 16)} | ${padString(new Date().toISOString(), 50)} |`);
        console.log('=========================================================\n');
    });

    next(); // Pass control to the next middleware or route handler
};

module.exports = logRoute;
