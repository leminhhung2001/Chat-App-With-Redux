import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";

import { makeStyles, createStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useWindowHeight from "../../utils/useWindowHeight";
import GlobalResponsiveFont from "../../GlobalResponsiveFont";

import Header from "../../components/Header/Index";
import UserSettings from "../UserSettings/Index";
import ChatWindow from "../ChatWindow/Index";
import TabPanel from "../../components/TabPanel/Index";
import BadgeIcon from "../../components/Badgecon/Index";
import { lightTheme, darkTheme } from "../../utils/themes";
import { useMediaQuery } from "react-responsive";
import { loadSettings } from "../../store/actions";

const useStyles = makeStyles(() =>
  createStyles({
    gridContainer: {
      maxHeight: (props: { height: number }) => {
        return props.height ? props.height : "100%";
      },
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      margin: "0rem",
      "& > *:first-child": {
        marginBottom: "2rem",
      },
    },
    content: {
      maxHeight: "75vh",
    },
  })
);

const mapStateToProps = (state) => {
  return {
    socketId: state.chatReducer.socketId,
    theme: state.chatReducer.theme,
    unreadMessageCount: state.chatReducer.unreadMessageCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSettingsAction: () => dispatch(loadSettings()),
  };
};

interface AppProps {
  socketId: string;
  theme: string;
  unreadMessageCount: number;
  loadSettingsAction: () => Dispatch;
}

function App({
  socketId,
  theme,
  unreadMessageCount,
  loadSettingsAction,
}: AppProps): React.FunctionComponentElement<AppProps> {
  const [visible, setVisible] = useState(true);
  const { height } = useWindowHeight();
  const classes = useStyles({ height });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const makeVisible = () => {
    setVisible((prevState) => !prevState);
  };
  useEffect(() => {
    if (socketId) {
      const savedSettings = JSON.parse(sessionStorage.getItem("settings"));
      if (savedSettings && Object.keys(savedSettings).length > 0) {
        loadSettingsAction();
      }
    }
  }, [socketId]);
  useEffect(() => {
    if (unreadMessageCount > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [unreadMessageCount]);
  useEffect(() => {
    let id;
    if (unreadMessageCount > 0) {
      id = setInterval(makeVisible, 700);
    } else {
      clearInterval(id);
      setVisible(true);
    }
    return () => clearInterval(id);
  }, [visible]);
  const tabs = [
    {
      label: "Chat",
      link: "chat",
      icon: (
        <BadgeIcon
          content={unreadMessageCount}
          children={<EmailIcon />}
          visible={visible}
        />
      ),
    },
    { label: "Settings", link: "settings", icon: <SettingsIcon /> },
  ];
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <GlobalResponsiveFont />
      <Router>
        <Box className={classes.gridContainer}>
          <Box>
            <Header title='Chat-With-Me' />
            <TabPanel tabs={tabs} />
          </Box>
          <Box className={classes.content}>
            <Routes>
              <Route path='/' element={<Navigate to='/chat' />} />
              <Route
                path='/chat'
                element={
                  <ChatWindow
                    parentHeight={height}
                    isPortrait={isPortrait}
                    maxHeight={73}
                  />
                }
              />
              <Route
                path='/settings'
                element={
                  <UserSettings parentHeight={height} isPortrait={isPortrait} />
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
