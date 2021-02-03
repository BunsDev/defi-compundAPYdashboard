/**
 * @file Utility
 * @desc These methods are helpers for the Compound class.
 */
import { AbiType } from './types';
/**
 * A generic HTTP request method that works in Node.js and the Web Browser.
 *
 * @param {object} options HTTP request options. See Node.js http.request
 *     documentation for details.
 *
 * @hidden
 *
 * @returns {Promise<object>} Returns a promise and eventually an HTTP response
 *     (JavaScript object).
 */
export declare function request(options: any): Promise<any>;
/**
 * Gets the contract address of the named contract. This method supports
 *     contracts used by the Compound Protocol.
 *
 * @param {string} contract The name of the contract.
 * @param {string} [network] Optional name of the Ethereum network. Main net and
 *     all the popular public test nets are supported.
 *
 * @returns {string} Returns the address of the contract.
 *
 * @example
 * ```
 * console.log('cETH Address: ', Compound.util.getAddress(Compound.cETH));
 * ```
 */
export declare function getAddress(contract: string, network?: string): string;
/**
 * Gets a contract ABI as a JavaScript array. This method supports
 *     contracts used by the Compound Protocol.
 *
 * @param {string} contract The name of the contract.
 *
 * @returns {Array} Returns the ABI of the contract as a JavaScript array.
 *
 * @example
 * ```
 * console.log('cETH ABI: ', Compound.util.getAbi(Compound.cETH));
 * ```
 */
export declare function getAbi(contract: string): AbiType[];
/**
 * Gets the name of an Ethereum network based on its chain ID.
 *
 * @param {string} chainId The chain ID of the network.
 *
 * @returns {string} Returns the name of the Ethereum network.
 *
 * @example
 * ```
 * console.log('Ropsten : ', Compound.util.getNetNameWithChainId(3));
 * ```
 */
export declare function getNetNameWithChainId(chainId: number): string;
