import { render } from '@testing-library/react';

import SessionRecords from './session-records';

describe('SessionRecords', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionRecords />);
    expect(baseElement).toBeTruthy();
  });
});
