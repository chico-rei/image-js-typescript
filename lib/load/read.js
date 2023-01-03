"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSync = exports.read = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const decode_1 = require("./decode");
/**
 * Read an image from the disk.
 * The file format is automatically selected based on the first few bytes.
 *
 * @param path - The path to the image.
 * @returns Image instance.
 */
async function read(path) {
    const data = await node_fs_1.default.promises.readFile(path);
    return (0, decode_1.decode)(data);
}
exports.read = read;
/**
 * Synchronous version of @see {@link read}.
 *
 * @param path - The path to the image.
 * @returns Image instance.
 */
function readSync(path) {
    return (0, decode_1.decode)(node_fs_1.default.readFileSync(path));
}
exports.readSync = readSync;
//# sourceMappingURL=read.js.map