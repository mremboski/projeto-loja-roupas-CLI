# 🛍️ Loja de Roupas - Sistema CLI + Geração de Catálogo Web

Projeto desenvolvido para a disciplina de **Lógica de Programação** na UniSenac.  
Este sistema simula a gestão de uma loja de roupas, com funcionalidades completas para cadastro, pesquisa, edição, exclusão e visualização dos produtos — tudo operado por terminal (CLI), e com geração automática de uma página HTML com o catálogo visual das roupas.

---

## 🚀 Funcionalidades

- 👕 Incluir nova roupa no estoque
- 📋 Listar todas as roupas cadastradas
- 🔎 Pesquisar roupas por:
- 🔎 Código
- 🔤 Nome
- 📏 Tamanho
- 💰 Intervalo de preço
- 📝 Alterar dados de uma roupa
- ❌ Excluir roupas
- 🌐 Gerar catálogo HTML com as roupas cadastradas
- 💾 Persistência dos dados em arquivo `.txt` (estoqueRoupas.txt)

---

## 💻 Tecnologias Utilizadas

- **Node.js**
- `prompt-sync` – Entrada de dados via terminal
- `fs` – Manipulação de arquivos
- HTML e CSS – Para geração do catálogo de roupas

---

## ▶️ Como Executar

1. Instale o Node.js em seu computador:  
   [https://nodejs.org/](https://nodejs.org/)

2. Clone este repositório ou copie os arquivos para uma pasta local.

3. Instale a dependência do projeto:

```bash
npm install prompt-sync
```

4. Execute o sistema:

```bash
node index.js
```

---

## 📁 Estrutura do Projeto

```
/loja-de-roupas-cli
│
├── index.js              # Arquivo principal do sistema
├── estoqueRoupas.txt     # Banco de dados local (texto)
├── catalogoWeb.html      # Catálogo HTML gerado automaticamente
└── README.md             # Documentação do projeto
```

---

## 📦 Exemplo de Uso

Ao executar o sistema, o seguinte menu será exibido:

```
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
```

Os dados digitados são salvos automaticamente em `estoqueRoupas.txt` e uma página chamada `catalogoWeb.html` é gerada com uma tabela visual com as roupas cadastradas.

---

## 📌 Observações

- As imagens no HTML são carregadas a partir de **URLs externas** inseridas pelo usuário.
- O sistema garante persistência de dados mesmo após fechar o terminal.
- O código foi escrito com foco em lógica, boas práticas e organização.

---

## 👨‍💻 Autor

Michel Remboski  
[GitHub](https://github.com/mremboski) • [LinkedIn](https://www.linkedin.com/in/michel-remboski-0a8890229/)

---

## 📚 Créditos Acadêmicos

Este projeto foi desenvolvido como parte da disciplina de **Lógica de Programação – UniSenac**, com o objetivo de aplicar:
- Manipulação de vetores
- Estruturas condicionais e repetição
- Funções
- Leitura e escrita de arquivos
- Programação orientada a dados
