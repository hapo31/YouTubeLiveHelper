import { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import {
  fetchSuperChatEvents,
  RemoveCheckedSuperchat,
  SuperChatInfo,
} from "../../../state/AppState";

import ChatCard from "../../../components/ChatCard/ChatCard";
import { useRootState } from "../../../state/root";
import { useDispatch } from "react-redux";
import useErrorHandle from "../../../hooks/useErrorHandle";
import { Config, SetConfig } from "../../../state/Config";
import SortDirIcon from "../../../components/Common/SortDirIcon";

type Props = {
  superChatListData: SuperChatInfo[];
  onClickCard: (id: string) => void;
};
const SuperChatCardList = ({ superChatListData, onClickCard }: Props) => {
  const { auth, config } = useRootState((rootState) => ({
    auth: rootState.auth,
    config: rootState.config,
  }));

  const dispatch = useDispatch();

  const remainCount = useMemo(
    () =>
      superChatListData.length -
      superChatListData.filter((chat) => chat.checked).length,
    [superChatListData]
  );

  const superChatList = useMemo(
    () => superChatListData.slice().sort(sortSelector(config)),
    [config, superChatListData]
  );

  const [enableRefreshButton, setEnableRefreshButton] = useState(
    auth.isAuthorized
  );

  useErrorHandle();

  return (
    <Container>
      <HeaderContainer>
        <RefreshButton
          onClick={() => {
            setEnableRefreshButton(false);
            dispatch(fetchSuperChatEvents(auth));
            setTimeout(() => {
              setEnableRefreshButton(true);
            }, 1000);
          }}
          disabled={!enableRefreshButton}
        >
          更新
        </RefreshButton>
        <RefreshButton
          onClick={() => {
            const newValue = config.superChatSortDir === "asc" ? "desc" : "asc";
            dispatch(SetConfig({ key: "superChatSortDir", value: newValue }));
          }}
        >
          {config.superChatSortDir === "asc" ? "昇順" : "降順"}
          <SortDirIcon dir={config.superChatSortDir} />
        </RefreshButton>
        {remainCount > 0 ? (
          <SuperChatRemainCount>未読:{remainCount}</SuperChatRemainCount>
        ) : null}
        <RemoveButton
          onClick={() => {
            dispatch(RemoveCheckedSuperchat());
          }}
        >
          チェック済みを削除
        </RemoveButton>
      </HeaderContainer>
      <ChatCardContainer>
        {superChatList
          .filter((superChat) => superChat.showing)
          .map((superChat, index) => (
            <ChatCard
              key={`${index}-${superChat.message}`}
              onClick={() => onClickCard(superChat.id)}
              superChatInfo={superChat}
            />
          ))}
      </ChatCardContainer>
    </Container>
  );
};

function sortSelector(config: Config) {
  const dir = config.superChatSortDir === "asc" ? -1 : 1;
  switch (config.superChatSortType) {
    case "date":
      return (a: SuperChatInfo, b: SuperChatInfo) =>
        (a.createdAt - b.createdAt) * dir;

    default:
      return (a: SuperChatInfo, b: SuperChatInfo) =>
        (a.createdAt - b.createdAt) * dir;
  }
}

export default SuperChatCardList;

const Container = styled.div`
  height: calc(100vh - 43px);
  overflow-y: hidden;
  user-select: none;
`;

const ChatCardContainer = styled.div`
  overflow-y: auto;
  height: 95%;
`;

const HeaderContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5%;
`;

const RefreshButton = styled.button`
  margin: 5px;
  border-radius: 12px;
  background-color: aquamarine;
  height: 18px;
  font-size: 10px;
  line-height: 10px;
`;

const RemoveButton = styled.button`
  margin: 5px;
  border-radius: 12px;
  color: #fff;
  background-color: maroon;
  height: 18px;
  font-size: 10px;
  line-height: 10px;
`;

const SuperChatRemainCount = styled.div`
  height: 18px;
  padding: 1px 10px;
  color: #212121;
  border-radius: 16px;
  background-color: aquamarine;
  width: auto;
  font-size: 12px;
  font-weight: bold;
`;
