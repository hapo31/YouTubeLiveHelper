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

type Props = {
  superChatList: SuperChatInfo[];
  onClickCard: (index: number) => void;
};
const SuperChatCardList = ({ superChatList, onClickCard }: Props) => {
  const { auth } = useRootState((rootState) => ({
    auth: rootState.auth,
  }));

  const dispatch = useDispatch();

  const remainCount = useMemo(
    () =>
      superChatList.length -
      superChatList.filter((chat) => chat.checked).length,
    [superChatList]
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
              onClick={() => onClickCard(index)}
              superChatInfo={superChat}
            />
          ))}
      </ChatCardContainer>
    </Container>
  );
};

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
