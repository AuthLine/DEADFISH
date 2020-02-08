
## Epibot : A NodeJS API endpoint for Cryptocurrency Trading 

Epibot is an API endpoint for REST and webhooks that is designed to receive API requests, such as Tradingview webhooks, and to submit them as orders to a cryptocurrency exchange.
 
The way it works is simple:

* Commands can be sent to epibot via Tradingview alerts (webhooks), a REST API, or the Linux commandline interface (CLI)
* epibot converts the commands into orders and submits them to the exchange
* There are six main trading commands, namely: 
  * **long** : Create a long order for the size provided. If you are already long, the order size will be adjusted so that the resulting position size equals the size you provided. If you are currently short, the order size will be adjusted so that your resulting position will be long the size you requested.
  * **short** : The inverse of the long command above
  * **buy**: Will create a simple order that will buy the amount requested
  * **sell**: The inverse of the buy order above
  * **close**: To reduce or close your current position. The size can be provided as a percentage, in case you would like to close 15% of your position (as an example)
  * **cancel**: To cancel one or more existing open orders
  Depending on the parameters you give these commands, you can open long or short positions, close positions, take profit (partial close) or cancel existing unfilled orders. The bot supports both limit and market orders and the commands are triggered either via a Tradingview alert webhook, or manually by you via the commandline.
* The size of the order is given using the size=xxx parameter (which automatically converts to USD sizing, even for non-USD pairs). Alternatively you can size the order by the base or quote currencies by using the base=xxx or quote=xxx parameters respectively.
* If you specify the price using the price=xxx parameter, a limit order will be used. If you omit the price, a market order will be used at the current market price.
* Anything that can trigger a webhook (like an alert in Tradingview) can be used with this bot for trade execution.

## Documentation


## Disclaimer
Use this API at your own risk. The authors accept no responsibility for losses incurred through using this software. This is a 0.x release which means it's beta software. So it may and probably will have some bugs. We strongly advise you to use a sub-account with a limited balance, or a testnet account to ensure that the bot is profitable before going live with any strategy. While we have gone to great lengths to test the software, if you do find any bugs, please report them to us.

## Supported Exchanges
Currently Bitmex, FTX, Deribit, Binance (Spot, Margin, USDT and Coin-M Futures) and BinanceUS are supported. But we will add support for others in the near future. 

## Scope      
This bot is specifically designed to execute orders based on webhook or REST API requests. These can be from Tradingview, or any other software that can execute webhooks.

While it may seem a little complicated to setup and configure for novices, the point of epibot is that it's entirely free. You retain total control over your API keys and trading engine. It is perfect for integration projects where you have a trading engine (like a Tradingview strategy or some custom Python script) that you want to integrate it with your exchange.

## Requirements
Epibot can be deployed in 3 supported ways. Depending on your personal deployment preference, you will need the following:

#### Option 1 - Run Your Own Server

* A Linux server, preferably running Ubuntu 20.04 LTS 
* A public static IP address

#### Option 2 - Use Docker

* A Docker Server
* A public static IP address

## Installation

#### Option 1 - Run Your Own Server

To install epibot on Ubuntu 20.04 LTS, run these commands:
```
curl -skL https://tinyurl.com/epibot -o /tmp/install.sh 
sudo chmod +x /tmp/install.sh
sudo /tmp/install.sh
````
If you would like to monitor the install progress, you can tail the installer log file at /tmp/install.log

#### Option 2 - Use Docker

If you would prefer to use Docker, the latest docker image is available at **frostyio/epibot-js:latest**

The following Docker environment variables are available:

| Variable | Description | Default Value |
| --- | --- | --- |
| epibot_PORT  |  The port that epibot should listen on  |  80  |
| SSH_PORT  |  The port that SSH should listen on  |  22   |
| SSH_USER  |  SSH Username |  epibot  |
| SSH_PASS  |  SSH Password **(NEVER leave this as default)**  |  \_\_epibot123\_\_  |

## Post-Install Configuration

#### Start the epibot server

To start the epibot server, use this command:
```
epibot start
```

To see the status of the server, use this command:
```
epibot status
```

#### Enabling the Web GUI interface

To enable the GUI, use the following command:
```
epibot gui:enable email=<your email address> password=<your preferred password>
```

You will then be able to browse to http://\<your vps ip\> and login to the GUI. Currently you can configure your API keys and a bunch of other settings via the GUI.


#### Add your exchange API keys to epibot

You will need to identify this account in epibot using what is called a stub. It is a lowercase single word to name the account in epibot. You will use this stub in all subsequent interactions with the exchange. For example, if your exchange subaccount is called "Algo"-Trading"", add your API keys using this command:
```
epibot accounts:add stub=mystub exchange=ftx apikey="<apikey>" secret="<secret>" subaccount="Algo-Trading"
```

**Important:** On FTX, the subaccount parameter is case-sensitive and required if your are using a subaccount. It is not required for other exchanges. If using a subacocunt in FTX, make sure that it is exactly the same as the name on the exchange. The API keys will be tested with the exchange when you add them so you can be sure they work correctly. Once your API keys have been added, you're ready to start using epibot!

## Usage

epibot can take orders from the commandline and from webhooks or API requests. The commandline commands are the same as the commands provided in a webhook. They can be provided in inline command format, or in JSON format. Lets go through a couple of inline commands so that you can get a feel for how it works. These commands can be supplied on your Linux commandline, or in the message box of a Tradingview alert:

#### Account Information Commands
```
   epibot trade:mystub:markets                                    (Get list of markets supported on the exchange)
   epibot trade:mystub:market symbol=SOL/USD                      (Get market info for the SOL/USD pair)
   epibot trade:mystub:positions                                  (Get all current positions from exchange)
   epibot trade:mystub:position symbol=LTC-PERP                   (Get current position info for the LTC-PERP market)
   epibot trade:mystub:orders                                     (Get list of orders from the exchange)
   epibot trade:mystub:order status=open                          (Get list of open orders)
   epibot trade:mystub:market symbol=SOL/USD                      (Get market info for the SOL/USD pair)
   epibot trade:mystub:balances                                   (Get current equity balances from the exchange)     
```

#### Basic Trading Commands
```
   epibot trade:mystub:long symbol=BTC-PERP size=1000             ($1000 market buy on BTC-PERP)
   epibot trade:mystub:short symbol=BTC/USD size=2000 price=7600  ($2000 limit sell at $7600 on FTX BTC/USD)
   epibot trade:mystub:long symbol=ETH-PERP size=3x               (Market buy 3x of my account balance ETH-PERP)
   epibot trade:mystub:buy base=5 symbol=ADA/USD                  (Market buy 5 ADA using USD)
   epibot trade:mystub:sell quote=500 symbol=ADA/USD              (Market sell $500 worth of ADA)
   epibot trade:mystub:buy symbol=ETH/BTC usd=250                 (Market buy $250 worth of ETH, using BTC)
   epibot trade:mystub:cancel id=10483883                         (Cancel order 10483883)
   epibot trade:mystub:cancelall symbol=RUNE-PERP                 (Cancel all RUNE-PERP orders)
```



## Donations

If you love our work, show us some love:

* **BTC:** 1E6uPG7EfoRhM3g2ABiXbrFo35synKxn9G
* **ETH:** 0xc3582547EAe13d3D3b5b45510Af031D18B1b6082
* **LTC:** LWNvQ7LsNrxKmxtbrhVeWGKzFRJvaJ7RQ7
* **BCH:** bitcoincash:qz8myq8mflzvn26uez2ss206jf6ysdyxe55n9zq4ep
 