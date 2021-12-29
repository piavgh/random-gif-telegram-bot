# random-gif-bot

## Instruction

- Go to [Register an application](https://my.telegram.org/apps) to get `APP_ID` and `APP_HASH`
- Build TDLib: [https://tdlib.github.io/td/build](https://tdlib.github.io/td/build)
- Run `cp .env.example .env`
- Update `.env` with your parameters
- Run `yarn`
- Run `yarn dev`

## How to get chatId

- Go to [https://web.telegram.org/z](https://web.telegram.org/z)
- Select the channel/group
- Get the negative number behind [https://web.telegram.org/z/#](https://web.telegram.org/z/#) (for example: -1151298035)

## How to run on server

- Run `npm i -g pm2`
- Run `pm2 start npm --name "my-bot" -- run start`
