import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from '../../app/components/figma/ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders an img element with the provided src and alt', () => {
    render(<ImageWithFallback src="photo.jpg" alt="A photo" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'photo.jpg');
    expect(img).toHaveAttribute('alt', 'A photo');
  });

  it('passes through extra HTML image attributes', () => {
    render(<ImageWithFallback src="photo.jpg" alt="test" width={200} height={100} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '200');
    expect(img).toHaveAttribute('height', '100');
  });

  it('shows the fallback image on error', () => {
    render(<ImageWithFallback src="broken.jpg" alt="Broken" />);
    fireEvent.error(screen.getByRole('img'));
    const fallbackImg = screen.getByAltText('Error loading image');
    expect(fallbackImg).toBeInTheDocument();
  });

  it('wraps the fallback in a div with "image-fallback" class', () => {
    const { container } = render(<ImageWithFallback src="broken.jpg" alt="Broken" />);
    fireEvent.error(screen.getByRole('img'));
    expect(container.querySelector('.image-fallback')).toBeInTheDocument();
  });

  it('stores the original src on the fallback img via data-original-url', () => {
    render(<ImageWithFallback src="broken.jpg" alt="Broken" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByAltText('Error loading image')).toHaveAttribute(
      'data-original-url',
      'broken.jpg'
    );
  });

  it('appends the className to the fallback wrapper', () => {
    const { container } = render(
      <ImageWithFallback src="broken.jpg" alt="Broken" className="my-class" />
    );
    fireEvent.error(screen.getByRole('img'));
    expect(container.querySelector('.image-fallback.my-class')).toBeInTheDocument();
  });

  it('does not show the fallback when the image loads successfully', () => {
    render(<ImageWithFallback src="valid.jpg" alt="Valid" />);
    // No error fired — original img should still be present
    expect(screen.getByAltText('Valid')).toBeInTheDocument();
    expect(screen.queryByAltText('Error loading image')).toBeNull();
  });
});
