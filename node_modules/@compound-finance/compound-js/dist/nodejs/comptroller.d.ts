/**
 * @file Comptroller
 * @desc These methods facilitate interactions with the Comptroller smart
 *     contract.
 */
import { CallOptions, TrxResponse } from './types';
/**
 * Enters the user's address into Compound Protocol markets.
 *
 * @param {any[]} markets An array of strings of markets to enter, meaning use
 *     those supplied assets as collateral.
 * @param {CallOptions} [options] Call options and Ethers.js overrides for the
 *     transaction. A passed `gasLimit` will be used in both the `approve` (if
 *     not supressed) and `mint` transactions.
 *
 * @returns {object} Returns an Ethers.js transaction object of the enterMarkets
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function () {
 *   const trx = await compound.enterMarkets(Compound.ETH); // Use [] for multiple
 *   console.log('Ethers.js transaction object', trx);
 * })().catch(console.error);
 * ```
 */
export declare function enterMarkets(markets?: string | string[], options?: CallOptions): Promise<TrxResponse>;
/**
 * Exits the user's address from a Compound Protocol market.
 *
 * @param {string} market A string of the symbol of the market to exit.
 * @param {CallOptions} [options] Call options and Ethers.js overrides for the
 *     transaction. A passed `gasLimit` will be used in both the `approve` (if
 *     not supressed) and `mint` transactions.
 *
 * @returns {object} Returns an Ethers.js transaction object of the exitMarket
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function () {
 *   const trx = await compound.exitMarket(Compound.ETH);
 *   console.log('Ethers.js transaction object', trx);
 * })().catch(console.error);
 * ```
 */
export declare function exitMarket(market: string, options?: CallOptions): Promise<TrxResponse>;
