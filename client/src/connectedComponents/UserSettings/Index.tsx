import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useMediaQuery } from "react-responsive";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";
import TextInput from "../../components/TextInput/Index";

import {
  setUsername,
  saveSettings,
  resetSettings,
  unreadMessage,
} from "../../store/actions";
import {
  marginType,
  inputSize,
  inputVariant,
  Settings,
  Message,
} from "../../types/index";

import FormRadioGroup from "../../components/FormRadioGroup/Index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      backgroundColor: theme.palette.background.paper,
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    listContainer: {
      display: "flex",
      justifyContent: "center",
      maxHeight: (props: {
        parentHeight: number;
        isPortrait: boolean;
        isTabletOrMobileDevice: boolean;
      }) => {
        const { parentHeight, isPortrait, isTabletOrMobileDevice } = props;
        if (isTabletOrMobileDevice) {
          if (parentHeight && isPortrait) {
            return parentHeight * 0.65;
          } else if (parentHeight && !isPortrait) {
            return parentHeight * 0.53;
          }
        }
        if (parentHeight && isPortrait) {
          return parentHeight * 0.75;
        } else if (parentHeight && !isPortrait) {
          return parentHeight * 0.65;
        }
      },
    },
    form: (props: {
      parentHeight: number;
      isPortrait: boolean;
      isTabletOrMobileDevice: boolean;
    }) => {
      const { isPortrait, isTabletOrMobileDevice } = props;
      if (isTabletOrMobileDevice && !isPortrait) {
        return {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        };
      }
      return {
        display: "flex",
        flexDirection: "column",
        flexGrow: 0,
        justifyContent: "flex-start",
      };
    },
    formControl: {
      padding: (props: {
        parentHeight: number;
        isPortrait: boolean;
        isTabletOrMobileDevice: boolean;
      }) =>
        props.isTabletOrMobileDevice
          ? props.isPortrait
            ? "2rem 1rem 1rem 1rem"
            : "1rem"
          : "2rem 1rem",
      display: "flex",
    },
    radioGroupContainer: (props: {
      parentHeight: number;
      isPortrait: boolean;
      isTabletOrMobileDevice: boolean;
    }) => {
      const { parentHeight, isPortrait, isTabletOrMobileDevice } = props;
      if (isTabletOrMobileDevice) {
        if (parentHeight && isPortrait) {
          return {
            display: "flex",
            flexDirection: "column",
          };
        } else if (parentHeight && !isPortrait) {
          return {
            display: "flex",
            flexDirection: "row",
          };
        }
      }
      return {
        display: "flex",
        flexDirection: "column",
      };
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: (props: {
        parentHeight: number;
        isPortrait: boolean;
        isTabletOrMobileDevice: boolean;
      }) =>
        props.isTabletOrMobileDevice
          ? props.isPortrait
            ? "1rem 1rem 2rem 1rem"
            : "1rem"
          : "2rem",
      "& > * + *": {
        marginLeft: "2rem",
      },
      "@media (max-width: 300px)": {
        flexDirection: "column",
        "& > * + *": {
          marginTop: "2rem",
          marginLeft: "0rem",
        },
      },
    },
  })
);

const mapStateToProps = (state) => {
  return {
    userName: state.chatReducer.userName,
    theme: state.chatReducer.theme,
    clock: state.chatReducer.clock,
    sendMessageOnCtrlEnter: state.chatReducer.sendMessageOnCtrlEnter,
    messages: state.chatReducer.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsernameAction: (userName: string) => dispatch(setUsername(userName)),
    saveSettingsAction: (settings: Settings) =>
      dispatch(saveSettings(settings)),
    resetSettingsAction: () => dispatch(resetSettings()),
    unreadMessageAction: () => dispatch(unreadMessage()),
  };
};

interface UserSettingsProps {
  userName: string;
  theme: string;
  clock: string;
  sendMessageOnCtrlEnter: string;
  messages: Message[];
  parentHeight: number;
  isPortrait: boolean;
  setUsernameAction: (userName: string) => Dispatch;
  saveSettingsAction: (settings: Settings) => Dispatch;
  resetSettingsAction: () => Dispatch;
  unreadMessageAction: () => Dispatch;
}

