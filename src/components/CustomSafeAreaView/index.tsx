import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ICustomSafeAreaViewProps {
  header?: boolean;
  title?: string;
  backIcon?: any;
  onPressBack?: () => void;
  rightText?: string;
  onPressRight?: () => void;
  onPressRightDisabled?: boolean;
  children?: React.ReactNode;
}

export const CustomSafeAreaView = (props: ICustomSafeAreaViewProps) => {
  const {
    header,
    title,
    backIcon,
    onPressBack,
    rightText,
    onPressRight,
    onPressRightDisabled,
    children,
  } = props;

  const insets = useSafeAreaInsets().top;

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#FFFAFA',
      paddingTop: insets,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      padding: 5,
    },
    textContainer: {
      fontSize: 18,
    },
  });

  if (header) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {backIcon ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressBack}
              style={styles.iconContainer}
            >
              <Image source={backIcon} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          ) : <View style={styles.iconContainer} />}
          <View style={styles.titleContainer}>
            <Text style={styles.textContainer}>{title}</Text>
          </View>
          {rightText ? (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={onPressRightDisabled}
              onPress={onPressRight}
            >
              <Text style={[styles.textContainer, onPressRightDisabled && {opacity: 0.5}]}>{rightText}</Text>
            </TouchableOpacity>
          ) : <View style={styles.iconContainer} />}
        </View>
        <View style={{ marginHorizontal: 20 }}>
          {children}
        </View>
      </View>
    );
  }

  // Centered container for non-header screens
  return (
    <View style={[styles.container]}>
      {children}
    </View>
  );
};
