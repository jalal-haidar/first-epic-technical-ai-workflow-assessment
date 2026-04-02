import { User } from '@/types/user';
import { UserCard } from './UserCard';
import styles from './UserList.module.css';

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <p className={styles.empty}>No users found.</p>;
  }

  return (
    <div className={styles.list}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
