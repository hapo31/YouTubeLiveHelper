import { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchSuperChatEvents, SuperChatInfo } from "../../../state/AppState";

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
      <SuperChatCount>
        スーパーチャットの合計(数):{superChatList.length}
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
      </SuperChatCount>
      <ChatCardContainer>
        {superChatList.map((superChat, index) => (
          <ChatCard
            key={`${index}-${superChat.message}`}
            onClick={() => onClickCard(index)}
            superChatInfo={superChat}
          />
        ))}
      </ChatCardContainer>
      {remainCount > 0 ? (
        <SuperChatRemainCountContainer>
          <SuperChatRemainCount>未読:{remainCount}</SuperChatRemainCount>
        </SuperChatRemainCountContainer>
      ) : null}
    </Container>
  );
};

export default SuperChatCardList;

const Container = styled.div`
  user-select: none;
`;

const ChatCardContainer = styled.div`
  overflow-y: scroll;
  height: 489px;
`;

const SuperChatCount = styled.div`
  position: relative;
  background-color: #212121;
  text-align: center;
  display: flex;
  justify-content: center;
  vertical-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  padding: 5px 0;
`;

const RefreshButton = styled.button`
  position: absolute;
  right: 10px;
  margin: 5px;
  height: 28px;
  border-radius: 12px;
  background-color: aquamarine;
`;

const SuperChatRemainCountContainer = styled.div`
  text-align: center;
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20px;
  bottom: 0;
  z-index: 999;
`;

const SuperChatRemainCount = styled.div`
  position: fixed;
  bottom: 5px;
  padding: 1px 10px;
  color: #212121;
  border-radius: 16px;
  background-color: aquamarine;
  width: auto;
  font-size: 12px;
  font-weight: bold;
`;
