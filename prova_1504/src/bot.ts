import TelegramBot from 'node-telegram-bot-api';
import { PrismaClient } from './prisma/node_modules/@prisma/client'
const prisma = new PrismaClient();

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
});

let waitingForEmail: number | null = null;


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const messageDate = new Date(msg.date * 1000); 
  const hours = messageDate.getHours();

  if (hours >= 9 && hours <= 18) {
    const formattedTime = `${hours}`;
    await bot.sendMessage(chatId, `Use o link: https://uvv.br`);
  } else {
    if (waitingForEmail === chatId) {
      const email = messageText;
      try {
      
        async function main() {
          const user = await prisma.user.create({
            data: {
              name: chatId.toString(), 
              email: email,
            },
        })
      } 

        ;
        waitingForEmail = null;

        await bot.sendMessage(chatId, 'Seu email foi registrado com sucesso. Obrigado!');
      } catch (error) {
        console.error('Erro ao armazenar o email no banco de dados:', error);
        await bot.sendMessage(chatId, 'Ocorreu um erro ao armazenar seu email. Por favor, tente novamente mais tarde.');
      }
    } else {
      await bot.sendMessage(chatId, 'Fora do horário permitido para envio de mensagens.');
      await bot.sendMessage(chatId, 'Informe o email para consultas posteriores: ');

      waitingForEmail = chatId;
    }
  }
});

