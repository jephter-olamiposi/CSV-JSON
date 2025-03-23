const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const convert = require("./parser.js");
app.use(express.static(__dirname + "/uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "text/csv" ||
      path.extname(file.originalname).toLowerCase() !== ".csv"
    ) {
      return cb(new Error("Only CSV files are allowed"), false);
    }
    cb(null, true);
  },
});

app.post("/upload-csv", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const jsonData = await convert.parseData(filePath);

    // Remove the uploaded file after parsing
    fs.unlink(filePath, (err) => {
      if (err) console.error("Cleanup error:", err);
    });

    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Failed to parse uploaded CSV" });
  }
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
