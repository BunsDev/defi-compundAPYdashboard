/**
 * @file Governance
 * @desc These methods facilitate interactions with the Governor smart contract.
 */
import { CallOptions, TrxResponse, Signature } from './types';
/**
 * Submit a vote on a Compound Governance proposal.
 *
 * @param {string} proposalId The ID of the proposal to vote on. This is an
 *     auto-incrementing integer in the Governor Alpha contract.
 * @param {boolean} support A boolean of true for 'yes' or false for 'no' on the
 *     proposal vote.
 * @param {CallOptions} [options] Options to set for a transaction and Ethers.js
 *     method overrides.
 *
 * @returns {object} Returns an Ethers.js transaction object of the vote
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *   const castVoteTx = await compound.castVote(12, true);
 *   console.log('Ethers.js transaction object', castVoteTx);
 * })().catch(console.error);
 * ```
 */
export declare function castVote(proposalId: number, support: boolean, options?: CallOptions): Promise<TrxResponse>;
/**
 * Submit a vote on a Compound Governance proposal using an EIP-712 signature.
 *
 * @param {string} proposalId The ID of the proposal to vote on. This is an
 *     auto-incrementing integer in the Governor Alpha contract.
 * @param {boolean} support A boolean of true for 'yes' or false for 'no' on the
 *     proposal vote.
 * @param {object} signature An object that contains the v, r, and, s values of
 *     an EIP-712 signature.
 * @param {CallOptions} [options] Options to set for a transaction and Ethers.js
 *     method overrides.
 *
 * @returns {object} Returns an Ethers.js transaction object of the vote
 *     transaction.
 *
 * @example
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *   const castVoteTx = await compound.castVoteBySig(
 *     12,
 *     true,
 *     {
 *       v: '0x1b',
 *       r: '0x130dbcd2faca07424c033b4479687cc1deeb65f08509e3ab397988cc4c6f2e78',
 *       s: '0x1debcb8250262f23906b1177161f0c7c9aa3641e6bff5b6f5c88a6bb78d5d8cd'
 *     }
 *   );
 *   console.log('Ethers.js transaction object', castVoteTx);
 * })().catch(console.error);
 * ```
 */
export declare function castVoteBySig(proposalId: number, support: boolean, signature: Signature, options?: CallOptions): Promise<TrxResponse>;
/**
 * Create a vote signature for a Compound Governance proposal using EIP-712.
 *     This can be used to create an 'empty ballot' without burning gas. The
 *     signature can then be sent to someone else to post to the blockchain.
 *     The recipient can post one signature using the `castVoteBySig` method.
 *
 * @param {string} proposalId The ID of the proposal to vote on. This is an
 *     auto-incrementing integer in the Governor Alpha contract.
 * @param {boolean} support A boolean of true for 'yes' or false for 'no' on the
 *     proposal vote. To create an 'empty ballot' call this method twice using
 *     `true` and then `false` for this parameter.
 *
 * @returns {object} Returns an object that contains the `v`, `r`, and `s`
 *     components of an Ethereum signature as hexadecimal strings.
 *
 * @example
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async () => {
 *
 *   const voteForSignature = await compound.createVoteSignature(20, true);
 *   console.log('voteForSignature', voteForSignature);
 *
 *   const voteAgainstSignature = await compound.createVoteSignature(20, false);
 *   console.log('voteAgainstSignature', voteAgainstSignature);
 *
 * })().catch(console.error);
 * ```
 */
export declare function createVoteSignature(proposalId: number, support: boolean): Promise<Signature>;
