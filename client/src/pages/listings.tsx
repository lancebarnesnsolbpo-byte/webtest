import { useQuery } from "@tanstack/react-query";
import { PropertyCard } from "@/components/property-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import type { Property } from "@shared/schema";

export default function Listings() {
  const [sortBy, setSortBy] = useState("price-desc");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => filterType === "all" || p.propertyType === filterType)
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "beds-desc":
            return b.bedrooms - a.bedrooms;
          case "sqft-desc":
            return b.squareFeet - a.squareFeet;
          default:
            return 0;
        }
      });
  }, [properties, filterType, sortBy]);

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <section className="bg-primary py-12 md:py-16" data-testid="section-listings-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4" data-testid="text-listings-title">
            Property Listings
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Browse our curated collection of premium properties. Find your perfect home today.
          </p>
        </div>
      </section>

      <section className="sticky top-16 md:top-20 z-40 bg-background border-b border-border shadow-sm" data-testid="section-filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground hidden sm:inline">Filters:</span>
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[140px]" data-testid="select-property-type">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">Houses</SelectItem>
                  <SelectItem value="condo">Condos</SelectItem>
                  <SelectItem value="townhouse">Townhouses</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="beds-desc">Most Bedrooms</SelectItem>
                  <SelectItem value="sqft-desc">Largest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm" data-testid="badge-property-count">
                {isLoading ? "..." : filteredProperties.length} Properties
              </Badge>
              <div className="hidden sm:flex items-center border border-border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                  data-testid="button-view-grid"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background" data-testid="section-listings-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/10] w-full rounded-lg" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  : "flex flex-col gap-6"
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
