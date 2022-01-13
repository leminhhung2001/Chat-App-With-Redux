import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import LinkTab from "../LinkTab/Index";

interface ITab {
  link: string;
  label: string;
  icon: React.FunctionComponentElement<number>;
}

interface TabPanelProps {
  tabs: ITab[];
}

function TabPanel({
  tabs,
}: TabPanelProps): React.FunctionComponentElement<TabPanelProps> {
  const location = useLocation();
  const [tabValue, setTabValue] = useState(() => {
    if (location.pathname.includes("/settings")) {
      return 1;
    }
    return 0;
  });

  const handleTabChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    newVal: number
  ) => {
    setTabValue(newVal);
  };

  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        {tabs.length > 0 &&
          tabs.map(({ label, link, icon }) => (
            <LinkTab key={label} label={label} link={link} icon={icon} />
          ))}
      </Tabs>
    </Paper>
  );
}

export default TabPanel;
