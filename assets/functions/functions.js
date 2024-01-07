const fs = require("fs");
const path = require("path");
const { acceptKeyboard } = require("../keyboard/keyboard");
const filePath = path.join(__dirname, "../db/db.json");
const channelId = "@hdjndjc";
const secondChannelId = "@bdjcnmdk";
const db = require("../db/db.json");

function askServer(bot, number, msg) {
  const db = JSON.parse(fs.readFileSync(filePath));
  const user = db.filter((user) => user.id === msg.from.id);

  if (user) {
    user.server = number;
    fs.writeFileSync(filePath, JSON.stringify(db, null, "\t"));
    bot.sendMessage(msg.message.chat.id, "Сервер был успешно выбран");
    return user;
  }
  console.log(user.server);
}

async function askBuyCarDetails(bot, msg) {
  let user = db.find((user) => user.id === msg.from.id);
  console.log("входим в функцию askDetails");
  try {
    console.log("входим в блок try");
    await bot.sendMessage(
      msg.chat.id,
      "✳️ Отправьте боту ваши предпочтения (марка, состояние и тд):"
    );
    const cardNameMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      msg.chat.id,
      "💰 Отправьте боту ваш бюджет на покупку:"
    );
    const cardPhotoMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      channelId,
      `✳️ Объявление: Хочу Купить\n
      🚘 Машину\n
      🌇 Сервер: №${user.server}\n
      Доп. информация: ${cardNameMessage.text}\n
      💰 Цена: ${cardPhotoMessage.text}`,
      acceptKeyboard
    );

    await bot.sendMessage(msg.chat.id, "Объявление отправлено на модерацию 🕐");

    let keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Написать игроку",
              url: `https://t.me/${msg.from.username}`,
            },
          ],
          [
            {
              text: "Опубликовать свое объявление",
              url: "https://t.me/Obyavlrnie_Bot",
            },
          ],
        ],
      }),
    };
    if (msg.from.username) {
      await bot.sendMessage(
        secondChannelId,
        `✳️ Объявление: Хочу Купить\n🏪 Бизнес\n🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\n#сервер: ${user.server}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
        keyboard
      );

      await new Promise((resolve) => {
        bot.once("callback_query", async (callbackQuery) => {
          const data = callbackQuery.data;

          console.log(`Получен callback_query: ${data}`);

          if (data === "accept") {
            await bot.sendMessage(
              secondChannelId,
              `✳️ Объявление: Хочу Купить\n🏪 Бизнес\n🌇 Сервер: ${user.server}\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
              keyboard
            );
          } else if (data === "decline") {
            await bot.sendMessage(msg.message.chat.id, "Вы отклонили заявку");
          }

          resolve();
        });
      });
    } else {
      console.log("Username пользователя не найден");
    }
  } catch (error) {
    console.error("Произошла ошибка в askDetails:", error);
    return;
  }
}

async function askBuyBusinessDetails(bot, msg) {
  let user = db.find((user) => user.id === msg.from.id);
  try {
    console.log("входим в блок try");
    await bot.sendMessage(
      msg.chat.id,
      "✳️ Отправьте боту ваши предпочтения (марка, состояние и тд):"
    );
    const cardNameMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      msg.chat.id,
      "💰 Отправьте боту ваш бюджет на покупку:"
    );
    const cardPhotoMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      channelId,
      `✳️ Объявление: Хочу Купить\n🏪 Бизнес🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}`,
      acceptKeyboard
    );

    await bot.sendMessage(msg.chat.id, "Объявление отправлено на модерацию 🕐");

    let keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Написать игроку",
              url: `https://t.me/${msg.from.username}`,
            },
          ],
          [
            {
              text: "Опубликовать свое объявление",
              url: "https://t.me/Obyavlrnie_Bot",
            },
          ],
        ],
      }),
    };
    if (msg.from.username) {
      await bot.sendMessage(
        secondChannelId,
        `✳️ Объявление: Хочу Купить\n🏪 Бизнес\n🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
        keyboard
      );

      await new Promise((resolve) => {
        bot.once("callback_query", async (callbackQuery) => {
          const data = callbackQuery.data;

          console.log(`Получен callback_query: ${data}`);

          if (data === "accept") {
            await bot.sendMessage(
              secondChannelId,
              `✳️ Объявление: Хочу Продать\n🏪 Бизнес\n🌇 Сервер: ${user.server}\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
              keyboard
            );
          } else if (data === "decline") {
            await bot.sendMessage(msg.message.chat.id, "Вы отклонили заявку");
          }

          resolve();
        });
      });
    } else {
      console.log("Username пользователя не найден");
    }
  } catch (error) {
    console.error("Произошла ошибка в askDetails:", error);
    return;
  }
}

