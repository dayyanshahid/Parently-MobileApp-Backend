const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(express.json());
app.use(cors());

// DB connection
mongoose.connect("mongodb://localhost:27017/parentlyDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/chat", chatRoutes);

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
