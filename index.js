import express from 'express'
import routes from './src/routes/routes.js'
const server=express();

server.set('view engine', 'ejs')

server.use(express.json())
server.use(express.static('public'));
server.use(express.urlencoded({extended:false}))
server.use(routes);


server.listen(5000);
