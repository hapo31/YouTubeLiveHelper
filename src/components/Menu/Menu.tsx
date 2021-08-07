import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  titles: string[];
  page: number;
  onClickPage: (index: number) => void;
};

const Menu = (props: Props) => {
  return (
    <Container>
      {props.titles.map((title, i) => (
        <PageButton key={`page-btn-${i}`}>{title}</PageButton>
      ))}
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  margin: 10px;
  width: 100%;
  height: 32px;
`;

const PageButton = styled.button`
  margin: 5px 10px;
  padding: 10px 15px;
  border: solid 1px;
  border-radius: 5px;
`;
