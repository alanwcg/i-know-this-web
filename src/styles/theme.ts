import { extendTheme } from '@chakra-ui/react';
import { shade } from 'polished';

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#282a36",
      "500": "#44475a",
      "50": "#f8f8f2"
    },
    purple: {
      "500": "#bd93f9",
      "600": shade(0.2, "#bd93f9"),
      "700": shade(0.4, "#bd93f9"),
    }
  },
  fonts: {
    heading: 'Fira Code',
    body: 'Fira Code',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      }
    }
  }
});