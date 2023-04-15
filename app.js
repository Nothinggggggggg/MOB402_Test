require('dotenv').config();
const express = require('express');
const expressHbs = require('express-handlebars');

// #App

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`The Web Server on port ${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req,res,next)=>{
    res.redirect('/employee/list')
})

// #View Engine - HBS template
app.engine('hbs',expressHbs.engine({
    extname:'hbs',
    helpers:{
        increase:(value,options)=>{
            return parseInt(value) + 1;
        }
    }
}))
app.set('view engine','hbs');

// #Routes
const EmployeeRouter = require('./routes/employee.router');
app.use('/employee',EmployeeRouter);

// #Middleware

