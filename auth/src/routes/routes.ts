import express from "express";

const authRouter = express.Router();

authRouter.get("/current", (req, res) => {
  return res.send("Get Crurrent User!");
});
authRouter.post("/create", (req, res) => {
  return res.send("Create New User!");
});
authRouter.post("/signin", (req, res) => {
  return res.send("Handle user sign in!");
});
authRouter.post("/signout", (req, res) => {
  return res.send("Handle user signout!");
});

export default authRouter;
