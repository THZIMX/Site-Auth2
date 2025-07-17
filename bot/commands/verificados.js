const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const mongoose = require('mongoose'); // Adicionando a importação do mongoose
const User = require('../../database/models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verificados')
    .setDescription('Lista os usuários verificados via OAuth2')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    // Verificação mais robusta da conexão com o MongoDB
    const readyStates = ['Desconectado', 'Conectando', 'Conectado', 'Desconectando'];
    if (mongoose.connection.readyState !== 1) {
      return interaction.reply({
        content: `❌ Banco de dados não conectado (Status: ${readyStates[mongoose.connection.readyState]})`,
        ephemeral: true
      });
    }

    try {
      await interaction.deferReply({ ephemeral: true });

      // Consulta com tratamento de timeout
      const users = await User.find()
        .sort({ username: 1 })
        .maxTimeMS(30000)
        .lean(); // Usando lean() para melhor performance

      if (!users || users.length === 0) {
        return interaction.editReply('❌ Nenhum usuário verificado ainda.');
      }

      // Processamento dos resultados
      const embeds = [];
      const chunkSize = 10;

      for (let i = 0; i < users.length; i += chunkSize) {
        const chunk = users.slice(i, i + chunkSize);
        const embed = new EmbedBuilder()
          .setTitle(`✅ Usuários Verificados (${i + 1}-${Math.min(i + chunkSize, users.length)}/${users.length})`)
          .setColor('Green')
          .setTimestamp();

        chunk.forEach((user, index) => {
          embed.addFields({
            name: `${i + index + 1}. ${user.username}`,
            value: `🆔 ${user.discordId}\n📅 ${user.verifiedAt ? new Date(user.verifiedAt).toLocaleString() : 'Data não registrada'}`,
            inline: false
          });
        });

        embeds.push(embed);
      }

      await interaction.editReply({ embeds: embeds.slice(0, 10) });

    } catch (err) {
      console.error('Erro no comando /verificados:', err);

      let errorMessage = '❌ Ocorreu um erro ao processar a solicitação';
      if (err.name === 'MongooseError') {
        errorMessage += '\n⏳ Tempo de conexão com o banco de dados esgotado';
      } else if (err instanceof mongoose.Error) {
        errorMessage += '\n🗃️ Erro na operação com o banco de dados';
      }

      await interaction.editReply({
        content: errorMessage,
        ephemeral: true
      });
    }
  }
};
