import { middleware } from "./config/Middleware.conf.js";
import { connectDatabase } from "./config/Database.conf.js";
import { connectWithRoutes } from "./config/Router.conf.js";


//Middleware 
const app = middleware();

//Connect with DataBase 
connectDatabase();

//Router
connectWithRoutes(app);

//Run server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listen app with port ${PORT}`));