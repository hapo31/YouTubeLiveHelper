import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateAccessToken,
  YoutubeAPIError,
} from "../domain/Youtube/YoutubeAPI";
import { ResolvedError } from "../state/AppState";
import { setAuthInfoAsync } from "../state/Auth";
import { addLog, LogLevel } from "../state/Log";
import { useRootState } from "../state/root";

export default function useErrorHandle() {
  const { app: fetchSuperchatError, auth } = useRootState((root) => ({
    app: root.app,
    auth: root.auth,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchSuperchatError != null) {
      if (fetchSuperchatError instanceof YoutubeAPIError) {
        // TODO: 本来であれば↓を読んで update accessToken する必要があるけど無限ループするっぽいので
        // 原因が判明するまでCO
        updateAccessToken(auth).then((result) => {
          dispatch(
            setAuthInfoAsync({
              refresh_token: auth.refreshToken,
              access_token: result.accessToken,
              expires_in: result.expiresIn.getDate(),
            })
          );
        });
      } else {
        dispatch(
          addLog({
            message:
              "不明なエラーが発生しました。ネットワーク接続が切れている可能性があります。",
            level: LogLevel.ERROR,
          })
        );
      }

      dispatch(ResolvedError());
    }
  }, [auth, dispatch, fetchSuperchatError]);
}
