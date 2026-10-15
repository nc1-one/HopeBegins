'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { isCalmPage } from '@/lib/calmPages';

declare global {
  interface Window {
    BonfireChat?: (method: string, ...args: unknown[]) => void;
  }
}

export function BonfireBubbleChat() {
  const pathname = usePathname();
  // No bubble on the pages for people who are struggling right now, and
  // /hope-ai has the chat built in.
  const hideBubble = isCalmPage(pathname);

  useEffect(() => {
    const selector = [
      '[id*="bonfire" i]',
      '[class*="bonfire" i]',
      '[id*="lt-chat" i]',
      '[class*="lt-chat" i]',
      'iframe[src*="heybonfire.com"]',
    ].join(',');

    const updateBubbleVisibility = () => {
      const inlineRoot = document.getElementById('bonfire-inline');
      const elements = document.querySelectorAll<HTMLElement>(selector);

      elements.forEach((element) => {
        if (
          element.tagName === 'SCRIPT' ||
          element.id === 'bonfire-inline' ||
          element.closest('#bonfire-inline') ||
          inlineRoot?.contains(element)
        ) {
          return;
        }

        if (hideBubble) {
          if (!('bonfirePreviousDisplay' in element.dataset)) {
            element.dataset.bonfirePreviousDisplay = element.style.display;
          }
          element.style.setProperty('display', 'none', 'important');
          return;
        }

        if ('bonfirePreviousDisplay' in element.dataset) {
          element.style.display = element.dataset.bonfirePreviousDisplay ?? '';
          delete element.dataset.bonfirePreviousDisplay;
        }
      });
    };

    updateBubbleVisibility();

    if (!hideBubble) {
      window.BonfireChat?.('boot');
    }

    const observer = new MutationObserver(updateBubbleVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [hideBubble]);

  if (hideBubble) {
    return null;
  }

  return (
    <>
      <Script id="bonfire-widget-config" strategy="lazyOnload">
        {`
          window.BonfireWidgetConfig = {
            widgetId: "5cf03168-9b0d-4798-a7e0-66d9df4f4f6c"
          };
        `}
      </Script>
      <Script
        id="bonfire-widget"
        src="https://app.heybonfire.com/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
