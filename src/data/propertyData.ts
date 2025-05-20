
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    area: string;
    city: string;
  };
  bhk: number;
  sqft: number;
  type: "Apartment" | "House" | "Villa" | "Plot" | "Commercial";
  forSaleBy: "Owner" | "Builder" | "Agent";
  amenities: string[];
  images: string[];
  postedBy: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
}

export const tamilNaduCities = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", 
  "Salem", "Tirunelveli", "Thoothukudi", "Vellore", 
  "Erode", "Theni", "Dindigul", "Thanjavur", 
  "Tiruppur", "Karur", "Namakkal", "Kanchipuram"
];

export const areas = {
  "Chennai": ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "Porur", "Tambaram", "Chromepet", "Mylapore", "Sholinganallur", "OMR", "ECR"],
  "Coimbatore": ["RS Puram", "Peelamedu", "Saibaba Colony", "Gandhipuram", "Singanallur", "Ganapathy", "Ramanathapuram"],
  "Madurai": ["Anaiyur", "Anna Nagar", "Arappalayam", "KK Nagar", "Mattuthavani", "Palanganatham", "Tirupparankundram"],
  "Tiruchirappalli": ["Thillai Nagar", "Cantonment", "Woraiyur", "KK Nagar", "Srirangam", "Anna Nagar"],
  "Salem": ["Hasthampatti", "Junction", "Fairlands", "Alagapuram", "Suramangalam", "Shevapet"],
  "Tirunelveli": ["Palayamkottai", "Melapalayam", "Vannarpettai", "Tirunelveli Town", "Junction"],
  "Thoothukudi": ["Bryant Nagar", "Millerpuram", "Thoothukudi Port", "Mappillaiyurani", "Lourdammalpuram"],
  "Vellore": ["Katpadi", "Sathuvachari", "Gandhi Nagar", "Bagayam", "Konavattam", "Thorapadi"],
  "Erode": ["Periyar Nagar", "Solar", "Sathy Road", "Thindal", "GH", "Sampath Nagar"],
  "Theni": ["Cumbum", "Periyakulam", "Uthamapalayam", "Chinnamanur", "Bodinayakanur"],
  "Dindigul": ["Nagal Nagar", "Palani Road", "Battalagundu", "Natham", "Oddanchatram"],
  "Thanjavur": ["Medical College Road", "Gandhiji Road", "Old Bus Stand", "New Bus Stand", "Nanjikottai Road"],
  "Tiruppur": ["Avinashi Road", "Kangeyam Road", "Palladam Road", "Dharapuram Road", "KVR Nagar"],
  "Karur": ["Thanthonimalai", "Pasupatheesvarar Kovil", "Vengamedu", "Gandhigramam", "Inam Karur"],
  "Namakkal": ["Namakkal Town", "Mohanur Road", "Paramathi Road", "Sendamangalam", "Puduchatram"],
  "Kanchipuram": ["Big Kanchipuram", "Little Kanchipuram", "Pillayarpalayam", "Enathur", "Vaiyavoor"]
};

export const amenities = [
  "Swimming Pool", "Gym", "Security", "Power Backup",
  "Lift", "Car Parking", "Playground", "Garden",
  "Gated Community", "Club House", "Indoor Games", "24x7 Water Supply",
  "CCTV", "Fire Safety", "Visitor Parking", "Community Hall"
];

