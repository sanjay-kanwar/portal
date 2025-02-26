// Step 1: Assign random weight between 7 and 10 to each sub-task
data.forEach((item) => {
  if (item.issueType === 'Sub-task') {
    item.weight = Math.floor(Math.random() * 4) + 7; // Random weight between 7 and 10
  } else {
    item.weight = 0;
  }
});

// Step 2: Create parent-child relationships (for subtasks, stories, epics, initiatives)
const parentMap: Record<string, Item[]> = {};

data.forEach((item) => {
  if (item.parent) {
    if (!parentMap[item.parent]) {
      parentMap[item.parent] = [];
    }
    parentMap[item.parent].push(item);
  }
});

// Step 3: Calculate weight percentages with the constraint for subtask percentage
data.filter((item) => item.issueType === 'Story').forEach((story) => {
  const subtasks = parentMap[story.key] || [];
  const totalSubtaskWeight = subtasks.reduce((sum, subtask) => sum + (subtask.weight || 0), 0);

  // Adjust total weight of the story based on subtask weight percentage
  const minSubtaskPercentage = 0.7;
  const maxSubtaskPercentage = 1.0;

  // Calculate story weight based on the subtask's weight percentage
  story.totalWeight = totalSubtaskWeight / minSubtaskPercentage;

  // Calculate subtask weight percentage based on the total weight
  subtasks.forEach((subtask) => {
    subtask.weightPercentage = Math.min(100, Math.max(70, (subtask.weight! / totalSubtaskWeight) * 100));
  });

  story.weightPercentage = (totalSubtaskWeight / story.totalWeight) * 100;
});

// Calculate total weights for Epics and their weight percentages
data.filter((item) => item.issueType === 'Epic').forEach((epic) => {
  const stories = parentMap[epic.key] || [];
  epic.totalWeight = stories.reduce((sum, story) => sum + (story.totalWeight || 0), 0);

  // Calculate epic weight percentage
  epic.weightPercentage = Math.min(50, Math.max(10, (epic.totalWeight / epic.weight!) * 100));
});

// Calculate total weights for Initiatives and their weight percentages
data.filter((item) => item.issueType === 'Initiative').forEach((initiative) => {
  const epics = parentMap[initiative.key] || [];
  initiative.totalWeight = epics.reduce((sum, epic) => sum + (epic.totalWeight || 0), 0);
  initiative.weightPercentage = Math.min(50, Math.max(10, (initiative.totalWeight / initiative.weight!) * 100));
});

// Output the results
data.forEach((item) => {
  if (item.issueType === 'Sub-task') {
    console.log(`Key: ${item.key}, Weight: ${item.weight}, Weight Percentage: ${item.weightPercentage}%`);
  } else if (item.issueType === 'Story' || item.issueType === 'Epic' || item.issueType === 'Initiative') {
    console.log(`Key: ${item.key}, Weight: ${item.totalWeight}, Weight Percentage: ${item.weightPercentage}%`);
  }
});
