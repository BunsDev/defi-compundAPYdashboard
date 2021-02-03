## Introduction

Interact with compound smart contract by using compound's API to calculate APY for compound and display in dashboard format. Compound APY consists of 2 parts: Supply APY + Comp APY

## Architecture

Using Next.js, a javascript framework for both backend and frontend, which allow to render react.js component but in the backend. Can choose to use Express.js as an alternative.

## Setup development enviornment:

1. Install Next.js 
    > npm install create-next-app
2. Create Next.js files
    > create-next-app .
3. Install Compound SDK
    > npm install @compound-finance/compound-js
4. Install bootstrap
    > npm install bootstrap
 
## Connect to Ethereum blockchain main net:

Use infura (Eth nodes as a service) service which provide some nodes connect to mainnet and able to access to these nodes.
1. Open an account
2. Create a new project
3. Copy the API Key from Endpoints choose MAINNET
4. Paste in apy.js const

OR below steps are optional in this project
4. Copy the API Key in .env file
5. Install dotenv

## Youtube Demo

https://youtu.be/6AldoH-a5KA

## Endpoint testing

Run the Web app by using **npm run dev** , browser should open in url localhost:3000

## Project developed by : Next.js, Compound API, Infura