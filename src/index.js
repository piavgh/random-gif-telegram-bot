const fetch = require('node-fetch');
const { Airgram, Auth, prompt, toObject } = require('airgram');

const airgram = new Airgram({
  apiId: process.env.APP_ID,
  apiHash: process.env.APP_HASH,
  command: process.env.TDLIB_COMMAND,
  logVerbosityLevel: 1,
});

airgram.use(
  new Auth({
    code: () => prompt('Please enter the secret code:\n'),
    phoneNumber: () => prompt('Please enter your phone number:\n'),
  })
);

const giphyParams = {
  baseURL: 'https://api.giphy.com/v1/gifs/',
  apiKey: process.env.GIPHY_API_KEY,
  tag: 'fail',
  type: 'random',
  rating: 'pg-13',
};

const giphyURL = encodeURI(
  giphyParams.baseURL +
    giphyParams.type +
    '?api_key=' +
    giphyParams.apiKey +
    '&tag=' +
    giphyParams.tag +
    '&rating=' +
    giphyParams.rating
);

async function handler() {
  // const me = toObject(await airgram.api.getMe());
  // console.log('[Me] ', me);

  // Without this piece of code, it won't work.
  const { response: chats } = await airgram.api.getChats({
    limit: 10,
    offsetChatId: 0,
    offsetOrder: '9223372036854775807',
  });
  console.log('[My chats] ', chats);

  const req = await fetch(giphyURL);
  const res = await req.json();
  console.log('Giphy URL: ', res.data.images.original.url);

  const { response } = await airgram.api.sendMessage({
    // chatId: -747861381,
    chatId: process.env.TRACKED_CHAT_ID,
    inputMessageContent: {
      _: 'inputMessageText',
      text: {
        text: res.data.images.original.url,
      },
    },
  });

  console.log('response = ', response);
}

var CronJob = require('cron').CronJob;
var job = new CronJob(
  String(process.env.SCHEDULE),
  handler,
  null,
  true,
  'Asia/Ho_Chi_Minh'
);
job.start();
