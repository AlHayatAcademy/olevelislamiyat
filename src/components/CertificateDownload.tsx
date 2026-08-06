'use client';

import { useState } from 'react';
import { Certificate, incrementDownloadCount } from '@/lib/certificate-service';

interface CertificateDownloadProps {
  certificate: Certificate;
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
}

export function CertificateDownload({
  certificate,
  onDownloadStart,
  onDownloadComplete,
}: CertificateDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [format, setFormat] = useState<'pdf' | 'html'>('pdf');
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      onDownloadStart?.();

      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Increment download count
      await incrementDownloadCount(certificate.id);

      // Create download link
      const filename = `${certificate.studentName}_Certificate.${format === 'pdf' ? 'pdf' : 'html'}`;
      const link = document.createElement('a');
      link.href = '#'; // In production, this would be a real PDF/HTML file
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onDownloadComplete?.();
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(certificate.shareLink || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Certificate',
          text: `I earned a certificate for ${certificate.className}!`,
          url: certificate.shareLink || '',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Download Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Download Certificate
        </h3>

        <div className="space-y-4">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Format
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setFormat('pdf')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  format === 'pdf'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                📄 PDF
              </button>
              <button
                onClick={() => setFormat('html')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  format === 'html'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                🌐 HTML
              </button>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <span className="animate-spin">⏳</span>
                Downloading...
              </>
            ) : (
              <>
                <span>⬇️</span>
                Download Certificate
              </>
            )}
          </button>

          {/* File Info */}
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Downloads: {certificate.downloadCount}
          </p>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Share Certificate
        </h3>

        <div className="space-y-3">
          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={certificate.shareLink || ''}
                readOnly
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg text-sm"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {copied ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              disabled={!navigator.share}
              className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors text-sm"
            >
              🔗 Share
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificate.shareLink || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors text-sm text-center"
            >
              💼 LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(certificate.shareLink || '')}&text=I earned a certificate for ${encodeURIComponent(certificate.className)}!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm text-center"
            >
              𝕏 Tweet
            </a>
          </div>
        </div>
      </div>

      {/* Verify Section */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
          ✓ Verify Certificate
        </h3>
        <p className="text-sm text-green-800 dark:text-green-200 mb-3">
          Share this link with others to verify the authenticity of this
          certificate.
        </p>
        <p className="text-xs text-green-700 dark:text-green-300">
          Certificate Number: <strong>{certificate.certificateNumber}</strong>
        </p>
      </div>
    </div>
  );
}
