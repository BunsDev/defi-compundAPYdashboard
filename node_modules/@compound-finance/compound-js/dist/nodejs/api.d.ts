/**
 * @file API
 * @desc These methods facilitate HTTP requests to the Compound API.
 */
import { APIResponse, AccountServiceRequest, CTokenServiceRequest, MarketHistoryServiceRequest, GovernanceServiceRequest } from './types';
/**
 * Makes a request to the AccountService API. The Account API retrieves
 *     information for various accounts which have interacted with the protocol.
 *     For more details, see the Compound API documentation.
 *
 * @param {object} options A JavaScript object of API request parameters.
 *
 * @returns {object} Returns the HTTP response body or error.
 *
 * @example
 *
 * ```
 * (async function() {
 *   const account = await Compound.api.account({
 *     "addresses": "0xB61C5971d9c0472befceFfbE662555B78284c307",
 *     "network": "ropsten"
 *   });
 *
 *   let daiBorrowBalance = 0;
 *   if (Object.isExtensible(account) && account.accounts) {
 *     account.accounts.forEach((acc) => {
 *       acc.tokens.forEach((tok) => {
 *         if (tok.symbol === Compound.cDAI) {
 *           daiBorrowBalance = +tok.borrow_balance_underlying.value;
 *         }
 *       });
 *     });
 *   }
 *
 *   console.log('daiBorrowBalance', daiBorrowBalance);
 * })().catch(console.error);
 * ```
 */
export declare function account(options: AccountServiceRequest): Promise<APIResponse>;
/**
 * Makes a request to the CTokenService API. The cToken API retrieves
 *     information about cToken contract interaction. For more details, see the
 *     Compound API documentation.
 *
 * @param {object} options A JavaScript object of API request parameters.
 *
 * @returns {object} Returns the HTTP response body or error.
 *
 * @example
 *
 * ```
 * (async function() {
 *   const cDaiData = await Compound.api.cToken({
 *     "addresses": Compound.util.getAddress(Compound.cDAI)
 *   });
 *
 *   console.log('cDaiData', cDaiData); // JavaScript Object
 * })().catch(console.error);
 * ```
 */
export declare function cToken(options: CTokenServiceRequest): Promise<APIResponse>;
/**
 * Makes a request to the MarketHistoryService API. The market history service
 *     retrieves information about a market. For more details, see the Compound
 *     API documentation.
 *
 * @param {object} options A JavaScript object of API request parameters.
 *
 * @returns {object} Returns the HTTP response body or error.
 *
 * @example
 *
 * ```
 * (async function() {
 *   const cUsdcMarketData = await Compound.api.marketHistory({
 *     "asset": Compound.util.getAddress(Compound.cUSDC),
 *     "min_block_timestamp": 1559339900,
 *     "max_block_timestamp": 1598320674,
 *     "num_buckets": 10,
 *   });
 *
 *   console.log('cUsdcMarketData', cUsdcMarketData); // JavaScript Object
 * })().catch(console.error);
 * ```
 */
export declare function marketHistory(options: MarketHistoryServiceRequest): Promise<APIResponse>;
/**
 * Makes a request to the GovernanceService API. The Governance Service includes
 *     three endpoints to retrieve information about COMP accounts. For more
 *     details, see the Compound API documentation.
 *
 * @param {object} options A JavaScript object of API request parameters.
 * @param {string} endpoint A string of the name of the corresponding governance
 *     service endpoint. Valid values are `proposals`, `voteReceipts`, or
 *     `accounts`.
 *
 * @returns {object} Returns the HTTP response body or error.
 *
 * @example
 *
 * ```
 * (async function() {
 *   const proposal = await Compound.api.governance(
 *     { "proposal_ids": [ 20 ] }, 'proposals'
 *   );
 *
 *   console.log('proposal', proposal); // JavaScript Object
 * })().catch(console.error);
 * ```
 */
export declare function governance(options: GovernanceServiceRequest, endpoint: string): Promise<APIResponse>;
