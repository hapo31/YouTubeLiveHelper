import styled from "styled-components";
import { Triangle } from "../../svg/svg";

type Props = {
  dir: "asc" | "desc";
};

const SortDirIcon = ({ dir }: Props) => <SortDir dir={dir} />;

export default SortDirIcon;

const SortDir = styled(Triangle)`
  ${(props: Props) => (props.dir === "asc" ? `transform:rotate(180deg);` : "")}

  width: 14px;
`;
