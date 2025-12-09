import { 
  type Property, 
  type InsertProperty,
  type ContactSubmission,
  type InsertContact,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;
  private testimonials: Map<string, Testimonial>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.properties = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    
    this.seedData();
  }

  private seedData() {
    const sampleProperties: Property[] = [
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
        imageUrl: "/stock_images/beautiful_modern_hou_547fea76.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_547fea76.jpg",
          "/stock_images/beautiful_modern_hou_4842931c.jpg",
          "/stock_images/beautiful_modern_hou_8284b516.jpg",
        ],
        description: "Stunning lakefront property with panoramic views",
        fullDescription: "Experience luxury living at its finest in this stunning modern lakefront estate. This meticulously designed home offers breathtaking panoramic views of the lake from nearly every room. The open-concept floor plan features soaring ceilings, floor-to-ceiling windows, and premium finishes throughout. The gourmet kitchen is equipped with top-of-the-line appliances, custom cabinetry, and a large center island perfect for entertaining. The primary suite offers a private retreat with a spa-like bathroom and direct access to a private balcony overlooking the water.",
        amenities: ["Waterfront", "Private Dock", "Heated Pool", "Smart Home System", "Wine Cellar", "Home Theater", "Three-Car Garage", "Outdoor Kitchen", "Fire Pit", "Central AC"],
        yearBuilt: 2021,
        lotSize: "0.75 acres",
        garage: 3,
        latitude: "34.0522",
        longitude: "-118.2437",
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
        imageUrl: "/stock_images/beautiful_modern_hou_4842931c.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_4842931c.jpg",
          "/stock_images/beautiful_modern_hou_e5d4b520.jpg",
          "/stock_images/beautiful_modern_hou_3018222d.jpg",
        ],
        description: "Luxury condo in the heart of downtown",
        fullDescription: "Live in the heart of the city in this sophisticated contemporary condo. This stunning residence features an open floor plan with premium hardwood floors, designer lighting, and floor-to-ceiling windows that flood the space with natural light. The chef's kitchen includes high-end stainless steel appliances, quartz countertops, and a breakfast bar. Both bedrooms offer generous closet space, and the primary suite includes an en-suite bathroom with dual vanities. Building amenities include 24-hour concierge, rooftop terrace, fitness center, and secure parking.",
        amenities: ["24-Hour Concierge", "Rooftop Terrace", "Fitness Center", "In-Unit Laundry", "Floor-to-Ceiling Windows", "Secure Parking", "Storage Unit", "Pet Friendly", "Central AC"],
        yearBuilt: 2019,
        lotSize: null,
        garage: 1,
        latitude: "34.0407",
        longitude: "-118.2468",
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
        imageUrl: "/stock_images/beautiful_modern_hou_8284b516.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_8284b516.jpg",
          "/stock_images/beautiful_modern_hou_e4f444b0.jpg",
          "/stock_images/beautiful_modern_hou_547fea76.jpg",
        ],
        description: "Beautiful family home with spacious backyard",
        fullDescription: "Welcome home to this charming single-family residence in a quiet, tree-lined neighborhood. Perfect for families, this well-maintained home features an updated kitchen with granite counters, a spacious living room with fireplace, and a formal dining room. The large backyard is ideal for outdoor entertaining and includes a covered patio area. Additional features include a two-car garage, ample storage, and recent updates to HVAC and roofing. Located near top-rated schools, parks, and shopping.",
        amenities: ["Fireplace", "Updated Kitchen", "Covered Patio", "Large Backyard", "Two-Car Garage", "Near Schools", "Central AC", "Hardwood Floors", "Washer/Dryer"],
        yearBuilt: 2005,
        lotSize: "0.35 acres",
        garage: 2,
        latitude: "34.0689",
        longitude: "-118.3452",
        isFeatured: true,
        propertyType: "house",
        status: "for-sale",
      },
      {
        id: "4",
        title: "Luxury Hillside Villa",
        address: "456 Panorama Heights",
        city: "Vista Hills",
        state: "CA",
        zipCode: "90213",
        price: 2100000,
        bedrooms: 5,
        bathrooms: 4,
        squareFeet: 4500,
        imageUrl: "/stock_images/beautiful_modern_hou_e5d4b520.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_e5d4b520.jpg",
          "/stock_images/beautiful_modern_hou_547fea76.jpg",
          "/stock_images/beautiful_modern_hou_8284b516.jpg",
        ],
        description: "Exclusive hillside property with stunning city views",
        fullDescription: "Perched high in the hills, this magnificent villa offers unparalleled city and ocean views. This architectural masterpiece features an open floor plan with dramatic living spaces, walls of glass, and multiple outdoor entertaining areas. The gourmet kitchen is equipped with professional-grade appliances and custom cabinetry. The primary suite occupies its own wing and includes a sitting area, dual walk-in closets, and a spa-like bathroom. Additional features include a wine room, home office, infinity pool, and smart home technology throughout.",
        amenities: ["Infinity Pool", "City Views", "Ocean Views", "Smart Home", "Wine Room", "Home Office", "Outdoor Living", "Gated Entry", "Four-Car Garage", "Central AC"],
        yearBuilt: 2018,
        lotSize: "1.2 acres",
        garage: 4,
        latitude: "34.1055",
        longitude: "-118.4064",
        isFeatured: false,
        propertyType: "house",
        status: "for-sale",
      },
      {
        id: "5",
        title: "Cozy Townhouse",
        address: "789 Garden Way",
        city: "Bloomfield",
        state: "CA",
        zipCode: "90214",
        price: 550000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1600,
        imageUrl: "/stock_images/beautiful_modern_hou_e4f444b0.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_e4f444b0.jpg",
          "/stock_images/beautiful_modern_hou_3018222d.jpg",
          "/stock_images/beautiful_modern_hou_4842931c.jpg",
        ],
        description: "Modern townhouse in a quiet neighborhood",
        fullDescription: "This beautifully appointed townhouse offers modern living in a prime location. The main level features an open-concept living and dining area with contemporary finishes, leading to a private patio garden. The updated kitchen includes stainless steel appliances and ample cabinet space. Upstairs, the primary bedroom offers a walk-in closet and en-suite bath, while two additional bedrooms share a full bath. The community offers well-maintained grounds, guest parking, and easy access to shopping and dining.",
        amenities: ["Private Patio", "Updated Kitchen", "Walk-In Closet", "Community Pool", "Guest Parking", "Near Shopping", "Central AC", "In-Unit Laundry"],
        yearBuilt: 2015,
        lotSize: null,
        garage: 1,
        latitude: "34.0128",
        longitude: "-118.4912",
        isFeatured: false,
        propertyType: "townhouse",
        status: "pending",
      },
      {
        id: "6",
        title: "Executive Suite Penthouse",
        address: "1000 Skyline Tower, PH1",
        city: "Downtown",
        state: "CA",
        zipCode: "90215",
        price: 3500000,
        bedrooms: 4,
        bathrooms: 4,
        squareFeet: 5200,
        imageUrl: "/stock_images/beautiful_modern_hou_3018222d.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_3018222d.jpg",
          "/stock_images/beautiful_modern_hou_e5d4b520.jpg",
          "/stock_images/beautiful_modern_hou_547fea76.jpg",
        ],
        description: "Prestigious penthouse with 360-degree views",
        fullDescription: "The crown jewel of Skyline Tower, this exceptional penthouse offers the ultimate in urban luxury. Spanning the entire top floor, this residence features 360-degree views through floor-to-ceiling windows, an open floor plan designed for entertaining, and finishes of the highest quality. The chef's kitchen includes top-of-the-line appliances, a butler's pantry, and custom cabinetry. The primary suite offers a private terrace, custom closets, and a spa-inspired bathroom. Building amenities include valet parking, private elevator access, and a rooftop pool.",
        amenities: ["Private Elevator", "Rooftop Pool", "Valet Parking", "Concierge", "Private Terrace", "Butler's Pantry", "Smart Home", "360 Views", "Central AC", "Wine Storage"],
        yearBuilt: 2022,
        lotSize: null,
        garage: 2,
        latitude: "34.0456",
        longitude: "-118.2511",
        isFeatured: false,
        propertyType: "condo",
        status: "for-sale",
      },
      {
        id: "7",
        title: "Family-Friendly Ranch",
        address: "2345 Meadow Lane",
        city: "Countryside",
        state: "CA",
        zipCode: "90216",
        price: 680000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2800,
        imageUrl: "/stock_images/beautiful_modern_hou_547fea76.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_547fea76.jpg",
          "/stock_images/beautiful_modern_hou_8284b516.jpg",
          "/stock_images/beautiful_modern_hou_e4f444b0.jpg",
        ],
        description: "Spacious ranch home perfect for families",
        fullDescription: "This expansive single-story ranch home is perfect for families seeking space and comfort. The open floor plan features a large family room with vaulted ceilings and a cozy fireplace. The updated kitchen offers abundant counter space, a breakfast nook, and views of the backyard. Four generously sized bedrooms provide plenty of room for the whole family, and the primary suite includes a walk-in closet and updated bath. The large, flat backyard is ideal for kids and pets, with room for a pool or play area.",
        amenities: ["Single Story", "Vaulted Ceilings", "Fireplace", "Large Backyard", "Updated Kitchen", "Walk-In Closet", "Near Schools", "Central AC", "Three-Car Garage"],
        yearBuilt: 2008,
        lotSize: "0.5 acres",
        garage: 3,
        latitude: "34.1523",
        longitude: "-118.3678",
        isFeatured: false,
        propertyType: "house",
        status: "for-sale",
      },
      {
        id: "8",
        title: "Urban Loft",
        address: "321 Arts District Way",
        city: "Metro City",
        state: "CA",
        zipCode: "90217",
        price: 495000,
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 1200,
        imageUrl: "/stock_images/beautiful_modern_hou_4842931c.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_4842931c.jpg",
          "/stock_images/beautiful_modern_hou_3018222d.jpg",
          "/stock_images/beautiful_modern_hou_e5d4b520.jpg",
        ],
        description: "Trendy loft in the vibrant arts district",
        fullDescription: "Live and work in style in this authentic urban loft located in the heart of the Arts District. This converted warehouse space features soaring 16-foot ceilings, exposed brick walls, original timber beams, and oversized industrial windows. The open layout is ideal for creative professionals, with a defined sleeping area that can be customized to suit your needs. The updated kitchen features modern appliances and a breakfast bar. Building amenities include a rooftop deck with city views and a secure bike storage room.",
        amenities: ["Exposed Brick", "High Ceilings", "Industrial Windows", "Rooftop Deck", "Bike Storage", "Open Layout", "Near Galleries", "Pet Friendly", "Central AC"],
        yearBuilt: 1925,
        lotSize: null,
        garage: 0,
        latitude: "34.0425",
        longitude: "-118.2329",
        isFeatured: false,
        propertyType: "condo",
        status: "for-sale",
      },
      {
        id: "9",
        title: "Mediterranean Estate",
        address: "777 Olive Grove Drive",
        city: "Coastal Heights",
        state: "CA",
        zipCode: "90218",
        price: 1850000,
        bedrooms: 5,
        bathrooms: 5,
        squareFeet: 4200,
        imageUrl: "/stock_images/beautiful_modern_hou_8284b516.jpg",
        images: [
          "/stock_images/beautiful_modern_hou_8284b516.jpg",
          "/stock_images/beautiful_modern_hou_547fea76.jpg",
          "/stock_images/beautiful_modern_hou_e5d4b520.jpg",
        ],
        description: "Stunning Mediterranean-style estate with pool",
        fullDescription: "This exquisite Mediterranean-style estate offers resort-like living in a prestigious neighborhood. Enter through the grand foyer to discover formal living and dining rooms with custom millwork and elegant finishes. The gourmet kitchen opens to a spacious family room with views of the resort-style backyard. The lushly landscaped grounds feature a sparkling pool with spa, outdoor kitchen, and multiple seating areas. The primary suite is a true retreat with a sitting area, dual walk-in closets, and a luxurious bathroom with soaking tub.",
        amenities: ["Pool & Spa", "Outdoor Kitchen", "Grand Foyer", "Formal Dining", "Guest Suite", "Custom Millwork", "Landscaped Grounds", "Central AC", "Three-Car Garage", "Wine Cellar"],
        yearBuilt: 2012,
        lotSize: "0.85 acres",
        garage: 3,
        latitude: "34.0789",
        longitude: "-118.5234",
        isFeatured: false,
        propertyType: "house",
        status: "for-sale",
      },
    ];

    const sampleTestimonials: Testimonial[] = [
      {
        id: "1",
        clientName: "Michael & Jennifer Thompson",
        clientInitials: "MT",
        rating: 5,
        text: "Sarah made our first home buying experience absolutely seamless. Her knowledge of the market and attention to detail gave us confidence throughout the entire process.",
        location: "Lakeshore, CA",
      },
      {
        id: "2",
        clientName: "David Chen",
        clientInitials: "DC",
        rating: 5,
        text: "As an investor, I've worked with many agents over the years. Sarah stands out for her professionalism, market insight, and dedication to her clients.",
        location: "Metro City, CA",
      },
      {
        id: "3",
        clientName: "Amanda Rodriguez",
        clientInitials: "AR",
        rating: 5,
        text: "Selling our family home of 20 years was emotional, but Sarah handled everything with care and expertise. She got us above asking price!",
        location: "Greenville, CA",
      },
    ];

    sampleProperties.forEach((p) => this.properties.set(p.id, p));
    sampleTestimonials.forEach((t) => this.testimonials.set(t.id, t));
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter((p) => p.isFeatured);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = { 
      ...insertProperty, 
      id,
      images: insertProperty.images ?? null,
      fullDescription: insertProperty.fullDescription ?? null,
      amenities: insertProperty.amenities ?? null,
      yearBuilt: insertProperty.yearBuilt ?? null,
      lotSize: insertProperty.lotSize ?? null,
      garage: insertProperty.garage ?? null,
      latitude: insertProperty.latitude ?? null,
      longitude: insertProperty.longitude ?? null,
      isFeatured: insertProperty.isFeatured ?? false,
    };
    this.properties.set(id, property);
    return property;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      location: insertTestimonial.location ?? null,
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertContact,
      id,
      phone: insertContact.phone ?? null,
      submittedAt: new Date().toISOString(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new MemStorage();
