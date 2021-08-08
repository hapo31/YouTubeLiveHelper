import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { getAuthInfoAsync } from "../../state/Auth";
import { useRootState } from "../../state/root";
import CardContainer from "./CardContainer/CardContainer";
import OAuthRequiredContainer from "./OAuthRequiredContainer/OAuthRequiredContainer";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import { AppTheme } from "../../mixins/AppTheme";
import { SetShowingVideoId } from "../../state/AppState";
import LogContainer from "./LogContainer/LogContainer";

const PopupIndex = () => {
  const dispatch = useDispatch();

  const { auth } = useRootState((rootState) => ({
    auth: rootState.auth,
  }));

  useEffect(() => {
    if (!auth.isAuthorized) {
      dispatch(getAuthInfoAsync());
      dispatch(SetShowingVideoId("test"));
    }
  }, [auth.isAuthorized, dispatch]);

  return (
    <AppTab defaultIndex={0}>
      <TabList>
        <Tab>スーパーチャット</Tab>
        <Tab>認証</Tab>
        <Tab>ログ</Tab>
      </TabList>
      <AppTabPanel>
        <CardContainer />
      </AppTabPanel>
      <AppTabPanel>
        <OAuthRequiredContainer />
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
