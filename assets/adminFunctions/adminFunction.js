const fs = require("fs");
const path = require("path");

async function waitForPhotoAndSave(bot, msg) {
  return new Promise((resolve) => {
    bot.sendMessage(msg.chat.id, "Пожалуйста, отправьте фото.");

    bot.on("photo", async (msg) => {
      const photo = msg.photo;
      const fileId = photo[photo.length - 1].file_id;

      await bot.sendMessage(
        msg.chat.id,
        "Введите текстовое описание для фото:"
      );

      const jsonData = {
        fileId: fileId,
      };

      fs.writeFile("../db/images.json", JSON.stringify(jsonData));

      resolve(jsonData);
    });
  });
}

async function addPromo(bot, msg) {
  try {
    await bot.sendMessage(msg.chat.id, "Пришлите мне промокод");

    bot.once("message", async (promoMsg) => {
      const promoMessage = promoMsg.text;
      const promoDbPath = path.resolve(__dirname, "../db/promo.json");
      let promoDb;

      try {
        promoDb = JSON.parse(fs.readFileSync(promoDbPath, "utf8"));
      } catch (error) {
        promoDb = [];
      }

      const existingPromoIndex = promoDb.findIndex(
        (promo) => promo.promo === promoMessage
      );

      if (existingPromoIndex !== -1) {
        promoDb[existingPromoIndex].promo = promoMessage;
        fs.writeFileSync(promoDbPath, JSON.stringify(promoDb, null, "\t"));
        await bot.sendMessage(
          msg.chat.id,
          "Промокод был успешно обновлен в базе данных"
        );
      } else {
        promoDb.push({ promo: promoMessage });
        fs.writeFileSync(promoDbPath, JSON.stringify(promoDb, null, "\t"));
        await bot.sendMessage(
          msg.chat.id,
          "Промокод был добавлен в базу данных"
        );
      }
    });
  } catch (error) {
    console.error("Ошибка в addPromo:", error);
  }
}

module.exports = {
  waitForPhotoAndSave: waitForPhotoAndSave,
  addPromo: addPromo,
};
