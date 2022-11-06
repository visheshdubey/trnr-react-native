import { scaleFont } from './mixins';

// FONT FAMILY
export const FONT_FAMILY_DISPLAY = 'BlankRiver-Bold';
export const FONT_FAMILY_HEADING = 'BebasNeuePro-Bold';
export const FONT_FAMILY_BODY = 'BebasNeuePro-Regular';


// // FONT WEIGHT
// export const FONT_WEIGHT_REGULAR = '400';
// export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_96 = scaleFont(96);
export const FONT_SIZE_80 = scaleFont(80);
export const FONT_SIZE_56 = scaleFont(56);
export const FONT_SIZE_48 = scaleFont(48);
export const FONT_SIZE_40 = scaleFont(40);
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_28 = scaleFont(28);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_18 = scaleFont(18);
export const LINE_HEIGHT_16 = scaleFont(16);

export const truncateString = (str, num) => {
     if (str.length > num) {
          return str.slice(0, num) + "...";
     } else {
          return str;
     }
}

// FONT STYLE
// export const FONT_REGULAR = {
//   fontFamily: FONT_FAMILY_REGULAR,
//   fontWeight: FONT_WEIGHT_REGULAR,
// };

// export const FONT_BOLD = {
//   fontFamily: FONT_FAMILY_BOLD,
//   fontWeight: FONT_WEIGHT_BOLD,
// };