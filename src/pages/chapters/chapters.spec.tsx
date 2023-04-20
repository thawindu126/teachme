import { render } from '@testing-library/react';

import Chapters from './chapters';

describe('Chapters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Chapters />);
    expect(baseElement).toBeTruthy();
  });
});
