import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  const renderFooter = () =>
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

  it('renders brand logo, description, and contact details correctly', () => {
    renderFooter();

    // Brand logo link & text
    expect(screen.getByRole('link', { name: /mindplanai home/i })).toHaveAttribute('href', '/');
    expect(
      screen.getByText(/mindplanai helps you organize tasks, notes, goals/i)
    ).toBeInTheDocument();

    // Contact info links
    const emailLink = screen.getByRole('link', { name: /support@mindplanai.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:support@mindplanai.com');

    const phoneLink = screen.getByRole('link', { name: /\+92 300 1234567/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+923001234567');

    expect(screen.getByText('Pakistan')).toBeInTheDocument();
  });

  it('renders navigation column headers and route links', () => {
    renderFooter();

    // Section Headers
    expect(screen.getByRole('heading', { level: 3, name: 'Product' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Company' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Support' })).toBeInTheDocument();

    // Internal navigation links
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Blogs' })).toHaveAttribute('href', '/blogs');
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about');

    // Duplicate links rendered in multiple columns
    const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' });
    expect(privacyLinks).toHaveLength(2);
    expect(privacyLinks[0]).toHaveAttribute('href', '/privacy-policy');

    const termsLinks = screen.getAllByRole('link', { name: 'Terms & Conditions' });
    expect(termsLinks).toHaveLength(2);
    expect(termsLinks[0]).toHaveAttribute('href', '/terms');
  });

  it('displays the dynamic current year in copyright text', () => {
    renderFooter();

    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} MindPlanAI. All rights reserved.`, 'i'))
    ).toBeInTheDocument();
  });

  it('renders external social media links with security attributes', () => {
    renderFooter();

    const socialPlatforms = [
      { name: 'Facebook', url: 'https://facebook.com' },
      { name: 'Instagram', url: 'https://instagram.com' },
      { name: 'LinkedIn', url: 'https://linkedin.com' },
      { name: 'GitHub', url: 'https://github.com' },
    ];

    socialPlatforms.forEach(({ name, url }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });
});