import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.contact}>
          <span>Contact</span>
          <a href="mailto:contact@ascerex.com">contact@ascerex.com</a>
        </div>

        <nav className={styles.legal} aria-label="Legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Use</Link>
        </nav>

        <p className={styles.copyright}>&copy; 2026 Ascerex</p>
      </div>
    </footer>
  );
}
