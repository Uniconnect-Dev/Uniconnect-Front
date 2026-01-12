// src/context/CampaignFormContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CampaignFormData,
  initialCampaignFormData,
} from '@/services/campaign.types';

interface CampaignFormContextType {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  updateFormData: (data: Partial<CampaignFormData>) => void;
  resetFormData: () => void;
  campaignId: number | null;
  setCampaignId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CampaignFormContext = createContext<CampaignFormContextType | undefined>(
  undefined
);

export function CampaignFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<CampaignFormData>(
    initialCampaignFormData
  );
  const [campaignId, setCampaignId] = useState<number | null>(null);

  const updateFormData = (data: Partial<CampaignFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(initialCampaignFormData);
    setCampaignId(null);
  };

  return (
    <CampaignFormContext.Provider
      value={{
        formData,
        setFormData,
        updateFormData,
        resetFormData,
        campaignId,
        setCampaignId,
      }}
    >
      {children}
    </CampaignFormContext.Provider>
  );
}

export function useCampaignForm() {
  const context = useContext(CampaignFormContext);
  if (context === undefined) {
    throw new Error(
      'useCampaignForm must be used within a CampaignFormProvider'
    );
  }
  return context;
}
