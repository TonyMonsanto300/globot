"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GloMediaService = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
class GloMediaService {
    _mediaFolderPath;
    constructor(mediaFolderPath = 'src/service/feature/globot/glomedia/assets') {
        this._mediaFolderPath = mediaFolderPath;
    }
    async getRandomGloMedia() {
        try {
            const files = await fs.promises.readdir(this._mediaFolderPath);
            const randomIndex = Math.floor(Math.random() * files.length);
            const mediaPath = path_1.default.join(this._mediaFolderPath, files[randomIndex]);
            return mediaPath;
        }
        catch (error) {
            if (error instanceof Error) {
                //TODO: MESSAGE SERVICE
                console.error(`Error while retrieving Glo media: ${error.message}`);
                return null;
            }
        }
    }
}
exports.GloMediaService = GloMediaService;
//# sourceMappingURL=glomedia.service.js.map