import { useOpenedMedia } from '@/utils/opened-image-class';
import { Image } from 'expo-image';
import { useVideoPlayer } from "expo-video";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { ReactElement, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MediaItem } from "../components/media-file-map";
import { global_style } from "./global-style";

const MEDIA_NAME_FONT_SIZE = 16;
const MEDIA_DATE_FONT_SIZE = 12;

function openCurrentImage(props: {item: MediaItem, openedImageHandler: ReturnType<typeof useOpenedMedia>}) {
    const { item, openedImageHandler } = props;
    
    openedImageHandler.changeIndex(item.id);
    openedImageHandler.changePlayer(item.id);
    console.log("changing to", item.id)
    openedImageHandler.revealMedia();
}

function ImagePreview({uri}: {uri: string}): ReactElement {
    return (
        <Image
            style={styles.ImagePreview}
            source={{uri: uri}}
            contentFit="contain"
        />
    );
}

function VideoPreviewThumbnail(props: {item: MediaItem, videoUri: string, openedImageHandler: ReturnType<typeof useOpenedMedia>}): ReactElement {
    const { videoUri, openedImageHandler, item } = props;
    const [thumbnail, setThumbnail] = useState<string>("");

    const player = useVideoPlayer(videoUri, (player) => {
        player.loop = false;
        player.staysActiveInBackground = false;

        openedImageHandler.addPlayer(item.id, player);
    });

    useEffect(() => {
      const generateThumbnail = async () => {
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
            time: 10000,
          });
          setThumbnail(uri);
        } catch (e) {
          console.warn(e);
        }
      };
  
      generateThumbnail();
    }, [videoUri]);
  
    return (
        <Image 
            style={styles.ImagePreview}
            source={{ uri: thumbnail }} 
            contentFit='contain' 
        />
    );
  }

export function MediaPreview(props: {item: MediaItem, itemWidth: number, openedImageHandler: ReturnType<typeof useOpenedMedia>}): ReactElement {
    const { item, itemWidth, openedImageHandler } = props;

    return (
        <View style={[styles.PreviewBox, {width: itemWidth}]}>
            <TouchableOpacity 
            style={styles.TouchArea}
            onPress={() => openCurrentImage(props)}
            >
                <Text style={[styles.MediaText, {fontSize: MEDIA_NAME_FONT_SIZE}]} numberOfLines={1}>
                    {item.name || 'Media Item'}
                </Text>
                <View style={styles.MediaContainer}>
                   {item.isVideo ? 
                   (<VideoPreviewThumbnail videoUri={item.uri} openedImageHandler={openedImageHandler} item={item}/>) : 
                   (<ImagePreview uri={item.uri}/>)}
                </View>
                <Text style={[styles.MediaText, {fontSize: MEDIA_DATE_FONT_SIZE}]} numberOfLines={1}>
                    {item.date || 'Date'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    ImagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    VideoPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    TouchArea: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 8,
        margin: 4,
    },
    MediaContainer: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 6,
    },
    MediaText: {
        color: global_style.TextColorWhite.color,
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    PreviewBox: {
        margin: 4,
    }
});