// modeConfig.ts

interface ModeConfigProps {
  [key: string]: {
    nextPath: string;
    // ...other properties...
  };
}

export const modeConfig: ModeConfigProps = {
  train: {
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
  }
};
