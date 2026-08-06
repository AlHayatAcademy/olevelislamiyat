export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  issueDate: Date;
  score?: number;
  certificateType?: string;
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
