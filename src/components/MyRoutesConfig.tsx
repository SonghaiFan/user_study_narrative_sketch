// Routes configuration
import _ from "lodash";
import SelectionTask from "./tasks/SelectionTask";
import MarkdownRenderer from "./common/MarkdownRenderer";

import train_stories from "./data/stories/combined_stories_train.json";
import stories from "./data/stories/combined_stories.json";

// use loadsash to shuffle the stories
export const train_stories_shuffle = _.shuffle(train_stories);
export const stories_shuffle = _.shuffle(stories);

export const routes = [
  {
    path: "/home",
    name: "Home",
    component: (
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/home.md"
        className="xl:w-1/2 lg:w-2/3 m-auto mt-5 p-10 px-2 sm:px-20"
      />
    ),
  },
  {
    path: "/intro",
    name: "Intro",
    component: (
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/intro.md"
        className="xl:w-1/2 lg:w-2/3 m-auto mt-5 p-10 px-2 sm:px-20"
      />
    ),
  },
  {
    path: "/motifs",
    name: "Motifs",
    component: (
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/motifs.md"
        className="lg:w-1/2 w-full m-auto mt-5 p-10 px-2 sm:px-20"
      />
    ),
  },
  {
    path: "/about",
    name: "About",
    component: (
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/about.md"
        className="xl:w-1/2 lg:w-2/3 m-auto mt-5 p-10 px-2 sm:px-20"
      />
    ),
  },
  {
    path: "/training",
    name: "Training",
    component: (
      <SelectionTask
        key="training"
        stories={train_stories_shuffle}
        mode="training"
      />
    ),
  },
  {
    path: "/task",
    name: "Task",
    component: (
      <SelectionTask key="task" stories={stories_shuffle} mode="task" />
    ),
  },
  {
    path: "/end",
    name: "End",
    component: (
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/end.md"
        className="xl:w-1/2 lg:w-2/3 m-auto mt-5 p-10 px-20"
      />
    ),
  },
];

// Why we need key for SelectionTask?
// Router v5+ doesn't remount the component if the same component is rendered on route change, the state is preserved as long as the component stays mounted. This can make it seem like state is shared if you're expecting a fresh state on every route change.
// To ensure that a fresh instance of SelectionTask with its own state is created every time you navigate to it, you should use the key prop. React's reconciliation process uses the key to determine when to create a new instance versus reusing the old one.
