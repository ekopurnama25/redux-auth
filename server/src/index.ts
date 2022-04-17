const cors = require('cors');
const Express = require('express');
import './config/typeorm';
import AuthRouter from './router/AuthRouter';
import UserRouter from './router/UserRouter';
import cookieParser from 'cookie-parser';

const app = Express();

const corsOptions ={
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(Express.json());

app.use('/api', UserRouter);

app.use('/api', AuthRouter);

app.listen(5000, () => {
    try{
        console.log("Server Is Connection");
    } catch (err){
        console.log(err);
    }
});