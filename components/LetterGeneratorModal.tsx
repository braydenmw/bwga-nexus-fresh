

import React, { useState, useEffect, useCallback } from 'react';
import useEscapeKey from '../hooks/useEscapeKey.ts';
import { CloseIcon, LetterIcon } from './Icons.tsx';
import Spinner from './Spinner.tsx';

interface LetterGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => Promise<string>;
}

export const LetterGeneratorModal: React.FC<LetterGeneratorModalProps> = ({ isOpen, onClose, onGenerate }) => {
  useEscapeKey(onClose);
  const [letterContent, setLetterContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleGenerate = useCallback(async () => {
      setIsGenerating(true);
      setError(null);
      setLetterContent('');
      setCopySuccess('');
      try {
        const content = await onGenerate();
        setLetterContent(content);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to generate letter: ${errorMessage}`);
        console.error(e);
      } finally {
        setIsGenerating(false);
      }
  }, [onGenerate]);
  
  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen, handleGenerate]);
  
  const handleCopyToClipboard = () => {
    if (!letterContent) return;
    navigator.clipboard.writeText(letterContent).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, (err) => {
      setCopySuccess('Failed to copy.');
      console.error('Could not copy text: ', err);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="bg-gradient-to-br from-nexus-surface-800 to-nexus-primary-800 border border-nexus-border-medium rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 flex justify-between items-center border-b border-nexus-border-medium flex-shrink-0">
          <div className="flex items-center gap-3">
            <LetterIcon className="w-8 h-8 text-nexus-accent-emerald" />
            <div>
              <h2 className="text-xl font-bold text-nexus-text-primary">Outreach Letter Generator</h2>
              <p className="text-sm text-nexus-text-secondary">AI-drafted introductory letter</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-nexus-text-secondary hover:text-white"><CloseIcon className="w-6 h-6"/></button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          {isGenerating && (
            <div className="flex flex-col items-center justify-center h-full text-nexus-text-secondary">
              <Spinner />
              <p className="mt-4">Drafting outreach letter...</p>
            </div>
          )}
          {error && (
            <div className="p-4 bg-nexus-error/20 border border-nexus-error text-nexus-error rounded-lg">
                <p className="font-bold">An error occurred</p>
                <p className="text-sm">{error}</p>
            </div>
          )}
          {!isGenerating && !error && letterContent && (
            <textarea
                readOnly
                value={letterContent}
                className="w-full h-full p-4 bg-nexus-primary-900 border border-nexus-border-medium rounded-lg text-nexus-text-secondary font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-nexus-accent-brown"
                placeholder="Letter content will appear here..."
            />
          )}
        </main>

        <footer className="p-4 border-t border-nexus-border-medium flex-shrink-0 flex justify-end items-center gap-4">
            {copySuccess && <span className="text-sm text-nexus-accent-emerald">{copySuccess}</span>}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="nexus-button-secondary"
            >
              Regenerate
            </button>
            <button
              onClick={handleCopyToClipboard}
              disabled={isGenerating || !!error || !letterContent}
              className="nexus-button-primary"
            >
              Copy to Clipboard
            </button>
        </footer>
      </div>
    </div>
  );
};