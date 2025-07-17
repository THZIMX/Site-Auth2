const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('painel-verificacao')
    .setDescription('Envia o painel de verificação.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Sistema de Verificação')
      .setDescription('Clique no botão abaixo para se verificar.')
      .setColor('Green');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Verificar')
        .setStyle(ButtonStyle.Link)
        .setURL('http://localhost:3000') // Altere para seu domínio depois
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
};
