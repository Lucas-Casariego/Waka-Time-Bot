# Twitter Bot for WakaTime Data

This is a Twitter bot written in JavaScript using the Telegraf library. The bot fetches data from the WakaTime API and sends information about the coding time spent.

## Command: /today
This command retrieves the total coding time and the specific coding time for the "Arthros.UI.Web" project for the current day. Replace "Arthros.UI.Web" with the name of your work project.

## Periodic Message
The bot also sends a periodic message containing the same information as the /today command. The message is sent to the user specified by the USER_ID environment variable. The interval between messages is set to 1 hour.

## Option 1: Cloning the Repository

1. Clone the repository:


``` bash 
git clone https://github.com/Lucas-Casariego/Waka-Time-Bot.git
cd Waka-Time-Bot
```
2. Create a new file named `.env` in the project directory.

3. Add the necessary environment variables to the `.env` file:

``` .env
TELEGRAM_TOKEN=your_telegram_token
COOKIE_VALUE=your_cookie_value
USER_ID=your_user_id
```

Replace your_telegram_token, your_cookie_value, and your_user_id with the respective values.

4. Install the dependencies:

``` bash
npm install
```

5. Start the bot:

``` bash
node bot.js
```


## Option 2: Using Docker

### Prerequisites
- Docker installed on your machine

### Instalation and usage

1. Create a new file named `.env` in your project directory.

2. Add the necessary environment variables to the `.env` file:

``` .env
TELEGRAM_TOKEN=your_telegram_token
COOKIE_VALUE=your_cookie_value
USER_ID=your_user_id
```
Replace your_telegram_token, your_cookie_value, and your_user_id with the respective values.

3. Create a docker-compose.yml file in your project directory with the following content:

``` yaml
version: '3'
services:
  telegram-bot:
    image: lucascasariego/telegram-bot:latest
    env_file:
      - .env
```

4. Start the bot using Docker Compose:

``` bash
docker-compose up -d
```
This command starts the bot container in the background using the configuration specified in the `docker-compose.yml` file. Docker Compose will automatically download the telegram-bot image from the container registry.

## License
This project is licensed under the MIT License. For more details, see the LICENSE file.
