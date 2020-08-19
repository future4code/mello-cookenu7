import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { signUp } from "./endpoints/signUp";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";
import createRecipe from "./endpoints/createRecipe";

dotenv.config();

const app = express();
app.use(express.json());

//USERS
app.post("/signup", signUp)
app.post("/login", login)
app.get("/user/profile", getUserProfile)

//RECIPES
app.post("/recipe", createRecipe)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});