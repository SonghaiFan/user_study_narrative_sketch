# TT-Graphs: An Introduction

In our study, we introduce the concept of **Theme-Time graphs (TT-graphs)**, as a method of visually representing narrative structures. Imagine a grid like a chessboard or a spreadsheet. In a TT-Graph, nodes representing story chapters are plotted on a grid. The position of a node on the grid is determined by two coordinates: the `x-coordinate` and the `y-coordinate`.

![Concept](/user_study_narrative_sketch/images/concept.png)

The `x-coordinate` (horizontal axis) represents time 📅. It's like a timeline that shows when things happen in the story. As you move from left to right along the x-axis, you're moving forward in time ➡️. Thus, each column represents a distinct timeframe.

The `y-coordinate` (vertical axis) represents different themes in the story 📚. Each row on the y-axis corresponds to a different theme. So, if a node is in the third row, for example, that means it's part of the third theme.

The color of each node also represents its theme 🌈. Each theme is assigned a different color so that all the nodes that are part of the same theme will be the same color. This makes it easy to see at a glance which parts of the story are about which themes.

By looking at the positions and colors of the nodes, you can get a sense of how the story's themes evolve over time. This can help you understand the structure of the story and how different themes are interconnected.

Links between nodes indicate that those chapters discuss common themes or entities (people, places, organizations) discussed. In the short stories we present in **TT-graphs** in this study, a path connects all chapters across timeframes.

## Characteristics

- **One-way Paths**: The lines in TT-graphs can only go from left to right, like reading a book 📖.

- **Row Swapping**: Two TT-graphs are considered the same if you can get from one to the other by just swapping rows around .

- **No Empty Timeframes Gap**: Columns (which represent certain timeframes) cannot have an empty column between them. For instance, if we think of the columns as "Past", "Present", and "Future", we can't have nodes in "Past" and "Future" without anything in the "Present" .