import * as fs from "fs";
import * as path from "path";

const folder: string = path.join(__dirname, "icons", "All", "outline");

let fileNames: string[] = [];

fs.readdir(folder, (err: NodeJS.ErrnoException | null, files: string[]) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  files.forEach((file) => {
    const fileNameWithoutExtension = file.replace(".svg", "");
    fileNames.push(`"${fileNameWithoutExtension}"`);
  });

  console.log("File names in folder:", fileNames);

  const fileContent = `type FileNames = \n  ${fileNames.join(" |\n  ")}\n;`;

  fs.writeFile("fileNames.ts", fileContent, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      return;
    }
    console.log("File created successfully.");
  });
});
