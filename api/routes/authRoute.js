import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("User registered successfully");
});

router.post("/login", (req, res) => {
  res.send("User logged in successfully");
});

router.post("/logout", (req, res) => {
  res.send("User logged out successfully");
});

router.get("/profile", (req, res) => {
  res.send("User profile");
});

export default router;
