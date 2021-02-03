import Compound from '@compound-finance/compound-js';

// connect to infura node
const provider = 'https://mainnet.infura.io/v3/baab94a180cf46578b7ef0347154cebc';

// coontroller contract
const comptroller = Compound.util.getAddress(Compound.Comptroller);
// orcale contract
const opf = Compound.util.getAddress(Compound.PriceFeed);

const cTokenDecimals = 8; // always 8
const blocksPerDay = 4 * 60 * 24; // 4 blocks in 1 minute
const daysPerYear = 365;
const ethMantissa = Math.pow(10, 18); // 1 * 10 ^ 18

async function calculateSupplyApy(cToken) {
  // e.g. if supply APY is 4%, APY per block is 0.000000188%
  const supplyRatePerBlock = await Compound.eth.read(
    cToken,
    'function supplyRatePerBlock() returns (uint)',
    [],
    { provider }
  );
  // supplyRatePerBlock also in 10e18 so we need to divide by mantissa to get the token number
  // compound the supply rate per day so need to + 1
  // interest in 3 days is actually period of 2 days in between so need to - 1
  // then -1 to keep the decimal part
  // finally transform into percentage so multiply by 100
  return 100 * (Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear - 1) - 1);
}

async function calculateCompApy(cToken, ticker, underlyingDecimals) {
  // amount of comp token given either to lender or borrower for this market for the current block
  // as part of liquidity mining program
  let compSpeed = await Compound.eth.read(
    comptroller,
    'function compSpeeds(address cToken) public returns (uint)',
    [ cToken ],
    { provider }
  );
  // get the comp price from compound oracle contract
  let compPrice = await Compound.eth.read(
    opf,
    'function price(string memory symbol) external view returns (uint)',
    [ Compound.COMP ],
    { provider }
  );

  // e.g. if cToken is cDai, the underlying token is Dai. So this is to get the price of Dai
  let underlyingPrice = await Compound.eth.read(
    opf,
    'function price(string memory symbol) external view returns (uint)',
    [ ticker ],
    { provider }
  );

  // total supply of cToken
  let totalSupply = await Compound.eth.read(
    cToken,
    'function totalSupply() returns (uint)',
    [],
    { provider }
  );

  // exchangeRate of cToken. E.g. if exchange rate of cDai is 10 meaning to buy 1 cDai, we need 10 Dai
  let exchangeRate = await Compound.eth.read(
    cToken,
    'function exchangeRateCurrent() returns (uint)',
    [],
    { provider }
  );

  // transform into a string then use + sign transform it into number
  exchangeRate = +exchangeRate.toString() / ethMantissa; 
  // COMP has 18 decimal places, we need the compSpeed in token unit
  compSpeed = compSpeed / 1e18; 
  compPrice = compPrice / 1e6;
  // price feed is USD price with 6 decimal places
  underlyingPrice = underlyingPrice / 1e6;
  // total supply was given in terms of cToken but we want to present it into USD, so need the below conversion
  // 1. transform from string to number : toString then add + sign
  // 2. multiply exchangeRate to become underlying token
  // 3. multiply underlyingPrice, now we have USD value
  // 4. divided by Math.pow to get ride of decimcal
  totalSupply = (+totalSupply.toString() * exchangeRate * underlyingPrice) / (Math.pow(10, underlyingDecimals));
  // daily comp amount recieved
  const compPerDay = compSpeed * blocksPerDay;

  return 100 * (compPrice * compPerDay / totalSupply) * 365;
}

async function calculateApy(cToken, ticker) {
  const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
  const cTokenAddress = Compound.util.getAddress(cToken);
  const [supplyApy, compApy] = await Promise.all([
    calculateSupplyApy(cTokenAddress),
    calculateCompApy(cTokenAddress, ticker, underlyingDecimals)
  ]);
  return {ticker, supplyApy, compApy};
}

export default calculateApy;
