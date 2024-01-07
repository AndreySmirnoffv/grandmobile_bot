module.exports = {
  userStartKeyboard: {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: "🕹 выбрать сервер 🕹", callback_data: "choose_server" }],
        [
          { text: "📥 Куплю", callback_data: "buy" },
          { text: "📤 Продам", callback_data: "sell" },
        ],
        [
          { text: "👨‍💼 Ищу семью", callback_data: "family_search" },
          { text: "👥 Набор в семью", callback_data: "add_to_family" },
        ],
        [{ text: "Сегодняшний промокод", callback_data: "promo" }],
      ],
      resize_keyboard: true,
    }),
  },
  buyOptionsKeyboard: {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: "Машину"}, {text: "Дом"}],
        [{text: "Квартиру"}, {text: "Бизнес"}],
        [{text: "Скин"}, {text: "Акксесуар"}],
        [{text: "Отмена"}]
      ],
      resize_keyboard: true
    })
  },
  adminStartKeyboard: {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: "Добавить фото"}],
        [{ text: "Добавить промокод"}],
      ],
      resize_keyboard: true,
    }),
  },
  serverKeyboard: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "№1", callback_data: "first_server" },
          { text: "№2", callback_data: "second_server" },
          { text: "№3", callback_data: "third_server" },
        ],
        [
          { text: "№4", callback_data: "fourth_server" },
          { text: "№5", callback_data: "fifth_server" },
          { text: "№6", callback_data: "sixth_server" },
        ],
        [
          { text: "№7", callback_data: "seventh_server" },
          { text: "№8", callback_data: "eight_server" },
          { text: "№9", callback_data: "ninth_server" },
        ],
        [
          { text: "№10", callback_data: "tenth_server" },
          { text: "№11", callback_data: "eleventh_server" },
          { text: "№12", callback_data: "twelfth_server" },
        ],
        [
          { text: "№13", callback_data: "thirteenth_server" },
          { text: "№14", callback_data: "fourteenth_server" },
          { text: "№15", callback_data: "fifteenth_server" },
        ],
        [
          { text: "№16", callback_data: "sixteenth_server" },
          { text: "№17", callback_data: "seventeenth_server" },
          { text: "№18", callback_data: "eighteenth_server" },
        ],
        [
          { text: "№19", callback_data: "nineteenth_server" },
          { text: "№20", callback_data: "twentieth_server" },
          { text: "№21", callback_data: "twentyfirst_server" },
        ],
        [
          { text: "№22", callback_data: "twentysecond_server" },
          { text: "№23", callback_data: "twentythird_server" },
          { text: "№24", callback_data: "twentyfourth_server" },
        ],
        [
          { text: "№25", callback_data: "twentyfifth_server" },
          { text: "№26", callback_data: "twentysixth_server" },
          { text: "№27", callback_data: "twentyseventh_server" },
        ],
        [
          { text: "№28", callback_data: "twentyeight_server" },
          { text: "№29", callback_data: "twentyninth_server" },
          { text: "№30", callback_data: "thirtynth_server" },
        ],
        [
          { text: "№31", callback_data: "thirthyfirst_server" },
          { text: "№32", callback_data: "thirtysecond_server" },
        ],
      ],
    }),
    resize_keyboard: "true",
  },
  acceptKeyboard: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "Принять", callback_data: "accept"}],
            [{text: "Отклонить", callback_data: "decline"}]
        ]
    })
}
};
