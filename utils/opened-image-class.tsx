import { getMediaFiles, MediaItem } from "@/components/media-file-map";
import { useCallback, useState } from 'react';

export const useOpenedImage = () => {
    const [currentImage, setCurrentImage] = useState<MediaItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, changeIndex] = useState(0);

    const setCurrentImageHandler = useCallback((image: MediaItem) => {
        console.log("changing current image");
        setCurrentImage(image);
    }, []);

    const clearCurrentImage = useCallback(() => {
        console.log("clearing current image");
        setCurrentImage(null);
    }, []);

    const revealImage = useCallback(() => {
        console.log("revealing current image");
        setIsVisible(true);
    }, []);

    const hideImage = useCallback(() => {
        console.log("hiding current image");
        setIsVisible(false);
    }, []);

    const nextImageRight = useCallback(() => {
        console.log("next image right");
        const mediaFiles = getMediaFiles();
        if (currentImageIndex === mediaFiles.length) {
            changeIndex(0);
        }
        setCurrentImage(mediaFiles[currentImageIndex]);
    }, []);

    const nextImageLeft = useCallback(() => {
        console.log("next image left");
        const mediaFiles = getMediaFiles();
        if (currentImageIndex === 0) {
            changeIndex(mediaFiles.length - 1);
        }
        setCurrentImage(mediaFiles[currentImageIndex]);
    }, []);

    return {
        currentImage,
        isVisible,
        setCurrentImage: setCurrentImageHandler,
        clearCurrentImage,
        revealImage,
        hideImage,
        nextImageLeft,
        nextImageRight
    };
};