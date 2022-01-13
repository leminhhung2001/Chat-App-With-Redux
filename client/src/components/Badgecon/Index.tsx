import * as React from "react";
import Badge from "@mui/material/Badge";
import Fade from "@mui/material/Fade";

interface BadgeProps {
  content: number;
  children: React.FunctionComponentElement<number>;
  visible: boolean;
}

function ColorBadge({
  content,
  children,
  visible,
}: BadgeProps): React.FunctionComponentElement<BadgeProps> {
  return (
    <Fade in={visible} timeout={500}>
      <Badge color='secondary' badgeContent={content}>
        {children}
      </Badge>
    </Fade>
  );
}

export default ColorBadge;
