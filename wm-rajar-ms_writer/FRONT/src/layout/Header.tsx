import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/articles" className={styles.navLink}>
          LISTE D'ARTICLES
        </Link>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <Link to="/create" className={styles.navLink}>
          CRÉER
        </Link>
      </div>
    </header>
  );
}
