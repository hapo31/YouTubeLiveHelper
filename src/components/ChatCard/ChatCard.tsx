import styled from "styled-components";
import { SuperChatInfo } from "../../state/AppState";

type Props = {
  superChatInfo: SuperChatInfo;
  onClick: () => void;
};

const ChatCard = (props: Props) => {
  const { superChatInfo } = props;
  return (
    <Container
      onClick={props.onClick}
      isBordered={superChatInfo.checked}
      className="container"
    >
      <Header backgroundColor={superChatInfo.superChatColorInfo.secondary}>
        <Img src={superChatInfo.imgUrl} alt="" height="40" width="40" />
        <Wrapper>
          <Name color={superChatInfo.superChatColorInfo.text}>
            {superChatInfo.author}
          </Name>
          <Purches color={superChatInfo.superChatColorInfo.text}>
            {superChatInfo.purches}
          </Purches>
        </Wrapper>
      </Header>
      {superChatInfo.message.length > 0 && (
        <Message
          backgroundColor={superChatInfo.superChatColorInfo.primary}
          color={superChatInfo.superChatColorInfo.message}
        >
          {superChatInfo.message}
        </Message>
      )}

      {superChatInfo.checked && <Checkmark>✔</Checkmark>}
    </Container>
  );
};

export default ChatCard;

type styledProps = {
  color?: string;
  backgroundColor?: string;
};

const Container = styled.div`
  position: relative;
  box-shadow: ${({ isBordered }: { isBordered: boolean }) =>
    isBordered ? "0 0 0 3px rgb(200, 200, 63)" : "none"};
  margin: 8px;
  :hover {
    box-shadow: 0 0 0 3px rgba(200, 200, 63, 0.75);
    transition: 0.2s;
  }
  > img {
    height: 24px;
    width: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  height: 40px;
  padding: 8px 16px;
  background-color: ${(props: styledProps) => props.backgroundColor};
`;

const Img = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const Wrapper = styled.div`
  flex-direction: vertical;
`;

const Name = styled.div`
  color: ${(props: styledProps) => props.color};
`;

const Purches = styled.div`
  color: ${(props: styledProps) => props.color};
`;

const Message = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background-color: ${(props: styledProps) => props.backgroundColor};
  color: ${(props: styledProps) => props.color};

  > img {
    width: 24px;
    height: 24px;
  }
`;

const Checkmark = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
`;
