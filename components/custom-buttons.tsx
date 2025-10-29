import { ReactElement } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { global_style } from "./global-style";

export function RightButton(props: {style?: ViewStyle | ViewStyle[], onPressHandler: (event: GestureResponderEvent) => void}): ReactElement {
    const {onPressHandler, style} = props;
    const rightArrow = ">"

    return (
        <TouchableOpacity
            onPress={onPressHandler}
            style={[styles.ButtonStyle, style]}
        >
            <Text style={styles.TextStyle}>{rightArrow}</Text>
        </TouchableOpacity>
    );
}

export function LeftButton(props: {style?: ViewStyle | ViewStyle[], onPressHandler: (event: GestureResponderEvent) => void}): ReactElement {
    const {onPressHandler, style} = props;
    const leftArrow = "<"

    return (
        <TouchableOpacity
            onPress={onPressHandler}
            style={[styles.ButtonStyle, style]}
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