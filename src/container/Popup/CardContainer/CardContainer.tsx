import SuperChatCardList from "./SuperChatCardList";
import { useSelector, useDispatch } from "react-redux";
import { CheckedSuperchat } from "../../../state/AppState";
import { RootState } from "../../../state/root";

const videoIdParseRegExp =
  /https:\/\/studio\.youtube\.com\/video\/(\w+)\/livestreaming/;

const CardContainer = () => {
  const appState = useAppState();
  const dispatch = useDispatch();

  return (
    <SuperChatCardList
      onClickCard={(id: string) => {
        dispatch(CheckedSuperchat({ id }));
      }}
      superChatListData={appState.superChatList}
    />
  );
};

export default CardContainer;

function useAppState() {
  return useSelector((rootState: RootState) => rootState.app);
}
