import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Wizard from '../pages/Wizard';

describe('Wizard Component', () => {
  it('Should render Step 1 initially', () => {
    render(<Wizard />);
    expect(screen.getByText('ClauseCompass Setup')).toBeDefined();
    expect(screen.getByText('Step 1: Your Role')).toBeDefined();
  });

  it('Should proceed to Step 2 on click', () => {
    render(<Wizard />);
    const nextBtn = screen.getByText('Next');
    fireEvent.click(nextBtn);
    expect(screen.getByText('Step 2: Upload Document')).toBeDefined();
  });
});
