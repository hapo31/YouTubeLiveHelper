import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { SuperChatInfo } from "../../../state/AppState";

import ChatCard from "../../../components/ChatCard/ChatCard";
import { useRootState } from "../../../state/root";
import {
  fetchSuperChatEvents,
  updateAccessToken,
  YoutubeAPIError,
} from "../../../domain/Youtube/YoutubeAPI";
import { useDispatch } from "react-redux";
import { addLog, LogLevel } from "../../../state/Log";
import { setAuthInfo, setAuthInfoAsync } from "../../../state/Auth";

type Props = {
  superChatList: SuperChatInfo[];
  onClickCard: (index: number) => void;
};
const SuperChatCardList = ({ superChatList, onClickCard }: Props) => {
  const [superChatFetched, setSuperChatFetched] = useState(false);
  const auth = useRootState((rootState) => rootState.auth);
  const dispatch = useDispatch();

  const remainCount = useMemo(
    () =>
      superChatList.length -
      superChatList.filter((chat) => chat.checked).length,
    [superChatList]
  );

  useEffect(() => {
    if (auth.isAuthorized && !superChatFetched) {
      fetchSuperChatEvents(auth)
        .then((result) => {
          if (!result) {
            return;
          }
          const dataStr = JSON.stringify(result);
          dispatch(addLog({ message: dataStr, level: LogLevel.DEBUG }));
          setSuperChatFetched(true);
        })
        .catch((e) => {
          if (e instanceof YoutubeAPIError) {
            dispatch(
              addLog({
                message:
                  "アクセストークンの期限切れです。認証を一度解除してログインし直してください。",
                level: LogLevel.ERROR,
              })
            );
            setSuperChatFetched(true);
            // TODO: 本来であれば↓を読んで update accessToken する必要があるけど無限ループするっぽいので
            // 原因が判明するまでCO
            // updateAccessToken(auth).then(result => {
            //   dispatch(setAuthInfoAsync({
            //     refresh_token: auth.refreshToken,
            //     access_token: result.accessToken,
            //     expires_in: result.expiresIn.getDate()
            //   }));
            // });
          } else {
            dispatch(
              addLog({
                message:
                  "不明なエラーが発生しました。ネットワーク接続が切れている可能性があります。",
                level: LogLevel.ERROR,
              })
            );
            setSuperChatFetched(true);
          }
        });
    }
  }, [auth, dispatch, superChatFetched]);

  return (
    <Container>
      <SuperChatCount>
        スーパーチャットの合計(数):{superChatList.length}
      </SuperChatCount>
      <ChatCardContainer>
        {superChatList.map((superChat, index) => (
          <ChatCard
            key={`${index}-${superChat.messageRaw}`}
            onClick={onClickCard}
            superChatInfo={superChat}
            index={index}
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