export const dummyProperties: Property[] = [
  {
    id: "prop-001",
    title: "Elegant 3 BHK Apartment in Anna Nagar",
    description: "Spacious and well-ventilated 3 BHK apartment with modern amenities in the heart of Anna Nagar. The property is surrounded by greenery and is close to schools, hospitals, and markets. Perfect for family living.",
    price: 8500000,
    location: {
      area: "Anna Nagar",
      city: "Chennai",
    },
    bhk: 3,
    sqft: 1450,
    type: "Apartment",
    forSaleBy: "Owner",
    amenities: ["Swimming Pool", "Gym", "Security", "Power Backup", "Lift", "Car Parking"],
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    ],
    postedBy: {
      id: "user-001",
      name: "Rajesh Kumar",
      phone: "9876543210",
      email: "rajesh@example.com",
    },
    createdAt: "2023-10-15T10:30:00Z",
  },
  {
    id: "prop-002",
    title: "Modern 2 BHK Flat in OMR",
    description: "Beautiful 2 BHK flat with premium finishes in OMR. Located in a well-maintained gated community with excellent amenities. Close to IT parks, educational institutions, and shopping centers.",
    price: 6000000,
    location: {
      area: "OMR",
      city: "Chennai",
    },
    bhk: 2,
    sqft: 1100,
    type: "Apartment",
    forSaleBy: "Agent",
    amenities: ["Gym", "Security", "Power Backup", "Lift", "Car Parking", "Garden"],
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg"
    ],
    postedBy: {
      id: "user-002",
      name: "Priya Investments",
      phone: "9876543211",
      email: "priya@example.com",
    },
    createdAt: "2023-10-10T14:45:00Z",
  },
  {
    id: "prop-003",
    title: "Luxury 4 BHK Villa in ECR",
    description: "Magnificent 4 BHK villa with premium amenities in ECR. This property features spacious rooms, designer interiors, and a private garden. Perfect for those seeking luxury and comfort.",
    price: 15000000,
    location: {
      area: "ECR",
      city: "Chennai",
    },
    bhk: 4,
    sqft: 2800,
    type: "Villa",
    forSaleBy: "Owner",
    amenities: ["Swimming Pool", "Garden", "Security", "Power Backup", "Car Parking", "Playground"],
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg"
    ],
    postedBy: {
      id: "user-003",
      name: "Senthil Raja",
      phone: "9876543212",
      email: "senthil@example.com",
    },
    createdAt: "2023-10-05T09:15:00Z",
  },
  {
    id: "prop-004",
    title: "Commercial Space in RS Puram",
    description: "Prime commercial property located in the business hub of RS Puram. Ideal for offices, showrooms, or retail businesses. Excellent connectivity and visibility with high footfall.",
    price: 12000000,
    location: {
      area: "RS Puram",
      city: "Coimbatore",
    },
    bhk: 0,
    sqft: 2000,
    type: "Commercial",
    forSaleBy: "Agent",
    amenities: ["Power Backup", "Lift", "Car Parking", "Security", "24x7 Water Supply", "CCTV"],
    images: [
      "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg",
      "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg",
      "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg"
    ],
    postedBy: {
      id: "user-004",
      name: "Vignesh Properties",
      phone: "9876543213",
      email: "vignesh@example.com",
    },
    createdAt: "2023-09-28T11:20:00Z",
  },
  {
    id: "prop-005",
    title: "New 3 BHK Apartment in Velachery",
    description: "Brand new 3 BHK apartment with modern amenities in a prime location of Velachery. The apartment is part of a newly constructed residential complex with excellent facilities.",
    price: 7800000,
    location: {
      area: "Velachery",
      city: "Chennai",
    },
    bhk: 3,
    sqft: 1350,
    type: "Apartment",
    forSaleBy: "Builder",
    amenities: ["Swimming Pool", "Gym", "Security", "Power Backup", "Lift", "Car Parking", "Playground", "Garden"],
    images: [
      "https://images.pexels.com/photos/1330753/pexels-photo-1330753.jpeg",
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg"
    ],
    postedBy: {
      id: "builder-001",
      name: "Chennai Builders Ltd",
      phone: "9876543214",
      email: "info@chennaibuilders.com",
    },
    createdAt: "2023-09-20T16:40:00Z",
  },
  {
    id: "prop-006",
    title: "Residential Plot in Thindal",
    description: "CMDA approved residential plot in a developing area of Thindal. The plot is in a gated community with basic amenities. Great investment opportunity with potential for high returns.",
    price: 2500000,
    location: {
      area: "Thindal",
      city: "Erode",
    },
    bhk: 0,
    sqft: 1800,
    type: "Plot",
    forSaleBy: "Agent",
    amenities: ["Gated Community", "Security", "Power Connection", "Water Connection"],
    images: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
      "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg"
    ],
    postedBy: {
      id: "user-005",
      name: "Tamil Land Promoters",
      phone: "9876543215",
      email: "tamilland@example.com",
    },
    createdAt: "2023-09-15T13:50:00Z",
  }
];

