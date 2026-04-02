import { User } from '@/types/user';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.name}>{user.name}</h2>
        <span
          className={`${styles.badge} ${
            user.status === 'Active' ? styles.active : styles.offline
          }`}
        >
          {user.status}
        </span>
      </div>
      <div className={styles.body}>
        <p className={styles.role}>Role: {user.role}</p>
        <p className={styles.date}>
          Last Seen: {new Date(user.lastLogin).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
