# 🔒 Verificação Discord OAuth2 — Site & Bot

![Node.js](https://img.shields.io/badge/Node.js-16%2B-green?logo=node.js) ![Discord](https://img.shields.io/badge/Discord-Verified-blue?logo=discord) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb) ![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

---

<div align="center">

[![Verificação Discord - Demo](https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif)](https://github.com/seuusuario/seu-repo)

</div>

---

## ✨ Funcionalidades

- 🔑 **Autenticação segura** via OAuth2 do Discord (`identify`, `guilds`, `guilds.join`, `email`)  
- 🤖 **Bot automático** que adiciona usuários ao servidor e atribui cargos  
- 💾 **Persistência de dados** com MongoDB  
- 🌐 **Interface web responsiva** para facilitar a verificação  
- ⚙️ Configuração simples via `.env`

---

## 🚀 Como começar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v16 ou superior  
- Conta no [Discord Developer Portal](https://discord.com/developers/applications)  
- MongoDB Atlas ou local

---

### Passos para rodar

```bash
# Clone o repositório
git clone https://github.com/THZIMX/Site-Auth2/tree/main
cd seu-repo

# Instale as dependências
npm install```


### Configuração do ambiente

Crie um arquivo .env baseado no .env.example:

DISCORD_CLIENT_ID=ID_DO_BOT
DISCORD_CLIENT_SECRET=CLIENT_SECRET_DO_BOT
DISCORD_BOT_TOKEN=TOKEN_DO_BOT
DISCORD_REDIRECT_URI=http://SEU_DOMINIO:3000/callback
GUILD_ID=ID_SERVIDOR_PRINCIPAL
VERIFIED_ROLE_ID=CARGO_VERIFICADO
MONGO_URI=LINK_MONGODB
PORT=3000

Configure no Discord Developer Portal:

Redirect URI igual ao DISCORD_REDIRECT_URI

Escopos: identify, guilds, guilds.join, email



---

▶️ ###Rodando o projeto

npm start
npm run bot
Abra no navegador: http://localhost:3000 (ou sua porta configurada).


---

🗂 Estrutura do projeto

/bot         # Código do bot Discord
/site        # Código do site de verificação OAuth2
/database.   # conexão MongoDB
.env.example # Exemplo de variáveis de ambiente
README.md    # Documentação


---

🤝 ###Contribuições

Contribuições são muito bem-vindas!

1. Faça um fork


2. Crie sua branch (git checkout -b minha-feature)


3. Faça commit das mudanças (git commit -m "Minha feature")


4. Envie para o repositório (git push origin minha-feature)


5. Abra um Pull Request




---

📄 ###Licença

MIT License © THZIMX


---

📬 ###Contato

Discord: theeuss_x



---

<div align="center">✨ Obrigado por usar o sistema de verificação Discord OAuth2! 🚀

</div>
