const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/database");

const companies = require("./routes/SecurityCompanyRoutes");
const guards = require("./routes/SecurityGuardRoutes");
const auth = require("./routes/AuthRoutes");
const users = require("./routes/UserRoutes");
const companyInformation = require("./routes/CompanyInformationRoutes");
const fireaArms = require("./routes/FireArmsRoutes");

dotenv.config();
const app = express();
const PORT = process.env.EXPRESS_PORT || 8080;


const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

dbConnect();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", companies);
app.use("/api", guards);
app.use("/api", auth);
app.use("/api", users);
app.use("/api", companyInformation);
app.use("/api", fireaArms)
app.use("/", (res, req) => {
  res.send("Backend")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