async function askBuyHouseDetails(bot, msg) {
  let user = db.find((user) => user.id === msg.from.id);
  try {
    console.log("входим в блок try");
    await bot.sendMessage(
      msg.chat.id,
      "✳️ Отправьте боту ваши предпочтения (локация, близость к определенным местам и тд):"
    );
    const cardNameMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      msg.chat.id,
      "💰 Отправьте боту ваш бюджет на покупку:"
    );
    const cardPhotoMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      channelId,
      `✳️ Объявление: Хочу Купить\n🏪 Бизнес🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}`,
      acceptKeyboard
    );

    await bot.sendMessage(msg.chat.id, "Объявление отправлено на модерацию 🕐");

    let keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Написать игроку",
              url: `https://t.me/${msg.from.username}`,
            },
          ],
          [
            {
              text: "Опубликовать свое объявление",
              url: "https://t.me/Obyavlrnie_Bot",
            },
          ],
        ],
      }),
    };
    if (msg.from.username) {
      await bot.sendMessage(
        secondChannelId,
        `✳️ Объявление: Хочу Купить\n🏪 Бизнес\n🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
        keyboard
      );

      await new Promise((resolve) => {
        bot.once("callback_query", async (callbackQuery) => {
          const data = callbackQuery.data;

          console.log(`Получен callback_query: ${data}`);

          if (data === "accept") {
            await bot.sendMessage(
              secondChannelId,
              `✳️ Объявление: Хочу Продать\n🏪 Бизнес\n🌇 Сервер: ${user.server}\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
              keyboard
            );
          } else if (data === "decline") {
            await bot.sendMessage(msg.message.chat.id, "Вы отклонили заявку");
          }

          resolve();
        });
      });
    } else {
      console.log("Username пользователя не найден");
    }
  } catch (error) {
    console.error("Произошла ошибка в askDetails:", error);
    return;
  }
}

async function askBuyApartmentDetails(bot, msg) {
  let user = db.find((user) => user.id === msg.from.id);
  try {
    console.log("входим в блок try");
    await bot.sendMessage(
      msg.chat.id,
      "✳️ Отправьте боту ваши предпочтения (локация, близость к определенным местам и тд):"
    );
    const cardNameMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      msg.chat.id,
      "💰 Отправьте боту ваш бюджет на покупку:"
    );
    const cardPhotoMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      channelId,
      `✳️ Объявление: Хочу Купить\n🏪 Бизнес🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}`,
      acceptKeyboard
    );

    await bot.sendMessage(msg.chat.id, "Объявление отправлено на модерацию 🕐");

    let keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Написать игроку",
              url: `https://t.me/${msg.from.username}`,
            },
          ],
          [
            {
              text: "Опубликовать свое объявление",
              url: "https://t.me/Obyavlrnie_Bot",
            },
          ],
        ],
      }),
    };
    if (msg.from.username) {
      await bot.sendMessage(
        secondChannelId,
        `✳️ Объявление: Хочу Купить\n🏪 Бизнес\n🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
        keyboard
      );

      await new Promise((resolve) => {
        bot.once("callback_query", async (callbackQuery) => {
          const data = callbackQuery.data;

          console.log(`Получен callback_query: ${data}`);

          if (data === "accept") {
            await bot.sendMessage(
              secondChannelId,
              `✳️ Объявление: Хочу Продать\n🏪 Бизнес\n🌇 Сервер: ${user.server}\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
              keyboard
            );
          } else if (data === "decline") {
            await bot.sendMessage(msg.message.chat.id, "Вы отклонили заявку");
          }

          resolve();
        });
      });
    } else {
      console.log("Username пользователя не найден");
    }
  } catch (error) {
    console.error("Произошла ошибка в askDetails:", error);
    return;
  }
}

