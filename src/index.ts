import * as fs from "fs";
import * as path from "path";

// Describe the route to your folder. Names are always entered from left to right
const pasta: string = path.join(__dirname, "icons");

let nomesDosArquivos: string[] = [];

fs.readdir(pasta, (err: NodeJS.ErrnoException | null, arquivos: string[]) => {
  if (err) {
    console.error("Erro ao ler a pasta:", err);
    return;
  }

  arquivos.forEach((arquivo) => {
    const nomeArquivoSemExtensao = arquivo.replace(".svg", "");
    nomesDosArquivos.push(`"${nomeArquivoSemExtensao}"`);
  });

  console.log("Nomes dos arquivos na pasta:", nomesDosArquivos);

  const conteudoArquivo = `type FileNames = \n  ${nomesDosArquivos.join(
    " |\n  "
  )}\n;`;

  fs.writeFile("fileNames.ts", conteudoArquivo, (err) => {
    if (err) {
      console.error("Erro ao criar o arquivo:", err);
      return;
    }
    console.log("Arquivo criado com sucesso.");
  });
});
