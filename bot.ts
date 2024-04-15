import TelegramBot from 'node-telegram-bot-api';
//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient();

const token = '6959093772:AAEs23-IlMQ-WK4ZCITlFj-d2JGTGWCYx5w';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if (match) {
    const resp = match[1]; // o texto capturado
    bot.sendMessage(chatId, resp);
  } else {
    // Caso a mensagem não corresponda ao padrão esperado
    bot.sendMessage(chatId, 'Por favor, use o comando /echo seguido do texto a ser repetido.');
  }
  //bot.sendMessage(chatId, resp);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageDate = new Date(msg.date * 1000); // Converte o timestamp Unix em milissegundos
  const hours = messageDate.getHours();

  if (hours >= 9 && hours <= 18) {
    const formattedTime = `${hours}`;
    await bot.sendMessage(chatId, `Use o link : https://uvv.br`);
  } else {
    await bot.sendMessage(chatId, 'Fora do horário permitido para envio de mensagens.');
    await bot.sendMessage(chatId, 'Informe o email para consultas posteriores: ');
    //aqui pegaria o email
   /* const email = msg.from.username || msg.from.id.toString(); 
    await prisma.email.create({
      data: {
        address: email,
      },
    });*/
  }
});
