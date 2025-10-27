import { useOpenedImage } from "@/utils/opened-image-class";
import { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { global_style } from "./global-style";

export function RightButton(props: {openedImageHandler: ReturnType<typeof useOpenedImage>, style?: ViewStyle | ViewStyle[]}): ReactElement {
    const {openedImageHandler, style} = props;
    const rightArrow = ">"

    return (
        <TouchableOpacity
            onPress={() => openedImageHandler.nextImageRight()}
            style={[styles.ButtonStyle, props.style]}
        >
            <Text style={styles.TextStyle}>{rightArrow}</Text>
        </TouchableOpacity>
    );
}

export function LeftButton(props: {openedImageHandler: ReturnType<typeof useOpenedImage>, style?: ViewStyle | ViewStyle[]}): ReactElement {
    const {openedImageHandler, style} = props;
    const leftArrow = "<"

    return (
        <TouchableOpacity
            onPress={() => openedImageHandler.nextImageLeft()}
            style={[styles.ButtonStyle, props.style]}
        >
            <Text style={styles.TextStyle}>{leftArrow}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: global_style.TextColorWhite.color,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6,
        borderRadius: 50,
        width: 50,
        height: 50,
    },

    TextStyle: {
        fontSize: 20,
        fontWeight: '500',
    }
});