import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/app/ui/styles/pages/About.module.scss';

export const metadata: Metadata = {
  title: 'About | Rick And Morty',
  description: 'About page for the Rick And Morty app by Maxim Dudaryonok',
};

export default function AboutPage() {
  return (
    <div className={styles.container} data-testid="about-page">
      <h1 className={styles.title}>Rick And Morty</h1>
      <h3 className={styles.small}>by Maxim Dudaryonok</h3>

      <nav className={styles.navbar}>
        <Link href="/heroes" className={styles.link}>
          ← Back to Heroes
        </Link>
      </nav>

      <p className={styles.text}>
        Built with React, Next.js, and TypeScript.
      </p>

      <p className={styles.text}>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          RS School
        </a>
        .
      </p>
    </div>
  );
}
