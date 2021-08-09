import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getOAuth2URL } from "../../../domain/YTLHServer/YTLHAPI";
import { AppTheme } from "../../../mixins/AppTheme";
import { resetAuthAsync } from "../../../state/Auth";
import { useRootState } from "../../../state/root";

const OAuthRequiredContainer = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useRootState((rootState) => ({
    auth: rootState.auth,
  }));

  return (
    <Container>
      {!auth.isAuthorized ? (
        <StartOAuthButton
          disabled={isPending}
          onClick={async () => {
            setIsPending(true);
            const oauth2Url = await getOAuth2URL();
            window.open(oauth2Url, "_blank");
            setIsPending(false);
          }}
        >
          {!isPending ? "認証する" : "認証ページを開いています…"}
        </StartOAuthButton>
      ) : (
        <StartOAuthButton
          onClick={() => {
            dispatch(resetAuthAsync());
          }}
        >
          認証を解除
        </StartOAuthButton>
      )}
    </Container>
  );
};

export default OAuthRequiredContainer;

const Container = styled.div`
  ${AppTheme}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StartOAuthButton = styled.button`
  border-radius: 10px;
  width: 300px;
  background-color: #eee;
  padding: 20px;
`;
