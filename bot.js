import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv' 
import fetch from 'node-fetch';
dotenv.config()

const telegramToken = process.env.TELEGRAM_TOKEN;
const bot = new Telegraf(telegramToken)

async function GetTotalCodingTimeForTodayAsync() {
  const cookieValue = process.env.COOKIE_VALUE;

  // Make the API request to get the coding activity summary for the current day
  const url = "https://wakatime.com/api/v1/users/current/summaries?range=today";
  const response = await fetch(url, {
    headers: {
      Cookie: cookieValue
    }
  });
  const json = await response.json();

  if (!response.ok)
    throw new Error(`Error: ${response.status} - ${json}`);

  // Parse the response and extract the total coding time for the day in seconds
  const DataTotal = json.cumulative_total;
  const totalCodingTime = DataTotal?.text || "no hay información";
  
  const arthrosProject = json.data[0].projects.find(project => project.name === 'Arthros.UI.Web');
  const arthrosTime = arthrosProject ? arthrosProject.text : 'Todavía no trabajaste';

  return {
    totalCodingTime: totalCodingTime,
    arthrosCodingTime: arthrosTime
  };
}

bot.command('today', async (ctx) => {
  try {
    const codingTimes = await GetTotalCodingTimeForTodayAsync();
    ctx.reply(`Hoy programaste en total: ${codingTimes.totalCodingTime}\nHoy trabajaste: ${codingTimes.arthrosCodingTime} `);
  } catch (error) {
    ctx.reply('Ocurrió un error al obtener el tiempo de programación.');
    console.error(error);
  }
})

const sendPeriodicMessage = async () => {
  try {
    const codingTimes = await GetTotalCodingTimeForTodayAsync();
    const message = `Hoy programaste en total: ${codingTimes.totalCodingTime}\nHoy trabajaste: ${codingTimes.arthrosCodingTime} `
    bot.telegram.sendMessage(process.env.USER_ID, message);
    setTimeout(sendPeriodicMessage , 1000 * 60 * 60 * 2);
  } catch (error) {
    console.error("Ocurrió un error al enviar el mensaje periódico: ", error);
  }
}

sendPeriodicMessage();

bot.launch()