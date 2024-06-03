const express = require("express");
const shakeDatabase = require("./connection/database");
const cors = require('cors');
const bodyParser = require('body-parser');


require("dotenv").config();

const app = express();
app.options('*', cors());

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));





const { PORT } = process.env;

app.use(express.json());


app.use("/api/v1/user", require("./routes/userRoute"));

app.use("/api/v1/wallet", require("./routes/walletRoute"));

app.use("/api/v1/payment", require("./routes/paymentRoute"));

app.use("/api/v1/admin", require("./routes/adminRoute"));







// SHAKE DATABASE
shakeDatabase(() => {
  // Start the server after database successful handshake
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
