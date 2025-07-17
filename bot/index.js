const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose'); // Importe o mongoose
require('dotenv').config();

// Configuração do cliente Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Conexão com o MongoDB
async function connectToDatabase() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI não está definido no .env');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000
    });

    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Falha na conexão com o MongoDB:', error);
    process.exit(1); // Encerra o processo se não conseguir conectar
  }
}

// Carrega os comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

// Evento de interação
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Erro ao executar o comando ${interaction.commandName}:`, error);
    await interaction.reply({
      content: '❌ Ocorreu um erro ao executar este comando!',
      ephemeral: true
    });
  }
});

// Carrega os eventos
const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath).forEach(file => {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

// Inicialização do bot
async function startBot() {
  await connectToDatabase();
  await client.login(process.env.DISCORD_BOT_TOKEN);
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
}

startBot().catch(error => {
  console.error('Falha ao iniciar o bot:', error);
  process.exit(1);
});
