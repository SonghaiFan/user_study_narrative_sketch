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
        className="lg:w-1/2 m-auto mt-5 p-10 px-2 sm:px-20"
      />
    ),
  },
  {
    path: "/about",
    name: "About",
    component: (
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/about.md"
        className="md:w-1/2 m-auto mt-5 p-10 px-20"
      />
    ),
  },
  {
    path: "/train",
    name: "Train",
    component: <SelectionTask stories={train_stories_shuffle} mode="train" />,
  },
  {
    path: "/task",
    name: "Task",
    component: <SelectionTask stories={stories_shuffle} mode="task" />,
  },
  {
    path: "/end",
    name: "End",
    component: (
      <MarkdownRenderer
        path="/user_study_narrative_sketch/markdown/end.md"
        className="md:w-1/2 m-auto mt-5 p-10 px-20"
      />
    ),
  },
];
