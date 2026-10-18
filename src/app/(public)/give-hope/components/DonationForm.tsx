'use client';

import Script from 'next/script';

/**
 * The Donorbox form. Its script sizes the frame to the form's real height,
 * so it loads as soon as the page can run it, before the form says how tall
 * it is; the 900px is only the size until then.
 */
export function DonationForm() {
  return (
    <section aria-label="Donation form" className="min-w-0">
      <Script
        src="https://donorbox.org/widget.js"
        strategy="afterInteractive"
      />
      <iframe
        src="https://donorbox.org/embed/hope-begins-plant-a-hope-seed"
        title="Donation form"
        name="donorbox"
        {...{ allowpaymentrequest: 'true' }}
        seamless
        frameBorder="0"
        scrolling="no"
        height="900px"
        width="100%"
        style={{
          maxWidth: '500px',
          minWidth: '250px',
          maxHeight: 'none',
          display: 'block',
        }}
        allow="payment"
      />
    </section>
  );
}
