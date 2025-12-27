'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Heart, Archive } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void;
  actionText?: string;
  isLoading?: boolean;
  title: string;
  description: React.ReactNode;
}

export function DonateModal({
  isOpen,
  onClose,
  onAction,
  actionText = 'Zavřít',
  isLoading = false,
  title,
  description,
}: DonateModalProps) {
  const [donateAmount, setDonateAmount] = useState(200);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQrCode = (amount: number) => {
    const qrData = `SPD*1.0*ACC:CZ2530300000003370617044*RN:ADAM%20PORYBNY*AM:${amount}.0*CC:CZK`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrData)}`;
  };

  const handleAmountChange = (value: number) => {
    setDonateAmount(value);
    setQrCodeUrl(generateQrCode(value));
  };

  useEffect(() => {
    if (isOpen) {
      setQrCodeUrl(generateQrCode(donateAmount));
    }
  }, [isOpen, donateAmount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full p-6 md:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Levý sloupec - text */}
          <div className="text-gray-600 space-y-4">
            {description}
          </div>
          
          {/* Pravý sloupec - platba */}
          <div className="bg-gray-50 rounded-xl p-5 text-center flex flex-col justify-center">
            <p className="text-sm text-gray-500 mb-3">Naskenujte QR kód pro přispění</p>
            <div className="inline-block bg-white p-3 rounded-lg shadow-sm mx-auto">
              <Image 
                src={qrCodeUrl}
                alt="QR kód pro platbu"
                width={140}
                height={140}
                className="mx-auto"
                unoptimized
                key={qrCodeUrl}
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-800 mb-2">{donateAmount} Kč</p>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={donateAmount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>50 Kč</span>
                <span>500 Kč</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Nebo kolik uznáte za vhodné 🙏
            </p>
          </div>
        </div>
        
        {onAction && (
          <button
            onClick={onAction}
            disabled={isLoading}
            className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Připravuji dokumenty...
              </>
            ) : (
              <>
                {actionText.includes('ZIP') && <Archive className="w-5 h-5" />}
                {actionText}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
