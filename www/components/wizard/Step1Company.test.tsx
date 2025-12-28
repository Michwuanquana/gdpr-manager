/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Step1Company } from './Step1Company';
import { CompanyInfo } from '@/lib/types';

describe('Step1Company', () => {
  const mockData: CompanyInfo = {
    name: '',
    address: '',
    ico: '',
    email: '',
    web: ''
  };

  const mockOnChange = vi.fn();
  const mockOnDpoChange = vi.fn();

  it('renders all required inputs', () => {
    render(
      <Step1Company 
        data={mockData} 
        onChange={mockOnChange} 
        hasDpo={false} 
        onDpoChange={mockOnDpoChange} 
      />
    );

    expect(screen.getByLabelText(/Název firmy/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sídlo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/IČO/i)).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(
      <Step1Company 
        data={mockData} 
        onChange={mockOnChange} 
        hasDpo={false} 
        onDpoChange={mockOnDpoChange} 
      />
    );

    const nameInput = screen.getByLabelText(/Název firmy/i);
    fireEvent.change(nameInput, { target: { value: 'Moje Firma' } });

    expect(mockOnChange).toHaveBeenCalled();
    // Check if it was called with the updated object
    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Moje Firma'
    }));
  });

  it('shows DPO fields when checkbox is checked', () => {
    const { rerender } = render(
      <Step1Company 
        data={mockData} 
        onChange={mockOnChange} 
        hasDpo={false} 
        onDpoChange={mockOnDpoChange} 
      />
    );

    const dpoCheckbox = screen.getByLabelText(/Máme pověřence/i);
    fireEvent.click(dpoCheckbox);
    expect(mockOnDpoChange).toHaveBeenCalledWith(true, undefined);

    // Re-render with hasDpo=true to see fields
    rerender(
      <Step1Company 
        data={mockData} 
        onChange={mockOnChange} 
        hasDpo={true} 
        dpo={{ name: '', email: '', phone: '' }}
        onDpoChange={mockOnDpoChange} 
      />
    );

    expect(screen.getByLabelText(/Jméno DPO/i)).toBeInTheDocument();
  });
});
