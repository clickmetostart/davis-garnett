"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const properties = [
  // Commercial
  { id: 1, type: "Commercial", title: "Tampa Riverwalk Tower", specs: "Class-A Office • 450,000 GLA", price: "Lease: $45/SF NNN", img: "/com_office_tower_1787632874122.png", pos: { x: "-35vw", y: "-35vh" } },
  { id: 2, type: "Commercial", title: "Channelside Retail", specs: "Luxury Retail • 98% Occupied", price: "Cap Rate: 5.2%", img: "/com_luxury_retail_1787632885082.png", pos: { x: "35vw", y: "-35vh" } },
  { id: 3, type: "Commercial", title: "St. Pete Industrial", specs: "Logistics Hub • 1.2M GLA", price: "$18.5M", img: "/com_industrial_park_1787632905437.png", pos: { x: "-45vw", y: "0vh" } },
  { id: 4, type: "Commercial", title: "Ybor Multi-Family", specs: "320 Units • Resort Amenities", price: "Cap Rate: 4.8%", img: "/com_multi_family_1787632895059.png", pos: { x: "45vw", y: "0vh" } },
  // Residential
  { id: 5, type: "Residential", title: "Davis Islands Estate", specs: "6 Bed • 8 Bath • 12,000 SqFt", price: "$14.2M", img: "/res_waterfront_estate_1787632802890.png", pos: { x: "-35vw", y: "35vh" } },
  { id: 6, type: "Residential", title: "Bayshore Modern", specs: "5 Bed • 6 Bath • 8,500 SqFt", price: "$8.9M", img: "/res_modern_mansion_1787632812473.png", pos: { x: "35vw", y: "35vh" } },
  { id: 7, type: "Residential", title: "Downtown Penthouse", specs: "4 Bed • 4.5 Bath • 5,200 SqFt", price: "$6.5M", img: "/res_luxury_condo_1787632822869.png", pos: { x: "0vw", y: "-45vh" } },
  { id: 8, type: "Residential", title: "Hyde Park Historic", specs: "7 Bed • 7 Bath • 9,100 SqFt", price: "$5.8M", img: "/res_historic_estate_1787632833084.png", pos: { x: "0vw", y: "45vh" } },
  { id: 9, type: "Residential", title: "Clearwater Beachfront", specs: "5 Bed • 5 Bath • 6,000 SqFt", price: "$11.5M", img: "/res_beachfront_villa_1787632843222.png", pos: { x: "-20vw", y: "-50vh" } },
  { id: 10, type: "Residential", title: "Avila Golf Estate", specs: "6 Bed • 7 Bath • 10,500 SqFt", price: "$7.2M", img: "/res_golf_course_home_1787632854609.png", pos: { x: "20vw", y: "-50vh" } },
  // Land
  { id: 11, type: "Land", title: "Apollo Beach Marina", specs: "24 Acres • Waterfront Zoning", price: "$22.0M", img: "/land_waterfront_plot_1787632916432.png", pos: { x: "-20vw", y: "50vh" } },
  { id: 12, type: "Land", title: "I-4 Corridor Dev Site", specs: "150 Acres • Industrial Zoned", price: "$35.0M", img: "/land_commercial_development_1787632926636.png", pos: { x: "20vw", y: "50vh" } },
];

export default function FeaturedPortfolioSpillOut() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Overlay to ensure text visibility when elements scatter */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

        {/* The 12 Spilling Properties */}
        {properties.map((prop, i) => {
          // Calculate individual motion values
          // Expands over the first 30% of the 800vh scroll, then holds firm for the remaining 70%
          const x = useTransform(scrollYProgress, [0, 0.3, 1], ["0vw", prop.pos.x, prop.pos.x]);
          const y = useTransform(scrollYProgress, [0, 0.3, 1], ["0vh", prop.pos.y, prop.pos.y]);
          const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 1, 1]);
          const opacity = useTransform(scrollYProgress, [0, 0.05, 0.3, 1], [0, 1, 1, 1]);
          
          return (
            <motion.div
              key={prop.id}
              className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-xl overflow-hidden group cursor-pointer shadow-2xl z-10"
              style={{ x, y, scale, opacity }}
            >
              <Image src={prop.img} alt={prop.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              
              {/* IDX / LoopNet Styled Data Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold mb-1 block">{prop.type}</span>
                <h3 className="font-aiveritas text-xl text-white mb-1 drop-shadow-md truncate">{prop.title}</h3>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-white/60 text-[11px] uppercase tracking-wider">{prop.specs}</p>
                  <p className="text-[#D4AF37] font-bold text-sm drop-shadow-md">{prop.price}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* The Pinned Center Property (MEGA LISTING) */}
        <motion.div 
          className="relative w-[80vw] sm:w-[600px] aspect-square rounded-2xl overflow-hidden shadow-2xl z-20 group cursor-pointer border border-[#D4AF37]/30"
          style={{
             scale: useTransform(scrollYProgress, [0, 0.3, 1], [1, 1.05, 1.05])
          }}
        >
          <Image src="/mega_property_pinned_1787632939192.png" alt="Mega Property" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
            <span className="bg-[#D4AF37] text-black text-xs uppercase tracking-[0.2em] font-bold py-1 px-3 self-start mb-4 rounded-sm">Featured Flagship</span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-white mb-2 drop-shadow-xl">The Tampa Apex</h2>
            <p className="text-white/70 font-light max-w-md mb-6 leading-relaxed">
              An architectural masterpiece redefining the Gulf Coast skyline. Mixed-use luxury combining a 5-star resort, elite retail, and bespoke penthouses.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/20 pt-6">
              <div>
                <span className="block text-white/50 text-[10px] uppercase tracking-widest">Type</span>
                <span className="text-white font-bold text-sm">Mixed-Use</span>
              </div>
              <div>
                <span className="block text-white/50 text-[10px] uppercase tracking-widest">Total GLA</span>
                <span className="text-white font-bold text-sm">2.4M SqFt</span>
              </div>
              <div>
                <span className="block text-white/50 text-[10px] uppercase tracking-widest">Residences</span>
                <span className="text-white font-bold text-sm">120 Ultra-Luxury</span>
              </div>
              <div>
                <span className="block text-white/50 text-[10px] uppercase tracking-widest">Valuation</span>
                <span className="text-[#D4AF37] font-bold text-sm">$850M</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overlay Title that fades out as you scroll */}
        <motion.div 
          className="absolute top-12 md:top-24 left-0 w-full text-center z-30 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.2], [0, -50])
          }}
        >
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-4 drop-shadow-md">Curated Excellence</span>
          <h2 className="font-aiveritas text-5xl md:text-7xl text-white drop-shadow-2xl">The Mega Portfolio</h2>
          <p className="text-white/70 mt-4 uppercase tracking-widest text-sm font-light">Scroll to expand</p>
        </motion.div>

      </div>
    </section>
  );
}
