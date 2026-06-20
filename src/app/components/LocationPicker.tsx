import { useState, useMemo } from "react";
import { X, MapPin, Search, ChevronRight, Navigation, CheckCircle2 } from "lucide-react";

export type Location = {
  id: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  nearbyShops: string[];
};

const SHOP_SETS = [
  ["Sharma Sabzi Wala", "Raju Kirana", "Om General Store"],
  ["Green Valley Store", "Fresh Fruit Hub", "Mother Dairy Booth"],
  ["Anand Fruits", "Nutri Dry Fruits", "Raju Kirana"],
  ["Mahesh Dry Fruits", "Sharma Sabzi Wala", "Om General Store"],
  ["Fresh Fruit Hub", "Green Valley Store", "Anand Fruits"],
  ["Mother Dairy Booth", "Nutri Dry Fruits", "Mahesh Dry Fruits"],
  ["Raju Kirana", "Anand Fruits", "Green Valley Store"],
  ["Om General Store", "Sharma Sabzi Wala", "Fresh Fruit Hub"],
];

const s = (i: number) => SHOP_SETS[i % SHOP_SETS.length];

const RAW: Omit<Location, "nearbyShops">[] = [
  // ── Andhra Pradesh ──
  { id: "ap-amaravati",        area: "Amaravati",          city: "Amaravati",         district: "Guntur",            state: "Andhra Pradesh",       pincode: "522020" },
  { id: "ap-visakhapatnam",    area: "Visakhapatnam",      city: "Visakhapatnam",     district: "Visakhapatnam",     state: "Andhra Pradesh",       pincode: "530001" },
  { id: "ap-vijayawada",       area: "Vijayawada",         city: "Vijayawada",        district: "Krishna",           state: "Andhra Pradesh",       pincode: "520001" },
  { id: "ap-guntur",           area: "Guntur",             city: "Guntur",            district: "Guntur",            state: "Andhra Pradesh",       pincode: "522001" },
  { id: "ap-tirupati",         area: "Tirupati",           city: "Tirupati",          district: "Chittoor",          state: "Andhra Pradesh",       pincode: "517501" },
  { id: "ap-nellore",          area: "Nellore",            city: "Nellore",           district: "SPSR Nellore",      state: "Andhra Pradesh",       pincode: "524001" },
  { id: "ap-kurnool",          area: "Kurnool",            city: "Kurnool",           district: "Kurnool",           state: "Andhra Pradesh",       pincode: "518001" },
  { id: "ap-kakinada",         area: "Kakinada",           city: "Kakinada",          district: "East Godavari",     state: "Andhra Pradesh",       pincode: "533001" },
  { id: "ap-rajahmundry",      area: "Rajahmundry",        city: "Rajahmundry",       district: "East Godavari",     state: "Andhra Pradesh",       pincode: "533101" },
  { id: "ap-ongole",           area: "Ongole",             city: "Ongole",            district: "Prakasam",          state: "Andhra Pradesh",       pincode: "523001" },
  // ── Arunachal Pradesh ──
  { id: "ar-itanagar",         area: "Itanagar",           city: "Itanagar",          district: "Papum Pare",        state: "Arunachal Pradesh",    pincode: "791111" },
  { id: "ar-naharlagun",       area: "Naharlagun",         city: "Naharlagun",        district: "Papum Pare",        state: "Arunachal Pradesh",    pincode: "791110" },
  { id: "ar-tawang",           area: "Tawang",             city: "Tawang",            district: "Tawang",            state: "Arunachal Pradesh",    pincode: "790104" },
  // ── Assam ──
  { id: "as-guwahati",         area: "Guwahati",           city: "Guwahati",          district: "Kamrup",            state: "Assam",                pincode: "781001" },
  { id: "as-dispur",           area: "Dispur",             city: "Guwahati",          district: "Kamrup",            state: "Assam",                pincode: "781006" },
  { id: "as-silchar",          area: "Silchar",            city: "Silchar",           district: "Cachar",            state: "Assam",                pincode: "788001" },
  { id: "as-dibrugarh",        area: "Dibrugarh",          city: "Dibrugarh",         district: "Dibrugarh",         state: "Assam",                pincode: "786001" },
  { id: "as-jorhat",           area: "Jorhat",             city: "Jorhat",            district: "Jorhat",            state: "Assam",                pincode: "785001" },
  { id: "as-nagaon",           area: "Nagaon",             city: "Nagaon",            district: "Nagaon",            state: "Assam",                pincode: "782001" },
  { id: "as-tezpur",           area: "Tezpur",             city: "Tezpur",            district: "Sonitpur",          state: "Assam",                pincode: "784001" },
  // ── Bihar ──
  { id: "br-patna",            area: "Patna City",         city: "Patna",             district: "Patna",             state: "Bihar",                pincode: "800001" },
  { id: "br-patna-exhibition", area: "Exhibition Road",    city: "Patna",             district: "Patna",             state: "Bihar",                pincode: "800001" },
  { id: "br-gaya",             area: "Gaya",               city: "Gaya",              district: "Gaya",              state: "Bihar",                pincode: "823001" },
  { id: "br-muzaffarpur",      area: "Muzaffarpur",        city: "Muzaffarpur",       district: "Muzaffarpur",       state: "Bihar",                pincode: "842001" },
  { id: "br-bhagalpur",        area: "Bhagalpur",          city: "Bhagalpur",         district: "Bhagalpur",         state: "Bihar",                pincode: "812001" },
  { id: "br-darbhanga",        area: "Darbhanga",          city: "Darbhanga",         district: "Darbhanga",         state: "Bihar",                pincode: "846001" },
  { id: "br-purnia",           area: "Purnea",             city: "Purnea",            district: "Purnia",            state: "Bihar",                pincode: "854301" },
  { id: "br-ara",              area: "Ara",                city: "Ara",               district: "Bhojpur",           state: "Bihar",                pincode: "802301" },
  // ── Chhattisgarh ──
  { id: "cg-raipur",           area: "Raipur",             city: "Raipur",            district: "Raipur",            state: "Chhattisgarh",         pincode: "492001" },
  { id: "cg-bhilai",           area: "Bhilai",             city: "Bhilai",            district: "Durg",              state: "Chhattisgarh",         pincode: "490001" },
  { id: "cg-korba",            area: "Korba",              city: "Korba",             district: "Korba",             state: "Chhattisgarh",         pincode: "495677" },
  { id: "cg-bilaspur",         area: "Bilaspur",           city: "Bilaspur",          district: "Bilaspur",          state: "Chhattisgarh",         pincode: "495001" },
  { id: "cg-durg",             area: "Durg",               city: "Durg",              district: "Durg",              state: "Chhattisgarh",         pincode: "491001" },
  // ── Goa ──
  { id: "ga-panaji",           area: "Panaji",             city: "Panaji",            district: "North Goa",         state: "Goa",                  pincode: "403001" },
  { id: "ga-margao",           area: "Margao",             city: "Margao",            district: "South Goa",         state: "Goa",                  pincode: "403601" },
  { id: "ga-vasco",            area: "Vasco da Gama",      city: "Vasco da Gama",     district: "South Goa",         state: "Goa",                  pincode: "403802" },
  { id: "ga-mapusa",           area: "Mapusa",             city: "Mapusa",            district: "North Goa",         state: "Goa",                  pincode: "403507" },
  // ── Gujarat ──
  { id: "gj-ahmedabad",        area: "Ahmedabad City",     city: "Ahmedabad",         district: "Ahmedabad",         state: "Gujarat",              pincode: "380001" },
  { id: "gj-ahmedabad-sg",     area: "SG Highway",         city: "Ahmedabad",         district: "Ahmedabad",         state: "Gujarat",              pincode: "380054" },
  { id: "gj-gandhinagar",      area: "Gandhinagar",        city: "Gandhinagar",       district: "Gandhinagar",       state: "Gujarat",              pincode: "382010" },
  { id: "gj-surat",            area: "Surat City",         city: "Surat",             district: "Surat",             state: "Gujarat",              pincode: "395001" },
  { id: "gj-vadodara",         area: "Vadodara",           city: "Vadodara",          district: "Vadodara",          state: "Gujarat",              pincode: "390001" },
  { id: "gj-rajkot",           area: "Rajkot",             city: "Rajkot",            district: "Rajkot",            state: "Gujarat",              pincode: "360001" },
  { id: "gj-bhavnagar",        area: "Bhavnagar",          city: "Bhavnagar",         district: "Bhavnagar",         state: "Gujarat",              pincode: "364001" },
  { id: "gj-jamnagar",         area: "Jamnagar",           city: "Jamnagar",          district: "Jamnagar",          state: "Gujarat",              pincode: "361001" },
  { id: "gj-anand",            area: "Anand",              city: "Anand",             district: "Anand",             state: "Gujarat",              pincode: "388001" },
  { id: "gj-junagadh",         area: "Junagadh",           city: "Junagadh",          district: "Junagadh",          state: "Gujarat",              pincode: "362001" },
  // ── Haryana ──
  { id: "hr-gurugram",         area: "Gurugram",           city: "Gurugram",          district: "Gurugram",          state: "Haryana",              pincode: "122001" },
  { id: "hr-dlf",              area: "DLF Phase 2",        city: "Gurugram",          district: "Gurugram",          state: "Haryana",              pincode: "122002" },
  { id: "hr-faridabad",        area: "Faridabad",          city: "Faridabad",         district: "Faridabad",         state: "Haryana",              pincode: "121001" },
  { id: "hr-ambala",           area: "Ambala",             city: "Ambala",            district: "Ambala",            state: "Haryana",              pincode: "134003" },
  { id: "hr-hisar",            area: "Hisar",              city: "Hisar",             district: "Hisar",             state: "Haryana",              pincode: "125001" },
  { id: "hr-rohtak",           area: "Rohtak",             city: "Rohtak",            district: "Rohtak",            state: "Haryana",              pincode: "124001" },
  { id: "hr-panipat",          area: "Panipat",            city: "Panipat",           district: "Panipat",           state: "Haryana",              pincode: "132103" },
  { id: "hr-karnal",           area: "Karnal",             city: "Karnal",            district: "Karnal",            state: "Haryana",              pincode: "132001" },
  { id: "hr-sonipat",          area: "Sonipat",            city: "Sonipat",           district: "Sonipat",           state: "Haryana",              pincode: "131001" },
  { id: "hr-yamunanagar",      area: "Yamunanagar",        city: "Yamunanagar",       district: "Yamunanagar",       state: "Haryana",              pincode: "135001" },
  // ── Himachal Pradesh ──
  { id: "hp-shimla",           area: "Shimla",             city: "Shimla",            district: "Shimla",            state: "Himachal Pradesh",     pincode: "171001" },
  { id: "hp-dharamsala",       area: "Dharamsala",         city: "Dharamsala",        district: "Kangra",            state: "Himachal Pradesh",     pincode: "176215" },
  { id: "hp-manali",           area: "Manali",             city: "Manali",            district: "Kullu",             state: "Himachal Pradesh",     pincode: "175131" },
  { id: "hp-solan",            area: "Solan",              city: "Solan",             district: "Solan",             state: "Himachal Pradesh",     pincode: "173212" },
  { id: "hp-mandi",            area: "Mandi",              city: "Mandi",             district: "Mandi",             state: "Himachal Pradesh",     pincode: "175001" },
  // ── Jharkhand ──
  { id: "jh-ranchi",           area: "Ranchi",             city: "Ranchi",            district: "Ranchi",            state: "Jharkhand",            pincode: "834001" },
  { id: "jh-jamshedpur",       area: "Jamshedpur",         city: "Jamshedpur",        district: "East Singhbhum",    state: "Jharkhand",            pincode: "831001" },
  { id: "jh-dhanbad",          area: "Dhanbad",            city: "Dhanbad",           district: "Dhanbad",           state: "Jharkhand",            pincode: "826001" },
  { id: "jh-bokaro",           area: "Bokaro Steel City",  city: "Bokaro",            district: "Bokaro",            state: "Jharkhand",            pincode: "827001" },
  { id: "jh-hazaribagh",       area: "Hazaribagh",         city: "Hazaribagh",        district: "Hazaribagh",        state: "Jharkhand",            pincode: "825301" },
  // ── Karnataka ──
  { id: "ka-bengaluru",        area: "Bangalore City",     city: "Bengaluru",         district: "Bengaluru Urban",   state: "Karnataka",            pincode: "560001" },
  { id: "ka-koramangala",      area: "Koramangala",        city: "Bengaluru",         district: "Bengaluru Urban",   state: "Karnataka",            pincode: "560034" },
  { id: "ka-whitefield",       area: "Whitefield",         city: "Bengaluru",         district: "Bengaluru Urban",   state: "Karnataka",            pincode: "560066" },
  { id: "ka-mysuru",           area: "Mysuru",             city: "Mysuru",            district: "Mysuru",            state: "Karnataka",            pincode: "570001" },
  { id: "ka-hubli",            area: "Hubli",              city: "Hubli",             district: "Dharwad",           state: "Karnataka",            pincode: "580020" },
  { id: "ka-mangaluru",        area: "Mangaluru",          city: "Mangaluru",         district: "Dakshina Kannada",  state: "Karnataka",            pincode: "575001" },
  { id: "ka-belgavi",          area: "Belagavi",           city: "Belagavi",          district: "Belagavi",          state: "Karnataka",            pincode: "590001" },
  { id: "ka-gulbarga",         area: "Kalaburagi",         city: "Kalaburagi",        district: "Kalaburagi",        state: "Karnataka",            pincode: "585101" },
  { id: "ka-shimoga",          area: "Shivamogga",         city: "Shivamogga",        district: "Shivamogga",        state: "Karnataka",            pincode: "577201" },
  { id: "ka-tumkur",           area: "Tumakuru",           city: "Tumakuru",          district: "Tumakuru",          state: "Karnataka",            pincode: "572101" },
  // ── Kerala ──
  { id: "kl-thiruvananthapuram", area: "Thiruvananthapuram", city: "Thiruvananthapuram", district: "Thiruvananthapuram", state: "Kerala",            pincode: "695001" },
  { id: "kl-kochi",            area: "Kochi",              city: "Kochi",             district: "Ernakulam",         state: "Kerala",              pincode: "682001" },
  { id: "kl-kozhikode",        area: "Kozhikode",          city: "Kozhikode",         district: "Kozhikode",         state: "Kerala",              pincode: "673001" },
  { id: "kl-thrissur",         area: "Thrissur",           city: "Thrissur",          district: "Thrissur",          state: "Kerala",              pincode: "680001" },
  { id: "kl-kollam",           area: "Kollam",             city: "Kollam",            district: "Kollam",            state: "Kerala",              pincode: "691001" },
  { id: "kl-alappuzha",        area: "Alappuzha",          city: "Alappuzha",         district: "Alappuzha",         state: "Kerala",              pincode: "688001" },
  { id: "kl-palakkad",         area: "Palakkad",           city: "Palakkad",          district: "Palakkad",          state: "Kerala",              pincode: "678001" },
  { id: "kl-kannur",           area: "Kannur",             city: "Kannur",            district: "Kannur",            state: "Kerala",              pincode: "670001" },
  // ── Madhya Pradesh ──
  { id: "mp-bhopal",           area: "Bhopal City",        city: "Bhopal",            district: "Bhopal",            state: "Madhya Pradesh",       pincode: "462001" },
  { id: "mp-indore",           area: "Indore City",        city: "Indore",            district: "Indore",            state: "Madhya Pradesh",       pincode: "452001" },
  { id: "mp-gwalior",          area: "Gwalior City",       city: "Gwalior",           district: "Gwalior",           state: "Madhya Pradesh",       pincode: "474001" },
  { id: "mp-gwalior-lashkar",  area: "Lashkar",            city: "Gwalior",           district: "Gwalior",           state: "Madhya Pradesh",       pincode: "474001" },
  { id: "mp-gwalior-morar",    area: "Morar",              city: "Gwalior",           district: "Gwalior",           state: "Madhya Pradesh",       pincode: "474006" },
  { id: "mp-jabalpur",         area: "Jabalpur",           city: "Jabalpur",          district: "Jabalpur",          state: "Madhya Pradesh",       pincode: "482001" },
  { id: "mp-ujjain",           area: "Ujjain",             city: "Ujjain",            district: "Ujjain",            state: "Madhya Pradesh",       pincode: "456001" },
  { id: "mp-sagar",            area: "Sagar",              city: "Sagar",             district: "Sagar",             state: "Madhya Pradesh",       pincode: "470001" },
  { id: "mp-rewa",             area: "Rewa",               city: "Rewa",              district: "Rewa",              state: "Madhya Pradesh",       pincode: "486001" },
  { id: "mp-satna",            area: "Satna",              city: "Satna",             district: "Satna",             state: "Madhya Pradesh",       pincode: "485001" },
  { id: "mp-dewas",            area: "Dewas",              city: "Dewas",             district: "Dewas",             state: "Madhya Pradesh",       pincode: "455001" },
  { id: "mp-morena",           area: "Morena",             city: "Morena",            district: "Morena",            state: "Madhya Pradesh",       pincode: "476001" },
  // ── Maharashtra ──
  { id: "mh-mumbai",           area: "Mumbai City",        city: "Mumbai",            district: "Mumbai",            state: "Maharashtra",          pincode: "400001" },
  { id: "mh-andheri",          area: "Andheri",            city: "Mumbai",            district: "Mumbai Suburban",   state: "Maharashtra",          pincode: "400058" },
  { id: "mh-bandra",           area: "Bandra",             city: "Mumbai",            district: "Mumbai Suburban",   state: "Maharashtra",          pincode: "400050" },
  { id: "mh-dadar",            area: "Dadar",              city: "Mumbai",            district: "Mumbai",            state: "Maharashtra",          pincode: "400014" },
  { id: "mh-thane",            area: "Thane",              city: "Thane",             district: "Thane",             state: "Maharashtra",          pincode: "400601" },
  { id: "mh-navi-mumbai",      area: "Navi Mumbai",        city: "Navi Mumbai",       district: "Thane",             state: "Maharashtra",          pincode: "400703" },
  { id: "mh-pune",             area: "Pune City",          city: "Pune",              district: "Pune",              state: "Maharashtra",          pincode: "411001" },
  { id: "mh-koregaon",         area: "Koregaon Park",      city: "Pune",              district: "Pune",              state: "Maharashtra",          pincode: "411001" },
  { id: "mh-nagpur",           area: "Nagpur",             city: "Nagpur",            district: "Nagpur",            state: "Maharashtra",          pincode: "440001" },
  { id: "mh-nashik",           area: "Nashik",             city: "Nashik",            district: "Nashik",            state: "Maharashtra",          pincode: "422001" },
  { id: "mh-aurangabad",       area: "Chhatrapati Sambhajinagar", city: "Aurangabad", district: "Aurangabad",        state: "Maharashtra",          pincode: "431001" },
  { id: "mh-solapur",          area: "Solapur",            city: "Solapur",           district: "Solapur",           state: "Maharashtra",          pincode: "413001" },
  { id: "mh-kolhapur",         area: "Kolhapur",           city: "Kolhapur",          district: "Kolhapur",          state: "Maharashtra",          pincode: "416001" },
  { id: "mh-amravati",         area: "Amravati",           city: "Amravati",          district: "Amravati",          state: "Maharashtra",          pincode: "444601" },
  // ── Manipur ──
  { id: "mn-imphal",           area: "Imphal",             city: "Imphal",            district: "Imphal West",       state: "Manipur",              pincode: "795001" },
  // ── Meghalaya ──
  { id: "ml-shillong",         area: "Shillong",           city: "Shillong",          district: "East Khasi Hills",  state: "Meghalaya",            pincode: "793001" },
  { id: "ml-tura",             area: "Tura",               city: "Tura",              district: "West Garo Hills",   state: "Meghalaya",            pincode: "794001" },
  // ── Mizoram ──
  { id: "mz-aizawl",           area: "Aizawl",             city: "Aizawl",            district: "Aizawl",            state: "Mizoram",              pincode: "796001" },
  // ── Nagaland ──
  { id: "nl-kohima",           area: "Kohima",             city: "Kohima",            district: "Kohima",            state: "Nagaland",             pincode: "797001" },
  { id: "nl-dimapur",          area: "Dimapur",            city: "Dimapur",           district: "Dimapur",           state: "Nagaland",             pincode: "797112" },
  // ── Odisha ──
  { id: "od-bhubaneswar",      area: "Bhubaneswar",        city: "Bhubaneswar",       district: "Khordha",           state: "Odisha",               pincode: "751001" },
  { id: "od-cuttack",          area: "Cuttack",            city: "Cuttack",           district: "Cuttack",           state: "Odisha",               pincode: "753001" },
  { id: "od-rourkela",         area: "Rourkela",           city: "Rourkela",          district: "Sundargarh",        state: "Odisha",               pincode: "769001" },
  { id: "od-brahmapur",        area: "Brahmapur",          city: "Brahmapur",         district: "Ganjam",            state: "Odisha",               pincode: "760001" },
  { id: "od-sambalpur",        area: "Sambalpur",          city: "Sambalpur",         district: "Sambalpur",         state: "Odisha",               pincode: "768001" },
  { id: "od-puri",             area: "Puri",               city: "Puri",              district: "Puri",              state: "Odisha",               pincode: "752001" },
  // ── Punjab ──
  { id: "pb-ludhiana",         area: "Ludhiana",           city: "Ludhiana",          district: "Ludhiana",          state: "Punjab",               pincode: "141001" },
  { id: "pb-amritsar",         area: "Amritsar",           city: "Amritsar",          district: "Amritsar",          state: "Punjab",               pincode: "143001" },
  { id: "pb-jalandhar",        area: "Jalandhar",          city: "Jalandhar",         district: "Jalandhar",         state: "Punjab",               pincode: "144001" },
  { id: "pb-patiala",          area: "Patiala",            city: "Patiala",           district: "Patiala",           state: "Punjab",               pincode: "147001" },
  { id: "pb-bathinda",         area: "Bathinda",           city: "Bathinda",          district: "Bathinda",          state: "Punjab",               pincode: "151001" },
  { id: "pb-mohali",           area: "Mohali (SAS Nagar)", city: "Mohali",            district: "SAS Nagar",         state: "Punjab",               pincode: "160055" },
  { id: "pb-hoshiarpur",       area: "Hoshiarpur",         city: "Hoshiarpur",        district: "Hoshiarpur",        state: "Punjab",               pincode: "146001" },
  // ── Rajasthan ──
  { id: "rj-jaipur",           area: "Jaipur City",        city: "Jaipur",            district: "Jaipur",            state: "Rajasthan",            pincode: "302001" },
  { id: "rj-jaipur-vaishali",  area: "Vaishali Nagar",     city: "Jaipur",            district: "Jaipur",            state: "Rajasthan",            pincode: "302021" },
  { id: "rj-jodhpur",          area: "Jodhpur",            city: "Jodhpur",           district: "Jodhpur",           state: "Rajasthan",            pincode: "342001" },
  { id: "rj-udaipur",          area: "Udaipur",            city: "Udaipur",           district: "Udaipur",           state: "Rajasthan",            pincode: "313001" },
  { id: "rj-kota",             area: "Kota",               city: "Kota",              district: "Kota",              state: "Rajasthan",            pincode: "324001" },
  { id: "rj-ajmer",            area: "Ajmer",              city: "Ajmer",             district: "Ajmer",             state: "Rajasthan",            pincode: "305001" },
  { id: "rj-bikaner",          area: "Bikaner",            city: "Bikaner",           district: "Bikaner",           state: "Rajasthan",            pincode: "334001" },
  { id: "rj-alwar",            area: "Alwar",              city: "Alwar",             district: "Alwar",             state: "Rajasthan",            pincode: "301001" },
  { id: "rj-bharatpur",        area: "Bharatpur",          city: "Bharatpur",         district: "Bharatpur",         state: "Rajasthan",            pincode: "321001" },
  { id: "rj-sikar",            area: "Sikar",              city: "Sikar",             district: "Sikar",             state: "Rajasthan",            pincode: "332001" },
  { id: "rj-pali",             area: "Pali",               city: "Pali",              district: "Pali",              state: "Rajasthan",            pincode: "306401" },
  // ── Sikkim ──
  { id: "sk-gangtok",          area: "Gangtok",            city: "Gangtok",           district: "East Sikkim",       state: "Sikkim",               pincode: "737101" },
  // ── Tamil Nadu ──
  { id: "tn-chennai",          area: "Chennai City",       city: "Chennai",           district: "Chennai",           state: "Tamil Nadu",           pincode: "600001" },
  { id: "tn-anna-nagar",       area: "Anna Nagar",         city: "Chennai",           district: "Chennai",           state: "Tamil Nadu",           pincode: "600040" },
  { id: "tn-velachery",        area: "Velachery",          city: "Chennai",           district: "Chennai",           state: "Tamil Nadu",           pincode: "600042" },
  { id: "tn-coimbatore",       area: "Coimbatore",         city: "Coimbatore",        district: "Coimbatore",        state: "Tamil Nadu",           pincode: "641001" },
  { id: "tn-madurai",          area: "Madurai",            city: "Madurai",           district: "Madurai",           state: "Tamil Nadu",           pincode: "625001" },
  { id: "tn-trichy",           area: "Tiruchirappalli",    city: "Tiruchirappalli",   district: "Tiruchirappalli",   state: "Tamil Nadu",           pincode: "620001" },
  { id: "tn-salem",            area: "Salem",              city: "Salem",             district: "Salem",             state: "Tamil Nadu",           pincode: "636001" },
  { id: "tn-tirunelveli",      area: "Tirunelveli",        city: "Tirunelveli",       district: "Tirunelveli",       state: "Tamil Nadu",           pincode: "627001" },
  { id: "tn-vellore",          area: "Vellore",            city: "Vellore",           district: "Vellore",           state: "Tamil Nadu",           pincode: "632001" },
  { id: "tn-erode",            area: "Erode",              city: "Erode",             district: "Erode",             state: "Tamil Nadu",           pincode: "638001" },
  { id: "tn-tiruppur",         area: "Tiruppur",           city: "Tiruppur",          district: "Tiruppur",          state: "Tamil Nadu",           pincode: "641601" },
  // ── Telangana ──
  { id: "tg-hyderabad",        area: "Hyderabad City",     city: "Hyderabad",         district: "Hyderabad",         state: "Telangana",            pincode: "500001" },
  { id: "tg-hitech",           area: "HITEC City",         city: "Hyderabad",         district: "Rangareddy",        state: "Telangana",            pincode: "500081" },
  { id: "tg-secunderabad",     area: "Secunderabad",       city: "Hyderabad",         district: "Medchal",           state: "Telangana",            pincode: "500003" },
  { id: "tg-warangal",         area: "Warangal",           city: "Warangal",          district: "Hanamkonda",        state: "Telangana",            pincode: "506001" },
  { id: "tg-nizamabad",        area: "Nizamabad",          city: "Nizamabad",         district: "Nizamabad",         state: "Telangana",            pincode: "503001" },
  { id: "tg-karimnagar",       area: "Karimnagar",         city: "Karimnagar",        district: "Karimnagar",        state: "Telangana",            pincode: "505001" },
  { id: "tg-khammam",          area: "Khammam",            city: "Khammam",           district: "Khammam",           state: "Telangana",            pincode: "507001" },
  // ── Tripura ──
  { id: "tr-agartala",         area: "Agartala",           city: "Agartala",          district: "West Tripura",      state: "Tripura",              pincode: "799001" },
  // ── Uttar Pradesh ──
  { id: "up-lucknow",          area: "Lucknow City",       city: "Lucknow",           district: "Lucknow",           state: "Uttar Pradesh",        pincode: "226001" },
  { id: "up-lucknow-gomti",    area: "Gomti Nagar",        city: "Lucknow",           district: "Lucknow",           state: "Uttar Pradesh",        pincode: "226010" },
  { id: "up-kanpur",           area: "Kanpur",             city: "Kanpur",            district: "Kanpur Nagar",      state: "Uttar Pradesh",        pincode: "208001" },
  { id: "up-agra",             area: "Agra",               city: "Agra",              district: "Agra",              state: "Uttar Pradesh",        pincode: "282001" },
  { id: "up-varanasi",         area: "Varanasi",           city: "Varanasi",          district: "Varanasi",          state: "Uttar Pradesh",        pincode: "221001" },
  { id: "up-prayagraj",        area: "Prayagraj",          city: "Prayagraj",         district: "Prayagraj",         state: "Uttar Pradesh",        pincode: "211001" },
  { id: "up-meerut",           area: "Meerut",             city: "Meerut",            district: "Meerut",            state: "Uttar Pradesh",        pincode: "250001" },
  { id: "up-ghaziabad",        area: "Ghaziabad",          city: "Ghaziabad",         district: "Ghaziabad",         state: "Uttar Pradesh",        pincode: "201001" },
  { id: "up-noida-18",         area: "Sector 18",          city: "Noida",             district: "Gautam Buddha Nagar", state: "Uttar Pradesh",      pincode: "201301" },
  { id: "up-noida-62",         area: "Sector 62",          city: "Noida",             district: "Gautam Buddha Nagar", state: "Uttar Pradesh",      pincode: "201309" },
  { id: "up-noida-gr",         area: "Greater Noida",      city: "Greater Noida",     district: "Gautam Buddha Nagar", state: "Uttar Pradesh",      pincode: "201306" },
  { id: "up-mathura",          area: "Mathura",            city: "Mathura",           district: "Mathura",           state: "Uttar Pradesh",        pincode: "281001" },
  { id: "up-aligarh",          area: "Aligarh",            city: "Aligarh",           district: "Aligarh",           state: "Uttar Pradesh",        pincode: "202001" },
  { id: "up-bareilly",         area: "Bareilly",           city: "Bareilly",          district: "Bareilly",          state: "Uttar Pradesh",        pincode: "243001" },
  { id: "up-moradabad",        area: "Moradabad",          city: "Moradabad",         district: "Moradabad",         state: "Uttar Pradesh",        pincode: "244001" },
  { id: "up-gorakhpur",        area: "Gorakhpur",          city: "Gorakhpur",         district: "Gorakhpur",         state: "Uttar Pradesh",        pincode: "273001" },
  { id: "up-firozabad",        area: "Firozabad",          city: "Firozabad",         district: "Firozabad",         state: "Uttar Pradesh",        pincode: "283203" },
  { id: "up-jhansi",           area: "Jhansi",             city: "Jhansi",            district: "Jhansi",            state: "Uttar Pradesh",        pincode: "284001" },
  { id: "up-muzaffarnagar",    area: "Muzaffarnagar",      city: "Muzaffarnagar",     district: "Muzaffarnagar",     state: "Uttar Pradesh",        pincode: "251001" },
  { id: "up-hapur",            area: "Hapur",              city: "Hapur",             district: "Hapur",             state: "Uttar Pradesh",        pincode: "245101" },
  // ── Uttarakhand ──
  { id: "uk-dehradun",         area: "Dehradun City",      city: "Dehradun",          district: "Dehradun",          state: "Uttarakhand",          pincode: "248001" },
  { id: "uk-haridwar",         area: "Haridwar",           city: "Haridwar",          district: "Haridwar",          state: "Uttarakhand",          pincode: "249401" },
  { id: "uk-rishikesh",        area: "Rishikesh",          city: "Rishikesh",         district: "Dehradun",          state: "Uttarakhand",          pincode: "249201" },
  { id: "uk-nainital",         area: "Nainital",           city: "Nainital",          district: "Nainital",          state: "Uttarakhand",          pincode: "263001" },
  { id: "uk-roorkee",          area: "Roorkee",            city: "Roorkee",           district: "Haridwar",          state: "Uttarakhand",          pincode: "247667" },
  { id: "uk-haldwani",         area: "Haldwani",           city: "Haldwani",          district: "Nainital",          state: "Uttarakhand",          pincode: "263139" },
  // ── West Bengal ──
  { id: "wb-kolkata",          area: "Kolkata City",       city: "Kolkata",           district: "Kolkata",           state: "West Bengal",          pincode: "700001" },
  { id: "wb-salt-lake",        area: "Salt Lake City",     city: "Kolkata",           district: "North 24 Parganas", state: "West Bengal",          pincode: "700064" },
  { id: "wb-howrah",           area: "Howrah",             city: "Howrah",            district: "Howrah",            state: "West Bengal",          pincode: "711101" },
  { id: "wb-asansol",          area: "Asansol",            city: "Asansol",           district: "Paschim Bardhaman", state: "West Bengal",          pincode: "713301" },
  { id: "wb-siliguri",         area: "Siliguri",           city: "Siliguri",          district: "Darjeeling",        state: "West Bengal",          pincode: "734001" },
  { id: "wb-durgapur",         area: "Durgapur",           city: "Durgapur",          district: "Paschim Bardhaman", state: "West Bengal",          pincode: "713201" },
  { id: "wb-bardhaman",        area: "Bardhaman",          city: "Bardhaman",         district: "Purba Bardhaman",   state: "West Bengal",          pincode: "713101" },
  { id: "wb-malda",            area: "Malda",              city: "Malda",             district: "Malda",             state: "West Bengal",          pincode: "732101" },
  { id: "wb-kharagpur",        area: "Kharagpur",          city: "Kharagpur",         district: "Paschim Medinipur", state: "West Bengal",          pincode: "721301" },
  // ── Delhi ──
  { id: "dl-connaught",        area: "Connaught Place",    city: "New Delhi",         district: "New Delhi",         state: "Delhi",                pincode: "110001" },
  { id: "dl-sector12",         area: "Sector 12",          city: "New Delhi",         district: "New Delhi",         state: "Delhi",                pincode: "110092" },
  { id: "dl-sector15",         area: "Sector 15",          city: "New Delhi",         district: "New Delhi",         state: "Delhi",                pincode: "110075" },
  { id: "dl-rohini",           area: "Rohini",             city: "New Delhi",         district: "North West Delhi",  state: "Delhi",                pincode: "110085" },
  { id: "dl-dwarka",           area: "Dwarka",             city: "New Delhi",         district: "South West Delhi",  state: "Delhi",                pincode: "110078" },
  { id: "dl-lajpat",           area: "Lajpat Nagar",       city: "New Delhi",         district: "South Delhi",       state: "Delhi",                pincode: "110024" },
  { id: "dl-janakpuri",        area: "Janakpuri",          city: "New Delhi",         district: "West Delhi",        state: "Delhi",                pincode: "110058" },
  { id: "dl-saket",            area: "Saket",              city: "New Delhi",         district: "South Delhi",       state: "Delhi",                pincode: "110017" },
  { id: "dl-pitampura",        area: "Pitampura",          city: "New Delhi",         district: "North West Delhi",  state: "Delhi",                pincode: "110034" },
  { id: "dl-preet-vihar",      area: "Preet Vihar",        city: "New Delhi",         district: "East Delhi",        state: "Delhi",                pincode: "110092" },
  { id: "dl-shahdara",         area: "Shahdara",           city: "New Delhi",         district: "East Delhi",        state: "Delhi",                pincode: "110032" },
  // ── J&K / Ladakh ──
  { id: "jk-srinagar",         area: "Srinagar",           city: "Srinagar",          district: "Srinagar",          state: "Jammu & Kashmir",      pincode: "190001" },
  { id: "jk-jammu",            area: "Jammu",              city: "Jammu",             district: "Jammu",             state: "Jammu & Kashmir",      pincode: "180001" },
  { id: "jk-leh",              area: "Leh",                city: "Leh",               district: "Leh",               state: "Ladakh",               pincode: "194101" },
  { id: "jk-kargil",           area: "Kargil",             city: "Kargil",            district: "Kargil",            state: "Ladakh",               pincode: "194103" },
  // ── Chandigarh ──
  { id: "ch-sector17",         area: "Sector 17",          city: "Chandigarh",        district: "Chandigarh",        state: "Chandigarh",           pincode: "160017" },
  { id: "ch-sector22",         area: "Sector 22",          city: "Chandigarh",        district: "Chandigarh",        state: "Chandigarh",           pincode: "160022" },
  // ── Puducherry ──
  { id: "py-puducherry",       area: "Puducherry",         city: "Puducherry",        district: "Puducherry",        state: "Puducherry",           pincode: "605001" },
  // ── Andaman & Nicobar ──
  { id: "an-port-blair",       area: "Port Blair",         city: "Port Blair",        district: "South Andaman",     state: "Andaman & Nicobar",    pincode: "744101" },
];

export const LOCATIONS: Location[] = RAW.map((loc, i) => ({
  ...loc,
  nearbyShops: s(i),
}));

type Props = {
  open: boolean;
  onClose: () => void;
  selected: Location;
  onSelect: (loc: Location) => void;
};

export function LocationPicker({ open, onClose, selected, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATIONS;
    return LOCATIONS.filter(