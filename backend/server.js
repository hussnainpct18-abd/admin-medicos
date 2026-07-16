require("dotenv").config()

const app=require('./app.js');
const connectDB=require('./src/db/db.js')

connectDB();



app.listen(process.env.PORT,()=> {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})