import styled from "styled-components";
import { useRootState } from "../../../state/root";

const LogContainer = () => {
  const log = useRootState((rootState) => rootState.log);
  return (
    <LogMessageContainer>
      {log.logs.map((log) => (
        <p key={`log-${log.createdAt}`}>{log.message}</p>
      ))}
    </LogMessageContainer>
  );
};

export default LogContainer;

const LogMessageContainer = styled.div`
  background-color: white;
`;
