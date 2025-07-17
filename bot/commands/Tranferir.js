const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');
const User = require('../../database/models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('transferir_verificados')
    .setDescription('Transfere os usuários verificados para outro servidor.')
    .addStringOption(option =>
      option.setName('guild_id')
        .setDescription('ID do servidor de destino')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const targetGuildId = interaction.options.getString('guild_id');
    await interaction.deferReply({ ephemeral: true });

    try {
      const users = await User.find({});

      if (users.length === 0) {
        return interaction.editReply('❌ Nenhum usuário verificado encontrado.');
      }

      let successCount = 0;
      let failCount = 0;

      for (const user of users) {
        try {
          await axios.put(
            `https://discord.com/api/v10/guilds/${targetGuildId}/members/${user.discordId}`,
            {
              access_token: user.accessToken
            },
            {
              headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
              }
            }
          );
          successCount++;
        } catch (err) {
          console.log(`Erro ao adicionar ${user.discordId}:`, err.response?.data || err.message);
          failCount++;
        }
      }

      await interaction.editReply(`✅ Transferência finalizada:\n- Sucesso: ${successCount}\n- Falhas: ${failCount}`);

    } catch (err) {
      console.error(err);
      await interaction.editReply('❌ Ocorreu um erro ao transferir os usuários.');
    }
  }
};
