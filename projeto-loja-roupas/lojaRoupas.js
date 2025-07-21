const prompt = require("prompt-sync")();
const fs = require("fs");
let roupas = [];

function carregarDados() {
  if (fs.existsSync("estoqueRoupas.txt")) {
    const linhas = fs.readFileSync("estoqueRoupas.txt", "utf-8").split("\n");
    roupas = linhas
      .map((linha) => {
        const [codigo, nome, tamanho, cor, preco, foto] = linha.split(";");
        return { codigo, nome, tamanho, cor, preco: parseFloat(preco), foto };
      })
      .filter((roupa) => roupa.codigo);
  }
}

function salvarDados() {
  const dados = roupas
    .map(
      (r) => `${r.codigo};${r.nome};${r.tamanho};${r.cor};${r.preco};${r.foto}`
    )
    .join("\n");
  fs.writeFileSync("estoqueRoupas.txt", dados);
  console.log("\nDados salvos com sucesso! ✅");
}

function gerarPaginaWeb() {
  let html = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catalogo: Loja de Roupas</title>
    <style>
        body { font-family: Arial; margin: 30px; background-color: #f4f4f4;}
        h1 { color: rgb(104, 5, 5); }
        table { width: 100%; border-collapse: collapse; background-color: #fff; 
            border-bottom: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;}
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ccc;}    
        th { background-color: #e0dede; color: #333 }
        img { max-width: 100px; max-height: 120px; border-radius: 4px; }
        tr:hover { background-color: #f9f9f9;}
    </style>
</head>
<body>
    <h1>Catalogo: Loja de Roupas</h1>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Tamanho</th>
                <th>Cor</th>
                <th>Preço R$</th>
                <th>Imagem</th>
            </tr>
        </thead>
        <tbody>`;

  roupas.forEach((r) => {
    html += `
            <tr>
                <td>${r.codigo}</td>
                <td>${r.nome}</td>
                <td>${r.tamanho}</td>
                <td>${r.cor}</td>
                <td>R$ ${r.preco.toFixed(2)}</td>
                <td><img src="${r.foto}" alt="${r.nome}"></td>
            </tr>`;
  });

  html += `
        </tbody>
    </table>
</body>
</html>`;

  fs.writeFileSync("catalogoWeb.html", html);
  console.log("\n✅ Página HTML gerada: 'catalogo_base.html'");
}

function mostrarMenu() {
  console.log(`
===== 🛍️ LOJA DE ROUPAS =====
1. 👕 Incluir Roupa
2. 📋 Listar Roupas
3. 🔎 Pesquisar por Código
4. 🔤 Pesquisar por Nome
5. 📏 Pesquisar por Tamanho
6. 💰 Pesquisar por Intervalo de Preço
7. 📝 Alterar Roupa
8. ❌ Excluir Roupa
9. 🌐 Gerar Página Web (HTML)
0. 🚪 Sair
  `);
  const opcao = prompt("Escolha uma opção: ");
  return parseInt(opcao);
}

function incluirRoupa() {
  console.log("\n=== INCLUIR ROUPA ===");
  const codigo = prompt("Código da roupa: ");
  const nome = prompt("Nome da roupa: ");
  const tamanho = prompt("Tamanho (P/M/G/GG): ").toUpperCase();
  const cor = prompt("Cor: ");
  const preco = parseFloat(prompt("Preço R$: "));
  const foto = prompt("URL da foto: ");

  roupas.push({ codigo, nome, tamanho, cor, preco, foto });
  salvarDados();
  gerarPaginaWeb();
  console.log("\n✅ Roupa adicionada!");
}

function listarRoupas() {
  console.log("\n=== LISTA DE ROUPAS ===");
  console.log(
    "Nº | CÓDIGO | NOME".padEnd(25) + "| TAM | COR".padEnd(15) + "| PREÇO R$"
  );
  console.log("-".repeat(60));
  roupas.forEach((r, index) => {
    console.log(
      `${(index + 1).toString().padEnd(2)} | ${r.codigo.padEnd(
        6
      )} | ${r.nome.padEnd(20)} | ${r.tamanho.padEnd(3)} | ${r.cor.padEnd(
        10
      )} | ${r.preco.toFixed(2).padStart(8)}`
    );
  });
  console.log("-".repeat(60));
}

function pesquisarPorCodigo() {
  const codigo = prompt("\nDigite o código para buscar: ");
  const encontradas = roupas.filter((r) =>
    r.codigo.toLowerCase().includes(codigo.toLowerCase())
  );

  if (encontradas.length > 0) {
    console.log("\n🔍 Resultados:");
    encontradas.forEach((r) => {
      console.log(
        `Código: ${r.codigo}, Nome: ${r.nome}, Tamanho: ${r.tamanho}, Cor: ${
          r.cor
        }, Preço: R$ ${r.preco.toFixed(2)}`
      );
    });
  } else {
    console.log("\n⚠️ Nenhuma roupa encontrada com esse código!");
  }
}

function pesquisarPorNome() {
  const nome = prompt("\nDigite parte do nome para buscar: ");
  const encontradas = roupas.filter((r) =>
    r.nome.toLowerCase().includes(nome.toLowerCase())
  );

  if (encontradas.length > 0) {
    console.log("\n🔍 Resultados:");
    encontradas.forEach((r) => {
      console.log(
        `Nome: ${r.nome}, Código: ${r.codigo}, Tamanho: ${
          r.tamanho
        }, Preço: R$ ${r.preco.toFixed(2)}`
      );
    });
  } else {
    console.log("\n⚠️ Nenhuma roupa encontrada com esse nome!");
  }
}

function pesquisarPorTamanho() {
  const tamanho = prompt("\nDigite o tamanho (P/M/G/GG): ").toUpperCase();
  const encontradas = roupas.filter((r) => r.tamanho === tamanho);

  if (encontradas.length > 0) {
    console.log(`\nRoupas tamanho ${tamanho}:`);
    encontradas.forEach((r) => {
      console.log(
        `- ${r.nome} (${r.codigo}), Cor: ${r.cor}, Preço: R$ ${r.preco.toFixed(
          2
        )}`
      );
    });
  } else {
    console.log(`\n⚠️ Nenhuma roupa encontrada no tamanho ${tamanho}!`);
  }
}

function pesquisarPorPreco() {
  const min = parseFloat(prompt("Preço mínimo R$: "));
  const max = parseFloat(prompt("Preço máximo R$: "));
  const encontradas = roupas.filter((r) => r.preco >= min && r.preco <= max);

  if (encontradas.length > 0) {
    console.log(`\nRoupas entre R$ ${min.toFixed(2)} e R$ ${max.toFixed(2)}:`);
    encontradas.forEach((r) => {
      console.log(
        `- ${r.nome} (${r.codigo}), Tamanho: ${
          r.tamanho
        }, Preço: R$ ${r.preco.toFixed(2)}`
      );
    });
  } else {
    console.log("\n⚠️ Nenhuma roupa encontrada nessa faixa de preço!");
  }
}

function alterarRoupa() {
  listarRoupas();
  const codigo = prompt("\nDigite o código da roupa que deseja alterar: ");
  const roupa = roupas.find((r) => r.codigo === codigo);

  if (roupa) {
    console.log("\nDeixe em branco para manter o valor atual:");
    roupa.nome = prompt(`Nome [${roupa.nome}]: `) || roupa.nome;
    roupa.tamanho = (
      prompt(`Tamanho [${roupa.tamanho}]: `) || roupa.tamanho
    ).toUpperCase();
    roupa.cor = prompt(`Cor [${roupa.cor}]: `) || roupa.cor;
    const novoPreco = prompt(`Preço [${roupa.preco}]: `);
    roupa.preco = novoPreco ? parseFloat(novoPreco) : roupa.preco;
    roupa.foto = prompt(`URL da foto [${roupa.foto}]: `) || roupa.foto;

    salvarDados();
    gerarPaginaWeb();
    console.log("\n✅ Roupa alterada com sucesso!");
  } else {
    console.log("\n⚠️ Roupa não encontrada!");
  }
}

function excluirRoupa() {
  listarRoupas();
  const codigo = prompt("\nDigite o código da roupa que deseja excluir: ");
  const index = roupas.findIndex((r) => r.codigo === codigo);

  if (index >= 0) {
    const nome = roupas[index].nome;
    roupas.splice(index, 1);
    salvarDados();
    gerarPaginaWeb();
    console.log(`\n✅ "${nome}" excluído com sucesso!`);
  } else {
    console.log("\n⚠️ Roupa não encontrada!");
  }
}

carregarDados();
let opcao;
do {
  opcao = mostrarMenu();
  switch (opcao) {
    case 1:
      incluirRoupa();
      break;
    case 2:
      listarRoupas();
      break;
    case 3:
      pesquisarPorCodigo();
      break;
    case 4:
      pesquisarPorNome();
      break;
    case 5:
      pesquisarPorTamanho();
      break;
    case 6:
      pesquisarPorPreco();
      break;
    case 7:
      alterarRoupa();
      break;
    case 8:
      excluirRoupa();
      break;
    case 9:
      gerarPaginaWeb();
      break;
    case 0:
      console.log("\nSistema encerrado.");
      break;
    default:
      console.log("\n⚠️ Opção inválida!");
  }
  if (opcao !== 0) prompt("\nPressione Enter para continuar...");
} while (opcao !== 0);

salvarDados();
