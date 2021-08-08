import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getOAuth2URL } from "../../../domain/YTLHServer/YTLHAPI";
import { resetAuthAsync } from "../../../state/Auth";
import { useRootState } from "../../../state/root";

const OAuthRequiredContainer = () => {
  const dispatch = useDispatch();
  const { auth } = useRootState((rootState) => ({
    auth: rootState.auth,
  }));

  return (
    <Container>
      {!auth.isAuthorized ? (
        <StartOAuthButton
          onClick={async () => {
            const oauth2Url = await getOAuth2URL();
            window.open(oauth2Url, "_blank");
          }}
        >
          認証する
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

const Container = styled.div``;

const StartOAuthButton = styled.button`
  border-radius: 10px;
  width: 300px;
  background-color: #eee;
  padding: 20px;
`;
