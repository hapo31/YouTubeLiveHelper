import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { getAuthInfoAsync } from "../../state/Auth";
import { useRootState } from "../../state/root";
import CardContainer from "./CardContainer/CardContainer";
import OAuthRequiredContainer from "./OAuthRequiredContainer/OAuthRequiredContainer";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import { AppTheme } from "../../mixins/AppTheme";
import {
  fetchSuperChatEvents,
  loadSuperchatFromStorage,
  SetShowingVideoId,
} from "../../state/AppState";
import LogContainer from "./LogContainer/LogContainer";
import Tools from "./Tools/Tools";
import Config from "./Config/Config";
import { loadConfig } from "../../state/Config";

const PopupIndex = () => {
  const [superChatFetched] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useRootState((rootState) => ({
    auth: rootState.auth,
  }));

  useEffect(() => {
    if (!auth.isAuthorized) {
      dispatch(getAuthInfoAsync());
      dispatch(SetShowingVideoId({ videoId: "test" }));
      dispatch(loadConfig());
    }
    if (auth.isAuthorized && !superChatFetched) {
      dispatch(loadSuperchatFromStorage());
      dispatch(fetchSuperChatEvents(auth));
    }
  }, [auth, auth.isAuthorized, dispatch, superChatFetched]);

  return (
    <AppTab defaultIndex={0}>
      <TabList>
        <Tab>ツール</Tab>
        <Tab>スーパーチャット</Tab>
        <Tab>ログイン {auth.isAuthorized ? "✔" : ""}</Tab>
        <Tab>設定</Tab>
        <Tab>ログ</Tab>
        {process.env.NODE_ENV !== "production" ? (
          <Tab disabled>開発モード</Tab>
        ) : null}
      </TabList>
      <AppTabPanel>
        <Tools />
      </AppTabPanel>
      <AppTabPanel>
        <CardContainer />
      </AppTabPanel>
      <AppTabPanel>
        <OAuthRequiredContainer />
      </AppTabPanel>
      <AppTabPanel>
        <Config />
      </AppTabPanel>
      <AppTabPanel>
        <LogContainer />
      </AppTabPanel>
    </AppTab>
  );
};

const AppTab = styled(Tabs)`
  background-color: #ccc;
`;

const AppTabPanel = styled(TabPanel)`
  ${AppTheme}
`;

export default PopupIndex;
