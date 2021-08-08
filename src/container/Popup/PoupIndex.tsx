import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { getAuthInfoAsync } from "../../state/Auth";
import { useRootState } from "../../state/root";
import CardContainer from "./CardContainer/CardContainer";
import OAuthRequiredContainer from "./OAuthRequiredContainer/OAuthRequiredContainer";

const PopupIndex = () => {
  const dispatch = useDispatch();

  const { auth } = useRootState((rootState) => ({
    auth: rootState.auth,
  }));

  useEffect(() => {
    if (!auth.isAuthorized) {
      dispatch(getAuthInfoAsync());
    }
  }, [auth.isAuthorized, dispatch]);

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab>認証</Tab>
        <Tab>スーパーチャット</Tab>
      </TabList>
      <TabPanel>
        <OAuthRequiredContainer />
      </TabPanel>
      <TabPanel>
        <CardContainer />
      </TabPanel>
    </Tabs>
  );
};

export default PopupIndex;
