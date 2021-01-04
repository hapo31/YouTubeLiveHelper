module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-storysource",
    "@storybook/addon-actions"
  ],
  reactOptions: {
    fastRefresh: true,
  }
}