export interface Review {
  id: string;
  propertyId?: string;
  userId: string;
  reviewedUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const dummyReviews: Review[] = [
  {
    id: "review-001",
    propertyId: "prop-001",
    userId: "user-009",
    reviewedUserId: "user-001",
    rating: 4,
    comment: "Had a great experience dealing with Rajesh. He was transparent and provided all the necessary information about the property.",
    createdAt: "2023-10-18T15:30:00Z",
  },
  {
    id: "review-002",
    propertyId: "prop-002",
    userId: "user-010",
    reviewedUserId: "user-002",
    rating: 5,
    comment: "Priya was very professional and helped me find the perfect property within my budget. Highly recommended!",
    createdAt: "2023-10-17T09:45:00Z",
  },
  {
    id: "review-003",
    propertyId: "prop-005",
    userId: "user-011",
    reviewedUserId: "builder-001",
    rating: 3,
    comment: "The property was as described, but there were some delays in the possession. Otherwise, the builder was cooperative.",
    createdAt: "2023-10-12T14:20:00Z",
  }
];

export interface BuilderProject {
  id: string;
  builderId: string;
  name: string;
  description: string;
  location: {
    area: string;
    city: string;
  };
  projectType: "Residential" | "Commercial" | "Mixed";
  unitsTotal: number;
  unitsSold: number;
  priceRange: {
    min: number;
    max: number;
  };
  amenities: string[];
  images: string[];
  brochureUrl?: string;
  completionDate: string;
  status: "Upcoming" | "Under Construction" | "Ready to Move";
  createdAt: string;
}

export const dummyBuilderProjects: BuilderProject[] = [
  {
    id: "project-001",
    builderId: "builder-001",
    name: "Green Valley Apartments",
    description: "Green Valley is a premium residential project offering 2 & 3 BHK apartments with world-class amenities. Located in a prime area with excellent connectivity to major parts of the city.",
    location: {
      area: "Velachery",
      city: "Chennai",
    },
    projectType: "Residential",
    unitsTotal: 120,
    unitsSold: 85,
    priceRange: {
      min: 6000000,
      max: 9000000,
    },
    amenities: ["Swimming Pool", "Gym", "Children's Play Area", "Club House", "Landscaped Gardens", "24x7 Security", "Power Backup", "Indoor Games"],
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg"
    ],
    completionDate: "2024-06-30",
    status: "Under Construction",
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "project-002",
    builderId: "builder-001",
    name: "Sunrise Business Park",
    description: "Sunrise Business Park is a state-of-the-art commercial complex designed for modern businesses. It offers flexible office spaces, retail units, and premium amenities for a conducive work environment.",
    location: {
      area: "OMR",
      city: "Chennai",
    },
    projectType: "Commercial",
    unitsTotal: 50,
    unitsSold: 20,
    priceRange: {
      min: 10000000,
      max: 25000000,
    },
    amenities: ["High-speed Elevators", "Food Court", "Conference Rooms", "24x7 Security", "Power Backup", "Ample Parking", "CCTV Surveillance"],
    images: [
      "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg",
      "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg",
      "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg"
    ],
    completionDate: "2025-03-15",
    status: "Upcoming",
    createdAt: "2023-03-20T14:30:00Z",
  }
];

// Utility functions for fetching data
export const fetchAllProperties = (): Promise<Property[]> => {
  return Promise.resolve(dummyProperties);
};

export const fetchPropertyById = (id: string): Promise<Property | undefined> => {
  const property = dummyProperties.find(prop => prop.id === id);
  return Promise.resolve(property);
};

export const fetchPropertiesByFilters = (filters: any): Promise<Property[]> => {
  let filteredProperties = [...dummyProperties];
  
  if (filters.city) {
    filteredProperties = filteredProperties.filter(prop => prop.location.city === filters.city);
  }
  
  if (filters.area) {
    filteredProperties = filteredProperties.filter(prop => prop.location.area === filters.area);
  }
  
  if (filters.bhk) {
    filteredProperties = filteredProperties.filter(prop => prop.bhk === filters.bhk);
  }
  
  if (filters.type) {
    filteredProperties = filteredProperties.filter(prop => prop.type === filters.type);
  }

  if (filters.minPrice) {
    filteredProperties = filteredProperties.filter(prop => prop.price >= filters.minPrice);
  }

  if (filters.maxPrice) {
    filteredProperties = filteredProperties.filter(prop => prop.price <= filters.maxPrice);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filteredProperties = filteredProperties.filter(prop => 
      filters.amenities.every((amenity: string) => prop.amenities.includes(amenity))
    );
  }
  
  return Promise.resolve(filteredProperties);
};

export const fetchReviewsByUserId = (userId: string): Promise<Review[]> => {
  const reviews = dummyReviews.filter(review => review.reviewedUserId === userId);
  return Promise.resolve(reviews);
};

export const fetchBuilderProjects = (builderId?: string): Promise<BuilderProject[]> => {
  if (builderId) {
    const projects = dummyBuilderProjects.filter(project => project.builderId === builderId);
    return Promise.resolve(projects);
  }
  return Promise.resolve(dummyBuilderProjects);
};
