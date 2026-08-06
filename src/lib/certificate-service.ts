import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Certificate {
  id: string;
  userId: string;
  classId: string;
  className: string;
  studentName: string;
  studentEmail: string;
  completionDate: Timestamp;
  issuanceDate: Timestamp;
  finalScore: number;
  certificateNumber: string;
  templateId: string;
  signature?: string;
  status: 'pending' | 'issued' | 'revoked';
  downloadCount: number;
  shareLink?: string;
  revocationReason?: string;
  revokedDate?: Timestamp;
}

function generateCertificateNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CERT-${timestamp}-${random}`;
}

function generateShareLink(certificateId: string): string {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://olevelislamiyat.com';
  const token = Buffer.from(certificateId).toString('base64');
  return `${baseUrl}/certificates/verify/${token}`;
}

export async function generateCertificate(
  userId: string,
  classId: string,
  className: string,
  studentName: string,
  studentEmail: string,
  finalScore: number,
  templateId: string = 'default',
  signature?: string
): Promise<Certificate> {
  try {
    const certificateId = doc(collection(db, 'certificates')).id;
    const now = Timestamp.now();
    const certificateNumber = generateCertificateNumber();

    const certificate: Certificate = {
      id: certificateId,
      userId,
      classId,
      className,
      studentName,
      studentEmail,
      completionDate: now,
      issuanceDate: now,
      finalScore,
      certificateNumber,
      templateId,
      signature,
      status: 'issued',
      downloadCount: 0,
      shareLink: generateShareLink(certificateId),
    };

    await setDoc(doc(db, 'certificates', certificateId), certificate);
    return certificate;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw error;
  }
}

export async function getUserCertificates(userId: string): Promise<Certificate[]> {
  try {
    const q = query(
      collection(db, 'certificates'),
      where('userId', '==', userId),
      where('status', '==', 'issued')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Certificate);
  } catch (error) {
    console.error('Error fetching user certificates:', error);
    throw error;
  }
}

export async function getClassCertificates(classId: string): Promise<Certificate[]> {
  try {
    const q = query(
      collection(db, 'certificates'),
      where('classId', '==', classId),
      where('status', '==', 'issued')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Certificate);
  } catch (error) {
    console.error('Error fetching class certificates:', error);
    throw error;
  }
}

export async function verifyCertificate(
  certificateId: string
): Promise<Certificate | null> {
  try {
    const docRef = doc(db, 'certificates', certificateId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? (snapshot.data() as Certificate) : null;
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return null;
  }
}

export async function revokeCertificate(
  certificateId: string,
  reason: string,
  teacherId: string
): Promise<void> {
  try {
    const docRef = doc(db, 'certificates', certificateId);
    await updateDoc(docRef, {
      status: 'revoked',
      revocationReason: reason,
      revokedDate: Timestamp.now(),
    });

    // Log revocation
    await setDoc(doc(collection(db, 'certificate_revocations')), {
      certificateId,
      teacherId,
      reason,
      revokedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error revoking certificate:', error);
    throw error;
  }
}

export async function incrementDownloadCount(certificateId: string): Promise<void> {
  try {
    const docRef = doc(db, 'certificates', certificateId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const current = (snapshot.data() as Certificate).downloadCount || 0;
      await updateDoc(docRef, {
        downloadCount: current + 1,
      });
    }
  } catch (error) {
    console.error('Error incrementing download count:', error);
  }
}

export async function logExport(
  userId: string,
  format: 'pdf' | 'csv' | 'json' | 'xlsx',
  type: 'certificate' | 'transcript' | 'analytics' | 'class-report',
  filename: string,
  fileSize: number
): Promise<void> {
  try {
    await setDoc(doc(collection(db, 'export_history')), {
      userId,
      format,
      type,
      filename,
      fileSize,
      downloadedAt: Timestamp.now(),
      ipAddress: 'N/A', // In production, use request IP
    });
  } catch (error) {
    console.error('Error logging export:', error);
  }
}

export async function getCertificateByNumber(
  certificateNumber: string
): Promise<Certificate | null> {
  try {
    const q = query(
      collection(db, 'certificates'),
      where('certificateNumber', '==', certificateNumber)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0
      ? (snapshot.docs[0].data() as Certificate)
      : null;
  } catch (error) {
    console.error('Error fetching certificate by number:', error);
    return null;
  }
}

export async function getStudentCertificateCount(userId: string): Promise<number> {
  try {
    const q = query(
      collection(db, 'certificates'),
      where('userId', '==', userId),
      where('status', '==', 'issued')
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting certificate count:', error);
    return 0;
  }
}
