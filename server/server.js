const express = require('express')

const app = express()

const cors = require("cors")



app.use(express.json())
app.use(cors())

const userRoute = require("./routes/userRoute")

app.use("/api/user",userRoute )



app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});