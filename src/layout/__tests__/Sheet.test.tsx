import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MySheet from '../Sheet'; // Adjust the import path based on your structure

jest.mock('../lib/Colors', () => {
  return function DummyColors() {
    return <div>Colors Component</div>;
  };
});

const dummyChildren = <div>Dummy Children</div>; // Create dummy children to pass to MySheet

describe('MySheet', () => {
  it('initially displays a loading state', () => {
    const { getByText } = render(<MySheet>{dummyChildren}</MySheet>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('toggles Sheet when the Menu is clicked', async () => {
    // Pass dummy children here as well
    const { getByRole, queryByRole } = render(<MySheet>{dummyChildren}</MySheet>);
    const menuButton = getByRole('button', { name: /menu/i });

    fireEvent.click(menuButton);
    await waitFor(() => expect(queryByRole('dialog', { name: /sheetcontent/i })).toBeVisible());

    fireEvent.click(menuButton);
    await waitFor(() => expect(queryByRole('dialog', { name: /sheetcontent/i })).not.toBeVisible());
  });

  it('toggles Drawer when the Palette is clicked', async () => {
    // And here as well
    const { getByRole, queryByRole } = render(<MySheet>{dummyChildren}</MySheet>);
    const paletteButton = getByRole('button', { name: /palette/i });

    fireEvent.click(paletteButton);
    await waitFor(() => expect(queryByRole('dialog', { name: /drawercontent/i })).toBeVisible());

    fireEvent.click(paletteButton);
    await waitFor(() => expect(queryByRole('dialog', { name: /drawercontent/i })).not.toBeVisible());
  });

  it('renders children inside the MySheet component', () => {
    const childText = 'Child Content';
    // And ensure children are passed here as initially intended
    const { getByText } = render(<MySheet>{childText}</MySheet>);

    // Use waitFor with an async function
    waitFor(async () => expect(getByText(childText)).toBeInTheDocument());
  });
});
