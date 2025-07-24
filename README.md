# 🔒 Verificação Discord OAuth2 — Site & Bot

![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js) ![Discord](https://img.shields.io/badge/Discord-Verified-blue?logo=discord) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb) ![MIT License](https://img.shields.io/badge/License-MIT-blue.svg) ![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)

---

<div align="center">

[![Verificação Discord - Demo](https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif)](https://github.com/THZIMX/Site-Auth2)

</div>

---

## ✨ Funcionalidades Principais

- **🔐 Autenticação Segura**  
  Integração com OAuth2 do Discord utilizando os escopos `identify`, `guilds`, `guilds.join` e `email`.

- **🤖 Bot Automatizado**  
  - Adiciona usuários automaticamente ao servidor Discord  
  - Atribui cargos de verificação  
  - Gerencia entrada de membros  

- **💾 Armazenamento de Dados**  
  - Persistência de informações com MongoDB Atlas  
  - Modelos otimizados para performance  

- **🌐 Interface Web Moderna**  
  - Design responsivo para desktop e mobile  
  - Fluxo de autenticação intuitivo  

- **⚡ Configuração Simplificada**  
  - Setup rápido via variáveis de ambiente  
  - Documentação clara para deployment  

---

## 🚀 Guia de Instalação

### 📋 Pré-requisitos

- Node.js v16+ [Download](https://nodejs.org/)  
- Conta no [Discord Developer Portal](https://discord.com/developers/applications)  
- MongoDB Atlas (recomendado) ou instalação local  
- Git para controle de versão  

---

### 🛠 Configuração Inicial

```bash
# Clone o repositório
git clone https://github.com/THZIMX/Site-Auth2.git
cd Site-Auth2

# Instale as dependências
npm install
```

### ⚙ Configuração de Ambiente

1. Renomeie `.env.example` para `.env`  
2. Preencha com suas credenciais:

```env
# Discord
DISCORD_CLIENT_ID=seu_client_id
DISCORD_CLIENT_SECRET=seu_client_secret
DISCORD_BOT_TOKEN=seu_bot_token
DISCORD_REDIRECT_URI=http://localhost:3000/auth/callback

# Servidor
GUILD_ID=id_do_seu_servidor
VERIFIED_ROLE_ID=id_do_cargo_verificado

# Banco de Dados
MONGO_URI=sua_string_de_conexao_mongodb

# Aplicação
PORT=3000
SESSION_SECRET=sua_chave_secreta
```

3. No Discord Developer Portal:  
   - Adicione o Redirect URI (igual ao `DISCORD_REDIRECT_URI`)  
   - Habilite os escopos: `identify`, `guilds`, `guilds.join`, `email`  

---

## ▶ Execução do Projeto

Inicie os serviços em terminais separados:

```bash
# Servidor Web
npm start

# Bot Discord
npm run bot
```

Acesse no navegador:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🏗 Estrutura do Projeto

```
📦 Site-Auth2
├── 📂 bot               # Código do bot Discord
│   ├── commands        # Comandos slash
│   ├── events          # Event handlers
│   └── index.js        # arquivo principal
├── 📂 site              # Aplicação web
│   ├── routes          # Rotas Express
│   ├── views           # Templates (EJS/Pug)
│   └── public          # css do site
├── 📂 database          # Modelos MongoDB
|    └── models
├── 📄 .env.example      # Template de configuração
└── 📄 README.md         # Documentação
```

---

## 🤝 Como Contribuir

1. **Fork** o projeto  
2. Crie uma branch:  
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça commit das alterações:  
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie para o repositório:  
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um **Pull Request**

---

## 📜 Licença

Distribuído sob licença MIT. Veja o arquivo `LICENSE` para mais informações.

---

## 📩 Contato

- **Discord**: theeuss_x  
- **GitHub**: [@THZIMX](https://github.com/THZIMX) 

---

<div align="center">
✨ Obrigado por utilizar nosso sistema de verificação!  
🚀 Contribuições são sempre bem-vindas!
</div>
