"use strict";
// Based on
// https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sign = void 0;
var ethers_1 = require("ethers");
function abiRawEncode(encTypes, encValues) {
    var hexStr = ethers_1.ethers.utils.defaultAbiCoder.encode(encTypes, encValues);
    return Buffer.from(hexStr.slice(2, hexStr.length), 'hex');
}
function keccak256(arg) {
    var hexStr = ethers_1.ethers.utils.keccak256(arg);
    return Buffer.from(hexStr.slice(2, hexStr.length), 'hex');
}
// Recursively finds all the dependencies of a type
function dependencies(primaryType, found, types) {
    if (found === void 0) { found = []; }
    if (types === void 0) { types = {}; }
    if (found.includes(primaryType)) {
        return found;
    }
    if (types[primaryType] === undefined) {
        return found;
    }
    found.push(primaryType);
    for (var _i = 0, _a = types[primaryType]; _i < _a.length; _i++) {
        var field = _a[_i];
        for (var _b = 0, _c = dependencies(field.type, found); _b < _c.length; _b++) {
            var dep = _c[_b];
            if (!found.includes(dep)) {
                found.push(dep);
            }
        }
    }
    return found;
}
function encodeType(primaryType, types) {
    if (types === void 0) { types = {}; }
    // Get dependencies primary first, then alphabetical
    var deps = dependencies(primaryType);
    deps = deps.filter(function (t) { return t != primaryType; });
    deps = [primaryType].concat(deps.sort());
    // Format as a string with fields
    var result = '';
    for (var _i = 0, deps_1 = deps; _i < deps_1.length; _i++) {
        var type = deps_1[_i];
        if (!types[type])
            throw new Error("Type '" + type + "' not defined in types (" + JSON.stringify(types) + ")");
        result += type + "(" + types[type].map(function (_a) {
            var name = _a.name, type = _a.type;
            return type + " " + name;
        }).join(',') + ")";
    }
    return result;
}
function typeHash(primaryType, types) {
    if (types === void 0) { types = {}; }
    return keccak256(Buffer.from(encodeType(primaryType, types)));
}
function encodeData(primaryType, data, types) {
    if (types === void 0) { types = {}; }
    var encTypes = [];
    var encValues = [];
    // Add typehash
    encTypes.push('bytes32');
    encValues.push(typeHash(primaryType, types));
    // Add field contents
    for (var _i = 0, _a = types[primaryType]; _i < _a.length; _i++) {
        var field = _a[_i];
        var value = data[field.name];
        if (field.type == 'string' || field.type == 'bytes') {
            encTypes.push('bytes32');
            value = keccak256(Buffer.from(value));
            encValues.push(value);
        }
        else if (types[field.type] !== undefined) {
            encTypes.push('bytes32');
            value = keccak256(encodeData(field.type, value, types));
            encValues.push(value);
        }
        else if (field.type.lastIndexOf(']') === field.type.length - 1) {
            throw 'TODO: Arrays currently unimplemented in encodeData';
        }
        else {
            encTypes.push(field.type);
            encValues.push(value);
        }
    }
    return abiRawEncode(encTypes, encValues);
}
function domainSeparator(domain) {
    var types = {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
            { name: 'salt', type: 'bytes32' }
        ].filter(function (a) { return domain[a.name]; })
    };
    return keccak256(encodeData('EIP712Domain', domain, types));
}
function structHash(primaryType, data, types) {
    if (types === void 0) { types = {}; }
    return keccak256(encodeData(primaryType, data, types));
}
function digestToSign(domain, primaryType, message, types) {
    if (types === void 0) { types = {}; }
    return keccak256(Buffer.concat([
        Buffer.from('1901', 'hex'),
        domainSeparator(domain),
        structHash(primaryType, message, types),
    ]));
}
function sign(domain, primaryType, message, types, signer) {
    return __awaiter(this, void 0, void 0, function () {
        var signature, digest, address, msgParams, r, s, v, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!signer._signingKey) return [3 /*break*/, 1];
                    digest = digestToSign(domain, primaryType, message, types);
                    signature = signer._signingKey().signDigest(digest);
                    signature.v = '0x' + (signature.v).toString(16);
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, signer.getAddress()];
                case 2:
                    address = _a.sent();
                    msgParams = JSON.stringify({ domain: domain, primaryType: primaryType, message: message, types: types });
                    return [4 /*yield*/, signer.provider.jsonRpcFetchFunc('eth_signTypedData_v4', [address, msgParams])];
                case 3:
                    signature = _a.sent();
                    r = '0x' + signature.substring(2).substring(0, 64);
                    s = '0x' + signature.substring(2).substring(64, 128);
                    v = '0x' + signature.substring(2).substring(128, 130);
                    signature = { r: r, s: s, v: v };
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    throw new Error(e_1);
                case 6: return [2 /*return*/, signature];
            }
        });
    });
}
exports.sign = sign;
//# sourceMappingURL=EIP712.js.map