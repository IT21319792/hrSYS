import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.disable('x-powered-by');


// Routes
app.use('/api', router);



const PORT = 8080;

//http get request
app.get('/', (req, res) => {
  res.status(201).json("home get req" );
});


//start server only when we have connected to the database

connect().then(()=>{
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.log("error in connecting to db",error);
    }
}).catch(error => console.log("error in connecting to db",error));


