import { withStyles } from "@mui/styles";

const GlobalResponsiveFont = withStyles({
  "@global": {
    html: {
      fontSize: 16,
      "@media (max-width: 1920px)": {
        fontSize: 16,
      },
      "@media (max-width: 1280px)": {
        fontSize: 12.8,
      },
      "@media (max-width: 960px)": {
        fontSize: 11.2,
      },
      "@media (max-width: 600px)": {
        fontSize: 9.6,
      },
      "@media (max-width: 300px)": {
        fontSize: 8,
      },
    },
  },
})(() => null);

export default GlobalResponsiveFont;
