import { StudentAnalytics, ClassAnalytics, QuizAnalyticsRecord } from "./analytics-service";

// Export student analytics to CSV
export function exportStudentAnalyticsCSV(analytics: StudentAnalytics): string {
  const rows = [
    ["Student Analytics Report"],
    [],
    ["Metric", "Value"],
    ["Total Quizzes", analytics.totalQuizzes],
    ["Average Score", `${analytics.averageScore}%`],
    ["Highest Score", `${analytics.highestScore}%`],
    ["Lowest Score", `${analytics.lowestScore}%`],
    ["Total Time Spent", `${Math.round(analytics.totalTimeSpent / 60)} minutes`],
    ["Quizzes This Week", analytics.quizzesThisWeek],
    ["Score This Week", `${analytics.scoreThisWeek}%`],
    ["Engagement Score", `${analytics.engagementScore}%`],
    ["Topics Started", analytics.topicsStarted],
    ["Topics Completed", analytics.topicsCompleted],
    ["Current Streak", `${analytics.currentStreak} days`],
    ["Last Active", analytics.lastActiveDate?.toLocaleDateString() || "N/A"],
  ];

  return rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
}

// Export class analytics to CSV
export function exportClassAnalyticsCSV(analytics: ClassAnalytics): string {
  const rows = [
    ["Class Analytics Report"],
    [`Class: ${analytics.className}`],
    [],
    ["Metric", "Value"],
    ["Total Students", analytics.totalStudents],
    ["Average Score", `${analytics.averageScore}%`],
    ["Completion Rate", `${analytics.completionRate}%`],
    ["Engagement Rate", `${analytics.engagementRate}%`],
    [],
    ["Top Performers"],
    ["Name", "Score"],
    ...analytics.topPerformers.map((p) => [p.name, `${p.score}%`]),
    [],
    ["Needs Support"],
    ["Name", "Score"],
    ...analytics.needsSupport.map((p) => [p.name, `${p.score}%`]),
    [],
    ["Weak Topics"],
    ["Topic", "Average Score"],
    ...analytics.commonWeakTopics.map((t) => [t.topic, `${t.percentage}%`]),
  ];

  return rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
}

// Export quiz attempts to CSV
export function exportQuizAttemptsCSV(
  attempts: QuizAnalyticsRecord[],
): string {
  const headers = [
    "Date",
    "Quiz",
    "Score",
    "Percentage",
    "Time Spent (min)",
    "Attempt #",
  ];

  const rows = [
    headers,
    ...attempts.map((a) => [
      a.timestamp?.toDate?.()?.toLocaleDateString() || "N/A",
      a.quizTitle,
      `${a.score}/${a.maxScore}`,
      `${a.percentage}%`,
      Math.round(a.timeSpent / 60),
      a.attemptNumber,
    ]),
  ];

  return rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
}