function UserSettings({
  userName,
  theme,
  clock,
  sendMessageOnCtrlEnter,
  messages,
  parentHeight,
  isPortrait,
  setUsernameAction,
  saveSettingsAction,
  resetSettingsAction,
  unreadMessageAction,
}: UserSettingsProps): React.FunctionComponentElement<UserSettingsProps> {
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  const classes = useStyles({
    parentHeight,
    isPortrait,
    isTabletOrMobileDevice,
  });
  const [username, setUsername] = useState(userName);
  const [themeValue, setThemeValue] = useState(theme);
  const [clockValue, setClockValue] = useState(clock);
  const [sendOnCtrlValue, setSendOnCtrlValue] = useState(
    sendMessageOnCtrlEnter
  );
  const [messageCount, setMessageCount] = useState(messages.length);

  useEffect(() => {
    setUsername(userName);
  }, [userName]);

  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);

  useEffect(() => {
    setClockValue(clock);
  }, [clock]);

  useEffect(() => {
    setSendOnCtrlValue(sendMessageOnCtrlEnter);
  }, [sendMessageOnCtrlEnter]);

  useEffect(() => {
    const numMessages = messages.length;
    if (numMessages > messageCount) {
      setMessageCount(numMessages);
      unreadMessageAction();
    }
  }, [messages]);

  const handleChangeUserName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleThemeChange = (value) => {
    setThemeValue(value);
  };

  const handleClockDisplayChange = (value) => {
    setClockValue(value);
  };

  const handleMessageSend = (value) => {
    setSendOnCtrlValue(value);
  };

  const handleResetSettings = () => {
    if (
      themeValue !== theme ||
      clockValue !== clock ||
      sendOnCtrlValue !== sendMessageOnCtrlEnter ||
      username !== userName
    ) {
      setThemeValue(theme);
      setClockValue(clock);
      setSendOnCtrlValue(sendMessageOnCtrlEnter);
      setUsername(userName);
    } else {
      resetSettingsAction();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (userName.trim().length < 3 || userName.trim().length > 50) {
      return;
    }
    if (username !== userName) {
      setUsernameAction(username);
    }
    saveSettingsAction({
      userName: username,
      theme: themeValue,
      clock: clockValue,
      sendMessageOnCtrlEnter: sendOnCtrlValue,
    });
  };

  return (
    <Paper className={classes.contentContainer} elevation={3}>
      <Box component='div' className={classes.listContainer}>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <FormControl error={false} className={classes.formControl}>
            <FormLabel color='primary'>Username</FormLabel>
            <TextInput
              labelText=''
              placeHolder='3 to 50 characters long'
              marginType={marginType.dense}
              inputSize={inputSize.small}
              inputVariant={inputVariant.outlined}
              inputValue={username}
              onInputChange={handleChangeUserName}
              onKeyPress={() => null}
            />
          </FormControl>
          <Box component='div' className={classes.radioGroupContainer}>
            <FormRadioGroup
              label='Interface Theme'
              onChange={handleThemeChange}
              value={themeValue}
              radioLabels={["Light", "Dark"]}
              radioValues={["light", "dark"]}
            />
            <FormRadioGroup
              label='Clock Display'
              onChange={handleClockDisplayChange}
              value={clockValue}
              radioLabels={["12 Hour", "24 Hour"]}
              radioValues={["12", "24"]}
            />
            <FormRadioGroup
              label='Send Messages on CTRL + Enter'
              onChange={handleMessageSend}
              value={sendOnCtrlValue}
              radioLabels={["On", "Off"]}
              radioValues={["true", "false"]}
            />
          </Box>
          <Box className={classes.buttonContainer}>
            <Button
              variant='contained'
              size='large'
              color='primary'
              type='button'
              onClick={handleResetSettings}
            >
              Reset to Defaults
            </Button>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              type='submit'
            >
              Save Settings
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
