/* =========================
   BASE COLOR SCALES
========================= */

const GREY = {
  0: "#F9FAFB",
  100: "#F4F6F8",
  200: "#DFE3E8",
  300: "#C4CDD5",
  400: "#919EAB",
  500: "#637381",
  600: "#454F5B",
  700: "#212B36",
  800: "#161C24",
  900: "#A5A6AB",
  1000: "#858C94",
  1100: "#1E1E1E",
  1200: "#252526",
  1300: "#333333",
  1400: "#0F0F0F",
};

const PRIMARY = {
  main: "#5D65FF",
  light: "#EFF0FF",
  dark: "#383FBE",
  darker: "#672299",
  contrastText: "#FFFFFF",
};

const SECONDARY = {
  main: "#DFE0FF",
  contrastText: "#252B9E",
  100: "#1C228E",
  200: "#4A52DF",
};

const SUCCESS = {
  main: "#e1f7e3",
  contrastText: "#2ea336",
  100: "#4ECD56",
  200: "#c4eec7",
  300: "#a7e6ab",
  400: "#89de8e",
  500: "#6bd572",
  600: "#36c03f",
  700: "#26872c",
  800: "#1e6a23",
  900: "#164d19",
};

const WARNING = {
  main: "#fba823",
  100: "#fef0da",
  200: "#fee2b6",
  300: "#fdd391",
  400: "#fcc56c",
  500: "#fcb648",
  600: "#f49804",
  700: "#d08104",
  800: "#ab6b03",
  900: "#875402",
  1000: "#623d02",
  1100: "#FFF0D8",
};

const ERROR = {
  main: "#d1190b",
  contrastText: "#fde0de",
  100: "#F44336",
  200: "#fbc0bc",
  300: "#faa19b",
  400: "#f88279",
  500: "#f66257",
  600: "#f22011",
  700: "#ac1509",
  800: "#871007",
  900: "#620c05",
};

const INFO = {
  main: "#E6F2FD",
  contrastText: "#1076D4",
  100: "#BBD9F5",
  200: "#90C0ED",
  300: "#66A8E4",
  400: "#3B8FDC",
  500: "#0D5EAA",
  600: "#0A477F",
  700: "#062F55",
};

/* =========================
   EXTERNAL / EXTRA PALETTES
========================= */

const EXTERNAL_INFO = {
  0: "#E8EDF9",
  100: "#8799BF",
  200: "#497DAE",
  300: "#3D80D2",
};

const EXTERNAL_ERROR = {
  0: "#FFE7E7",
  100: "#E9D1D3",
  200: "#F24A53",
};

const EXTERNAL_WARNING = {
  0: "#FFC727",
};

const EXTRA_RED = {
  0: "#FFFFFF",
  100: "#FFECED",
  200: "#FFD9DA",
  300: "#FFC5C8",
  400: "#FFB2B6",
  500: "#FF8C91",
  600: "#FF656D",
  700: "#FF3F48",
  800: "#D9323A",
  900: "#B2262C",
  1000: "#8C191F",
  1100: "#791318",
  1200: "#650D11",
  1300: "#52060A",
  1400: "#3F0003",
};

/* =========================
   ADDITIONAL SEMANTIC COLORS
========================= */

const ADDITIONAL_COLORS = {
  editor: {
    resizeHandleHover: "#1d7bd6",
    keyword: "#569cd6",
  },
};

/* =========================
   PROBLEM PAGE TOKENS
========================= */

const PROBLEM_PAGE_LIGHT = {
  cardBg: "#FFFFFF",
  cardBorder: "#E5E7EB",

  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textTertiary: "#64748B",

  exampleBg: "#F8FAFC",
  exampleBorder: "#3B82F6",
  codeBg: "#F1F5F9",

  chipBg: "#F1F5F9",
  chipText: "#334155",
  chipBorder: "#E2E8F0",

  topicChipBg: "#EEF2FF",
  topicChipText: "#4F46E5",
  topicChipBorder: "#C7D2FE",

  companyChipBg: "#FEF3C7",
  companyChipText: "#92400E",
  companyChipBorder: "#FDE68A",

  xpGold: "#D97706",
  xpBg: "#FEF3C7",

  diffEasy: "#10B981",
  diffEasyBg: "#D1FAE5",
  diffMedium: "#F59E0B",
  diffMediumBg: "#FEF3C7",
  diffHard: "#EF4444",
  diffHardBg: "#FEE2E2",

  divider: "#E5E7EB",
};