// Generate student progress report (HTML)
export function generateStudentReportHTML(
  studentName: string,
  analytics: StudentAnalytics,
  attempts: QuizAnalyticsRecord[],
): string {
  const lastAttempt =
    attempts.length > 0
      ? attempts[0]
      : {
          timestamp: null,
          quizTitle: "N/A",
          percentage: 0,
        };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
    .header { border-bottom: 3px solid #3b82f6; margin-bottom: 20px; padding-bottom: 10px; }
    .header h1 { margin: 0; color: #1f2937; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
    .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .metric { background: #f9fafb; padding: 10px; border-left: 4px solid #3b82f6; }
    .metric-label { font-size: 12px; color: #6b7280; }
    .metric-value { font-size: 24px; font-weight: bold; color: #1f2937; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: bold; }
    .score-high { color: #059669; }
    .score-low { color: #dc2626; }
    .score-medium { color: #f59e0b; }
    .footer { margin-top: 40px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Student Progress Report</h1>
    <p>Student: ${studentName}</p>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>

  <div class="section">
    <h2>Summary Statistics</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-label">Total Quizzes</div>
        <div class="metric-value">${analytics.totalQuizzes}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Average Score</div>
        <div class="metric-value ${
          analytics.averageScore >= 70
            ? "score-high"
            : analytics.averageScore >= 50
              ? "score-medium"
              : "score-low"
        }">${analytics.averageScore}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Topics Completed</div>
        <div class="metric-value">${analytics.topicsCompleted}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Current Streak</div>
        <div class="metric-value">${analytics.currentStreak} days</div>
      </div>
      <div class="metric">
        <div class="metric-label">Engagement Score</div>
        <div class="metric-value">${analytics.engagementScore}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Study Time</div>
        <div class="metric-value">${Math.round(analytics.totalTimeSpent / 60)}h</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Recent Activity</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Quiz</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        ${attempts
          .slice(0, 10)
          .map(
            (a) => `
          <tr>
            <td>${a.timestamp?.toDate?.()?.toLocaleDateString() || "N/A"}</td>
            <td>${a.quizTitle}</td>
            <td class="${a.percentage >= 70 ? "score-high" : a.percentage >= 50 ? "score-medium" : "score-low"}">
              ${a.percentage}%
            </td>
            <td>${Math.round(a.timeSpent / 60)} min</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Observations</h2>
    <ul>
      ${
        analytics.averageScore >= 80
          ? "<li>✓ Excellent performance - keep up the great work!</li>"
          : ""
      }
      ${
        analytics.topicsCompleted >= 5
          ? "<li>✓ Strong topic completion rate</li>"
          : ""
      }
      ${
        analytics.currentStreak >= 7
          ? "<li>✓ Consistent study habits - great dedication!</li>"
          : ""
      }
      ${
        analytics.averageScore < 60
          ? "<li>⚠ Focus on strengthening weak areas</li>"
          : ""
      }
      ${
        analytics.topicsStarted > analytics.topicsCompleted * 2
          ? "<li>💡 Tip: Aim to complete more topics before starting new ones</li>"
          : ""
      }
    </ul>
  </div>

  <div class="footer">
    <p>This report was generated by O Level Islamiyat Analytics System</p>
    <p>For more details, visit your student dashboard</p>
  </div>
</body>
</html>
  `;
}

// Generate class progress report (HTML)
export function generateClassReportHTML(
  analytics: ClassAnalytics,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
    .header { border-bottom: 3px solid #3b82f6; margin-bottom: 20px; padding-bottom: 10px; }
    .header h1 { margin: 0; color: #1f2937; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
    .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .metric { background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px; }
    .metric-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
    .metric-value { font-size: 28px; font-weight: bold; color: #1f2937; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Class Progress Report</h1>
    <p>Class: ${analytics.className}</p>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>

  <div class="section">
    <h2>Class Overview</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-label">Total Students</div>
        <div class="metric-value">${analytics.totalStudents}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Class Average</div>
        <div class="metric-value">${analytics.averageScore}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Completion Rate</div>
        <div class="metric-value">${analytics.completionRate}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Engagement Rate</div>
        <div class="metric-value">${analytics.engagementRate}%</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Top Performers</h2>
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Average Score</th>
        </tr>
      </thead>
      <tbody>
        ${analytics.topPerformers
          .map(
            (p) => `
          <tr>
            <td>${p.name}</td>
            <td>${p.score}%</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Students Needing Support</h2>
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Average Score</th>
        </tr>
      </thead>
      <tbody>
        ${analytics.needsSupport
          .map(
            (p) => `
          <tr>
            <td>${p.name}</td>
            <td>${p.score}%</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Weak Topics</h2>
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Class Average</th>
        </tr>
      </thead>
      <tbody>
        ${analytics.commonWeakTopics
          .map(
            (t) => `
          <tr>
            <td>${t.topic}</td>
            <td>${t.percentage}%</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="footer">
    <p>Generated by O Level Islamiyat Analytics System</p>
  </div>
</body>
</html>
  `;
}

// Download file helper
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = "text/plain",
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
