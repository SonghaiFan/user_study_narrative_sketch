import ArchSketch from "/images/motifs/Arch.png";
import LadderSketch from "/images/motifs/Ladder.png";
import LinearSketch from "/images/motifs/Linear.png";
import LongForkSketch from "/images/motifs/LongFork.png";
import SharpBranchSketch from "/images/motifs/SharpBranch.png";
import ShortForkSketch from "/images/motifs/ShortFork.png";
import WideBranchSketch from "/images/motifs/WideBranch.png";
import WideMergeSketch from "/images/motifs/WideMerge.png";
import SharpMergeSketch from "/images/motifs/SharpMerge.png";
import RetainSketch from "/images/motifs/Retain.png";
import ShiftSketch from "/images/motifs/Shift.png";

const taskOptions = {
  Linear: LinearSketch,
  Arch: ArchSketch,
  Ladder: LadderSketch,
  LongFork: LongForkSketch,
  SharpBranch: SharpBranchSketch,
  WideBranch: WideBranchSketch,
  ShortFork: ShortForkSketch,
  SharpMerge: SharpMergeSketch,
  WideMerge: WideMergeSketch,
};

const trainOptions = {
  Retain: RetainSketch,
  Shift: ShiftSketch,
};

export { taskOptions, trainOptions };
