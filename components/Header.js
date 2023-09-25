import Link from "next/link"
import Search from "./Search"
import styles from "../styles/Header.module.css"
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link legacyBehavior href='/'>
                <a>DJ Events</a>
            </Link>
        </div>

        <Search />

        <nav>
            <ul>
                <li>
                    <Link legacyBehavior href='/events'>
                        <a>Events</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href='/events/add'>
                        <a>Add Event</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href='/account/login'>
                        <a className="btn-secondary btn-icon">
                            <FaSignInAlt /> Login
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
