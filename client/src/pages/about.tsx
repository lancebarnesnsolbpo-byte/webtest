import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Quote, Award, GraduationCap, Heart, Target } from "lucide-react";
import { Link } from "wouter";
import realtorImage from "@assets/stock_images/professional_real_es_56b49970.jpg";
import type { Testimonial } from "@shared/schema";

const testimonials: Testimonial[] = [
  {
    id: "1",
    clientName: "Michael & Jennifer Thompson",
    clientInitials: "MT",
    rating: 5,
    text: "Sarah made our first home buying experience absolutely seamless. Her knowledge of the market and attention to detail gave us confidence throughout the entire process. We couldn't be happier with our new home!",
    location: "Lakeshore, CA",
  },
  {
    id: "2",
    clientName: "David Chen",
    clientInitials: "DC",
    rating: 5,
    text: "As an investor, I've worked with many agents over the years. Sarah stands out for her professionalism, market insight, and dedication to her clients. She helped me find properties that exceeded my investment goals.",
    location: "Metro City, CA",
  },
  {
    id: "3",
    clientName: "Amanda Rodriguez",
    clientInitials: "AR",
    rating: 5,
    text: "Selling our family home of 20 years was emotional, but Sarah handled everything with care and expertise. She got us above asking price and made the transition smooth. Highly recommend!",
    location: "Greenville, CA",
  },
  {
    id: "4",
    clientName: "Robert & Lisa Williams",
    clientInitials: "RW",
    rating: 5,
    text: "We relocated from across the country and Sarah went above and beyond to help us find the perfect home. Her virtual tours and detailed reports made the long-distance buying process easy.",
    location: "Vista Hills, CA",
  },
];

const values = [
  {
    icon: Heart,
    title: "Client-First Approach",
    description: "Your needs and goals are my top priority. I listen, understand, and work tirelessly to exceed your expectations.",
  },
  {
    icon: Target,
    title: "Expert Market Knowledge",
    description: "With 15+ years of experience, I provide insights and strategies that help you make informed decisions.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Over 500 successful transactions and countless satisfied clients speak to my commitment to excellence.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "I stay ahead of market trends and industry best practices to provide you with cutting-edge service.",
  },
];

export default function About() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <section className="bg-primary py-12 md:py-16" data-testid="section-about-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4" data-testid="text-about-title">
            About Sarah Mitchell
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Your trusted partner in navigating the real estate market with expertise and care.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background" data-testid="section-bio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={realtorImage}
                  alt="Sarah Mitchell - Real Estate Agent"
                  className="w-full h-full object-cover"
                  data-testid="img-realtor"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent rounded-lg p-4 shadow-lg hidden md:block">
                <div className="text-3xl font-bold text-accent-foreground">15+</div>
                <div className="text-sm text-accent-foreground/80">Years Experience</div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="text-bio-heading">
                Turning Houses Into Homes
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />
              
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p data-testid="text-bio-paragraph-1">
                  With over 15 years of experience in the real estate industry, I've had the privilege 
                  of helping hundreds of families find their perfect homes. My journey in real estate 
                  began with a simple belief: everyone deserves a place they can truly call home.
                </p>
                <p data-testid="text-bio-paragraph-2">
                  I specialize in residential properties across the greater metropolitan area, with 
                  particular expertise in luxury homes, first-time buyer assistance, and investment 
                  properties. My approach combines deep market knowledge with personalized service 
                  tailored to each client's unique needs.
                </p>
                <p data-testid="text-bio-paragraph-3">
                  As a Certified Residential Specialist (CRS) and Accredited Buyer's Representative 
                  (ABR), I bring professional excellence to every transaction. But beyond credentials, 
                  what truly drives me is the joy of seeing clients find their dream homes.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="bg-accent text-accent-foreground" data-testid="button-about-contact">
                    Let's Work Together
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Work With Me"
            subtitle="I'm committed to providing exceptional service and expertise to help you achieve your real estate goals."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center" data-testid={`card-value-${index}`}>
                  <CardContent className="pt-6 pb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Client Testimonials"
            subtitle="Hear what my clients have to say about their experience working with me."
          />

          <div className="relative max-w-4xl mx-auto">
            <Card className="overflow-visible" data-testid="card-testimonial">
              <CardContent className="p-8 md:p-12">
                <div className="absolute -top-5 left-8 md:left-12">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Quote className="h-5 w-5 text-accent-foreground" />
                  </div>
                </div>

                <div className="flex justify-center mb-4 gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="text-center text-lg md:text-xl text-foreground italic leading-relaxed mb-6" data-testid="text-testimonial">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonials[currentTestimonial].clientInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold text-foreground" data-testid="text-client-name">
                      {testimonials[currentTestimonial].clientName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentTestimonial(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-accent" : "bg-muted-foreground/30"
                    }`}
                    data-testid={`button-testimonial-dot-${index}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
                data-testid="button-testimonial-next"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
