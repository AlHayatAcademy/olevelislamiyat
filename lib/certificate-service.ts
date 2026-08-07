export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  studentName: string;
  studentEmail?: string;
  issueDate: Date;
  issuanceDate?: Date;
  completionDate?: Date;
  score?: number;
  finalScore?: number;
  certificateType?: string;
  shareLink?: string;
  className?: string;
  downloadCount?: number;
  certificateNumber?: string;
  status?: string;
}

export async function generateCertificate() {
  return null;
}

export async function getCertificates() {
  return [];
}

export async function incrementDownloadCount(_certificateId: string) {
  return null;
}
