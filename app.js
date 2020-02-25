const express = require('express');
const compression = require('compression');
const AppError = require('./utils/appError');
//const globalErrorHandler = require('./controllers/errorController');
const teamRouter = require('./routes/teamRoutes');
const userRouter = require('./routes/userRoutes');
const rightRoute = require('./routes/rightRoutes');
const teamLeadRouter = require('./routes/teamLeadRoutes');
const app = express();
//Body parser, reading data from body into req.body
app.use(express.json({limit: '50kb'})); //express.json is the middleware, limit amount of data that comes in body.
app.use(express.static(`${__dirname}/public`)); //this is a builtin middleware, pass diractory to where we serve the static files
app.use(compression()); //compress all the text we are send to client
app.use('/api/teams', teamRouter); // /api/v1/tours is where we want to use out tourRouter. 
app.use('/api/teamLeads', teamLeadRouter);
app.use('/api/users', userRouter);
app.use('/api/rights', rightRoute);
app.all('*',(req,res,next) => { //*means everything
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); 
module.exports = app;