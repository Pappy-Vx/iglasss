let glass_product = [
  {
    "id": 1,
    "name": "Ray-Ban RX5154 Clubmaster",
    "image": "https://images2.ray-ban.com//cdn-record-files-pi/f86e1cf9-5724-4f2e-a333-a358001dffeb/e78786a1-8f2d-4e88-b565-ad34017cbfec/0RX5154__2012__STD__shad__fr.png?impolicy=RB_Product_clone&width=720&bgc=%23f2f2f2",
    "new_price": 98.97,
    "old_price": 129.00,
    "description": "The iconic Clubmaster blends a bold acetate top bar with a lighter metal lower rim for a distinctive browline silhouette. Timeless, versatile, and fully prescription-compatible — a wardrobe staple that works from the office to the weekend.",
    "brand": "Ray-Ban",
    "type": "Prescription"
  },
  {
    "id": 2,
    "name": "Zeelool Square Prescription Glasses",
    "image": "https://s3.zeelool.com/admin/product/image/918b8f89b742c466c4b0ce16a3fe0b67.jpg?im=Resize%2Cwidth%3D800",
    "new_price": 5.74,
    "old_price": 25.00,
    "description": "Clean, modern, and uncompromisingly versatile — these square frames offer a minimalist profile with premium optics-ready construction. The flat-top design frames your face with quiet confidence, making them an everyday essential for the contemporary professional.",
    "brand": "Zeelool",
    "type": "Prescription"
  },
  {
    "id": 3,
    "name": "Minguela Glasses",
    "image": "https://s3.zeelool.com/admin/product/image/bb10b15366f6917eda352a5e294dbcfa.jpg?im=Resize%2Cwidth%3D800",
    "new_price": 50.00,
    "old_price": 65.00,
    "description": "The Minguela features a refined oval-square hybrid shape crafted from lightweight acetate. Its understated silhouette works effortlessly across casual and formal occasions, offering full prescription compatibility without compromising on style.",
    "brand": "Minguela",
    "type": "Prescription"
  },
  {
    "id": 4,
    "name": "Ralph by Ralph Lauren RA7158U",
    "image": "https://assets.lenscrafters.com/is/image/LensCrafters/8056597905428__STD__shad__fr.png?impolicy=LC_grey",
    "new_price": 48.35,
    "old_price": 80.00,
    "description": "Refined femininity meets everyday comfort in this Ralph Lauren design. A subtle butterfly silhouette with signature RL logo detailing and spring-loaded hinges ensures a precise, all-day fit. Sophisticated without trying too hard.",
    "brand": "Ralph Lauren",
    "type": "Prescription"
  },
  {
    "id": 5,
    "name": "Ray-Ban RX6335",
    "image": "https://images2.ray-ban.com//cdn-record-files-pi/278e72ab-61af-471a-9e0f-a42a00a0cdf4/aa1d3830-0f39-46a0-8d83-ad9500f3bf06/0RX6335__2855__STD__shad__cfr.png?impolicy=RB_Product_clone&width=720&bgc=%23f2f2f2",
    "new_price": 71.20,
    "old_price": 110.00,
    "description": "A timeless metal frame built with Ray-Ban's signature craftsmanship. The slim square construction delivers a polished, professional look while remaining feather-light on the face. Pairs beautifully with any prescription lens.",
    "brand": "Ray-Ban",
    "type": "Prescription"
  },
  {
    "id": 6,
    "name": "Prada PR A01S 16K08Z",
    "image": "https://assets2.sunglasshut.com/cdn-record-files-pi/3ef1786b-f40a-4b13-ab89-b00b0107fc1b/a7940580-c980-4803-b40e-b00b01080873/0PR_A01S__16K08Z__P21__shad__cfr.png?impolicy=SGH_bgtransparent&width=1024",
    "new_price": 162.97,
    "old_price": 220.00,
    "description": "Bold geometric architecture defines this Prada statement piece. Premium Italian craftsmanship, sharp angular lines, and the iconic Prada triangle logo make it instantly recognizable. A collector's frame for those who wear art on their face.",
    "brand": "Prada",
    "type": "Sunglasses"
  },
  {
    "id": 7,
    "name": "Gucci GG0061S Sunglasses",
    "image": "https://assets2.sunglasshut.com/cdn-record-files-pi/7784a70f-07fe-46e2-85a1-a6ff00221403/dac6057c-8f60-409c-aa99-a74a01183844/0GC000994__2300L1_000A.png?impolicy=SGH_bgtransparent&width=1024",
    "new_price": 196.27,
    "old_price": 250.00,
    "description": "Luxurious and unmistakably Italian, this Gucci design features distinctive GG interlocking detailing on the temple. Oversized shield lenses in a chic cat-eye silhouette deliver maximum impact — effortlessly glamorous for any occasion.",
    "brand": "Gucci",
    "type": "Sunglasses"
  },
  {
    "id": 8,
    "name": "Dolce & Gabbana DG5026",
    "image": "https://assets.lenscrafters.com/is/image/LensCrafters/8053672822182_shad_fr.png?impolicy=LC_grey",
    "new_price": 105.89,
    "old_price": 140.00,
    "description": "Statement-worthy Italian design with Dolce & Gabbana's signature flair. A bold cat-eye silhouette with decorative crystal-embellished temple detailing ensures you're impossible to ignore. For those who wear their personality on their face.",
    "brand": "Dolce & Gabbana",
    "type": "Prescription"
  },
  {
    "id": 9,
    "name": "MAUI JIM PEAHI",
    "image": "https://images.mauijim.com/sunglasses/621/DGS621-16_front.jpg?imwidth=900",
    "new_price": 131.71,
    "old_price": 180.00,
    "description": "Engineered for peak performance without sacrificing style, the Peahi features Maui Jim's patented PolarizedPlus2® lens technology in a bold wrap-sport silhouette. Unrivalled color and clarity in any light condition — from sunrise surf to afternoon drives.",
    "brand": "Maui Jim",
    "type": "Sunglasses"
  },
  {
    "id": 10,
    "name": "Oakley Radar EV Path",
    "image": "https://assets2.oakley.com/cdn-record-files-pi/359bc1e6-bc77-4e8f-9578-a71000709bfb/6fea9b88-b41d-446e-ad14-ad7901526884/0OO9208__920852__P21__shad__cfr.png?impolicy=OO_ratio&width=1000",
    "new_price": 194.00,
    "old_price": 230.00,
    "description": "Built for elite performance, the Radar EV Path delivers an extended field of vision with Oakley's Unobtanium® grip and O Matter® frame construction. Interchangeable lenses, ventilated shield optics, and PRIZM™ lens technology make this the go-to frame from track to trail.",
    "brand": "Oakley",
    "type": "Sport"
  }
]

export default glass_product;
