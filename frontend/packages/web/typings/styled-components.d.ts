import { ThemeInterface } from '@chatapp/theme';

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
