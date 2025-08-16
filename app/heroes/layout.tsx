import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | RickAndMorty',
    default: 'Heroes',
  },
  description: 'Heroes page',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
