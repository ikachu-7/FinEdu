const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./config/connectDB");
require("dotenv").config();

//middlewares
app.use("/uploads", express.static("./uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/user", require("./routes/courseRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1", require("./routes/studentRoutes"));
app.use("/api/v1/expensetracker", require("./routes/expensetracker"));
app.use("/api/v1/emiCalculator", require("./routes/emiCalculator"));
app.use("/api/v1/contact", require("./routes/contactRoute"));

const port = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log(`Server running at ${port}..`);
    });
  } catch (error) {
    console.log(error);
  }
})();
