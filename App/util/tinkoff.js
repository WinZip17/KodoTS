import TinkoffASDK from 'react-native-tinkoff-asdk';
//console.log("tinkoff sdk:", TinkoffASDK)

TinkoffASDK.init({
  terminalKey: "1570453672009DEMO",
  password: "nyj2au0aecctr32h",
  publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv5yse9ka3ZQE0feuGtemYv3IqOlLck8zHUM7lTr0za6lXTszRSXfUO7jMb+L5C7e2QNFs+7sIX2OQJ6a+HG8kr+jwJ4tS3cVsWtd9NXpsU40PE4MeNr5RqiNXjcDxA+L4OsEm/BlyFOEOh2epGyYUd5/iO3OiQFRNicomT2saQYAeqIwuELPs1XpLk9HLx5qPbm8fRrQhjeUD5TLO8b+4yCnObe8vy/BMUwBfq+ieWADIjwWCMp2KTpMGLz48qnaD9kdrYJ0iyHqzb2mkDhdIzkim24A3lWoYitJCBrrB2xM05sm9+OdCI1f7nPNJbl5URHobSwR94IRGT7CJcUjvwIDAQAB",
  testMode: true
})

export const order2tinkoff = (order= {}, user = {}) => {
  console.log('order 2 tinkoff', order);
  console.log('order 2 USER', user);
  // расчет скидки
  const discount = order.total_cents / order.sum_cents;
  return {
    OrderID: `${order.id}`,                      // ID заказа в вашей системе
    //Amount: order.total * 100,                     // сумма для оплаты (в копейках)
    Amount: order.total_cents,                     // сумма для оплаты (в копейках)
    PaymentName: `Оплата заказа ${order.id} в ресторане КОДО`,   // название платежа, видимое пользователю
    PaymentDesc: `Оплата заказа ${order.id} в ресторане КОДО`,   // название платежа, видимое пользователю
    //CustomerKey: null,                 // ID клиента для сохранения карты
    //CardID: "CARD-ID",                 // ID карточки
    //Email: "batman@gotham.co",         // E-mail клиента для отправки уведомления об оплате
    Email: order.email || user.email,
    Phone: order.phone || user.phone,
    CustomerKey: user.id ? `${user.id}` : undefined,
    IsRecurrent: false,                // флаг определяющий является ли платеж рекуррентным [1]
    UseSafeKeyboard: true,             // флаг использования безопасной клавиатуры [2]
    GooglePayParams: {
      MerchantName: "test",
      AddressRequired: false,
      PhoneRequired: false,
      Environment: "TEST" // "SANDBOX", "PRODUCTION"
    },
    Taxation: "usn_income",
    Items: order.line_items.map(item => ({
      Name: item.name,
      Price: discount * item.price_cents,
      Quantity: item.count,
      Amount: discount * item.sum_cents,
      Tax: 'none',
    }))
  }
}

export const getCardList = (user = {}) => {
  return TinkoffASDK.GetCardList({
    CustomerKey: user.id ? `${user.id}` : undefined,
  });
}

export const addCard = (user = {}) => {
  return TinkoffASDK.AddCard({
    CustomerKey: user.id ? `${user.id}` : undefined,
    Email: user.email,
    CardCheckType: "NO"
  })
}

export const removeCard = (user = {}, cardId) => {
  return TinkoffASDK.RemoveCard({
    CustomerKey: user.id ? `${user.id}` : undefined,
    CardId: cardId
  })
}

export const payTinkoff = (order = {}, user = {}) => {
  const payload = order2tinkoff(order, user);
  console.log('pay', payload);
  return TinkoffASDK.Pay(payload);
};

export const payWithApplePay = (order = {}, user = {}) => {
  // расчет скидки
  const discount = order.total_cents / order.sum_cents;

  const order2tinkoffApple = {
    appleMerchantId: '',      //идентификатор бизнеса, регистрируется в Apple
    Phone: user.phone || null,
    Shipping: {
      Street: order.street.name,
      // Country: "Россия",           не уверен что отправлять
      // City: "Москва",
      // PostalCode: "125212",
      // ISOCountryCode: "643",
    },
    OrderID: `${order.id}`,
    //Amount: order.total * 100,
    Amount: order.total_cents,
    PaymentName: `Оплата заказа ${order.id} в ресторане КОДО`,
    PaymentDesc: `Оплата заказа ${order.id} в ресторане КОДО`,
    //CustomerKey: null,
    //CardID: "CARD-ID",
    //Email: "batman@gotham.co",
    Email: user.email,
    CustomerKey: `${user.id}`,
    IsRecurrent: false,
    UseSafeKeyboard: true,
    Taxation: "usn_income",
    Items: order.line_items.map(item => ({
      Name: item.name || 'Фейковой название товара',
      Price: discount * item.price_cents,
      Quantity: item.count,
      Amount: discount * item.sum_cents,
      Tax: 'none',
    }))
  };

  return TinkoffASDK.isPayWithAppleAvailable().then(function(isAvailable) {
    if (isAvailable) {
      return TinkoffASDK.ApplePay(order2tinkoffApple)
    } else {
      return Promise.reject("apple pay не доступен")
    }
  })
};

window.pay = payTinkoff;
