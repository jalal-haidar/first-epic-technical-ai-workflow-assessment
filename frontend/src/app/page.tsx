'use client';

import { useUsers } from '@/hooks/useUsers';
import { SearchInput } from '@/components/SearchInput';
import { UserList } from '@/components/UserList';
import { Pagination } from '@/components/Pagination';
import styles from './page.module.css';

export default function UserDirectoryPage() {
  const { users, loading, error, page, totalPages, search, setPage, setSearch } =
    useUsers();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>User Directory</h1>
      </header>

      <main className={styles.main}>
        <SearchInput value={search} onChange={setSearch} />

        {loading && <p className={styles.status}>Loading users...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <>
            <UserList users={users} />
            {totalPages > 0 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
