import { MediaItem } from "@/components/media-file-map";
import { VideoPlayer } from "expo-video";
import { useCallback, useState } from 'react';

export const useOpenedMedia = () => {
    const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentMediaIndex, changeIndex] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState<VideoPlayer | null>(null);
    const [players, setPlayer] = useState<Map<number, VideoPlayer>>(new Map);

    const setCurrentMediaHandler = useCallback((image: MediaItem) => {
        console.log("changing current image");
        setCurrentMedia(image);
    }, []);

    const clearCurrentMedia = useCallback(() => {
        console.log("clearing current image");
        setCurrentMedia(null);
    }, []);

    const revealMedia = useCallback(() => {
        console.log("revealing current image");
        setIsVisible(true);
    }, []);

    const hideMedia = useCallback(() => {
        console.log("hiding current image");
        setIsVisible(false);
    }, []);

    const addPlayer = useCallback((id: number, player: VideoPlayer) => {
        setPlayer(prev => {
            const newMap = new Map(prev);
            newMap.set(id, player);
            return newMap;
        })
    }, []);

    const changePlayer = useCallback((videoId: number) => {
        const p = players.get(videoId) || null;
        setCurrentPlayer(p)
    }, [players]);

    return {
        currentMedia,
        isVisible,
        currentMediaIndex,
        currentPlayer,
        players,
        setCurrentMedia: setCurrentMediaHandler,
        clearCurrentMedia: clearCurrentMedia,
        revealMedia: revealMedia,
        hideMedia: hideMedia,
        changeIndex,
        changePlayer,
        addPlayer,
    };
};