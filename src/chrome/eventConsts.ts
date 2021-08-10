

export const START_OAUTH = "START_OAUTH" as const;

export const StartOAuth = () => ({
  type: START_OAUTH,
});

export type Message = ReturnType<typeof StartOAuth>;
