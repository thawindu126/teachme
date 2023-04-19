import { render } from '@testing-library/react';

import Achievements from './achievements';

describe('Achievements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Achievements />);
    expect(baseElement).toBeTruthy();
  });
});
