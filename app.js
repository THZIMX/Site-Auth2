const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// ✅ Define o caminho correto da pasta views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("Erro no MongoDB:", err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'verificacao', resave: false, saveUninitialized: false }));

// ✅ Define rotas
app.use('/', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`🌐 Site rodando em http://localhost:${process.env.PORT}`);
});
