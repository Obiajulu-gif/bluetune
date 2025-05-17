"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {earnings !== null ? `$${earnings.toFixed(2)}` : '—'}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Streams by Track</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          {streams.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={streams} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="streams" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div>No stream data available.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// TODO: Add authentication & creator-only access control
