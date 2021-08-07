import React from "react";

import { text, array, number } from "@storybook/addon-knobs";

import Menu from "./Menu";
import { Meta, Story } from "@storybook/react/types-6-0";

const Template: Story<any> = (args) => <Menu {...args} />;

export const Primary = Template.bind({});

export default {
  title: "Menu",
  component: Menu,
} as Meta;

Primary.args = {
  titles: array("Titles", ["page0", "page1"]),
  page: number("Page", 0),
  onClickPage: () => {},
};
