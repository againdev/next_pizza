"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="3139db67f35918c6d522a37c7e612ccbaa145231"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
