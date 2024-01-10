import express from 'express'
import routes from './src/routes/routes.js'
import dotenv from 'dotenv'
const server=express();

dotenv.config()
server.set('view engine', 'ejs')

server.use(express.json())
server.use(express.static('public'));
server.use(express.urlencoded({extended:false}))
server.use(routes);


server.listen(process.env.PORT);
