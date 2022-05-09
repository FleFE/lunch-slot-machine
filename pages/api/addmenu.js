// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const path = require("path");
export default function handler(req, res) {
  if (req.method === "POST") {
    const file = fs.readFileSync(
      path.join(path.join(process.cwd(), "localdata"), "menu.json"),
      {
        encoding: "utf8",
      }
    );
    let arr = JSON.parse(file);
    arr.menu.push({
      id: "xx",
      name: req.body.name,
    });
    arr.menu.forEach((element, index) => {
      element.id = index;
    });
    let option = {
      flags: "w", //指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
      encoding: "utf8", //指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
      fd: null, //fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
      autoClose: true, //autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
    };
    const writer = fs.createWriteStream(
      path.join(path.join(process.cwd(), "localdata"), "menu.json"),
      option
    );
    //   res.status(200).json(JSON.parse(file));
    writer.write(JSON.stringify(arr));
    writer.end();
    writer.on("finish", () => {
      console.log("写入已完成..");
      res.status(200).json(arr);
    });
    writer.on("error", (e) => {
      console.log("写入失败..");
      res.status(500).json(e);
    });
  }
}
