// modeConfig.ts

interface ModeConfigProps {
  [key: string]: {
    nextPath: string;
  };
}

export const modeConfig: ModeConfigProps = {
  training: {
    nextPath: "/task",
  },
  task: {
    nextPath: "/end",
  },
  firstVisit: {
    nextPath: "/home",
  },
  repeatVisit: {
    nextPath: "/end",
  },
};
