const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../../database/models/User');
require('dotenv').config();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send('Código inválido.');

  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.DISCORD_CLIENT_ID);
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
    params.append('scope', 'identify email guilds.join');

    const { data } = await axios.post('https://discord.com/api/oauth2/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const userData = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const user = userData.data;

    await User.findOneAndUpdate(
  { discordId: user.id },
  {
    username: user.username,
    email: user.email,
    accessToken: data.access_token
  },
  { upsert: true }
);

    // Adicionar usuário ao servidor
    await axios.put(
      `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${user.id}`,
      { access_token: data.access_token },
      {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      }
    );

    // Adicionar cargo de verificado
    await axios.put(
      `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${user.id}/roles/${process.env.VERIFIED_ROLE_ID}`,
      {},
      {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      }
    );

    res.render('success', { user });

  } catch (err) {
    console.error(err.response?.data || err);
    res.send('Erro ao verificar.');
  }
});

module.exports = router;
