import fs from "fs";

const creatDirectoryScraper = (fileReader: FileReader) => {
  return (dirPath: string): Record<string, unknown> => {
    return fs
      .readdirSync(dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (fileReader.isJSONFile(file)) {
            acc[file] = fileReader.readJSON(`${dirPath}/${file}`);
          } else {
            acc[file] = fileReader.readText(`${dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
  };
};

class FileReader {
  isJSONFile(file: string): boolean {
    return file.endsWith(".json");
  }

  readText(file: string): string {
    return fs.readFileSync(file, "utf-8").toString();
  }
  readJSON(file: string): string {
    return JSON.parse(fs.readFileSync(file, "utf-8").toString());
  }
}

const dirScraper = creatDirectoryScraper(new FileReader());
console.log(dirScraper("./data"));
