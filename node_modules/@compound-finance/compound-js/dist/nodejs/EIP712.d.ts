import { SimpleEthersSigner, EIP712Domain, EIP712Message, EIP712Types, Signature } from './types';
export declare function sign(domain: EIP712Domain, primaryType: string, message: EIP712Message, types: EIP712Types, signer: SimpleEthersSigner): Promise<Signature>;
