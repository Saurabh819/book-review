const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = 5000;
dotenv.config();
const connectDB = require("./db/db");
const userRoute = require('./route/userRoute')
const adminRoute = require('./route/adminRoute')
const bookRoute = require('./route/bookRoute')

connectDB();

app.use(express.json());

app.use("/api", userRoute);
app.use('/api/admin',adminRoute)
app.use('/api/book',bookRoute)
// app.use('/api/admin',adminRouter)
// app.use('/api/admin/movie',movieRouter)

app.listen(PORT, () => {
  console.log("Server is running at 5000");
});
