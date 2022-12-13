import { Image, Pressable, SafeAreaView, Text } from "react-native";
import { createElement, useEffect, useState } from "react";
import Big from "big.js";
import adjustFont from "./helpers/adjustfont";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

const defaultStyle = {
    container: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        borderTopColor: "#a7a6a8"
    },
    button: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        paddingTop: 8,
        paddingBottom: 4,
        minWidth: 28,
        minHeight: 28
    },
    caption: {
        color: "#3a3a3a",
        fontSize: adjustFont(10),
        marginTop: 8
    },
    image: {
        tintColor: "#3a3a3a",
        height: 20,
        width: 20
    }
};

export function NativeNavigation({ colorSelected, navList, selectedItem, style }) {
    const [currentItem, setCurrentItem] = useState(null);
    const styles = mergeNativeStyles(defaultStyle, style);
    const [canRender, setCanRender] = useState(false);

    function selectedCaption(index) {
        return currentItem === index ? { color: colorSelected.value } : null;
    }

    function selectedImage(index) {
        return currentItem === index ? { tintColor: colorSelected.value } : null;
    }

    function onPress(index) {
        const action = navList[index].buttonAction;
        selectedItem.setValue(Big(index));
        setCurrentItem(index);
        if (action && action.canExecute) {
            action.execute();
        }
    }

    useEffect(() => {
        if (selectedItem && selectedItem.status === "available") {
            setCurrentItem(Number(selectedItem.value));
        }

        return () => {
            setCanRender(true);
        };
    }, [selectedItem]);

    if (canRender) {
        return (
            <SafeAreaView style={styles.container}>
                {navList.map((listItem, index) =>
                    !listItem.conditionalVisible ||
                    (listItem.conditionalVisible && listItem.conditionalVisible.value === true) ? (
                        <Pressable
                            key={`${index}_${listItem.caption.value}`}
                            style={styles.button}
                            onPress={() => onPress(index)}
                        >
                            <Image source={listItem.icon.value} style={[styles.image, selectedImage(index)]} />
                            <Text style={[styles.caption, selectedCaption(index)]}>{listItem.caption.value}</Text>
                        </Pressable>
                    ) : null
                )}
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Pressable style={styles.button}></Pressable>
            </SafeAreaView>
        );
    }
}
