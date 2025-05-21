"use client";

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Music } from 'lucide-react';

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
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Your Playlists
          </span>
        </h1>

        <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <Input
                placeholder="New playlist name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="flex-1 bg-black/40 border-blue-900/50 text-white placeholder:text-gray-400"
              />
              <Button
                onClick={handleCreate}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Create Playlist
              </Button>
            </div>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading your playlists...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map(pl => (
              <Card key={pl.id} className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                        <Music className="w-8 h-8 text-blue-400" />
                      </div>
                      <Link 
                        href={`/playlist/${pl.id}`}
                        className="text-xl font-semibold hover:text-blue-400 transition-colors line-clamp-1"
                      >
                        {pl.name}
                      </Link>
                      <p className="text-gray-400 text-sm mt-1">{pl.tracks.length} tracks</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-900/50 hover:border-blue-500"
                        onClick={() => {
                          const newName = prompt('New name', pl.name);
                          if (newName) handleRename(pl.id, newName);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-900/50 hover:border-red-500 hover:bg-red-950/20"
                        onClick={() => handleDelete(pl.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
