import light from './themes/light';

interface ColorsInterface {
  primaryBg: string;
  secondaryBg: string;
  primaryText: string;
  secondaryText: string;
}

export interface ThemeInterface {
  type: string;
  colors: ColorsInterface;
}

const themes: { [key: string]: ThemeInterface } = {
  [light.type]: light,
};

export default themes;
