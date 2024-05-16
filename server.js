import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Correctly compute __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  // Ensure the path is absolute
  const fullPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(fullPath);
});

const PORT = import.meta.env || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
