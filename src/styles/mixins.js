import { PixelRatio } from 'react-native';

import { Dimensions } from 'react-native';
export const WINDOW_WIDTH = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


export function boxShadow(color, offset = { height: 2, width: 2 },
    radius = 8, opacity = 0.2) {
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: radius,
    };
}

export const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
) => {
    if (Platform.OS === 'ios') {
        boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: { width: xOffset, height: yOffset },
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }

    return boxShadow;
};

import { Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight((statusBarHeight) => {
    console.log(statusBarHeight)
    return statusBarHeight;
}) : StatusBarManager.HEIGHT;
