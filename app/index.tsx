import { LeftButton, RightButton } from "@/components/custom-buttons";
import { global_style } from "@/components/global-style";
import { getMediaFiles } from "@/components/media-file-map";
import { MediaPreview } from "@/components/media-preview";
import { useOpenedImage } from "@/utils/opened-image-class";
import { Image } from "expo-image";
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
const ITEM_MARGIN = 8;

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

export default function Index() {
  const [layout, setLayout] = useState({ numColumns: 2, itemWidth: 0 });
  const mediaItems = getMediaFiles();
  const openedImageHandler = useOpenedImage();
  const { width, height, isSmallScreen } = useWindowLayout();

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
      <TouchableOpacity onPress={() => openedImageHandler.hideImage()}>
        <Modal
          transparent={true}
          style={styles.OpenedImageContainer}
          visible={openedImageHandler.isVisible}
          onRequestClose={() => openedImageHandler.hideImage()}
          animationType="fade"
        >
          <View style={styles.OpenedImageContainer}>
            <Image
              style={styles.OpenedImage}
              source={{ uri: openedImageHandler.currentImage?.uri }}
              contentFit="contain"
            />

            <RightButton
              style={dynamicButtonStyles.rightButton}
              openedImageHandler={openedImageHandler}
            />
            <LeftButton
              style={dynamicButtonStyles.leftButton}
              openedImageHandler={openedImageHandler}
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
    padding: ITEM_MARGIN,
    alignItems: "center",
  },
  OpenedImage: {
    flex: 1,
    width: 400,
    alignSelf: "center",
  },
  OpenedImageContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
