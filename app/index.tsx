import { CustomButton } from "@/components/custom-buttons";
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
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    isSmallScreen: windowSize.width < 700,
  };
}

function closeOpenedScreen(props: {handler: ReturnType<typeof useOpenedMedia>}) {
  const {handler} = props;
  handler.hideMedia();
  if (handler.currentPlayer && handler.currentMedia && handler.currentMedia.isVideo) {
    handler.currentPlayer.pause();
  }
}

export default function Index() {
  const [layout, setLayout] = useState({ numColumns: 2, itemWidth: 0 });
  const mediaItems = getMediaFiles();
  const openedImageHandler = useOpenedMedia();
  const { width } = useWindowLayout();
  const insets = useSafeAreaInsets();

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


    NavigationContainer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      top: 10,
      pointerEvents: 'box-none',
    },
    NavButton: {
      padding: 3,
    },
    MediaContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },



    OpenedMedia: {
      flex: 1,
      width: 350,
      top: 10,
      alignSelf: "center",
    },
    OpenedMediaContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    CloseButton: {
      top: insets.top,
      position: 'absolute',
      alignSelf: 'flex-end',
      margin: 30,
    },
    OpenedMediaDate: {
      position: 'absolute',
      color: global_style.TextColorWhite.color,
      alignSelf: 'center',
      bottom: insets.bottom + 100,
      fontSize: 15,
    },
    OpenedMediaName: {
      position: 'absolute',
      color: global_style.TextColorWhite.color,
      top: insets.top + 100,
      alignSelf: 'center',
      fontSize: 25,
    },
  });

  return (
    <View style={styles.HomeScreen}>
      <TouchableOpacity onPress={() => closeOpenedScreen}>
        <Modal
          transparent={true}
          style={styles.OpenedMediaContainer}
          visible={openedImageHandler.isVisible}
          onRequestClose={() => openedImageHandler.hideMedia()}
          animationType="fade"
        >
          <View style={styles.OpenedMediaContainer}>
            <View style={styles.MediaContent}>
              <Text style={styles.OpenedMediaName}>{openedImageHandler.currentMedia?.name || ""}</Text>
              
              {openedImageHandler.currentMedia?.isVideo && openedImageHandler.currentPlayer ? (
                <VideoView
                  style={styles.OpenedMedia}
                  player={openedImageHandler.currentPlayer}
                />
              ) : (
                <Image
                  style={styles.OpenedMedia}
                  source={{ uri: openedImageHandler.currentMedia?.uri }}
                  contentFit="contain"
                />
              )}
              
              <Text style={styles.OpenedMediaDate}>{openedImageHandler.currentMedia?.date || ""}</Text>
            </View>

            <View style={styles.NavigationContainer} pointerEvents="box-none">
              <CustomButton
                buttonStyle={styles.NavButton}
                onPressHandler={() => openedImageHandler.changeIndex(openedImageHandler.currentMediaIndex - 1)}
                buttonText="<"
              />
              <CustomButton
                buttonStyle={styles.NavButton}
                onPressHandler={() => openedImageHandler.changeIndex(openedImageHandler.currentMediaIndex + 1)}
                buttonText=">"
              />
            </View>

            <CustomButton
              buttonStyle={styles.CloseButton}
              onPressHandler={() => openedImageHandler.hideMedia()}
              buttonText="X"
            />
          </View>
        </Modal>
      </TouchableOpacity>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
      />
    </View>
    
  );
}

