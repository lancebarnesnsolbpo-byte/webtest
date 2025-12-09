import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Link } from "wouter";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft: number) => {
    return new Intl.NumberFormat("en-US").format(sqft);
  };

  return (
    <Link href={`/property/${property.id}`}>
      <Card
        className="group overflow-visible cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        data-testid={`card-property-${property.id}`}
      >
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {property.status === "for-sale" && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-semibold px-3 py-1" data-testid={`badge-status-${property.id}`}>
              For Sale
            </Badge>
          )}
          {property.status === "pending" && (
            <Badge className="absolute top-3 left-3 bg-amber-500 text-white font-semibold px-3 py-1" data-testid={`badge-status-${property.id}`}>
              Pending
            </Badge>
          )}
          {property.isFeatured && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-semibold px-3 py-1" data-testid={`badge-featured-${property.id}`}>
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          <div className="mb-3">
            <span className="text-2xl font-bold text-accent" data-testid={`text-price-${property.id}`}>
              {formatPrice(property.price)}
            </span>
          </div>

          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1" data-testid={`text-title-${property.id}`}>
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm line-clamp-1" data-testid={`text-address-${property.id}`}>
              {property.address}, {property.city}, {property.state}
            </span>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1.5 rounded-full">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground" data-testid={`text-beds-${property.id}`}>
                {property.bedrooms} Beds
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1.5 rounded-full">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground" data-testid={`text-baths-${property.id}`}>
                {property.bathrooms} Baths
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1.5 rounded-full ml-auto">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground" data-testid={`text-sqft-${property.id}`}>
                {formatSquareFeet(property.squareFeet)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
