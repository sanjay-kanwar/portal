// Assign random weights to sub-tasks
const weights: Record<string, number> = {};
issues.forEach((issue) => {
  if (issue.issueType === "Sub-task") {
    weights[issue.key] = Math.floor(Math.random() * 10) + 1;
  }
});

// Aggregate weights up the hierarchy
const aggregatedWeights: Record<string, number> = {};
issues.forEach((issue) => {
  aggregatedWeights[issue.key] = weights[issue.key] || 0;
});

issues.forEach((issue) => {
  if (issue.parent) {
    aggregatedWeights[issue.parent] = (aggregatedWeights[issue.parent] || 0) + aggregatedWeights[issue.key];
  }
});

// Compute weight percentages
const percentages: Record<string, number> = {};
issues.forEach((issue) => {
  if (issue.parent && aggregatedWeights[issue.parent]) {
    percentages[issue.key] = (aggregatedWeights[issue.key] / aggregatedWeights[issue.parent]) * 100;
  } else {
    percentages[issue.key] = 100; // Top-level items
  }
});

// Output the results
console.log(
  issues.map((issue) => ({
    key: issue.key,
    issueType: issue.issueType,
    weight: aggregatedWeights[issue.key],
    percentage: percentages[issue.key].toFixed(2) + "%",
  }))
);
