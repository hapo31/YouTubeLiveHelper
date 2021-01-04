import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator } from "@storybook/react";
import addons, { mockChannel } from '@storybook/addons';

addons.setChannel(mockChannel());

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}


addDecorator(withKnobs);
