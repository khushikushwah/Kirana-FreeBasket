import { useState, useMemo, useEffect } from "react";
import { ShoppingCart } from "./components/ShoppingCart";
import { ProductCard } from "./components/ProductCard";
import { HeroBanner } from "./components/HeroBanner";
import { CategoryFilter } from "./components/CategoryFilter";
import { CheckoutModal } from "./components/CheckoutModal";
import {
  LocationPicker,
  LOCATIONS,
} from "./components/LocationPicker";
import type { Location } from "./components/LocationPicker";
import { Toaster } from "sonner";
import { toast } from "sonner";
import {
  ShoppingBasket,
  Search,
  MapPin,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  description: string;
  inStock: boolean;
  shop: string;
};

export type CartItem = Product & { qty: number };

const PRODUCTS: Product[] = [
  // ── Vegetables ──
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 30,
    unit: "500 g",
    image:
      "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400&h=300&fit=crop&auto=format",
    badge: "Local Farm",
    description: "Juicy vine-ripened red tomatoes.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 2,
    name: "Spinach (Palak)",
    category: "Vegetables",
    price: 25,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&auto=format",
    badge: "Organic",
    description: "Tender baby spinach leaves, iron-rich.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 3,
    name: "Carrots",
    category: "Vegetables",
    price: 20,
    unit: "500 g",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop&auto=format",
    description: "Crunchy orange carrots, farm fresh.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 4,
    name: "Broccoli",
    category: "Vegetables",
    price: 40,
    unit: "1 head",
    image:
      "https://images.unsplash.com/photo-1685504445355-0e7bdf90d415?w=400&h=300&fit=crop&auto=format",
    badge: "Fresh",
    description: "Fresh green broccoli florets.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 5,
    name: "Red Onions",
    category: "Vegetables",
    price: 25,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop&auto=format",
    description: "Red onions with sharp pungent taste.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 6,
    name: "Potatoes (Aloo)",
    category: "Vegetables",
    price: 30,
    unit: "1 kg",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.Evz-JO1JkjhdaOQwDIYNQAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Farm-fresh golden potatoes.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 7,
    name: "Capsicum (Bell Pepper)",
    category: "Vegetables",
    price: 45,
    unit: "3 pcs",
    image:
      "https://images.unsplash.com/photo-1585159079680-8dec029b76ed?w=400&h=300&fit=crop&auto=format",
    badge: "Colourful",
    description: "Fresh green bell peppers, crisp.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 8,
    name: "Cauliflower (Gobi)",
    category: "Vegetables",
    price: 35,
    unit: "1 head",
    image:
      "https://images.unsplash.com/photo-1748792818634-a098347e540a?w=400&h=300&fit=crop&auto=format",
    description: "White firm cauliflower head.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 9,
    name: "Cucumber (Kheera)",
    category: "Vegetables",
    price: 20,
    unit: "2 pcs",
    image: "https://static.toiimg.com/photo/94838636.cms",
    description: "Cool & crisp fresh cucumbers.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 10,
    name: "Beetroot (Chukandar)",
    category: "Vegetables",
    price: 30,
    unit: "2 pcs",
    image:
      "https://images.unsplash.com/photo-1591304332314-00dbc6de8357?w=400&h=300&fit=crop&auto=format",
    description: "Deep-purple beetroot, naturally sweet.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 11,
    name: "Green Peas (Matar)",
    category: "Vegetables",
    price: 40,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=400&h=300&fit=crop&auto=format",
    badge: "Fresh",
    description: "Sweet shelled fresh green peas.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 12,
    name: "Garlic (Lahsun)",
    category: "Vegetables",
    price: 30,
    unit: "100 g",
    image:
      "https://images.unsplash.com/photo-1612823711171-e296662098fa?w=400&h=300&fit=crop&auto=format",
    description: "Plump garlic bulbs, full of flavour.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 13,
    name: "Lady Finger (Bhindi)",
    category: "Vegetables",
    price: 30,
    unit: "250 g",
    image:
      "https://th.bing.com/th/id/R.154fe436b5688a29f82820107fa723b1?rik=wJOSxtr6N0GoZg&riu=http%3a%2f%2ftips.pk%2fwp-content%2fuploads%2f2015%2f12%2flady-fingers.jpg&ehk=ozFWm79zAZTYEYxdbp0TLRVYsnYNqKZKuzbEdT18Whs%3d&risl=&pid=ImgRaw&r=0",
    badge: "Fresh",
    description: "Tender green okra pods, farm fresh.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 14,
    name: "Bitter Gourd (Karela)",
    category: "Vegetables",
    price: 25,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1508747934946-4707f5f8839a?w=400&h=300&fit=crop&auto=format",
    description: "Fresh bitter gourd, great for health.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 15,
    name: "Bottle Gourd (Lauki)",
    category: "Vegetables",
    price: 20,
    unit: "1 pc",
    image:
      "https://tiimg.tistatic.com/fp/1/007/589/-organic-fresh-green-bottle-gourd-grown-without-pesticides-or-chemicals-449.jpg",
    description: "Fresh tender bottle gourd, light.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 16,
    name: "Pumpkin (Kaddu)",
    category: "Vegetables",
    price: 30,
    unit: "500 g",
    image:
      "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop&auto=format",
    description: "Orange pumpkin, sweet & nutritious.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 17,
    name: "Sweet Corn (Bhutta)",
    category: "Vegetables",
    price: 20,
    unit: "2 pcs",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop&auto=format",
    description: "Fresh sweet corn, perfect for roasting.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 18,
    name: "Mushroom",
    category: "Vegetables",
    price: 55,
    unit: "200 g",
    image:
      "https://www.lifeberrys.com/img/article/button-mushrooms-benefits-1682756758-lb.jpg",
    badge: "Fresh",
    description: "White button mushrooms, meaty texture.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 19,
    name: "Sweet Potato",
    category: "Vegetables",
    price: 35,
    unit: "500 g",
    image:
      "https://izzycooking.com/wp-content/uploads/2023/02/Sweet-Potatoes-01.jpg",
    badge: "Farm",
    description: "Purple-skinned sweet potato, rich.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 20,
    name: "French Beans",
    category: "Vegetables",
    price: 35,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400&h=300&fit=crop&auto=format",
    description: "Tender crisp French beans.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 21,
    name: "Drumstick (Sahjan)",
    category: "Vegetables",
    price: 25,
    unit: "4 pcs",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/4/BB/RC/UV/64576297/moringa-drumstick-hyderabad-organic-pkm-odc-500x500.jpg",
    badge: "Fresh",
    description: "Fresh moringa drumsticks, nutrient-rich.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 22,
    name: "Fenugreek (Methi)",
    category: "Vegetables",
    price: 15,
    unit: "1 bunch",
    image:
      "https://media.istockphoto.com/id/1599048610/photo/top-view-of-fenugreek-seed-or-methi-seeds-in-a-white-bowl-isolated-on-fenugreek-leaves-stack.jpg?s=1024x1024&w=is&k=20&c=eeIf8bor7IgzMHIcwq-Ha7rLND_3fbnycvOsTeiSw_w=",
    description: "Fresh methi leaves, slightly bitter.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },

  // ── Fruits ──
  {
    id: 23,
    name: "Alphonso Mangoes",
    category: "Fruits",
    price: 120,
    unit: "4 pcs",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/3/293109842/UH/GX/ZG/42519708/green-and-yellow-kesar-mango-packaging-1000x1000.jpg",
    badge: "Seasonal",
    description: "King of mangoes — sweet Alphonso.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },
  {
    id: 24,
    name: "Bananas (Kela)",
    category: "Fruits",
    price: 35,
    unit: "6 pcs",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop&auto=format",
    description: "Ripe yellow bananas, energy-packed.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },
  {
    id: 25,
    name: "Apple (Seb)",
    category: "Fruits",
    price: 80,
    unit: "4 pcs",
    image:
      "https://thumbs.dreamstime.com/b/box-freshly-harvested-apples-denmark-danish-sort-guldborg-49027754.jpg",
    badge: "Imported",
    description: "Crisp red apples, perfect for snacking.",
    inStock: true,
    shop: "Anand Fruits",
  },
  {
    id: 26,
    name: "Papaya (Papita)",
    category: "Fruits",
    price: 50,
    unit: "1 pc",
    image:
      "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=300&fit=crop&auto=format",
    description: "Ripe orange papaya, digestion-friendly.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },
  {
    id: 27,
    name: "Watermelon (Tarbuz)",
    category: "Fruits",
    price: 60,
    unit: "1 kg",
    image:
      "https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-Watermelon-Photo.jpg",
    badge: "Summer",
    description: "Juicy red watermelon, seedless.",
    inStock: true,
    shop: "Anand Fruits",
  },
  {
    id: 28,
    name: "Green Grapes (Angoor)",
    category: "Fruits",
    price: 70,
    unit: "500 g",
    image:
      "https://images.unsplash.com/photo-1637715924886-cbe4485f90b9?w=400&h=300&fit=crop&auto=format",
    description: "Green seedless grapes, sweet & juicy.",
    inStock: true,
    shop: "Anand Fruits",
  },
  {
    id: 29,
    name: "Pomegranate (Anar)",
    category: "Fruits",
    price: 90,
    unit: "2 pcs",
    image:
      "https://images.unsplash.com/photo-1574709755254-fcd942d09d5a?w=400&h=300&fit=crop&auto=format",
    description: "Ruby red pomegranates, antioxidant-rich.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },
  {
    id: 30,
    name: "Pineapple (Ananas)",
    category: "Fruits",
    price: 55,
    unit: "1 pc",
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop&auto=format",
    description: "Tropical sweet ripe pineapple.",
    inStock: true,
    shop: "Anand Fruits",
  },
  {
    id: 31,
    name: "Orange (Santra)",
    category: "Fruits",
    price: 60,
    unit: "4 pcs",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop&auto=format",
    badge: "Juicy",
    description: "Nagpur oranges, vitamin-C rich.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },
  {
    id: 32,
    name: "Kiwi",
    category: "Fruits",
    price: 95,
    unit: "4 pcs",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Kgds9-mc3pe9drxkZmb3aAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "Imported",
    description: "New Zealand kiwi, tangy & fresh.",
    inStock: true,
    shop: "Anand Fruits",
  },
  {
    id: 33,
    name: "Guava (Amrood)",
    category: "Fruits",
    price: 40,
    unit: "4 pcs",
    image:
      "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&h=300&fit=crop&auto=format",
    description: "Allahabad guava, sweet and aromatic.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },
  {
    id: 34,
    name: "Coconut (Nariyal)",
    category: "Fruits",
    price: 45,
    unit: "1 pc",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.8EH7WPTgUImr-WDvkroJjQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "original",
    description: "Fresh brown coconut, full of water.",
    inStock: true,
    shop: "Anand Fruits",
  },
  {
    id: 35,
    name: "Lemon (Nimbu)",
    category: "Fruits",
    price: 20,
    unit: "6 pcs",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.7_M5zG5qL6hpmMTbYMQ14gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Sour yellow lemons, rich in vitamin C.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },
  {
    id: 36,
    name: "Strawberry",
    category: "Fruits",
    price: 110,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop&auto=format",
    badge: "Seasonal",
    description: "Plump red strawberries, sweet-tart.",
    inStock: true,
    shop: "Anand Fruits",
  },
  {
    id: 37,
    name: "Chikoo (Sapota)",
    category: "Fruits",
    price: 50,
    unit: "4 pcs",
    image:
      "https://images.hindustantimes.com/img/2022/04/23/1600x900/chikoo_thumb_1650707244686_1650707289528.jpg",
    description: "Brown sweet chikoo, caramel-like taste.",
    inStock: true,
    shop: "Fresh Fruit Hub",
  },

  // ── Dry Fruits ──
  {
    id: 38,
    name: "Cashews (Kaju)",
    category: "Dry Fruits",
    price: 220,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1615485925873-7ecbbe90a866?w=400&h=300&fit=crop&auto=format",
    badge: "Premium",
    description: "Whole raw cashews, creamy & buttery.",
    inStock: true,
    shop: "Nutri Dry Fruits",
  },
  {
    id: 39,
    name: "Almonds (Badam)",
    category: "Dry Fruits",
    price: 250,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1631815333332-e3ffb24e2bf8?w=400&h=300&fit=crop&auto=format",
    badge: "California",
    description: "California almonds, great for health.",
    inStock: true,
    shop: "Nutri Dry Fruits",
  },
  {
    id: 40,
    name: "Walnuts (Akhrot)",
    category: "Dry Fruits",
    price: 280,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1524593656068-fbac72624bb0?w=400&h=300&fit=crop&auto=format",
    description: "Omega-3 rich whole walnuts.",
    inStock: true,
    shop: "Nutri Dry Fruits",
  },
  {
    id: 41,
    name: "Raisins (Kishmish)",
    category: "Dry Fruits",
    price: 80,
    unit: "250 g",
    image:
      "https://kharibaoli.co.in/wp-content/uploads/2025/12/kishmish-image-2.png",
    badge: "natural",
    description: "Golden raisins, naturally sweet.",
    inStock: true,
    shop: "Mahesh Dry Fruits",
  },
  {
    id: 42,
    name: "Pistachios (Pista)",
    category: "Dry Fruits",
    price: 300,
    unit: "250 g",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/05/pjimage-14-1622025328.jpg",
    badge: "Premium",
    description: "Green pistachios, roasted & salted.",
    inStock: true,
    shop: "Mahesh Dry Fruits",
  },
  {
    id: 43,
    name: "Dates (Khajoor)",
    category: "Dry Fruits",
    price: 150,
    unit: "500 g",
    image:
      "https://images.unsplash.com/photo-1774857247287-d68599847107?w=400&h=300&fit=crop&auto=format",
    description: "Medjool dates, natural energy booster.",
    inStock: true,
    shop: "Mahesh Dry Fruits",
  },
  {
    id: 44,
    name: "Dried Apricots (Khubani)",
    category: "Dry Fruits",
    price: 140,
    unit: "200 g",
    image:
      "https://zafranzephyr.com/cdn/shop/files/6_3d19d922-6cc7-432c-a299-ee71201fb6d3.png?v=1770182344&width=1500",
    description: "Dried Afghan apricots, tangy-sweet.",
    inStock: true,
    shop: "Nutri Dry Fruits",
  },
  {
    id: 45,
    name: "Fig (Anjeer)",
    category: "Dry Fruits",
    price: 180,
    unit: "200 g",
    image:
      "https://5.imimg.com/data5/YA/HP/MY-52034904/dry-anjeer-500x500.jpg",
    description: "Dried figs, fibre & iron-rich.",
    inStock: true,
    shop: "Mahesh Dry Fruits",
  },
  {
    id: 46,
    name: "Fox Nuts (Makhana)",
    category: "Dry Fruits",
    price: 120,
    unit: "100 g",
    image:
      "https://img.freepik.com/premium-photo/makhana-also-called-as-lotus-seeds-fox-nuts-are-popular-dry-snacks-from-india-served-bowl-selective-focus_466689-19109.jpg?w=2000",
    badge: "Roasted",
    description: "Light roasted makhana, low calorie.",
    inStock: true,
    shop: "Nutri Dry Fruits",
  },
  {
    id: 47,
    name: "Peanuts (Mungfali)",
    category: "Dry Fruits",
    price: 45,
    unit: "250 g",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2024/8/442357267/VI/WN/JW/155129467/peanuts-mungfali-singdana-groundnut-1000x1000.jpg",
    description: "Raw shelled peanuts, protein-rich.",
    inStock: true,
    shop: "Mahesh Dry Fruits",
  },
  {
    id: 48,
    name: "Chia Seeds",
    category: "Dry Fruits",
    price: 150,
    unit: "100 g",
    image:
      "https://images.healthshots.com/healthshots/en/uploads/2023/03/16203911/chia-seeds-1.jpg",
    badge: "Superfood",
    description: "Black chia seeds, omega-3 powerhouse.",
    inStock: true,
    shop: "Nutri Dry Fruits",
  },

  // ── Dairy & Eggs ──
  {
    id: 49,
    name: "Farm Eggs",
    category: "Dairy & Eggs",
    price: 90,
    unit: "12 pcs",
    image:
      "https://th.bing.com/th/id/R.bc0cb8e6120d0bcf19b0c9cf77982b74?rik=NsfsswFLsmXJtg&riu=http%3a%2f%2fwearefreedomfarms.com%2fcdn%2fshop%2fproducts%2fUntitleddesign_24_f77fbb64-9a78-45f2-8df6-1d15ec3bf862_1200x1200.png%3fv%3d1686918433&ehk=EDj%2bRqBBsibkN8aBV9g7FR%2b8bhrUH9mdObkcW23nqNI%3d&risl=&pid=ImgRaw&r=0",
    badge: "Free Range",
    description: "Free-range brown farm fresh eggs.",
    inStock: true,
    shop: "Mother Dairy Booth",
  },
  {
    id: 50,
    name: "Full Cream Milk",
    category: "Dairy & Eggs",
    price: 60,
    unit: "1 litre",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop&auto=format",
    description: "Fresh pasteurised full cream milk.",
    inStock: true,
    shop: "Mother Dairy Booth",
  },
  {
    id: 51,
    name: "Paneer (Cottage Cheese)",
    category: "Dairy & Eggs",
    price: 80,
    unit: "200 g",
    image:
      "https://cheeseknees.com/wp-content/uploads/2021/04/paneer2sq-1024x1024.jpg",
    badge: "Fresh",
    description: "Soft fresh paneer, home-style.",
    inStock: true,
    shop: "Mother Dairy Booth",
  },
  {
    id: 52,
    name: "Dahi (Curd)",
    category: "Dairy & Eggs",
    price: 45,
    unit: "400 g",
    image:
      "https://5.imimg.com/data5/ANDROID/Default/2025/1/478567280/JD/MD/DT/94658519/product-jpeg-500x500.jpg",
    description: "Thick creamy set curd.",
    inStock: true,
    shop: "Mother Dairy Booth",
  },
  {
    id: 53,
    name: "Butter (Makhan)",
    category: "Dairy & Eggs",
    price: 55,
    unit: "100 g",
    image:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop&auto=format",
    description: "Salted white butter, rich & creamy.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 54,
    name: "Organic Milk",
    category: "Dairy & Eggs",
    price: 75,
    unit: "1 litre",
    image:
      "https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?w=400&h=300&fit=crop&auto=format",
    badge: "Organic",
    description: "Certified organic cow milk.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 55,
    name: "Buttermilk (Chaas)",
    category: "Dairy & Eggs",
    price: 25,
    unit: "500 ml",
    image:
      "https://thumbs.dreamstime.com/b/buttermilk-chaas-indian-drink-masala-savory-india-143036046.jpg",
    description: "Chilled spiced buttermilk, refreshing.",
    inStock: true,
    shop: "Mother Dairy Booth",
  },
  {
    id: 56,
    name: "Cheese Slices",
    category: "Dairy & Eggs",
    price: 85,
    unit: "10 slices",
    image:
      "https://www.contracttesting.com/wp-content/uploads/2018/11/shutterstock_419194129.jpg",
    description: "Processed cheese slices, melt-ready.",
    inStock: true,
    shop: "Om General Store",
  },

  // ── Grains & Pulses ──
  {
    id: 57,
    name: "Basmati Rice",
    category: "Grains & Pulses",
    price: 110,
    unit: "1 kg",
    image:
      "https://www.thespruceeats.com/thmb/dcr8sHq3QyEfm2DmmRTK4UZ2uiA=/5184x3456/filters:no_upscale():max_bytes(150000):strip_icc()/basmati-rice-in-a-bowl-with-a-spoon-519309138-7ca58970c0914bb9b117d43cb09d7dd8.jpg",
    badge: "Premium",
    description: "Long-grain aged Basmati rice.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 58,
    name: "Toor Dal (Arhar)",
    category: "Grains & Pulses",
    price: 90,
    unit: "500 g",
    image:
      "https://organofarmstore.co.in/wp-content/uploads/2023/09/toor-dal.jpg",
    badge: "organic",
    description: "High-quality split pigeon peas.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 59,
    name: "Wheat Flour (Atta)",
    category: "Grains & Pulses",
    price: 55,
    unit: "1 kg",
    image:
      "https://www.mezzonifoods.com/wp-content/uploads/2022/09/Is-cultured-wheat-flour-vegan-scaled.jpeg",
    badge: "HomeMade",
    description: "Whole wheat chakki-ground atta.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 60,
    name: "Chana Dal",
    category: "Grains & Pulses",
    price: 80,
    unit: "500 g",
    image:
      "https://image.shutterstock.com/image-photo/chana-dal-split-chickpeas-isolated-260nw-1206121933.jpg",
    description: "Split yellow chickpeas, protein-rich.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 61,
    name: "Moong Dal",
    category: "Grains & Pulses",
    price: 85,
    unit: "500 g",
    image:
      "https://st4.depositphotos.com/4940251/20999/i/1600/depositphotos_209991374-stock-photo-split-green-gram-moong-dal.jpg",
    description: "Yellow moong dal, light & nutritious.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 62,
    name: "Rajma (Kidney Beans)",
    category: "Grains & Pulses",
    price: 70,
    unit: "500 g",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.hy1ERAOgDG65rqj8_7gwCAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "hygine",
    description: "Red kidney beans for hearty curries.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 63,
    name: "Sooji (Semolina)",
    category: "Grains & Pulses",
    price: 40,
    unit: "500 g",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2024/11/463826575/PA/LH/KF/233282599/sooji-500x500.jpg",
    description: "Fine sooji for halwa, upma & idli.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 64,
    name: "Oats (Jaie)",
    category: "Grains & Pulses",
    price: 75,
    unit: "500 g",
    image:
      "https://www.thesouthafrican.com/wp-content/uploads/2020/05/50abc54c-oats.jpeg",
    badge: "Healthy",
    description: "Rolled oats, great for breakfast.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 65,
    name: "Kabuli Chana",
    category: "Grains & Pulses",
    price: 90,
    unit: "500 g",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/7/BF/CC/MQ/155253254/white-kabuli-chana-1000x1000.jpg",
    badge: "organic",
    description: "White chickpeas for chole & salads.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 66,
    name: "Masoor Dal (Red Lentil)",
    category: "Grains & Pulses",
    price: 80,
    unit: "500 g",
    image:
      "https://thumbs.dreamstime.com/b/red-lentils-masoor-dal-pottery-255288521.jpg",
    description: "Red lentils, quick-cooking & nutritious.",
    inStock: true,
    shop: "Om General Store",
  },

  // ── Herbs & Spices ──
  {
    id: 67,
    name: "Fresh Coriander (Dhaniya)",
    category: "Herbs & Spices",
    price: 15,
    unit: "1 bunch",
    image:
      "https://thumbs.dreamstime.com/b/fresh-coriander-market-37635018.jpg",
    badge: "Fresh",
    description: "Aromatic fresh coriander leaves.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 68,
    name: "Ginger (Adrak)",
    category: "Herbs & Spices",
    price: 20,
    unit: "100 g",
    image:
      "https://static.vecteezy.com/system/resources/previews/030/677/188/large_2x/product-shots-of-ginger-high-quality-4k-ultra-hd-free-photo.jpg",
    badge: "Fresh",
    description: "Fresh ginger root, pungent & flavourful.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 69,
    name: "Fresh Mint (Pudina)",
    category: "Herbs & Spices",
    price: 10,
    unit: "1 bunch",
    image:
      "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&h=300&fit=crop&auto=format",
    description: "Cooling fresh mint leaves.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 70,
    name: "Curry Leaves (Kadhi Patta)",
    category: "Herbs & Spices",
    price: 10,
    unit: "1 bunch",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.LxzBDHGtzwGPUcO7fAWn8gHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "Fresh",
    description: "Fresh fragrant curry leaves for tadka.",
    inStock: true,
    shop: "Green Valley Store",
  },
  {
    id: 71,
    name: "Green Chillies (Hari Mirch)",
    category: "Herbs & Spices",
    price: 15,
    unit: "100 g",
    image:
      "https://cpimg.tistatic.com/07073327/b/5/Fresh-green-chillies.jpg",
    badge: "Fresh",
    description: "Fresh spicy green chillies.",
    inStock: true,
    shop: "Sharma Sabzi Wala",
  },
  {
    id: 72,
    name: "Turmeric Powder (Haldi)",
    category: "Herbs & Spices",
    price: 35,
    unit: "100 g",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/2/HT/UO/NO/144518197/dry-turmeric-powder-1000x1000.jpg",
    badge: "HomeMade",
    description: "Pure yellow haldi, anti-inflammatory.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 73,
    name: "Red Chilli Powder",
    category: "Herbs & Spices",
    price: 30,
    unit: "100 g",
    image:
      "https://th.bing.com/th/id/OIP.xRMeBh6bHILdatFbyeEwNgHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "HomMade 🌶️",
    description: "Kashmiri red chilli powder, vibrant.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 74,
    name: "Cumin Seeds (Jeera)",
    category: "Herbs & Spices",
    price: 25,
    unit: "100 g",
    image:
      "https://th.bing.com/th/id/OIP.akM588byPZjwEsQa4lhJiwHaHa?w=194&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    description: "Aromatic cumin seeds for tadka.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 75,
    name: "Mustard Seeds (Sarson)",
    category: "Herbs & Spices",
    price: 20,
    unit: "100 g",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&auto=format",
    description: "Black mustard seeds for tempering.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 76,
    name: "Coriander Powder (Dhaniya)",
    category: "Herbs & Spices",
    price: 25,
    unit: "100 g",
    image:
      "https://static.vecteezy.com/system/resources/previews/016/584/304/non_2x/coriander-powder-or-dhaniya-powder-free-photo.jpg",
    description: "Ground coriander, mildly citrusy.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 77,
    name: "Garam Masala",
    category: "Herbs & Spices",
    price: 40,
    unit: "100 g",
    image:
      "https://cdn.shopify.com/s/files/1/1751/6601/products/Garam_masala_powder_1_1400x.jpg?v=1580209063",
    badge: "Aromatic",
    description: "Whole-spice blend for rich flavour.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 78,
    name: "Black Pepper (Kali Mirch)",
    category: "Herbs & Spices",
    price: 60,
    unit: "50 g",
    image:
      "https://cdn.shopify.com/s/files/1/0007/7774/8546/products/Black_Pepper_ground_2000x.jpg?v=1521895926",
    description: "Whole black peppercorns, pungent.",
    inStock: true,
    shop: "Raju Kirana",
  },

  // ── Snacks & Namkeen ──
  {
    id: 79,
    name: "Aloo Bhujia",
    category: "Snacks & Namkeen",
    price: 30,
    unit: "200 g",
    image:
      "https://media.istockphoto.com/id/1421859187/photo/indian-snack-food-aloo-bhujia-in-a-plate-on-white-background.jpg?s=612x612&w=0&k=20&c=e_791G0_lW2kkhAAyoNr-LfTpoBYjun_06ZapqBCsYg=",
    badge: "HomeMade",
    description: "Crunchy aloo bhujia sev snack.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 80,
    name: "Roasted Peanuts",
    category: "Snacks & Namkeen",
    price: 35,
    unit: "200 g",
    image:
      "https://tse1.explicit.bing.net/th/id/OIP.xMgBKq2LndpSQdEaJ5OCiwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Salted roasted peanuts, great snack.",
    inStock: true,
    shop: "Mahesh Dry Fruits",
  },
  {
    id: 81,
    name: "Murmura (Puffed Rice)",
    category: "Snacks & Namkeen",
    price: 20,
    unit: "200 g",
    image:
      "https://images.tv9bangla.com/wp-content/uploads/2023/06/puffed-rice-2-1.jpg",
    description: "Light puffed rice for bhel & chaat.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 82,
    name: "Popcorn (Ready to cook)",
    category: "Snacks & Namkeen",
    price: 25,
    unit: "100 g",
    image:
      "https://c8.alamy.com/comp/HF735J/yellow-raw-popcorn-kernels-in-wooden-bowl-with-salted-popped-popcorn-HF735J.jpg",
    description: "Butter popcorn kernels, easy to pop.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 83,
    name: "Chivda (Poha Mix)",
    category: "Snacks & Namkeen",
    price: 35,
    unit: "200 g",
    image:
      "https://i0.wp.com/spicezone2.wpengine.com/wp-content/uploads/2016/10/DSC_4694.jpg?ssl=1",
    description: "Crispy spiced flattened rice mix.",
    inStock: true,
    shop: "Raju Kirana",
  },

  // ── Oils & Ghee ──
  {
    id: 84,
    name: "Mustard Oil (Sarson Tel)",
    category: "Oils & Ghee",
    price: 130,
    unit: "1 litre",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.XM0lbtcTUyaSO96qpatVVAHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Cold-pressed kachi ghani mustard oil.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 85,
    name: "Desi Ghee",
    category: "Oils & Ghee",
    price: 280,
    unit: "500 g",
    image:
      "https://5.imimg.com/data5/GLADMIN/Default/2021/8/BZ/SB/XS/115803280/organic-desi-cow-ghee-a2-1000x1000.jpg",
    badge: "Pure",
    description: "Pure cow ghee, slow-churned.",
    inStock: true,
    shop: "Mother Dairy Booth",
  },
  {
    id: 86,
    name: "Sunflower Oil",
    category: "Oils & Ghee",
    price: 110,
    unit: "1 litre",
    image:
      "https://minnetonkaorchards.com/wp-content/uploads/2022/12/Sunflower-Oil-SS-1467158933.jpg",
    description: "Refined sunflower oil, light & healthy.",
    inStock: true,
    shop: "Raju Kirana",
  },
  {
    id: 87,
    name: "Coconut Oil (Nariyal Tel)",
    category: "Oils & Ghee",
    price: 150,
    unit: "500 ml",
    image:
      "https://png.pngtree.com/thumb_back/fw800/background/20240518/pngtree-a-visually-appealing-and-realistic-image-of-coconut-oil-image_15796995.jpg",
    badge: "Virgin",
    description: "Virgin cold-pressed coconut oil.",
    inStock: true,
    shop: "Om General Store",
  },
  {
    id: 88,
    name: "Groundnut Oil (Moongfali)",
    category: "Oils & Ghee",
    price: 140,
    unit: "1 litre",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.1880Wpq8x3JbLTCSiU1NEwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "original",
    description: "Pure groundnut oil for frying.",
    inStock: true,
    shop: "Raju Kirana",
  },
];

const CATEGORIES = [
  "All",
  "Vegetables",
  "Fruits",
  "Dry Fruits",
  "Dairy & Eggs",
  "Grains & Pulses",
  "Herbs & Spices",
  "Snacks & Namkeen",
  "Oils & Ghee",
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [locationPickerOpen, setLocationPickerOpen] =
    useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<Location>(LOCATIONS[0]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat =
        selectedCategory === "All" ||
        p.category === selectedCategory;
      const matchSearch =
        p.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        p.shop
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchLocation =
        selectedLocation.nearbyShops.includes(p.shop);
      return matchCat && matchSearch && matchLocation;
    });
  }, [selectedCategory, searchQuery, selectedLocation]);

  // Pendo: debounced product search tracking
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const currentResults = filteredProducts.length;
    const timeout = setTimeout(() => {
      if (typeof pendo !== "undefined") {
        pendo.track("product_searched", {
          search_query: searchQuery,
          results_count: currentResults,
          active_category: selectedCategory,
          selected_location_area: selectedLocation.area,
          selected_location_city: selectedLocation.city,
          has_results: currentResults > 0,
        });
      }
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce(
    (s, i) => s + i.qty * i.price,
    0,
  );

  const addToCart = (product: Product) => {
    const existing = cart.find((i) => i.id === product.id);

    if (typeof pendo !== "undefined") {
      pendo.track("product_added_to_cart", {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
        product_price: product.price,
        product_unit: product.unit,
        product_shop: product.shop,
        product_badge: product.badge || "",
        is_first_add: !existing,
        new_quantity: existing ? existing.qty + 1 : 1,
        cart_total_items: cartCount + 1,
        cart_total_value: cartTotal + product.price,
      });
    }

    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) {
        toast.success(`${product.name} quantity updated`);
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, qty: Math.max(0, i.qty + delta) }
            : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (item && typeof pendo !== "undefined") {
      const remainingItems = cart.filter((i) => i.id !== id);
      pendo.track("cart_item_removed", {
        product_id: item.id,
        product_name: item.name,
        product_category: item.category,
        product_price: item.price,
        product_shop: item.shop,
        quantity_at_removal: item.qty,
        remaining_cart_items: remainingItems.reduce((s, i) => s + i.qty, 0),
        remaining_cart_value: remainingItems.reduce((s, i) => s + i.qty * i.price, 0),
      });
    }
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast("Item removed from cart");
  };

  const handlePlaceOrder = () => {
    const deliveryFee = cartTotal > 299 ? 0 : 30;
    if (typeof pendo !== "undefined") {
      pendo.track("order_placed", {
        order_total: cartTotal + deliveryFee,
        subtotal: cartTotal,
        delivery_fee: deliveryFee,
        is_free_delivery: deliveryFee === 0,
        item_count: cartCount,
        unique_product_count: cart.length,
        selected_location_area: selectedLocation.area,
        selected_location_city: selectedLocation.city,
      });
    }
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 5000);
    toast.success("Order placed! Delivery in 30–60 mins 🚚");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--background)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Toaster position="top-right" richColors />

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 shadow-sm"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <ShoppingBasket size={20} color="white" />
            </div>
            <div>
              <span
                className="font-extrabold tracking-tight text-lg"
                style={{
                  color: "var(--primary)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Kirana FreeBasket
              </span>
              <p
                className="text-xs leading-none"
                style={{ color: "var(--muted-foreground)" }}
              >
                Local. Fresh. Fast.
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--muted-foreground)" }}
            />
            <input
              type="text"
              placeholder="Search products or shop name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm transition-all"
              style={{
                background: "var(--input-background)",
                border: "1.5px solid transparent",
                color: "var(--foreground)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--primary)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "transparent")
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocationPickerOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all hover:opacity-80"
              style={{
                background: "var(--secondary)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <MapPin
                size={14}
                style={{ color: "var(--primary)" }}
              />
              <span className="font-semibold max-w-[150px] truncate">
                {selectedLocation.area},{" "}
                {selectedLocation.state}
              </span>
              <ChevronDown
                size={13}
                style={{ color: "var(--muted-foreground)" }}
              />
            </button>
            <button
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              <Bell size={18} />
            </button>
            <button
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              <User size={18} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: "var(--primary)",
                color: "white",
              }}
            >
              <ShoppingBasket size={16} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search + Location */}
        <div className="md:hidden px-4 pb-3 space-y-2">
          <button
            onClick={() => setLocationPickerOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <MapPin
              size={14}
              style={{ color: "var(--primary)" }}
            />
            <span
              className="font-semibold flex-1 text-left truncate"
              style={{ color: "var(--foreground)" }}
            >
              {selectedLocation.area}, {selectedLocation.state}
            </span>
            <ChevronDown
              size={13}
              style={{ color: "var(--muted-foreground)" }}
            />
          </button>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--muted-foreground)" }}
            />
            <input
              type="text"
              placeholder="Search products or shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl outline-none text-sm"
              style={{
                background: "var(--input-background)",
                color: "var(--foreground)",
              }}
            />
          </div>
        </div>
      </nav>

      {orderPlaced && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 text-white font-semibold text-sm whitespace-nowrap"
          style={{ background: "var(--primary)" }}
        >
          <span className="text-xl">🚚</span>
          Order confirmed! Arriving in 30–60 mins →
        </div>
      )}

      <HeroBanner
        onShopNow={() => {
          setSelectedCategory("All");
          setSearchQuery("");
        }}
      />

      {/* Nearby Shops Strip */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <button
            onClick={() => setLocationPickerOpen(true)}
            className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: "var(--primary)",
              color: "white",
            }}
          >
            <MapPin size={11} />
            {selectedLocation.area}
            <ChevronDown size={11} />
          </button>
          <span
            className="text-xs flex-shrink-0"
            style={{ color: "var(--muted-foreground)" }}
          >
            Shops near you:
          </span>
          {selectedLocation.nearbyShops.map((shop) => (
            <div
              key={shop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0"
              style={{
                background: "var(--secondary)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <span>🏪</span>
              <span>{shop}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Info strip */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
          {[
            { icon: "🚚", text: "Free delivery above ₹299" },
            { icon: "⏱️", text: "30–60 min delivery" },
            { icon: "🌿", text: "Fresh & Organic" },
            { icon: "💳", text: "COD & Online Pay" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{
                background: "var(--secondary)",
                color: "var(--foreground)",
              }}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2
            className="font-bold text-xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--foreground)",
            }}
          >
            {selectedCategory === "All"
              ? "All Products"
              : selectedCategory}
            <span
              className="ml-2 text-sm font-normal"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              ({filteredProducts.length} items)
            </span>
          </h2>
        </div>

        <CategoryFilter
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl">🔍</span>
            <p
              className="mt-4 font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : `No products in ${selectedCategory} near ${selectedLocation.area}`}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--muted-foreground)" }}
            >
              Try changing your location or category
            </p>
            <div className="flex gap-2 justify-center mt-4 flex-wrap">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: "var(--secondary)",
                  color: "var(--foreground)",
                }}
              >
                Clear filters
              </button>
              <button
                onClick={() => setLocationPickerOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                style={{
                  background: "var(--primary)",
                  color: "white",
                }}
              >
                <MapPin size={14} /> Change Location
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQty={
                  cart.find((i) => i.id === product.id)?.qty ??
                  0
                }
                onAdd={() => addToCart(product)}
                onInc={() => updateQty(product.id, 1)}
                onDec={() => updateQty(product.id, -1)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Sticky mobile cart bar */}
      {cartCount > 0 && !cartOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 md:hidden p-4 z-40"
          style={{
            background: "white",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            onClick={() => setCartOpen(true)}
            className="w-full py-3.5 rounded-xl font-bold flex items-center justify-between px-5"
            style={{
              background: "var(--primary)",
              color: "white",
            }}
          >
            <span className="text-sm">
              {cartCount} item{cartCount > 1 ? "s" : ""} in cart
            </span>
            <span className="flex items-center gap-2">
              ₹{cartTotal} <ShoppingBasket size={18} />
            </span>
          </button>
        </div>
      )}

      <LocationPicker
        open={locationPickerOpen}
        onClose={() => setLocationPickerOpen(false)}
        selected={selectedLocation}
        onSelect={(loc) => {
          if (typeof pendo !== "undefined") {
            pendo.track("location_changed", {
              new_location_id: loc.id,
              new_location_area: loc.area,
              new_location_city: loc.city,
              new_location_state: loc.state,
              new_location_pincode: loc.pincode,
              previous_location_id: selectedLocation.id,
              previous_location_area: selectedLocation.area,
              nearby_shops_count: loc.nearbyShops.length,
              cart_items_cleared: cartCount,
            });
          }
          setSelectedLocation(loc);
          setCart([]);
          setSelectedCategory("All");
          toast.success(
            `Location set to ${loc.area}, ${loc.city}`,
          );
        }}
      />

      <ShoppingCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onInc={(id) => updateQty(id, 1)}
        onDec={(id) => updateQty(id, -1)}
        onRemove={removeFromCart}
        total={cartTotal}
        onCheckout={() => {
          if (typeof pendo !== "undefined") {
            const deliveryFee = cartTotal > 299 ? 0 : 30;
            pendo.track("checkout_initiated", {
              cart_total_value: cartTotal,
              cart_item_count: cartCount,
              unique_product_count: cart.length,
              delivery_fee: deliveryFee,
              is_free_delivery: deliveryFee === 0,
            });
          }
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}