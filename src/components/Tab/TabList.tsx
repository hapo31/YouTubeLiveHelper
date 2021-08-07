import { useMemo } from "@storybook/addons";
import React, { ReactChild } from "react";
import { ReactNode } from "react";

type Props = {
  currentIndex?: number;
  onChangeTab?: (index: number) => void;
  children: ReactNode;
};

const TabList = ({ currentIndex = 0, onChangeTab, children }: Props) => {
  const names = useMemo(() => children as ReactChild);

  return <></>;
};

export default TabList;
