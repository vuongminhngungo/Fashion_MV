-- fashion-mv sample SQL for PostgreSQL
-- Import this file into database: fashion_mv

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'Category'
  ) THEN
    CREATE TYPE "Category" AS ENUM ('CLOTHING', 'SHOES', 'BAGS');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "Product" (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "originalPrice" DOUBLE PRECISION,
  "category" "Category" NOT NULL,
  "images" TEXT[] NOT NULL,
  "colors" TEXT[] NOT NULL,
  "sizes" TEXT[] NOT NULL,
  "stock" INTEGER NOT NULL,
  "isOnSale" BOOLEAN NOT NULL DEFAULT false,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "isNewArrival" BOOLEAN NOT NULL DEFAULT false,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE TABLE "Product" RESTART IDENTITY;

INSERT INTO "Product" ("id","slug","name","description","price","originalPrice","category","images","colors","sizes","stock","isOnSale","isFeatured","isNewArrival","rating","reviewCount","createdAt","updatedAt") VALUES
('clothing-1','urban-oversized-tee-black','Urban Oversized Tee','Premium cotton oversized t-shirt with relaxed fit and breathable texture for all-day comfort.',39,49,'CLOTHING',ARRAY['https://picsum.photos/seed/urban-oversized-tee-black-1/800/800','https://picsum.photos/seed/urban-oversized-tee-black-2/800/800','https://picsum.photos/seed/urban-oversized-tee-black-3/800/800'],ARRAY['black','white','gray'],ARRAY['S','M','L','XL'],18,true,true,false,4.5,124,NOW(),NOW()),
('clothing-2','minimal-linen-shirt-ivory','Minimal Linen Shirt','Lightweight linen shirt designed for warm weather with a refined, minimal silhouette.',69,NULL,'CLOTHING',ARRAY['https://picsum.photos/seed/minimal-linen-shirt-ivory-1/800/800','https://picsum.photos/seed/minimal-linen-shirt-ivory-2/800/800','https://picsum.photos/seed/minimal-linen-shirt-ivory-3/800/800'],ARRAY['ivory','beige','navy'],ARRAY['S','M','L'],10,false,true,true,4.7,88,NOW(),NOW()),
('clothing-3','tailored-wide-leg-trousers','Tailored Wide-Leg Trousers','Elegant wide-leg trousers with clean tailoring for modern smart-casual outfits.',89,119,'CLOTHING',ARRAY['https://picsum.photos/seed/tailored-wide-leg-trousers-1/800/800','https://picsum.photos/seed/tailored-wide-leg-trousers-2/800/800','https://picsum.photos/seed/tailored-wide-leg-trousers-3/800/800'],ARRAY['charcoal','black'],ARRAY['S','M','L','XL'],7,true,false,false,4.4,62,NOW(),NOW()),
('clothing-4','soft-knit-cardigan-burgundy','Soft Knit Cardigan','Cozy rib-knit cardigan in deep burgundy tones, ideal for layered transitional looks.',79,NULL,'CLOTHING',ARRAY['https://picsum.photos/seed/soft-knit-cardigan-burgundy-1/800/800','https://picsum.photos/seed/soft-knit-cardigan-burgundy-2/800/800','https://picsum.photos/seed/soft-knit-cardigan-burgundy-3/800/800'],ARRAY['burgundy','cream'],ARRAY['M','L','XL'],12,false,false,true,4.6,49,NOW(),NOW()),
('clothing-5','structured-denim-jacket','Structured Denim Jacket','Modern cut denim jacket with reinforced seams and a timeless, structured shape.',99,129,'CLOTHING',ARRAY['https://picsum.photos/seed/structured-denim-jacket-1/800/800','https://picsum.photos/seed/structured-denim-jacket-2/800/800','https://picsum.photos/seed/structured-denim-jacket-3/800/800'],ARRAY['blue','black'],ARRAY['S','M','L','XL'],5,true,true,false,4.8,203,NOW(),NOW()),
('clothing-6','everyday-jogger-pants','Everyday Jogger Pants','Tapered joggers with stretch fabric and soft inner lining for casual comfort.',59,NULL,'CLOTHING',ARRAY['https://picsum.photos/seed/everyday-jogger-pants-1/800/800','https://picsum.photos/seed/everyday-jogger-pants-2/800/800','https://picsum.photos/seed/everyday-jogger-pants-3/800/800'],ARRAY['gray','black','olive'],ARRAY['S','M','L','XL'],22,false,false,false,4.3,71,NOW(),NOW()),
('clothing-7','silk-blend-midi-dress','Silk-Blend Midi Dress','Flowing midi dress crafted in a soft silk blend with flattering drape.',149,189,'CLOTHING',ARRAY['https://picsum.photos/seed/silk-blend-midi-dress-1/800/800','https://picsum.photos/seed/silk-blend-midi-dress-2/800/800','https://picsum.photos/seed/silk-blend-midi-dress-3/800/800'],ARRAY['wine','black','emerald'],ARRAY['S','M','L'],4,true,true,true,4.9,157,NOW(),NOW()),
('clothing-8','cotton-hoodie-essential','Cotton Hoodie Essential','Heavyweight cotton hoodie with brushed interior and minimalist logo detail.',75,NULL,'CLOTHING',ARRAY['https://picsum.photos/seed/cotton-hoodie-essential-1/800/800','https://picsum.photos/seed/cotton-hoodie-essential-2/800/800','https://picsum.photos/seed/cotton-hoodie-essential-3/800/800'],ARRAY['black','sand','stone'],ARRAY['S','M','L','XL'],16,false,false,true,4.4,96,NOW(),NOW()),
('shoes-1','retro-runner-sneakers','Retro Runner Sneakers','Cushioned retro-inspired runners combining comfort and street-ready style.',119,149,'SHOES',ARRAY['https://picsum.photos/seed/retro-runner-sneakers-1/800/800','https://picsum.photos/seed/retro-runner-sneakers-2/800/800','https://picsum.photos/seed/retro-runner-sneakers-3/800/800'],ARRAY['white','red','black'],ARRAY['39','40','41','42','43','44'],15,true,true,false,4.7,181,NOW(),NOW()),
('shoes-2','leather-loafers-classic','Classic Leather Loafers','Polished leather loafers with cushioned insole for elevated everyday wear.',159,NULL,'SHOES',ARRAY['https://picsum.photos/seed/leather-loafers-classic-1/800/800','https://picsum.photos/seed/leather-loafers-classic-2/800/800','https://picsum.photos/seed/leather-loafers-classic-3/800/800'],ARRAY['brown','black'],ARRAY['39','40','41','42','43'],9,false,true,false,4.6,74,NOW(),NOW()),
('shoes-3','cloud-walk-slip-ons','Cloud Walk Slip-Ons','Ultra-light slip-ons with flexible outsole and breathable knit upper.',79,99,'SHOES',ARRAY['https://picsum.photos/seed/cloud-walk-slip-ons-1/800/800','https://picsum.photos/seed/cloud-walk-slip-ons-2/800/800','https://picsum.photos/seed/cloud-walk-slip-ons-3/800/800'],ARRAY['gray','navy','white'],ARRAY['38','39','40','41','42'],20,true,false,true,4.2,52,NOW(),NOW()),
('shoes-4','high-top-canvas-redline','High-Top Canvas Redline','Iconic high-top sneakers with reinforced toe cap and bold red accent stitching.',89,NULL,'SHOES',ARRAY['https://picsum.photos/seed/high-top-canvas-redline-1/800/800','https://picsum.photos/seed/high-top-canvas-redline-2/800/800','https://picsum.photos/seed/high-top-canvas-redline-3/800/800'],ARRAY['black','red','white'],ARRAY['39','40','41','42','43'],13,false,false,true,4.3,67,NOW(),NOW()),
('shoes-5','performance-training-shoes','Performance Training Shoes','Supportive training shoes with responsive sole for gym, cardio, and HIIT sessions.',129,169,'SHOES',ARRAY['https://picsum.photos/seed/performance-training-shoes-1/800/800','https://picsum.photos/seed/performance-training-shoes-2/800/800','https://picsum.photos/seed/performance-training-shoes-3/800/800'],ARRAY['black','lime','white'],ARRAY['40','41','42','43','44','45'],6,true,true,false,4.8,143,NOW(),NOW()),
('shoes-6','elegant-pointed-heels','Elegant Pointed Heels','Sleek pointed heels with cushioned footbed and timeless silhouette.',139,NULL,'SHOES',ARRAY['https://picsum.photos/seed/elegant-pointed-heels-1/800/800','https://picsum.photos/seed/elegant-pointed-heels-2/800/800','https://picsum.photos/seed/elegant-pointed-heels-3/800/800'],ARRAY['black','nude','red'],ARRAY['36','37','38','39','40'],11,false,true,false,4.5,98,NOW(),NOW()),
('shoes-7','trail-hiker-boots','Trail Hiker Boots','Durable hiking boots with grippy outsole and weather-resistant upper.',199,249,'SHOES',ARRAY['https://picsum.photos/seed/trail-hiker-boots-1/800/800','https://picsum.photos/seed/trail-hiker-boots-2/800/800','https://picsum.photos/seed/trail-hiker-boots-3/800/800'],ARRAY['tan','brown','black'],ARRAY['40','41','42','43','44'],3,true,false,false,4.9,116,NOW(),NOW()),
('shoes-8','minimalist-sandals','Minimalist Leather Sandals','Clean, modern sandals in soft leather with lightweight ergonomic sole.',69,NULL,'SHOES',ARRAY['https://picsum.photos/seed/minimalist-sandals-1/800/800','https://picsum.photos/seed/minimalist-sandals-2/800/800','https://picsum.photos/seed/minimalist-sandals-3/800/800'],ARRAY['tan','black','white'],ARRAY['37','38','39','40','41'],14,false,false,true,4.1,35,NOW(),NOW()),
('bags-1','metro-crossbody-bag','Metro Crossbody Bag','Compact crossbody bag with organized compartments and adjustable strap.',89,119,'BAGS',ARRAY['https://picsum.photos/seed/metro-crossbody-bag-1/800/800','https://picsum.photos/seed/metro-crossbody-bag-2/800/800','https://picsum.photos/seed/metro-crossbody-bag-3/800/800'],ARRAY['black','olive','tan'],ARRAY['One Size'],17,true,true,false,4.6,129,NOW(),NOW()),
('bags-2','structured-tote-signature','Signature Structured Tote','Spacious tote with magnetic closure and internal pouch for daily essentials.',149,NULL,'BAGS',ARRAY['https://picsum.photos/seed/structured-tote-signature-1/800/800','https://picsum.photos/seed/structured-tote-signature-2/800/800','https://picsum.photos/seed/structured-tote-signature-3/800/800'],ARRAY['black','taupe','cream'],ARRAY['One Size'],8,false,true,true,4.8,84,NOW(),NOW()),
('bags-3','weekender-duffle-pro','Weekender Duffle Pro','Travel-ready duffle with shoe compartment and water-resistant finish.',179,229,'BAGS',ARRAY['https://picsum.photos/seed/weekender-duffle-pro-1/800/800','https://picsum.photos/seed/weekender-duffle-pro-2/800/800','https://picsum.photos/seed/weekender-duffle-pro-3/800/800'],ARRAY['navy','black','gray'],ARRAY['One Size'],6,true,false,false,4.7,53,NOW(),NOW()),
('bags-4','mini-bucket-bag-luxe','Luxe Mini Bucket Bag','Compact bucket bag with drawstring closure and premium textured finish.',99,NULL,'BAGS',ARRAY['https://picsum.photos/seed/mini-bucket-bag-luxe-1/800/800','https://picsum.photos/seed/mini-bucket-bag-luxe-2/800/800','https://picsum.photos/seed/mini-bucket-bag-luxe-3/800/800'],ARRAY['wine','black','camel'],ARRAY['One Size'],12,false,false,true,4.4,40,NOW(),NOW()),
('bags-5','commuter-backpack-tech','Commuter Tech Backpack','Minimal backpack with padded laptop sleeve and anti-scratch base panel.',129,159,'BAGS',ARRAY['https://picsum.photos/seed/commuter-backpack-tech-1/800/800','https://picsum.photos/seed/commuter-backpack-tech-2/800/800','https://picsum.photos/seed/commuter-backpack-tech-3/800/800'],ARRAY['black','gray','navy'],ARRAY['One Size'],14,true,true,false,4.5,92,NOW(),NOW()),
('bags-6','chain-shoulder-bag-rouge','Rouge Chain Shoulder Bag','Elegant shoulder bag with metallic chain strap and soft quilted texture.',169,NULL,'BAGS',ARRAY['https://picsum.photos/seed/chain-shoulder-bag-rouge-1/800/800','https://picsum.photos/seed/chain-shoulder-bag-rouge-2/800/800','https://picsum.photos/seed/chain-shoulder-bag-rouge-3/800/800'],ARRAY['red','black','ivory'],ARRAY['One Size'],9,false,true,true,4.8,77,NOW(),NOW()),
('bags-7','canvas-shopper-everyday','Everyday Canvas Shopper','Durable canvas shopper with generous interior and reinforced shoulder straps.',59,79,'BAGS',ARRAY['https://picsum.photos/seed/canvas-shopper-everyday-1/800/800','https://picsum.photos/seed/canvas-shopper-everyday-2/800/800','https://picsum.photos/seed/canvas-shopper-everyday-3/800/800'],ARRAY['natural','black','olive'],ARRAY['One Size'],19,true,false,false,4.2,58,NOW(),NOW()),
('bags-8','travel-sling-compact','Compact Travel Sling','Hands-free sling bag with secure zip pockets and ergonomic fit for travel.',49,NULL,'BAGS',ARRAY['https://picsum.photos/seed/travel-sling-compact-1/800/800','https://picsum.photos/seed/travel-sling-compact-2/800/800','https://picsum.photos/seed/travel-sling-compact-3/800/800'],ARRAY['black','gray','burgundy'],ARRAY['One Size'],21,false,false,true,4.1,31,NOW(),NOW());
