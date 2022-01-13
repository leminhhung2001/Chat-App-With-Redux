import React from "react";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";

import { useNavigate } from "react-router-dom";

interface LinkTabProps {
  link: string;
  label: string;
  key: string;
  icon: React.FunctionComponentElement<number>;
}

function LinkTab({
  link,
  label,
  icon,
  ...restProps
}: LinkTabProps): React.FunctionComponentElement<LinkTabProps> {
  const navigate = useNavigate();
  return (
    <Tab
      component='a'
      icon={icon}
      onClick={(event) => {
        event.preventDefault();
        navigate(`/${link}`);
      }}
      label={label}
      {...restProps}
    />
  );
}

LinkTab.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
};

export default LinkTab;
