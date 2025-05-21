"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DollarSign, TrendingUp, Music2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface EarningsResponse {
  totalEarnings: number;
}

interface TrackStream {
  trackId: string;
  title: string;
  streams: number;
}

export default function CreatorDashboard() {
  const [earnings, setEarnings] = useState<number | null>(null);
  const [streams, setStreams] = useState<TrackStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [earningsRes, streamsRes] = await Promise.all([
          fetch('/api/dashboard/creator/earnings'),
          fetch('/api/dashboard/creator/streams'),
        ]);
        const earningsData: EarningsResponse = await earningsRes.json();
        const streamsData = await streamsRes.json();

        setEarnings(earningsData.totalEarnings);
        setStreams(streamsData.trackStreams);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Creator Dashboard
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-400" />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {earnings !== null ? `$${earnings.toFixed(2)}` : '—'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music2 className="w-6 h-6 text-purple-400" />
                Total Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                {streams.reduce((acc, curr) => acc + curr.streams, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Streams by Track
            </CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            {streams.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={streams} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="streamGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis 
                    dataKey="title" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.5)',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="streams" 
                    stroke="#4f46e5"
                    fill="url(#streamGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Music2 className="w-12 h-12 mb-4" />
                <p>No stream data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  );
}

// TODO: Add authentication & creator-only access control
