import express, { Request, Response } from "express";

const app = express();

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "How to Implement Github OAuth with Node.js",
  });
});

const port = 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
