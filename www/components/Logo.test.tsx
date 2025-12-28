/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Logo from '@/components/Logo'

describe('Logo', () => {
  it('renders the logo svg correctly', () => {
    const { container } = render(<Logo />)
    const svgElement = container.querySelector('svg')
    expect(svgElement).toBeInTheDocument()
  })
})
