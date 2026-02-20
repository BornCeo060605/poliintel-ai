'use client';

import { useState, useRef } from 'react';

function Dropzone() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.name.endsWith('.csv')) {
      setFile(selected);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    try {
      // Simulate upload - in production, upload to Supabase Storage or process via API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResult({
        success: true,
        message: `${file.name} processed successfully. 156 rows imported.`,
      });
      setFile(null);
    } catch {
      setResult({
        success: false,
        message: 'Upload failed. Please check your file format.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-[12px] border-2 border-dashed border-gray-300 bg-white p-12 text-center transition-colors hover:border-gray-400"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
          📤
        </div>
        <p className="text-sm font-medium text-gray-700">
          Click to select or drag & drop CSV file here
        </p>
        <p className="mt-1 text-xs text-gray-500">or click to browse</p>
        <p className="mt-2 text-xs text-gray-400">
          Supports booth-level and constituency-level election data
        </p>
      </div>

      {file && (
        <div className="flex items-center justify-between rounded-[12px] border border-gray-200 bg-white p-4">
          <div>
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Processing...' : 'Upload'}
            </button>
          </div>
        </div>
      )}

      {result && (
        <div
          className={`rounded-[12px] border p-4 ${
            result.success
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <p
            className={
              result.success ? 'text-sm text-green-800' : 'text-sm text-red-800'
            }
          >
            {result.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Data Upload</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload booth-level or constituency-level election data in CSV format
        </p>
      </div>

      <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">
          CSV Format Requirements
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
          <li>Booth-level: booth_number, constituency, election_year, our_votes, opponent_votes, total_turnout</li>
          <li>Constituency-level: constituency_name, code, state, region</li>
          <li>First row must be headers</li>
        </ul>
      </div>

      <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
        <Dropzone />
      </div>
    </div>
  );
}
