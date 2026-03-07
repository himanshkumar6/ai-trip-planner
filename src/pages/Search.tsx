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

  // Basic client-side filtering logic for now
  const filteredTrips = trips?.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageWrapper className="bg-background py-8">
      <Container className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border mt-1">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Filters</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1.5 block text-foreground">Destination</label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-1.5 block text-foreground">Price Range</label>
                <Select>
                  <option value="all">Any Price</option>
                  <option value="under500">Under $500</option>
                  <option value="500-1500">$500 - $1,500</option>
                  <option value="over1500">Over $1,500</option>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-1.5 block text-foreground">Duration</label>
                <Select>
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
        <main className="flex-1">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Explore Trips</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {isLoading ? 'Searching...' : `Found ${filteredTrips?.length || 0} results`}
              </p>
            </div>

            <div className="hidden sm:block w-48">
              <Select>
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: Highest</option>
              </Select>
            </div>
          </div>

          <TripGrid trips={filteredTrips} isLoading={isLoading} skeletonCount={6} />
        </main>

      </Container>
    </PageWrapper>
  );
}
