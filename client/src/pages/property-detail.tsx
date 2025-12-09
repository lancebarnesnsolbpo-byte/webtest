import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  Car, 
  Ruler, 
  ArrowLeft,
  Home,
  Phone,
  Mail,
  Share2,
  Heart,
  Check
} from "lucide-react";
import type { Property } from "@shared/schema";
import { useState } from "react";

export default function PropertyDetail() {
  const [, params] = useRoute("/property/:id");
  const propertyId = params?.id;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", propertyId],
    enabled: !!propertyId,
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-20 w-24 rounded-md" />
                <Skeleton className="h-20 w-24 rounded-md" />
                <Skeleton className="h-20 w-24 rounded-md" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Home className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link href="/listings">
            <Button data-testid="button-back-to-listings">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length ? property.images : [property.imageUrl];
  const currentImage = images[selectedImageIndex];

  return (
    <div className="min-h-screen pt-20 md:pt-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/listings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span data-testid="link-back-to-listings">Back to Listings</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div data-testid="section-gallery">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img
                src={currentImage}
                alt={property.title}
                className="w-full h-full object-cover"
                data-testid="img-main-property"
              />
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                {property.status === "for-sale" && (
                  <Badge className="bg-accent text-accent-foreground font-semibold px-3 py-1" data-testid="badge-status">
                    For Sale
                  </Badge>
                )}
                {property.status === "pending" && (
                  <Badge className="bg-amber-500 text-white font-semibold px-3 py-1" data-testid="badge-status">
                    Pending
                  </Badge>
                )}
                {property.isFeatured && (
                  <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1" data-testid="badge-featured">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2" data-testid="gallery-thumbnails">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-accent"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={img}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div data-testid="section-details">
            <div className="mb-6">
              <span className="text-3xl md:text-4xl font-bold text-accent" data-testid="text-price">
                {formatPrice(property.price)}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3" data-testid="text-title">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <span className="text-lg" data-testid="text-address">
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground" data-testid="text-beds">
                  {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground" data-testid="text-baths">
                  {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
                <Square className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground" data-testid="text-sqft">
                  {formatSquareFeet(property.squareFeet)} sq ft
                </span>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <Link href="/contact" className="flex-1">
                <Button className="w-full" size="lg" data-testid="button-contact-agent">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Agent
                </Button>
              </Link>
              <Button variant="outline" size="lg" data-testid="button-save">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" data-testid="button-share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-medium text-foreground capitalize" data-testid="text-property-type">
                        {property.propertyType}
                      </p>
                    </div>
                  </div>
                  {property.yearBuilt && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Year Built</p>
                        <p className="font-medium text-foreground" data-testid="text-year-built">
                          {property.yearBuilt}
                        </p>
                      </div>
                    </div>
                  )}
                  {property.garage !== undefined && property.garage !== null && (
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Garage</p>
                        <p className="font-medium text-foreground" data-testid="text-garage">
                          {property.garage} {property.garage === 1 ? "Space" : "Spaces"}
                        </p>
                      </div>
                    </div>
                  )}
                  {property.lotSize && (
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Lot Size</p>
                        <p className="font-medium text-foreground" data-testid="text-lot-size">
                          {property.lotSize}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2" data-testid="section-description">
            <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-description">
              {property.fullDescription || property.description}
            </p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div data-testid="section-amenities">
              <h2 className="text-xl font-semibold text-foreground mb-4">Amenities</h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {property.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-foreground" data-testid={`text-amenity-${index}`}>
                          {amenity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-12 mb-8">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Interested in This Property?</h2>
              <p className="mb-6 text-primary-foreground/80">
                Contact Sarah Mitchell for more information or to schedule a viewing.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg" data-testid="button-schedule-viewing">
                    <Mail className="h-4 w-4 mr-2" />
                    Schedule a Viewing
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-call-agent">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-4567
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
