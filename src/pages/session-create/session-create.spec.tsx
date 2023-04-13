import { render } from '@testing-library/react';

import SessionCreate from './session-create';

describe('SessionCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionCreate />);
    expect(baseElement).toBeTruthy();
  });
});
