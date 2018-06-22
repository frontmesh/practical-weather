const UNIT = 10;
const PRIMARY = '#0140a5';
const PRIMARY_DARK = '#312a6c';
export default {
  COLOR: {
    PRIMARY,
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    CHART: 'rgba(255, 255, 255, 0.35)',
    GREEN: '#5edeb3',
    RED: '#F44336',
  },
  // -- Fonts
  FONT: {
    SIZE: {
      SMALL: UNIT * 1.2,
      NORMAL: UNIT * 1.6,
      LARGE: UNIT * 2,
      EXTRA_LARGE: UNIT * 2.4,
      XX_LARGE: UNIT * 3.4,
    },
    WEIGHT: {
      LIGHT: '200',
      BOLD: '700',
    },
  },
  GRADIENT: [PRIMARY, PRIMARY, PRIMARY_DARK],
};
