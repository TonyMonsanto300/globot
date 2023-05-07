export declare class GloMediaService {
    _mediaFolderPath: string;
    constructor(mediaFolderPath?: string);
    getRandomGloMedia(): Promise<string | null | undefined>;
}
