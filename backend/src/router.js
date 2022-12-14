const express = require('express');
const router = express();


//Use Cases imports
const testRoute = require('./app/useCases/testRoute');

// User routers
const { register } = require('./controllers/UserControler')



// UseCases declaration area (Folder useCases)

// testRoute
router.get('/', testRoute);


// User Routes

router.post('/register', register); 



module.exports = router