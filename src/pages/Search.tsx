import { useState } from 'react';
import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { TripGrid } from '@/components/trips/TripGrid';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useTrips } from '@/hooks/useQueryHooks';
import { Filter, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Search() {
  const { data: trips, isLoading } = useTrips();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // Client-side filtering logic
  let filteredTrips = trips?.filter(t => {
    // Search
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchQuery.toLowerCase());

    // Price
    let matchesPrice = true;
    if (priceFilter === 'under500') matchesPrice = t.price < 500;
    if (priceFilter === '500-1500') matchesPrice = t.price >= 500 && t.price <= 1500;
    if (priceFilter === 'over1500') matchesPrice = t.price > 1500;

    // Duration
    let matchesDuration = true;
    if (durationFilter === '1-3') matchesDuration = t.durationDays >= 1 && t.durationDays <= 3;
    if (durationFilter === '4-7') matchesDuration = t.durationDays >= 4 && t.durationDays <= 7;
    if (durationFilter === '8+') matchesDuration = t.durationDays >= 8;

    // Category
    let matchesCategory = true;
    if (categoryFilter !== 'all') {
      matchesCategory = t.category?.toLowerCase() === categoryFilter.toLowerCase();
    }

    return matchesSearch && matchesPrice && matchesDuration && matchesCategory;
  }) || [];

  // Sorting
  if (sortBy === 'price-low') {
    filteredTrips.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredTrips.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredTrips.sort((a, b) => b.rating - a.rating);
  }

  const categories = ["Beach", "Adventure", "Cultural", "Mountains", "City", "Luxury"];

  return (
    <PageWrapper className="bg-background py-8">
      <Container className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-card/50 backdrop-blur-md p-6 rounded-2xl border border-border shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-xl text-foreground">Filters</h3>
            </div>

            <div className="space-y-6">
              {/* Destination Search */}
              <div>
                <label className="text-sm font-bold mb-2 block text-foreground tracking-wide">Destination</label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Where to?"
                    className="pl-9 bg-background/50 border-border h-11 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-bold mb-2 block text-foreground tracking-wide">Category</label>
                <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-11 rounded-xl bg-background/50">
                  <option value="all">Any Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-bold mb-2 block text-foreground tracking-wide">Price Range</label>
                <Select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="h-11 rounded-xl bg-background/50">
                  <option value="all">Any Price</option>
                  <option value="under500">Under $500</option>
                  <option value="500-1500">$500 - $1,500</option>
                  <option value="over1500">Over $1,500</option>
                </Select>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-bold mb-2 block text-foreground tracking-wide">Duration</label>
                <Select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)} className="h-11 rounded-xl bg-background/50">
                  <option value="all">Any Duration</option>
                  <option value="1-3">1-3 Days</option>
                  <option value="4-7">4-7 Days</option>
                  <option value="8+">8+ Days</option>
                </Select>
              </div>

              <Button className="w-full mt-4">Apply Filters</Button>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <main className="flex-1 min-w-0">
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-border/50 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-1">Explore Trips</h1>
              <p className="text-muted-foreground text-base">
                {isLoading ? 'Scanning destinations...' : `We found ${filteredTrips.length} amazing trips for you`}
              </p>
            </div>

            <div className="w-full sm:w-56 shrink-0">
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-11 rounded-xl bg-background/50 font-medium">
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest</option>
              </Select>
            </div>
          </div>

          <TripGrid trips={filteredTrips} isLoading={isLoading} skeletonCount={6} />
        </main>

      </Container>
    </PageWrapper>
  );
}
