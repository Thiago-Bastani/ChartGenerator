document.getElementById("csvFile").addEventListener("change", (element) => {
  // Promisse
  readFilesService.readCSVFile(element.target).then((fileText) => {
    let fileTextLines = fileText
      .split("\r\n")
      .filter((text, index) => index > 0); // tirar cabeçalho
    let qtdLinhas = fileTextLines.map((lines) => lines.split(",")[0]).length;
    let qtdColunas = fileTextLines[0].split(",").length;
    let labels = fileTextLines.map((lines) => lines.split(",")[0]);
    let valores = [];
    for (i = 1; i < qtdColunas; i++) {
      let valoresAux = [];
      for (j = 0; j < qtdLinhas; j++) {
        if (qtdColunas > 2) {
          valoresAux.push(parseFloat(fileTextLines[j].split(",")[i]));
        } else {
          valores = fileTextLines.map((lines) =>
            parseFloat(lines.split(",")[j])
          );
        }
      }
      valores.push(valoresAux);
    }
    let cabecalho = fileText.split("\r\n")[0].split(",");
    chart = new chartFactory(valores, cabecalho, labels, "bar", "myChart");
    chart.createChart();
  });
});
