class readFilesService {
  constructor() {}

  // read CSV method
  static readCSVFile(fileElement) {
    let text = "";
    return fileElement.files[0].text().then((fileText) => fileText);
  }
}
