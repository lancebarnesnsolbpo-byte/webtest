import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { SectionHeader } from "@/components/section-header";
import { ArrowRight, Award, Users, Home as HomeIcon, TrendingUp } from "lucide-react";
import heroImage from "@assets/stock_images/modern_luxury_home_e_3a28c680.jpg";
import property1 from "@assets/stock_images/beautiful_modern_hou_547fea76.jpg";
import property2 from "@assets/stock_images/beautiful_modern_hou_4842931c.jpg";
import property3 from "@assets/stock_images/beautiful_modern_hou_8284b516.jpg";
import type { Property } from "@shared/schema";

const featuredProperties: Property[] = [
  {
    id: "1",
    title: "Modern Lakefront Estate",
    address: "1234 Lakeview Drive",
    city: "Lakeshore",
    state: "CA",
    zipCode: "90210",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    imageUrl: property1,
    description: "Stunning lakefront property with panoramic views",
    isFeatured: true,
    propertyType: "house",
    status: "for-sale",
  },
  {
    id: "2",
    title: "Contemporary Downtown Condo",
    address: "567 Urban Avenue, Unit 12A",
    city: "Metro City",
    state: "CA",
    zipCode: "90211",
    price: 875000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    imageUrl: property2,
    description: "Luxury condo in the heart of downtown",
    isFeatured: true,
    propertyType: "condo",
    status: "for-sale",
  },
  {
    id: "3",
    title: "Charming Suburban Retreat",
    address: "890 Oak Tree Lane",
    city: "Greenville",
    state: "CA",
    zipCode: "90212",
    price: 725000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2400,
    imageUrl: property3,
    description: "Beautiful family home with spacious backyard",
    isFeatured: true,
    propertyType: "house",
    status: "for-sale",
  },
];

const stats = [
  { icon: HomeIcon, value: "500+", label: "Homes Sold" },
  { icon: Users, value: "350+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "$200M+", label: "Total Sales" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section
        className="relative h-[85vh] min-h-[600px] flex items-center justify-center"
        data-testid="section-hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
            data-testid="text-hero-headline"
          >
            Find Your Dream Home<br className="hidden sm:block" /> With Confidence
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Expert guidance and personalized service to help you navigate the real estate market. 
            Your perfect home is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/listings">
              <Button
                size="lg"
                className="bg-primary/90 backdrop-blur-md text-primary-foreground border border-accent/50 px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                data-testid="button-view-listings"
              >
                View Listings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-accent backdrop-blur-md text-accent-foreground px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                data-testid="button-home-valuation"
              >
                Free Home Valuation
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 md:h-24 text-background"
            viewBox="0 0 1440 100"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,100 L0,50 Q360,0 720,50 Q1080,100 1440,50 L1440,100 Z" />
          </svg>
        </div>
      </section>

      <section className="py-12 md:py-0 md:-mt-8 relative z-20" data-testid="section-stats">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-lg shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-3">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1" data-testid={`text-stat-value-${index}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background" data-testid="section-featured-properties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Properties"
            subtitle="Explore our handpicked selection of premium properties available in the market today."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Link href="/listings">
              <Button
                size="lg"
                variant="outline"
                className="px-8"
                data-testid="button-view-all-listings"
              >
                View All Listings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's work together to make your real estate dreams a reality. Whether you're buying, 
            selling, or just exploring your options, I'm here to help every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-accent-foreground px-8" data-testid="button-cta-contact">
                Schedule a Consultation
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="px-8" data-testid="button-cta-about">
                Learn More About Me
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
