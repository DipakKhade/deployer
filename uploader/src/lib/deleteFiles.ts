import fs from "fs";
import path from "path";

export function deleteUploadedFiles(id: string) {
  try {
    // const filePath = path.join(__dirname,'uploads');
    // console.log(`D:\\Dipak\\uploader\\uploads\\${id}`)
    setTimeout(() => {
      fs.unlinkSync(`D:\\Dipak\\uploader\\uploads\\${id}`);
    }, 3000);

    return;
  } catch (e) {
    console.log(e);
  }
}
