'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { User, UsersApiResponse } from '@/types/user';

const API_BASE = 'http://localhost:3000/api/users';
const PAGE_SIZE = 10;
const DEBOUNCE_MS = 300;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateSearch = useCallback((value: string) => {
    setSearch(value);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: PAGE_SIZE.toString(),
        });
        if (debouncedSearch) {
          params.set('search', debouncedSearch);
        }

        const response = await fetch(`${API_BASE}?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json: UsersApiResponse = await response.json();

        if (json.success) {
          setUsers(json.data);
          setTotalPages(json.totalPages);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError('Network connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, [page, debouncedSearch]);

  return {
    users,
    loading,
    error,
    page,
    totalPages,
    search,
    setPage,
    setSearch: updateSearch,
  };
}
