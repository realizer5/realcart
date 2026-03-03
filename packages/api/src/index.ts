import { app } from "./app";
import { connectDB } from "./db";

connectDB().then(() => {
    app.onError(({error}) => {
        throw error;
      })
      .listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT || 8000}`)
    })
}).catch((error : Error) => { console.error("MongoDB connection failed !!! ", error) });
