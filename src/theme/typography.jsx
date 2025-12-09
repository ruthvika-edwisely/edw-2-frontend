export function remToPx(value) {
    return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
    return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    };
}

// fonts - all using Poppins as the primary font
const FONT_PRIMARY = ["Poppins", "Arial", "sans-serif"].join(",")
const FONT_PRIMARY_REGULAR = ["Poppins", "Arial", "sans-serif"].join(",")
const FONT_PRIMARY_MEDIUM = ["Poppins", "Arial", "sans-serif"].join(",")
const FONT_PRIMARY_SEMI_BOLD = ["Poppins", "Arial", "sans-serif"].join(",")
const FONT_PRIMARY_BOLD = ["Poppins", "Arial", "sans-serif"].join(",")

// weights
const fontWeightRegular = 400
const fontWeightMedium = 500
const fontWeightSemiBold = 600
const fontWeightBold = 700

const AiFontRegular = 400
const AiFontMedium = 500
const AiFontBold = 700
const AI_FONT = ["Satoshi","Poppins", "Arial", "sans-serif"].join(",")
//typographies
const typography = {
    fontFamily: FONT_PRIMARY, // Set to Poppins
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,

    // header fonts
    h1: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold,
        lineHeight: pxToRem(21 * 1.6),
        fontSize: pxToRem(32),
        // ...responsiveFontSizes({ sm: 20, md: 24, lg: 20 }),
    },
    h2: {
        fontFamily: FONT_PRIMARY_BOLD,
        fontWeight: fontWeightBold,
        lineHeight: pxToRem(21 * 1.6),
        fontSize: pxToRem(28),
        // ...responsiveFontSizes({ sm: 42, md: 48, lg: 21 }),
    },
    h3: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold,
        lineHeight: pxToRem(21 * 1.6),
        fontSize: pxToRem(28),
        // ...responsiveFontSizes({ sm: 40, md: 44, lg: 25 }),
    },
    h4: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular,
        lineHeight: pxToRem(21 * 1.6),
        fontSize: pxToRem(28),
        // ...responsiveFontSizes({ sm: 26, md: 30, lg: 25 }),
    },
    h5: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold,
        lineHeight: pxToRem(19.5 * 1.6),
        fontSize: pxToRem(26),
        // ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium,
        lineHeight: pxToRem(19.5 * 1.6),
        fontSize: pxToRem(26),
        // ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h7: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular,
        lineHeight: pxToRem(19.5 * 1.6),
        fontSize: pxToRem(26),
        // ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },

    //subtitles
    subtitle1: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold,
        lineHeight: pxToRem(18 * 1.6),
        fontSize: pxToRem(24),
    },
    subtitle2: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium,
        lineHeight: pxToRem(18 * 1.6),
        fontSize: pxToRem(24),
    },
    subtitle3: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular,
        lineHeight: pxToRem(18 * 1.6),
        fontSize: pxToRem(24),
    },
    subtitle4: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold,
        lineHeight: pxToRem(16.5 * 1.6),
        fontSize: pxToRem(22),
    },
    subtitle5: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium,
        lineHeight: pxToRem(16.5 * 1.6),
        fontSize: pxToRem(22),
    },
    subtitle6: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular,
        lineHeight: pxToRem(16.5 * 1.6),
        fontSize: pxToRem(22),
    },
    subtitle7: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold,
        lineHeight: pxToRem(15 * 1.6),
        fontSize: pxToRem(20),
    },
    subtitle8: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium,
        lineHeight: pxToRem(15 * 1.6),
        fontSize: pxToRem(20),
    },
    subtitle9: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular,
        lineHeight: pxToRem(15 * 1.6),
        fontSize: pxToRem(20),
    },

    // body fonts
    body1: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular, // 400
        lineHeight: pxToRem(10.5 * 1.6),
        fontSize: pxToRem(14),
        ...responsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
    },
    body2: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium, // 500
        lineHeight: pxToRem(10.5 * 1.6),
        fontSize: pxToRem(14),
        ...responsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
    },
    body3: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold, // 600
        lineHeight: pxToRem(10.5 * 1.6),
        fontSize: pxToRem(14),
        ...responsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
    },
    body4: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular, // 400
        lineHeight: pxToRem(12 * 1.6),
        fontSize: pxToRem(16),
        ...responsiveFontSizes({ sm: 14, md: 15, lg: 16 }),
    },
    body5: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium, // 500
        lineHeight: pxToRem(12 * 1.6),
        fontSize: pxToRem(16),
        ...responsiveFontSizes({ sm: 14, md: 15, lg: 16 }),
    },
    body6: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold, // 600
        lineHeight: pxToRem(12 * 1.6),
        fontSize: pxToRem(16),
        ...responsiveFontSizes({ sm: 14, md: 15, lg: 16 }),
    },
    body7: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular, // 400
        lineHeight: pxToRem(13.5 * 1.6),
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 16, md: 17, lg: 18 }),
    },
    body8: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium, // 500
        lineHeight: pxToRem(13.5 * 1.6),
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 16, md: 17, lg: 18 }),
    },
    body9: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold, // 600
        lineHeight: pxToRem(13.5 * 1.6),
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 16, md: 17, lg: 18 }),
    },

    //captions
    caption1: {
        fontFamily: FONT_PRIMARY_SEMI_BOLD,
        fontWeight: fontWeightSemiBold,
        lineHeight: pxToRem(9 * 1.6),
        fontSize: pxToRem(12),
    },
    caption2: {
        fontFamily: FONT_PRIMARY_MEDIUM,
        fontWeight: fontWeightMedium,
        lineHeight: pxToRem(9 * 1.6),
        fontSize: pxToRem(12),
    },
    caption3: {
        fontFamily: FONT_PRIMARY_REGULAR,
        fontWeight: fontWeightRegular,
        lineHeight: pxToRem(9 * 1.6),
        fontSize: pxToRem(12),
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        textTransform: 'uppercase',
    },
    Aibody7: {
        fontFamily: AI_FONT,
        fontWeight: AiFontBold,
        lineHeight: pxToRem(10.5 * 1.6),
        fontSize: pxToRem(14),
        // ...makeResponsive(16) 
    },
    Aibody8: {
        fontFamily: AI_FONT,
        fontWeight: AiFontMedium,
        lineHeight: pxToRem(10.5 * 1.6),
        fontSize: pxToRem(14),
        // ...makeResponsive(14) 
    },
    Aibody9: {
        fontFamily: AI_FONT,
        fontWeight: AiFontRegular,
        lineHeight: pxToRem(10.5 * 1.6),
        fontSize: pxToRem(14),
    },
    Aibody4: {
        fontFamily: AI_FONT,
        fontWeight: AiFontBold,
        lineHeight: pxToRem(12 * 1.6),
        fontSize: pxToRem(16),
    },
    Aibody5: {
        fontFamily: AI_FONT,
        fontWeight: AiFontMedium,
        lineHeight: pxToRem(12 * 1.6),
        fontSize: pxToRem(16),
    },
    Aibody6: {
        fontFamily: AI_FONT,
        fontWeight: AiFontRegular,
        lineHeight: pxToRem(12 * 1.6),
        fontSize: pxToRem(16),
    },
    button: {
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: pxToRem(14),
        textTransform: 'capitalize',
    },

};

export default typography;