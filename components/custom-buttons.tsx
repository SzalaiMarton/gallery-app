import { ReactElement } from "react";
import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { global_style } from "./global-style";

export function CustomButton(props: {textStyle?: TextStyle | TextStyle[], buttonStyle?: ViewStyle | ViewStyle[], onPressHandler: (event: GestureResponderEvent) => void, buttonText: string}): ReactElement {
    const {onPressHandler, textStyle, buttonStyle, buttonText} = props;

    return (
        <TouchableOpacity
            onPress={onPressHandler}
            style={[styles.ButtonStyle, buttonStyle]}
        >
            <Text style={[styles.TextStyle, textStyle]}>{buttonText}</Text>
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