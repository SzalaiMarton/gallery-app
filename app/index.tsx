import { LeftButton, RightButton } from "@/components/custom-buttons";
import { global_style } from "@/components/global-style";
import { getMediaFiles } from "@/components/media-file-map";
import { MediaPreview } from "@/components/media-preview";
import { useOpenedMedia } from "@/utils/opened-image-class";
import { Image } from "expo-image";
import { VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const MIN_ITEM_WIDTH = 300;
const ITEM_MARGIN = 20;

function useWindowLayout() {
  const [windowSize, setWindowSize] = useState(() => Dimensions.get("window"));

  useEffect(() => {
    const updateLayout = ({ window }: { window: any }) => {
      setWindowSize(window);
    };

    const subscription = Dimensions.addEventListener("change", updateLayout);
    return () => subscription?.remove();
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isSmallScreen: windowSize.width < 1000,
  };
}

export default function Index() {
  const [layout, setLayout] = useState({ numColumns: 2, itemWidth: 0 });
  const mediaItems = getMediaFiles();
  const openedImageHandler = useOpenedMedia();
  const { width, height, isSmallScreen } = useWindowLayout();

  // Opened Media Index Change
  useEffect(() => {
    if (openedImageHandler.currentMediaIndex < 0) {
      openedImageHandler.changeIndex(mediaItems.length - 1);
    }
    else if (openedImageHandler.currentMediaIndex > mediaItems.length - 1) {
      openedImageHandler.changeIndex(0);
    }
  }, [openedImageHandler.currentMediaIndex, openedImageHandler, mediaItems.length]);
  
  // Handle media type and setting current media
  useEffect(() => {
    const currentIndex = openedImageHandler.currentMediaIndex;
    if (currentIndex >= 0 && currentIndex < mediaItems.length) {
      const currentMedia = mediaItems[currentIndex];
      
      if (currentMedia.isVideo) {
        openedImageHandler.changePlayer(currentIndex);
      }
      openedImageHandler.setCurrentMedia(currentMedia);
    }
  }, [openedImageHandler.currentMediaIndex, openedImageHandler, mediaItems]);


  // List NumCol Change
  useEffect(() => {
    const availableWidth = width - ITEM_MARGIN * 2;
    const calculatedColumns = Math.floor(availableWidth / MIN_ITEM_WIDTH);
    const numColumns = Math.max(1, Math.min(calculatedColumns, 5));
    const itemWidth =
      (availableWidth - ITEM_MARGIN * (numColumns - 1)) / numColumns;

    setLayout({ numColumns, itemWidth });
  }, [width]);

  const dynamicButtonStyles: Record<string, ViewStyle> = {
    rightButton: {
      position: "absolute",
      top: height / 2 - 30,
      right: isSmallScreen ? 30 : width / 7,
    },
    leftButton: {
      position: "absolute",
      top: height / 2 - 30,
      left: isSmallScreen ? 30 : width / 7,
    },
  };

  return (
    <View style={styles.HomeScreen}>
      <TouchableOpacity onPress={() => openedImageHandler.hideMedia()}>
        <Modal
          transparent={true}
          style={styles.OpenedMediaContainer}
          visible={openedImageHandler.isVisible}
          onRequestClose={() => openedImageHandler.hideMedia()}
          animationType="fade"
        >
          <View style={styles.OpenedMediaContainer}>

            {openedImageHandler.currentMedia?.isVideo && openedImageHandler.currentPlayer ? (
            <VideoView
              player={openedImageHandler.currentPlayer}
              style={styles.OpenedMedia}
            />) : (
            <Image
              style={styles.OpenedMedia}
              source={{ uri: openedImageHandler.currentMedia?.uri }}
              contentFit="contain"
            />)}

            <RightButton
              style={dynamicButtonStyles.rightButton}
              onPressHandler={() => openedImageHandler.changeIndex(openedImageHandler.currentMediaIndex + 1)}
            />
            <LeftButton
              style={dynamicButtonStyles.leftButton}
              onPressHandler={() => openedImageHandler.changeIndex(openedImageHandler.currentMediaIndex - 1)}
            />
          </View>
        </Modal>
      </TouchableOpacity>

      <FlatList
        key={`columns-${layout.numColumns}`}
        data={mediaItems}
        renderItem={({ item }) => (
          <MediaPreview
            item={item}
            itemWidth={layout.itemWidth}
            openedImageHandler={openedImageHandler}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.Grid}
        numColumns={layout.numColumns}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    backgroundColor: global_style.BackgroundColor.backgroundColor,
  },
  Grid: {
    padding: 8,
    paddingLeft: ITEM_MARGIN,
    paddingRight: ITEM_MARGIN,
    alignItems: "center",
  },
  OpenedMedia: {
    flex: 1,
    width: 600,
    alignSelf: "center",
  },
  OpenedMediaContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
