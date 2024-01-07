const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot("6528807986:AAFB82A5mSm6F1QCSz1nZk4StrsROrVmx1Y", {
  polling: true,
});
const fs = require("fs");
const { askServer, askDetails, askBuyCarDetails, askBuyBusinessDetails, askBuyHouseDetails, askBuyApartmentDetails, askBuyAccessoireDetails, askBuySkinDetails } = require("./assets/functions/functions");
const imagesDb = JSON.parse(fs.readFileSync("./assets/db/images.json"));
const {
  adminStartKeyboard,
  userStartKeyboard,
  serverKeyboard,
  buyOptionsKeyboard,
} = require("./assets/keyboard/keyboard");
const {
  waitForPhotoAndSave,
  addPromo,
} = require("./assets/adminFunctions/adminFunction");
const commands = JSON.parse(
  fs.readFileSync("./assets/db/commands/commands.json")
);

bot.setMyCommands(commands);

const db = require("./assets/db/db.json");

bot.on("message", async (msg) => {
  let user = db.find((user) => user.username === msg.from.username);

  if (msg.text === "/start") {
    if (!user) {
      db.push({
        username: msg?.from.username,
        id: msg.from.id,
        first_name: msg.from.first_name,
        last_name: msg.from.last_name,
        isAdmin: false,
        server: 1,
      });
      fs.writeFileSync("./assets/db/db.json", JSON.stringify(db, null, "\t"));
      await bot.sendPhoto(msg.chat.id, imagesDb.fileId);
      await bot.sendMessage(
        msg.chat.id,
        `RADIO GRAND BOT 📢\n\n🕹 Ваш сервер: 1\n\n================\n\n✉️ Опубликовано объявлений всего:`,
        userStartKeyboard
      );
    } else {
      const isAdminMessage = user.isAdmin
        ? "Вы админ!"
        : `RADIO GRAND BOT 📢\n\n🕹 Ваш сервер: ${user.server}\n\n================\n\n✉️ Опубликовано объявлений всего:`;
      await bot.sendMessage(
        msg.chat.id,
        `${isAdminMessage}`,
        user.isAdmin ? adminStartKeyboard : userStartKeyboard
      );
    }
  } else if (msg.text === "🕹 выбрать сервер 🕹") {
    await bot.sendMessage(msg.chat.id, "Выберите сервер", serverKeyboard);
  } else if (msg.text === "📥 Куплю") {
    await bot.sendMessage(
      msg.chat.id,
      "Выбирите что хотите купить написав в начале ключевое слово куплю",
      buyOptionsKeyboard
    );
  } else if (msg.text === "📤 Продам") {
    await bot.sendMessage(
      msg.chat.id,
      "Выбирите что хотите купить написав в начале ключевое слово продам",
      buyOptionsKeyboard
    );
  } else if (msg.text.trim() === "Машину") {
    askBuyCarDetails(bot, msg);
  } else if (msg.text === "Дом") {
    askBuyHouseDetails(bot, msg)
  } else if (msg.text === "Квартиру") {
    askBuyApartmentDetails(bot, msg)
  } else if (msg.text === "Бизнес") {
    askBuyBusinessDetails(bot, msg)
  } else if (msg.text === "Скин") {
    askBuySkinDetails(bot, msg);
  } else if (msg.text === "Акксесуар") {
    askBuyAccessoireDetails(bot, msg)
  } else if (msg.text === "Отмена") {
    const isAdminMessage = user.isAdmin
      ? "Вы админ!"
      : `RADIO GRAND BOT 📢\n\n🕹 Ваш сервер: ${user.server}\n\n================\n\n✉️ Опубликовано объявлений всего:`;
    await bot.sendMessage(
      msg.chat.id,
      `${isAdminMessage}`,
      user.isAdmin ? adminStartKeyboard : userStartKeyboard
    );
  } else if (msg.text === "Добавить промокод") {
    addPromo(bot, msg);
  }
});

bot.on("callback_query", async (msg) => {
  switch (msg.data) {
    case "add_photo":
      waitForPhotoAndSave(bot, msg);
      break;
    case "add_promo":
      break;
  }
});

bot.on("polling_error", console.log);
