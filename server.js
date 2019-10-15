const express = require('express');
const userRoutes = require('./restapp/routes/routes');
const mongoUtil = require('./restapp/utils/mongo');
const cors = require('cors');
const path = require('path')
const favicon = require('serve-favicon')
const app = express();

console.log(process.env.NODE_ENV)
const node_env = process.env.NODE_ENV;

app.disable('x-powered-by');
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, GET, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(express.json());
app.use(express.urlencoded({extended : true}));


if(node_env === 'production') {
    const static_dir = path.join(__dirname, 'dist','crud-angular');

    app.use(express.static(static_dir))
    app.use(favicon(path.join(static_dir, 'favicon.ico')))
}

app.use('/user', userRoutes);
app.use('*', (req, res, next) => {
    if(node_env === 'production') {
        res.sendFile(path.join(__dirname, 'dist','crud-angular','index.html'))
    } else {
        res.send("Page Not Found");
    }
})

const port = process.env.PORT || 2002;

try {
    mongoUtil.connectMongo((success) => {
        console.log("Mongo Connection Successful")
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`);
        })
    })
} catch(err) {
    console.log(err);
    mongoUtil.closeConn();
    app.disable();
}



    
