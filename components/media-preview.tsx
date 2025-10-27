import { useOpenedImage } from '@/utils/opened-image-class';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer } from "expo-video";
import { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MediaItem } from "../components/media-file-map";
import { global_style } from "./global-style";

const MEDIA_NAME_FONT_SIZE = 16;
const MEDIA_DATE_FONT_SIZE = 12;


function openCurrentImage(props: {item: MediaItem, itemWidth: number, openedImageHandler: ReturnType<typeof useOpenedImage>}) {
    const { item, itemWidth, openedImageHandler } = props;
    
    openedImageHandler.setCurrentImage(props.item); 
    openedImageHandler.revealImage();
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

function VideoPreview({uri}: {uri: string}) {
    const player = useVideoPlayer(uri, (player) => {
        player.loop = false;
        player.staysActiveInBackground = false;
    });

    return (
        <VideoView
            style={styles.VideoPreview}
            player={player}
        />
    );
}

export function MediaPreview(props: {item: MediaItem, itemWidth: number, openedImageHandler: ReturnType<typeof useOpenedImage>}): ReactElement {
    const { item, itemWidth, openedImageHandler } = props;

    if (props.item.isVideo) {
        return (
            <View style={[styles.PreviewBox, {width: props.itemWidth}]}>
                <View style={styles.TouchArea}>
                    <Text style={[styles.MediaText, {fontSize: MEDIA_NAME_FONT_SIZE}]} numberOfLines={1}>
                        {props.item.name || 'Media Item'}
                    </Text>
                    <View style={styles.MediaContainer}>
                        <VideoPreview uri={props.item.uri}/>
                    </View>
                    <Text style={[styles.MediaText, {fontSize: MEDIA_DATE_FONT_SIZE}]} numberOfLines={1}>
                        {props.item.date || 'Date'}
                    </Text>
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={[styles.PreviewBox, {width: props.itemWidth}]}>
                <TouchableOpacity 
                style={styles.TouchArea}
                onPress={() => openCurrentImage(props)}
                >
                    <Text style={[styles.MediaText, {fontSize: MEDIA_NAME_FONT_SIZE}]} numberOfLines={1}>
                        {props.item.name || 'Media Item'}
                    </Text>
                    <View style={styles.MediaContainer}>
                            <ImagePreview uri={props.item.uri}/>
                    </View>
                    <Text style={[styles.MediaText, {fontSize: MEDIA_DATE_FONT_SIZE}]} numberOfLines={1}>
                        {props.item.date || 'Date'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
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