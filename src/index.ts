import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { signUp } from "./endpoints/signUp";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";
import createRecipe from "./endpoints/createRecipe";
import { followUser } from "./endpoints/followUser";
import { getRecipe } from "./endpoints/getRecipe";
import { unfollowUser } from "./endpoints/unfollowUser";
import { getAnotherProfile } from "./endpoints/getAnotherProfile";
import deleteRecipe from "./endpoints/deleteRecipe";
import getFeedRecipes from "./endpoints/getFeedRecipes";
import editRecipe from "./endpoints/editRecipe";

dotenv.config();

const app = express();
app.use(express.json());

//USERS
app.post("/signup", signUp)
app.post("/login", login)
app.get("/user/profile", getUserProfile)
app.get("/user/feed", getFeedRecipes)

//RECIPES
app.post("/recipe", createRecipe)
app.get("/recipe/:id", getRecipe)
app.delete("/recipe/delete/:id", deleteRecipe)
app.post("/recipe/edit/:id", editRecipe)

//FOLLOW USERS
app.post("/user/follow", followUser)
app.post("/user/unfollow", unfollowUser)
app.get("/user/:id", getAnotherProfile)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});