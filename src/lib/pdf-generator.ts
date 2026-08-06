// PDF generation utilities (requires jspdf and html2canvas)
// Install: npm install jspdf html2canvas

import { StudentAnalytics, QuizAnalyticsRecord } from './analytics-service';

interface CertificateData {
  studentName: string;
  className: string;
  finalScore: number;
  completionDate: Date;
  certificateNumber: string;
  signature?: string;
}

interface TranscriptData {
  studentName: string;
  className: string;
  studentId: string;
  attempts: QuizAnalyticsRecord[];
  analytics: StudentAnalytics;
}

export function generateCertificateHTML(data: CertificateData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Georgia, serif;
      background: white;
    }
    .certificate {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px;
      border: 8px solid #2d3748;
      background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header {
      margin-bottom: 30px;
    }
    .logo {
      font-size: 36px;
      color: #3b82f6;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .title {
      font-size: 48px;
      color: #1f2937;
      font-weight: bold;
      margin: 20px 0;
    }
    .subtitle {
      font-size: 18px;
      color: #6b7280;
      margin-bottom: 40px;
    }
    .content {
      margin: 50px 0;
    }
    .label {
      font-size: 14px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 5px;
    }
    .student-name {
      font-size: 36px;
      color: #1f2937;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .course {
      font-size: 20px;
      color: #374151;
      margin-bottom: 30px;
    }
    .score {
      font-size: 24px;
      color: #059669;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .date {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 40px;
    }
    .signature-section {
      display: flex;
      justify-content: space-around;
      margin-top: 60px;
      padding-top: 40px;
      border-top: 1px solid #d1d5db;
    }
    .signature-box {
      text-align: center;
      width: 30%;
    }
    .signature-line {
      height: 2px;
      background: #1f2937;
      margin-bottom: 5px;
    }
    .signature-name {
      font-size: 12px;
      color: #6b7280;
    }
    .certificate-number {
      position: absolute;
      bottom: 20px;
      right: 40px;
      font-size: 10px;
      color: #9ca3af;
    }
    .qr-code {
      margin-top: 30px;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="logo">O Level Islamiyat</div>
      <div class="title">Certificate of Completion</div>
    </div>

    <div class="content">
      <div class="label">This certifies that</div>
      <div class="student-name">${data.studentName}</div>

      <div class="label">has successfully completed the course</div>
      <div class="course">${data.className}</div>

      <div class="label">with a final score of</div>
      <div class="score">${data.finalScore}%</div>

      <div class="date">
        Completed on ${data.completionDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>

    <div class="signature-section">
      <div class="signature-box">
        <div class="signature-line"></div>
        <div class="signature-name">Teacher Signature</div>
      </div>
      <div class="signature-box">
        <div class="signature-line"></div>
        <div class="signature-name">School Stamp</div>
      </div>
      <div class="signature-box">
        <div class="signature-line"></div>
        <div class="signature-name">Date</div>
      </div>
    </div>

    <div class="certificate-number">
      Certificate #${data.certificateNumber}
    </div>

    <div class="qr-code">
      Verify this certificate at: olevelislamiyat.com/verify/${data.certificateNumber}
    </div>
  </div>
</body>
</html>
  `;
}

export function generateTranscriptHTML(data: TranscriptData): string {
  const topicScores: { [key: string]: number[] } = {};

  data.attempts.forEach((attempt) => {
    const topic = attempt.topic || 'General';
    if (!topicScores[topic]) {
      topicScores[topic] = [];
    }
    topicScores[topic].push(attempt.percentage);
  });

  const topicSummary = Object.entries(topicScores)
    .map(([topic, scores]) => {
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return `
      <tr>
        <td>${topic}</td>
        <td>${scores.length}</td>
        <td>${avg}%</td>
        <td>${Math.min(...scores)}%</td>
        <td>${Math.max(...scores)}%</td>
      </tr>
    `;
    })
    .join('');

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
    .metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
    .metric { background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px; }
    .metric-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
    .metric-value { font-size: 24px; font-weight: bold; color: #1f2937; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: bold; }
    .footer { margin-top: 40px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Student Academic Transcript</h1>
    <p>Student: ${data.studentName} | ID: ${data.studentId}</p>
    <p>Course: ${data.className} | Generated: ${new Date().toLocaleDateString()}</p>
  </div>

  <div class="section">
    <h2>Summary</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-label">Total Quizzes</div>
        <div class="metric-value">${data.analytics.totalQuizzes}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Average Score</div>
        <div class="metric-value">${data.analytics.averageScore}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Highest Score</div>
        <div class="metric-value">${data.analytics.highestScore}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">GPA</div>
        <div class="metric-value">${(data.analytics.averageScore / 20).toFixed(2)}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Topic Performance</h2>
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Attempts</th>
          <th>Average</th>
          <th>Lowest</th>
          <th>Highest</th>
        </tr>
      </thead>
      <tbody>
        ${topicSummary}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Recent Quiz Attempts</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Quiz</th>
          <th>Score</th>
          <th>Time (min)</th>
        </tr>
      </thead>
      <tbody>
        ${data.attempts
          .slice(0, 20)
          .map(
            (a) => `
          <tr>
            <td>${a.timestamp?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
            <td>${a.quizTitle}</td>
            <td>${a.percentage}%</td>
            <td>${Math.round(a.timeSpent / 60)}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <div class="footer">
    <p>This transcript is an official record of student performance.</p>
    <p>For questions, please contact the school administration.</p>
  </div>
</body>
</html>
  `;
}

export function generateProgressReportHTML(
  studentName: string,
  analytics: StudentAnalytics,
  attempts: QuizAnalyticsRecord[]
): string {
  // Calculate trends
  const lastWeekAttempts = attempts.filter((a) => {
    const attemptDate = a.timestamp?.toDate?.() || new Date();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return attemptDate > weekAgo;
  });

  const lastWeekAvg =
    lastWeekAttempts.length > 0
      ? Math.round(
          lastWeekAttempts.reduce((sum, a) => sum + a.percentage, 0) /
            lastWeekAttempts.length
        )
      : 0;

  const trendArrow =
    lastWeekAvg > analytics.averageScore
      ? '📈 Improving'
      : lastWeekAvg < analytics.averageScore
        ? '📉 Declining'
        : '➡️ Stable';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
    .header { border-bottom: 3px solid #3b82f6; margin-bottom: 20px; padding-bottom: 10px; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
    .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .metric { background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px; }
    .metric-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
    .metric-value { font-size: 24px; font-weight: bold; color: #1f2937; margin-top: 5px; }
    .insight { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; margin-bottom: 10px; border-radius: 4px; }
    .insight-title { font-weight: bold; color: #1e40af; }
    .footer { margin-top: 40px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Learning Progress Report</h1>
    <p>Student: ${studentName}</p>
    <p>Report Date: ${new Date().toLocaleDateString()}</p>
  </div>

  <div class="section">
    <h2>Overall Performance</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-label">Overall Average</div>
        <div class="metric-value">${analytics.averageScore}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Last 7 Days Avg</div>
        <div class="metric-value">${lastWeekAvg}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Trend</div>
        <div class="metric-value">${trendArrow}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Study Streak</div>
        <div class="metric-value">${analytics.currentStreak} days</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Strengths</h2>
    ${
      analytics.averageScore >= 80
        ? '<div class="insight"><div class="insight-title">✓ Excellent Performance</div>Student demonstrates strong understanding of course material.</div>'
        : ''
    }
    ${
      analytics.topicsCompleted >= 5
        ? '<div class="insight"><div class="insight-title">✓ Strong Progress</div>Good completion rate across multiple topics.</div>'
        : ''
    }
    ${
      analytics.currentStreak >= 7
        ? '<div class="insight"><div class="insight-title">✓ Consistent Effort</div>Excellent study habits and dedication.</div>'
        : ''
    }
  </div>

  <div class="section">
    <h2>Areas for Improvement</h2>
    ${
      analytics.averageScore < 60
        ? '<div class="insight"><div class="insight-title">⚠ Lower Scores</div>Focus on reviewing fundamental concepts and practicing more.</div>'
        : ''
    }
    ${
      analytics.topicsStarted > analytics.topicsCompleted * 2
        ? '<div class="insight"><div class="insight-title">💡 Topic Completion</div>Complete started topics before beginning new ones.</div>'
        : ''
    }
    ${
      analytics.engagementScore < 50
        ? '<div class="insight"><div class="insight-title">📚 Engagement</div>Increase study frequency and consistency for better results.</div>'
        : ''
    }
  </div>

  <div class="section">
    <h2>Recommendations</h2>
    <ul>
      <li>Review topics with scores below 70%</li>
      <li>Practice weak areas 2-3 times per week</li>
      <li>Maintain current study streak by practicing daily</li>
      <li>Ask teacher for additional support on challenging topics</li>
      <li>Use spaced repetition technique for better retention</li>
    </ul>
  </div>

  <div class="footer">
    <p>This report is based on quiz performance data and is intended to guide learning.</p>
    <p>For detailed academic counseling, please speak with your instructor.</p>
  </div>
</body>
</html>
  `;
}

export async function downloadPDF(
  htmlContent: string,
  filename: string
): Promise<void> {
  try {
    // For server-side generation, use a library like html-pdf
    // For client-side, use html2canvas + jspdf
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}

export async function generateAndDownloadCertificate(
  data: CertificateData,
  format: 'print' | 'digital' = 'digital'
): Promise<void> {
  const html = generateCertificateHTML(data);
  const filename = `${data.studentName}_Certificate_${Date.now()}.html`;
  await downloadPDF(html, filename);
}

export async function generateAndDownloadTranscript(
  data: TranscriptData
): Promise<void> {
  const html = generateTranscriptHTML(data);
  const filename = `${data.studentName}_Transcript_${Date.now()}.html`;
  await downloadPDF(html, filename);
}

export async function generateAndDownloadProgressReport(
  studentName: string,
  analytics: StudentAnalytics,
  attempts: QuizAnalyticsRecord[]
): Promise<void> {
  const html = generateProgressReportHTML(studentName, analytics, attempts);
  const filename = `${studentName}_ProgressReport_${Date.now()}.html`;
  await downloadPDF(html, filename);
}
