
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Signature Gold Watch",
    description: "Exquisitely crafted timepiece with 18k gold accents and premium Swiss movement. A statement of elegance and precision engineering.",
    price: 2499.99,
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000",
    ],
    category: "watches",
    features: [
      "Swiss automatic movement",
      "Sapphire crystal glass",
      "50m water resistance",
      "Genuine leather strap",
      "18k gold accents"
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Premium Leather Wallet",
    description: "Handcrafted from the finest Italian leather, this wallet combines timeless design with modern functionality.",
    price: 349.99,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000",
      "https://images.unsplash.com/photo-1585488763177-bde7d15fd3cf?q=80&w=1000",
    ],
    category: "accessories",
    features: [
      "Full-grain Italian leather",
      "RFID protection",
      "Multiple card slots",
      "Handstitched edges",
      "Satin-lined interior"
    ],
    inStock: true
  },
  {
    id: 3,
    name: "Diamond Pendant Necklace",
    description: "A breathtaking piece featuring ethically sourced diamonds set in 18k white gold. The epitome of timeless elegance.",
    price: 1899.99,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1602751184616-5ec88a6bcbec?q=80&w=1000",
    ],
    category: "jewelry",
    features: [
      "1.2 carat total weight",
      "Ethically sourced diamonds",
      "18k white gold chain",
      "Signature gift box included",
      "Certificate of authenticity"
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Cashmere Travel Wrap",
    description: "Indulgently soft and lightweight, this 100% cashmere wrap is the perfect travel companion for the discerning luxury traveler.",
    price: 599.99,
    images: [
      "https://images.unsplash.com/photo-1520648273695-210f442ae1e1?q=80&w=1000",
      "https://images.unsplash.com/photo-1603721846922-aa7fbc4dfcc7?q=80&w=1000",
    ],
    category: "clothing",
    features: [
      "100% Grade A Mongolian cashmere",
      "Ethically sourced materials",
      "Exceptionally soft hand feel",
      "Versatile sizing",
      "Available in 6 classic colors"
    ],
    inStock: true
  },
  {
    id: 5,
    name: "Crystal Whiskey Decanter Set",
    description: "Elevate your home bar with this handcrafted crystal decanter and matching whiskey glasses. Perfect for the distinguished connoisseur.",
    price: 799.99,
    images: [
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1000",
      "https://images.unsplash.com/photo-1639800076962-4a86c206429c?q=80&w=1000",
    ],
    category: "homeware",
    features: [
      "Hand-cut crystal",
      "Lead-free composition",
      "Includes decanter and 4 glasses",
      "Platinum-finished accents",
      "Gift box included"
    ],
    inStock: false
  },
  {
    id: 6,
    name: "Leather Weekend Bag",
    description: "Combining functionality with sophistication, this leather weekend bag is perfect for short getaways or business trips.",
    price: 1249.99,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000",
      "https://images.unsplash.com/photo-1596171180561-a8679abe2176?q=80&w=1000",
    ],
    category: "travel",
    features: [
      "Full-grain calfskin leather",
      "Suede interior lining",
      "Solid brass hardware",
      "Multiple compartments",
      "Includes dust bag for storage"
    ],
    inStock: true
  },
  {
    id: 7,
    name: "Silk Evening Scarf",
    description: "Woven from the finest silk, this evening scarf adds a touch of luxury to any outfit. A versatile accessory for the modern gentleman or lady.",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1635348457851-084b540d4d4f?q=80&w=1000",
      "https://images.unsplash.com/photo-1507851181167-e3a11a1110ca?q=80&w=1000",
    ],
    category: "accessories",
    features: [
      "100% Mulberry silk",
      "Hand-rolled edges",
      "Limited edition print",
      "Generous dimensions",
      "Gift box included"
    ],
    inStock: true
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    description: "Meticulously crafted designer sunglasses featuring polarized lenses and premium materials for both style and optimal eye protection.",
    price: 459.99,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000",
      "https://images.unsplash.com/photo-1564589106888-aaa7239116ec?q=80&w=1000",
    ],
    category: "accessories",
    features: [
      "Acetate and metal construction",
      "Polarized UV400 lenses",
      "Adjustable silicone nose pads",
      "Signature case included",
      "Limited lifetime warranty"
    ],
    inStock: true
  }
];

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getCategories = () => {
  return Array.from(new Set(products.map(product => product.category)));
};

export const getFeaturedProducts = () => {
  return products.slice(0, 4);
};
