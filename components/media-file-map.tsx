let globalIdTracker = 1;

export class MediaItem {
    public id: number;
    public name: string;
    public date: string;
    public uri: string;
    public isVideo: boolean;

    public constructor(uri: string, isVideo: boolean, name: string, date: string) {
        this.id = globalIdTracker;
        globalIdTracker += 1;
        this.uri = uri;
        this.isVideo = isVideo;
        this.name = name;
        this.date = date;
    }
}

export function getMediaFiles() {
    let res: MediaItem[] = [];
    
    res.push(new MediaItem(require("../assets/picture1.png").uri, false, "Code Code Code", "2025.01.01."));
    res.push(new MediaItem("https://picsum.photos/seed/696/3000/2000", false, "Mountains", "2025.01.01."));
    res.push(new MediaItem("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", true, "Bunny", "2025.01.01."))

    return res;
}