async function askBuySkinDetails(bot, msg) {
  let user = db.find((user) => user.id === msg.from.id);
  try {
    console.log("входим в блок try");
    await bot.sendMessage(
      msg.chat.id,
      "ℹ️ Отправьте боту название вашего скина:"
    );
    const cardNameMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      msg.chat.id,
      "💰 Отправьте боту ваш бюджет на покупку:"
    );
    const cardPhotoMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      channelId,
      `✳️ Объявление: Хочу Купить\n🏪 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}`,
      acceptKeyboard
    );

    await bot.sendMessage(msg.chat.id, "Объявление отправлено на модерацию 🕐");

    let keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Написать игроку",
              url: `https://t.me/${msg.from.username}`,
            },
          ],
          [
            {
              text: "Опубликовать свое объявление",
              url: "https://t.me/Obyavlrnie_Bot",
            },
          ],
        ],
      }),
    };
    if (msg.from.username) {
      await bot.sendMessage(
        secondChannelId,
        `✳️ Объявление: Хочу Купить\n🏪 Бизнес\n🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
        keyboard
      );

      await new Promise((resolve) => {
        bot.once("callback_query", async (callbackQuery) => {
          const data = callbackQuery.data;

          console.log(`Получен callback_query: ${data}`);

          if (data === "accept") {
            await bot.sendMessage(
              secondChannelId,
              `✳️ Объявление: Хочу Продать\n🏪 Бизнес\n🌇 Сервер: ${user.server}\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
              keyboard
            );
          } else if (data === "decline") {
            await bot.sendMessage(msg.message.chat.id, "Вы отклонили заявку");
          }

          resolve();
        });
      });
    } else {
      console.log("Username пользователя не найден");
    }
  } catch (error) {
    console.error("Произошла ошибка в askDetails:", error);
    return;
  }
}

async function askBuyAccessoireDetails(bot, msg) {
  let user = db.find((user) => user.id === msg.from.id);
  try {
    console.log("входим в блок try");
    await bot.sendMessage(
      msg.chat.id,
      "ℹ️ Отправьте боту название вашего аксессуара:"
    );
    const cardNameMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      msg.chat.id,
      "💰 Отправьте боту ваш бюджет на покупку:"
    );
    const cardPhotoMessage = await waitForText(bot, msg.from.username);

    await bot.sendMessage(
      channelId,
      `✳️ Объявление: Хочу Купить\n🏪 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}`,
      acceptKeyboard
    );

    await bot.sendMessage(msg.chat.id, "Объявление отправлено на модерацию 🕐");

    let keyboard = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Написать игроку",
              url: `https://t.me/${msg.from.username}`,
            },
          ],
          [
            {
              text: "Опубликовать свое объявление",
              url: "https://t.me/Obyavlrnie_Bot",
            },
          ],
        ],
      }),
    };
    if (msg.from.username) {
      await bot.sendMessage(
        secondChannelId,
        `✳️ Объявление: Хочу Купить\n🏪 Бизнес\n🌇 Сервер: №1\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
        keyboard
      );

      await new Promise((resolve) => {
        bot.once("callback_query", async (callbackQuery) => {
          const data = callbackQuery.data;

          console.log(`Получен callback_query: ${data}`);

          if (data === "accept") {
            await bot.sendMessage(
              secondChannelId,
              `✳️ Объявление: Хочу Продать\n🏪 Бизнес\n🌇 Сервер: ${user.server}\nДоп. информация: ${cardNameMessage.text}\n💰 Бюджет: ${cardPhotoMessage.text}\n\nОбъявление отправил ${msg.from.username}\n\n#сервер: ${user.server}`,
              keyboard
            );
          } else if (data === "decline") {
            await bot.sendMessage(msg.message.chat.id, "Вы отклонили заявку");
          }

          resolve();
        });
      });
    } else {
      console.log("Username пользователя не найден");
    }
  } catch (error) {
    console.error("Произошла ошибка в askDetails:", error);
    return;
  }
}




async function waitForText(bot, chatId) {
  console.log("Входим в функцию waitForText");
  return new Promise((resolve) => {
    bot.onText(/.*/, (msg) => {
      if (msg.from.username === chatId) {
        resolve(msg);
      }
    });
  });
}

module.exports = {
  askServer: askServer,
  askBuyCarDetails: askBuyCarDetails,
  askBuyBusinessDetails: askBuyBusinessDetails,
  askBuyHouseDetails: askBuyHouseDetails,
  askBuyApartmentDetails: askBuyApartmentDetails,
  askBuyAccessoireDetails: askBuyAccessoireDetails,
  askBuySkinDetails: askBuySkinDetails
};
