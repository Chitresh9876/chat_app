import { app } from './app.js'
import { connectToMongoDB } from "./config/db.js";

connectToMongoDB();


app.listen(process.env.PORT, () => {
    console.log(`server started on port = ${process.env.PORT}`);
})