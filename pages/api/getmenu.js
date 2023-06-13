// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const path = require("path");
let tempDate = null;
export default function handler(req, res) {
  if (tempDate === null) {
    tempDate = fs.readFileSync(
      path.join(path.join(process.cwd(), "localdata"), "menu.json"),
      {
        encoding: "utf8",
      }
    );
  }
  res.status(200).json(JSON.parse(file));
}
