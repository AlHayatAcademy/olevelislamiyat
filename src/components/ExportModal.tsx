'use client';

import { useState } from 'react';

type ExportFormat = 'pdf' | 'csv' | 'json' | 'xlsx';
type ExportType = 'certificate' | 'transcript' | 'analytics' | 'class-report';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat, type: ExportType, options: any) => Promise<void>;
  defaultType?: ExportType;
}

export function ExportModal({
  isOpen,
  onClose,
  onExport,
  defaultType = 'certificate',
}: ExportModalProps) {
  const [selectedTab, setSelectedTab] = useState<ExportType>(defaultType);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [includeBadges, setIncludeBadges] = useState(true);

  const formatLabels: Record<ExportFormat, string> = {
    pdf: '📄 PDF',
    csv: '📊 CSV',
    json: '{ } JSON',
    xlsx: '📈 Excel',
  };

  const typeLabels: Record<ExportType, string> = {
    certificate: '🎓 Certificate',
    transcript: '📜 Transcript',
    analytics: '📊 Analytics',
    'class-report': '📋 Class Report',
  };

  const availableFormats: Record<ExportType, ExportFormat[]> = {
    certificate: ['pdf', 'json'],
    transcript: ['pdf', 'csv', 'json'],
    analytics: ['csv', 'json', 'xlsx'],
    'class-report': ['pdf', 'csv', 'json'],
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await onExport(selectedFormat, selectedTab, {
        includeDetails,
        includeBadges,
      });
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  const formats = availableFormats[selectedTab];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Export Data
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Choose what to export and in which format
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Type Tabs */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              What to Export
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(typeLabels) as ExportType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedTab(type);
                    setSelectedFormat(availableFormats[type][0]);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedTab === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {typeLabels[type]}
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedFormat === format
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {formatLabels[format]}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Options
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDetails}
                onChange={(e) => setIncludeDetails(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Include detailed information
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeBadges}
                onChange={(e) => setIncludeBadges(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Include badges & achievements
              </span>
            </label>
          </div>

          {/* File Info */}
          <div className="bg-slate-100 dark:bg-slate-700 rounded p-3 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Format:</strong> {formatLabels[selectedFormat]}
            </p>
            <p>
              <strong>Type:</strong> {typeLabels[selectedTab]}
            </p>
            <p className="mt-1">
              Files will auto-delete after 30 days on server
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors font-bold flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <span className="animate-spin">⏳</span>
                Exporting...
              </>
            ) : (
              <>
                <span>⬇️</span>
                Export
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
