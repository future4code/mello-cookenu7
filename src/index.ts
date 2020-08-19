import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { signUp } from "./endpoints/signUp";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/user/signup", signUp)
app.post("/user/login", login)
app.get("/user/profile", getUserProfile)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});