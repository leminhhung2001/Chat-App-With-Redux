import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { LinkMeta } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    metaContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "0rem 0rem 1rem 0rem",
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexDirection: "column",
      },
      "@media (max-width: 300px)": {
        maxWidth: "90%",
      },
    },
    image: {
      maxWidth: "12rem",
      maxHeight: "6.5rem",
      margin: "0rem 0rem 0rem 1rem",
      [theme.breakpoints.down("xs")]: {
        margin: "1rem 0rem 0rem 0rem",
      },
    },
  })
);

interface MetaLink {
  link: LinkMeta;
}

const MessageMetadata = ({
  link,
}: MetaLink): React.FunctionComponentElement<MetaLink> => {
  const classes = useStyles();
  const { url, title, description, image } = link;
  return (
    <Box className={classes.metaContainer} key={url}>
      <Box>
        <Typography>{title}</Typography>
        <Typography variant='caption'>{description}</Typography>
      </Box>
      <Box>
        <img src={image} alt='Imaged' className={classes.image} />
      </Box>
    </Box>
  );
};

export default MessageMetadata;
