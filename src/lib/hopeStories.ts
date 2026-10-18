import type { StaticImageData } from 'next/image';

import LyzaImg from '@/assets/images/Testimonial/Lyza.jpg';
import IsabelleImg from '@/assets/images/Testimonial/Isabelle.jpg';
import JeremyImg from '@/assets/images/Testimonial/Jeremy.jpg';

/** A story from someone who used HopeBegins, in their own words. */
export interface Testimonial {
  id: number | string;
  content: string;
  /** A line from the story, in the person's own words, shown first. */
  excerpt?: string;
  name: string;
  role?: string;
  avatar: string | StaticImageData; // URL for the avatar image
}

/** The stories the site started with, shown until ones sent in are approved. */
export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    excerpt:
      'Through this program, I learned how to properly audit my thoughts, be more mindful of the lies I convince myself with and replace them with what’s true.',
    content:
      'Through this program, I learned how to properly audit my thoughts, be more mindful of the lies I convince myself with and replace them with what’s true. Crucially, this time, the truth is not just based on what I know but based on the ultimate truth from what the Word of God says. Coach Hope reminded me of the verse Philippians 2:13, which is now one of my favorite verses: “For God is working in you, giving you the desire and the power to do what pleases Him.” It’s a beautiful reminder that even in our battle with mental health, God works in us, and He not only gives us the desire to change but also the power to change for His glory.',
    name: 'Lyza Samartino',
    role: 'HopeBegins participant',
    avatar: LyzaImg,
  },
  {
    id: 2,
    excerpt:
      'I knew that I wanted to get out of it and I also knew that the only way out was advice and guidance that was founded on the Word of God.',
    content:
      'I remember that I was so confused why was still waking up with so much sadness, confusion, anxiety, and depression everyday. Every. Single. Day. And I didn’t know how to get out of it but I knew that I wanted to get out of it and I also knew that the only way out was advice and guidance that was founded on the Word of God. So, when HopeBegins was offered and was an opportunity that I could join, I remember going straight at it and really taking a chance because God knew that it was what I needed to move forward with my relationship with Him, to move forward with understanding Him and His love for me better. When HopeBegins came, it was the beginning of so much transformation with so much of the darkness that I was carrying to be out of my life at that time.',
    name: 'Isabelle Prado',
    role: 'HopeBegins participant',
    avatar: IsabelleImg,
  },
  {
    id: 3,
    excerpt:
      'I knew na kailangan ko talaga ng help. And I found help and support through HopeBegins.',
    content:
      "I was overwhelmed with anxiety and so much lies from the enemy. So my friend introduced me to HopeBegins. But before that, I was having a hard time when it comes to my relationship with other people, even in decision making, to the point na nahirapan ako mag-decide. All of the decisions and actions na I was doing was not completely right and I knew na kailangan ko talaga ng help. And I found help and support through HopeBegins. For those people who are interested or unsure sa pag-join ng Hope Begins.. you really have to take the risk, knowing na our problems or struggles in life, it's really hard ‘pag ikaw lang mag-di-deal lang niyan on your own. You know, sometimes we tend to fix things on our own, but we also forget to seek help from other people.",
    name: 'Jeremy Rebedillo',
    role: 'HopeBegins participant',
    avatar: JeremyImg,
  },
];