const PROBLEM_PAGE_DARK = {
  cardBg: GREY[1100],
  cardBorder: "#2D2D2D",

  textPrimary: "#F1F5F9",
  textSecondary: "#CBD5E1",
  textTertiary: "#94A3B8",

  exampleBg: "#262626",
  exampleBorder: "#3B82F6",
  codeBg: "#171717",

  chipBg: "#2D2D2D",
  chipText: "#E2E8F0",
  chipBorder: "#404040",

  topicChipBg: "#312E81",
  topicChipText: "#C7D2FE",
  topicChipBorder: "#4C1D95",

  companyChipBg: "#78350F",
  companyChipText: "#FDE68A",
  companyChipBorder: "#92400E",

  xpGold: "#FBBF24",
  xpBg: "#78350F",

  diffEasy: "#34D399",
  diffEasyBg: "#064E3B",
  diffMedium: "#FBBF24",
  diffMediumBg: "#78350F",
  diffHard: "#F87171",
  diffHardBg: "#7F1D1D",

  divider: "#374151",
};

/* =========================
   GRADIENTS
========================= */

const GRADIENTS = {
  primary: "linear-gradient(101deg, #262729 0%, #4A4B4F 100%)",
};

/* =========================
   PALETTE FACTORY
========================= */

const getPalette = (mode = "dark") => {
  const isDark = mode === "dark";

  return {
    mode,

    common: {
      black: "#000",
      white: "#fff",
    },

    primary: PRIMARY,
    secondary: SECONDARY,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    info: INFO,
    grey: GREY,

    externalInfo: EXTERNAL_INFO,
    externalError: EXTERNAL_ERROR,
    externalWarning: EXTERNAL_WARNING,
    extraRedPalette: EXTRA_RED,

    gradients: GRADIENTS,
    additionalColors: ADDITIONAL_COLORS,

    problemPage: isDark ? PROBLEM_PAGE_DARK : PROBLEM_PAGE_LIGHT,

    background: {
      paper: isDark ? GREY[1100] : "#FFFFFF",
      default: isDark ? GREY[1400] : GREY[100],
      neutral: GREY[200],
    },

    text: {
      primary: isDark ? "#F1F5F9" : "#0F172A",
      secondary: isDark ? "#CBD5E1" : GREY[600],
      disabled: GREY[500],
    },

    heading: {
      primary: isDark ? "#FFFFFF" : "#0F172A",
    },

    xp: {
      primary: isDark
        ? PROBLEM_PAGE_DARK.xpGold
        : PROBLEM_PAGE_LIGHT.xpGold,
    },

    difficulty_tags: {
      easy: {
        background: isDark
          ? PROBLEM_PAGE_DARK.diffEasyBg
          : PROBLEM_PAGE_LIGHT.diffEasyBg,
        text: isDark
          ? PROBLEM_PAGE_DARK.diffEasy
          : PROBLEM_PAGE_LIGHT.diffEasy,
      },
      medium: {
        background: isDark
          ? PROBLEM_PAGE_DARK.diffMediumBg
          : PROBLEM_PAGE_LIGHT.diffMediumBg,
        text: isDark
          ? PROBLEM_PAGE_DARK.diffMedium
          : PROBLEM_PAGE_LIGHT.diffMedium,
      },
      hard: {
        background: isDark
          ? PROBLEM_PAGE_DARK.diffHardBg
          : PROBLEM_PAGE_LIGHT.diffHardBg,
        text: isDark
          ? PROBLEM_PAGE_DARK.diffHard
          : PROBLEM_PAGE_LIGHT.diffHard,
      },
    },

    action: {
      hover: isDark
        ? "rgba(255,255,255,0.05)"
        : "rgba(0,0,0,0.04)",
      selected: "rgba(59,130,246,0.08)",
    },

    divider: isDark ? GREY[700] : GREY[200],
  };
};

export default getPalette;
