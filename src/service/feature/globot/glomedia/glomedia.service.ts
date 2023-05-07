import * as fs from 'fs';
import path from 'path';
export class GloMediaService {
  _mediaFolderPath: string;
  constructor(mediaFolderPath = 'src/service/feature/globot/glomedia/assets') {
    this._mediaFolderPath = mediaFolderPath;
  }

  async getRandomGloMedia() {
    try {
      const files = await fs.promises.readdir(this._mediaFolderPath);
      const randomIndex = Math.floor(Math.random() * files.length);
      const mediaPath = path.join(this._mediaFolderPath, files[randomIndex]);
      return mediaPath;
    } catch (error) {
      if (error instanceof Error){
        //TODO: MESSAGE SERVICE
        console.error(`Error while retrieving Glo media: ${error.message}`);
        return null;
      }
    }
  }
}