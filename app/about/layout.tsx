import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | RickAndMorty',
    default: 'About',
  },
  description: 'About page',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
