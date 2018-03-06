# wire-weahter-bot
Weather bot on Wire.com web-app

1. Open [Bot on heroku](https://wire-weatherbot.herokuapp.com/)
2. Add bot account ```malos``` to your wire 
3. Start chatting `/weather [city]`

the following code for an "echo bot" is provided:

**Package Installation**

```bash
npm i --save @wireapp/core@0.0.30
```

**Demo Code (echo-bot.js)**

```javascript
const {Account} = require('@wireapp/core');

const account = new Account();

account.on(Account.INCOMING.TEXT_MESSAGE, ({conversation, content}) => {
  account.service.conversation.sendTextMessage(conversation, `Echo: ${content}`);
});

account.listen({
  email: 'yourbot@email.com',
  password: 'top-secret',
  persist: false,
});
```

To retrieve the weather data, you can use any external weather service you like, such as [openweathermap.org](https://openweathermap.org/) and others.

### Input examples

**Incorrect input**

- Given Input: `/weather`
- Expected Output: _nothing_

**Correct input**

- Given Input: `/weather [city]`
- Expected Output: `The temperature in Berlin is [degrees]°C.`
