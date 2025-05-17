"use client";

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface Playlist {
  id: string;
  name: string;
  tracks: string[];
}

export default function PlaylistManagement() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newName, setNewName] = useState('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/playlists');
      const data = await res.json();
      setPlaylists(data.playlists || []);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to fetch playlists' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async () => {
    if (!newName) return;
    try {
      const res = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      const { playlist, paymentUrl } = await res.json();
      window.location.href = paymentUrl; // redirect to payment
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create playlist' });
    }
  };

  const handleRename = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        toast({ title: 'Renamed', description: 'Playlist renamed successfully' });
        fetchPlaylists();
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to rename playlist' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this playlist?')) return;
    try {
      const res = await fetch(`/api/playlists/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Deleted', description: 'Playlist deleted' });
        fetchPlaylists();
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to delete playlist' });
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Playlists</h1>
      <div className="flex gap-2">
        <Input
          placeholder="New playlist name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <Button onClick={handleCreate}>Create</Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {playlists.map(pl => (
            <li key={pl.id} className="flex items-center gap-4">
              <Link href={`/playlist/${pl.id}`}>{pl.name}</Link>
              <Button size="sm" variant="outline" onClick={() => {
                const newName = prompt('New name', pl.name);
                if (newName) handleRename(pl.id, newName);
              }}>Rename</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(pl.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
