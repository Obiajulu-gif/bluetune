"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type ExploreFiltersProps = {
  filters: {
    genre: string
    sortBy: string
  }
  setFilters: (filters: any) => void
}

export function ExploreFilters({ filters, setFilters }: ExploreFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="w-full md:w-1/3">
        <Label htmlFor="genre-filter" className="mb-2 block">
          Genre
        </Label>
        <Select value={filters.genre} onValueChange={(value) => setFilters({ ...filters, genre: value })}>
          <SelectTrigger id="genre-filter" className="bg-black/30 border-gray-700">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="electronic">Electronic</SelectItem>
            <SelectItem value="hiphop">Hip Hop</SelectItem>
            <SelectItem value="rock">Rock</SelectItem>
            <SelectItem value="pop">Pop</SelectItem>
            <SelectItem value="jazz">Jazz</SelectItem>
            <SelectItem value="classical">Classical</SelectItem>
            <SelectItem value="ambient">Ambient</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-1/3">
        <Label htmlFor="sort-filter" className="mb-2 block">
          Sort By
        </Label>
        <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
          <SelectTrigger id="sort-filter" className="bg-black/30 border-gray-700">
            <SelectValue placeholder="Trending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="plays">Most Played</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

