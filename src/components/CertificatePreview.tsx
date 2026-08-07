'use client';

import { useState } from 'react';
import { Certificate } from '@/lib/certificate-service';

interface CertificatePreviewProps {
  certificate: Certificate;
  onShare?: () => void;
  onDownload?: () => void;
}

export function CertificatePreview({
  certificate,
  onShare,
  onDownload,
}: CertificatePreviewProps) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Print Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-12 mb-6 border-2 border-slate-200 dark:border-slate-700">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .certificate-container { box-shadow: none; border: none; }
          }
        `}</style>

        <div className="certificate-container text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              O Level Islamiyat
            </div>
            <div className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Certificate of Completion
            </div>
          </div>

          {/* Content */}
          <div className="my-12 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                This certifies that
              </p>
              <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                {certificate.studentName}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                has successfully completed the course
              </p>
              <p className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                {certificate.className}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                with a final score of
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {certificate.finalScore}%
              </p>
            </div>

            <div className="text-slate-600 dark:text-slate-400">
              Completed on{' '}
              <strong>
                {certificate.completionDate?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </strong>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-16 pt-8 border-t-2 border-slate-300 dark:border-slate-600">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 border-b-2 border-slate-800 dark:border-slate-100 mb-2"></div>
                <p className="text-xs uppercase text-slate-600 dark:text-slate-400">
                  Teacher
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 border-b-2 border-slate-800 dark:border-slate-100 mb-2"></div>
                <p className="text-xs uppercase text-slate-600 dark:text-slate-400">
                  School Seal
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 border-b-2 border-slate-800 dark:border-slate-100 mb-2"></div>
                <p className="text-xs uppercase text-slate-600 dark:text-slate-400">
                  Date
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Number */}
          <div className="mt-8 text-xs text-slate-500 dark:text-slate-400">
            Certificate #{certificate.certificateNumber}
          </div>

          {/* QR Code Section */}
          {showQR && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Verify at:
              </p>
              <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all">
                {certificate.shareLink}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap no-print">
        <button
          onClick={() => setShowQR(!showQR)}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
        >
          {showQR ? '✓ Hide' : '📱'} QR Code
        </button>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
        >
          🖨️ Print
        </button>

        <button
          onClick={onDownload}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          ⬇️ Download PDF
        </button>

        <button
          onClick={onShare}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          🔗 Share
        </button>
      </div>

      {/* Certificate Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 no-print">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Certificate Details
        </h3>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-blue-700 dark:text-blue-300 font-medium">
              Status:
            </dt>
            <dd className="text-blue-600 dark:text-blue-400">
              <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-semibold">
                {certificate.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-blue-700 dark:text-blue-300 font-medium">
              Email:
            </dt>
            <dd className="text-blue-600 dark:text-blue-400">
              {certificate.studentEmail}
            </dd>
          </div>
          <div>
            <dt className="text-blue-700 dark:text-blue-300 font-medium">
              Issued:
            </dt>
            <dd className="text-blue-600 dark:text-blue-400">
              {certificate.issuanceDate?.toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-blue-700 dark:text-blue-300 font-medium">
              Downloads:
            </dt>
            <dd className="text-blue-600 dark:text-blue-400">
              {certificate.downloadCount}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
