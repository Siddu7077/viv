// Food menu data with breakfast, lunch, and dinner options
 
export  const foodMenuData = {
  breakfast: {
    silver: {
      name: "Silver Breakfast",
      price: 400,
      description: "Essential South Indian breakfast menu. Tea & Coffee etc. are complementary.",
      items: [
        { id: "bs1", name: "Idli with Sambar", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop", description: "Steamed rice cakes with lentil soup" },
        { id: "bs2", name: "Plain Dosa", image: "https://images.unsplash.com/photo-1630409351217-bc4fa6422075?w=800&auto=format&fit=crop", description: "Thin crispy rice pancake" },
        { id: "bs3", name: "Upma", image: "https://images.unsplash.com/photo-1608057362941-d902e1dcc9c8?w=800&auto=format&fit=crop", description: "Savory semolina porridge" },
        { id: "bs4", name: "Poha", image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&auto=format&fit=crop", description: "Flattened rice with spices and vegetables" }
      ]
    },
    gold: {
      name: "Gold Breakfast",
      price: 600,
      description: "Premium breakfast selection with more variety. Tea & Coffee etc. are complementary.",
      items: [
        { id: "bg1", name: "Masala Dosa", image: "https://images.unsplash.com/photo-1650383030546-e00022e12637?w=800&auto=format&fit=crop", description: "Crispy pancake with spiced potato filling" },
        { id: "bg2", name: "Vada Sambar", image: "https://images.unsplash.com/photo-1626512173582-f613e0f4b67f?w=800&auto=format&fit=crop", description: "Savory lentil donuts with sambar" },
        { id: "bg3", name: "Rava Idli", image: "https://images.unsplash.com/photo-1637861549247-08b6ea381096?w=800&auto=format&fit=crop", description: "Semolina steamed cakes" },
        { id: "bg4", name: "Pongal", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop", description: "Rice and lentil porridge with ghee" },
        { id: "bg5", name: "Uttapam", image: "https://images.unsplash.com/photo-1619057337041-133df01e77a7?w=800&auto=format&fit=crop", description: "Thick pancake with vegetables" }
      ]
    },
    diamond: {
      name: "Diamond Breakfast",
      price: 800,
      
    description: "Gourmet breakfast with special items and fresh juices. Tea & Coffee etc. are complementary.",
      items: [
        { id: "bd1", name: "Chettinad Egg Dosa", image: "https://images.unsplash.com/photo-1671646912835-a0d732be28cf?w=800&auto=format&fit=crop", description: "Crispy dosa with spiced egg topping" },
        { id: "bd2", name: "Appam with Stew", image: "https://images.unsplash.com/photo-1629358101753-531fa5a0a824?w=800&auto=format&fit=crop", description: "Fermented rice hoppers with vegetable stew" },
        { id: "bd3", name: "Pesarattu", image: "https://images.unsplash.com/photo-1589301747235-160893a2e7d8?w=800&auto=format&fit=crop", description: "Mung bean pancakes" },
        { id: "bd4", name: "Aloo Paratha", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop", description: "Stuffed potato flatbread" },
        { id: "bd5", name: "Puttu with Kadala Curry", image: "https://images.unsplash.com/photo-1605197161470-5ab1b7a0c05e?w=800&auto=format&fit=crop", description: "Steamed rice cake with chickpea curry" },
        { id: "bd6", name: "Fresh Fruit Platter", image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop", description: "Assortment of seasonal fruits" }
      ]
    }
  },
  vegetarian: {
    silver: {
      name: "Silver Package",
      price: 1000,
      description: "Essential vegetarian menu with quality ingredients",
      starters: [
        { id: "vs1", name: "Paneer Tikka", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop", description: "Marinated cottage cheese grilled to perfection" },
        { id: "vs2", name: "Vegetable Spring Rolls", image: "https://images.unsplash.com/photo-1606721977440-13e6c3a3505a?w=800&auto=format&fit=crop", description: "Crispy rolls filled with vegetables" },
        { id: "vs3", name: "Hara Bhara Kabab", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop", description: "Spinach and pea patties" },
        { id: "vs4", name: "Aloo Tikki", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop", description: "Spiced potato patties" }
      ],
      mainCourse: [
        { id: "vm1", name: "Paneer Butter Masala", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop", description: "Cottage cheese in rich tomato gravy" },
        { id: "vm2", name: "Dal Makhani", image: "https://images.unsplash.com/photo-1626200419199-391ae4a36cef?w=800&auto=format&fit=crop", description: "Creamy black lentils" },
        { id: "vm3", name: "Veg Biryani", image: "https://images.unsplash.com/photo-1630409354609-10a178f8116e?w=800&auto=format&fit=crop", description: "Fragrant rice with vegetables" }
      ],
      desserts: [
        { id: "vd1", name: "Gulab Jamun", image: "https://images.unsplash.com/photo-1593404231994-3f3898698a5d?w=800&auto=format&fit=crop", description: "Sweet milk dumplings" },
        { id: "vd2", name: "Rice Kheer", image: "https://images.unsplash.com/photo-1626082936754-d2847c1a3258?w=800&auto=format&fit=crop", description: "Rice pudding with nuts" }
      ]
    },
    gold: {
      name: "Gold Package",
      price: 1500,
      description: "Premium vegetarian dishes with enhanced flavors",
      starters: [
        { id: "vgs1", name: "Dahi Ke Kebab", image: "https://images.unsplash.com/photo-1593030665766-35e50471578e?w=800&auto=format&fit=crop", description: "Yogurt-based soft kebabs" },
        { id: "vgs2", name: "Stuffed Mushrooms", image: "https://images.unsplash.com/photo-1604135307399-86c3e908a352?w=800&auto=format&fit=crop", description: "Mushrooms with herb filling" },
        { id: "vgs3", name: "Crispy Corn", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop", description: "Sweet and spicy fried corn" },
        { id: "vgs4", name: "Paneer Shashlik", image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800&auto=format&fit=crop", description: "Grilled paneer with vegetables" }
      ],
      mainCourse: [
        { id: "vgm1", name: "Malai Kofta", image: "https://images.unsplash.com/photo-1631292784640-2b24be951d0d?w=800&auto=format&fit=crop", description: "Potato dumplings in creamy sauce" },
        { id: "vgm2", name: "Kadai Paneer", image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&auto=format&fit=crop", description: "Paneer in spiced bell pepper gravy" },
        { id: "vgm3", name: "Vegetable Jalfrezi", image: "https://images.unsplash.com/photo-1645696301619-eda389dc0e5f?w=800&auto=format&fit=crop", description: "Mixed vegetables in tangy sauce" },
        { id: "vgm4", name: "Hyderabadi Biryani", image: "https://images.unsplash.com/photo-1604908550665-327363165be2?w=800&auto=format&fit=crop", description: "Aromatic rice with vegetables" }
      ],
      desserts: [
        { id: "vgd1", name: "Rasmalai", image: "https://images.unsplash.com/photo-1602544008708-fa726478fec2?w=800&auto=format&fit=crop", description: "Cheese patties in sweet milk" },
        { id: "vgd2", name: "Gajar Ka Halwa", image: "https://images.unsplash.com/photo-1619225379807-e09c73e44bfd?w=800&auto=format&fit=crop", description: "Carrot pudding with nuts" },
        { id: "vgd3", name: "Kulfi", image: "https://images.unsplash.com/photo-1612171579482-3c293ed6c252?w=800&auto=format&fit=crop", description: "Traditional Indian ice cream" }
      ]
    },
    diamond: {
      name: "Diamond Package",
      price: 2000,
      description: "Gourmet vegetarian cuisine with signature specialties",
      starters: [
        { id: "vds1", name: "Tandoori Broccoli", image: "https://images.unsplash.com/photo-1597226051193-b5560c8564a1?w=800&auto=format&fit=crop", description: "Marinated broccoli from clay oven" },
        { id: "vds2", name: "Avocado Papdi Chaat", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop", description: "Crispy crackers with avocado topping" },
        { id: "vds3", name: "Truffle Mushroom Tikka", image: "https://images.unsplash.com/photo-1622732778022-212d73f36aa1?w=800&auto=format&fit=crop", description: "Mushrooms with truffle oil" },
        { id: "vds4", name: "Zucchini Kebabs", image: "https://images.unsplash.com/photo-1625944525533-473038e44a15?w=800&auto=format&fit=crop", description: "Spiced zucchini patties" },
        { id: "vds5", name: "Stuffed Jalapeno Poppers", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&auto=format&fit=crop", description: "Cheese filled jalapenos" }
      ],
      mainCourse: [
        { id: "vdm1", name: "Paneer Lababdar", image: "https://images.unsplash.com/photo-1631293921906-398bf0a2d270?w=800&auto=format&fit=crop", description: "Cottage cheese in rich gravy" },
        { id: "vdm2", name: "Subz Nargisi Kofta", image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=800&auto=format&fit=crop", description: "Vegetable dumplings with egg-less filling" },
        { id: "vdm3", name: "Achaari Baingan", image: "https://images.unsplash.com/photo-1633321528400-7c8ae9503965?w=800&auto=format&fit=crop", description: "Eggplant in pickle spices" },
        { id: "vdm4", name: "Quinoa Biryani", image: "https://images.unsplash.com/photo-1645177628472-6b7378710b0f?w=800&auto=format&fit=crop", description: "Quinoa with aromatic spices" },
        { id: "vdm5", name: "Kashmiri Dum Aloo", image: "https://images.unsplash.com/photo-1596395470103-d37b0919ba05?w=800&auto=format&fit=crop", description: "Baby potatoes in yogurt gravy" }
      ],
      desserts: [
        { id: "vdd1", name: "Pista Kulfi", image: "https://images.unsplash.com/photo-1593250816902-0ccfbd6f75ab?w=800&auto=format&fit=crop", description: "Pistachio ice cream" },
        { id: "vdd2", name: "Saffron Phirni", image: "https://images.unsplash.com/photo-1605197161470-5ab1b7a0c05e?w=800&auto=format&fit=crop", description: "Rice pudding with saffron" },
        { id: "vdd3", name: "Rose Sandesh", image: "https://images.unsplash.com/photo-1583086552810-289fcfc948ab?w=800&auto=format&fit=crop", description: "Rose-flavored cheese dessert" },
        { id: "vdd4", name: "Apple Jalebi with Ice Cream", image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&auto=format&fit=crop", description: "Apple fritters with ice cream" }
      ]
    }
  },
  nonVegetarian: {
    silver: {
      name: "Silver Package",
      price: 1200,
      description: "Classic non-vegetarian favorites",
      starters: [
        { id: "nvs1", name: "Chicken Tikka", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop", description: "Marinated chicken pieces grilled" },
        { id: "nvs2", name: "Fish Amritsari", image: "https://images.unsplash.com/photo-1626096633866-da4c6d7f2d66?w=800&auto=format&fit=crop", description: "Battered and fried fish" },
        { id: "nvs3", name: "Keema Samosa", image: "https://images.unsplash.com/photo-1601050690293-8cec186e4f74?w=800&auto=format&fit=crop", description: "Pastry filled with minced meat" },
        { id: "nvs4", name: "Chicken 65", image: "https://images.unsplash.com/photo-1631293971306-3a7e5a5cf322?w=800&auto=format&fit=crop", description: "Spicy fried chicken" }
      ],
      mainCourse: [
        { id: "nvm1", name: "Butter Chicken", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop", description: "Chicken in tomato butter sauce" },
        { id: "nvm2", name: "Mutton Curry", image: "https://images.unsplash.com/photo-1631293578576-87716f955e82?w=800&auto=format&fit=crop", description: "Traditional mutton curry" },
        { id: "nvm3", name: "Chicken Biryani", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop", description: "Rice cooked with chicken" }
      ],
      desserts: [
        { id: "nvd1", name: "Gulab Jamun", image: "https://images.unsplash.com/photo-1593404231994-3f3898698a5d?w=800&auto=format&fit=crop", description: "Sweet milk dumplings" },
        { id: "nvd2", name: "Rice Kheer", image: "https://images.unsplash.com/photo-1626082936754-d2847c1a3258?w=800&auto=format&fit=crop", description: "Rice pudding with nuts" }
      ]
    },
    gold: {
      name: "Gold Package",
      price: 1800,
      description: "Premium non-vegetarian selection with specialty dishes",
      starters: [
        { id: "nvgs1", name: "Tandoori Prawns", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop", description: "Prawns marinated and grilled" },
        { id: "nvgs2", name: "Mutton Seekh Kebab", image: "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=800&auto=format&fit=crop", description: "Minced mutton skewers" },
        { id: "nvgs3", name: "Chicken Malai Tikka", image: "https://images.unsplash.com/photo-1628294896516-344152572ee8?w=800&auto=format&fit=crop", description: "Creamy chicken tikka" },
        { id: "nvgs4", name: "Fish Koliwada", image: "https://images.unsplash.com/photo-1626777555949-3b661a9a1543?w=800&auto=format&fit=crop", description: "Spiced fried fish" }
      ],
      mainCourse: [
        { id: "nvgm1", name: "Rogan Josh", image: "https://images.unsplash.com/photo-1603895876295-59c94d2956c5?w=800&auto=format&fit=crop", description: "Kashmiri mutton curry" },
        { id: "nvgm2", name: "Chicken Chettinad", image: "https://images.unsplash.com/photo-1626777546477-9daf8abf3701?w=800&auto=format&fit=crop", description: "Spicy South Indian chicken" },
        { id: "nvgm3", name: "Fish Curry", image: "https://images.unsplash.com/photo-1626777553635-0c444108531d?w=800&auto=format&fit=crop", description: "Fish in tangy curry" },
        { id: "nvgm4", name: "Hyderabadi Dum Biryani", image: "https://images.unsplash.com/photo-1626777552726-4a6b9bf402c4?w=800&auto=format&fit=crop", description: "Layered rice with meat" }
      ],
      desserts: [
        { id: "nvgd1", name: "Rasmalai", image: "https://images.unsplash.com/photo-1602544008708-fa726478fec2?w=800&auto=format&fit=crop", description: "Cheese patties in sweet milk" },
        { id: "nvgd2", name: "Gajar Ka Halwa", image: "https://images.unsplash.com/photo-1619225379807-e09c73e44bfd?w=800&auto=format&fit=crop", description: "Carrot pudding with nuts" },
        { id: "nvgd3", name: "Shahi Tukda", image: "https://images.unsplash.com/photo-1618740093733-e3e7b544a176?w=800&auto=format&fit=crop", description: "Bread pudding with cream" }
      ]
    },
    diamond: {
      name: "Diamond Package",
      price: 2500,
      description: "Gourmet non-vegetarian feast with signature specialties",
      starters: [
        { id: "nvds1", name: "Lamb Chops", image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=800&auto=format&fit=crop", description: "Grilled marinated lamb chops" },
        { id: "nvds2", name: "Prawn Tempura", image: "https://images.unsplash.com/photo-1585325701165-351af302ecd6?w=800&auto=format&fit=crop", description: "Battered and fried prawns" },
        { id: "nvds3", name: "Chicken Liver Pâté", image: "https://images.unsplash.com/photo-1611922496592-12fa59d74663?w=800&auto=format&fit=crop", description: "Smooth chicken liver spread" },
        { id: "nvds4", name: "Smoked Salmon Canapés", image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=800&auto=format&fit=crop", description: "Bread with salmon topping" },
        { id: "nvds5", name: "Grilled Scallops", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4999b?w=800&auto=format&fit=crop", description: "Scallops with herb butter" }
      ],
      mainCourse: [
        { id: "nvdm1", name: "Butter Garlic Lobster", image: "https://images.unsplash.com/photo-1559737604-3ca329e47671?w=800&auto=format&fit=crop", description: "Lobster in garlic butter" },
        { id: "nvdm2", name: "Nalli Nihari", image: "https://images.unsplash.com/photo-1631293795223-c7be3b7e44b4?w=800&auto=format&fit=crop", description: "Slow-cooked lamb shanks" },
        { id: "nvdm3", name: "Duck Confit", image: "https://images.unsplash.com/photo-1578943357858-4c0cc1a6bc8c?w=800&auto=format&fit=crop", description: "Preserved duck with spices" },
        { id: "nvdm4", name: "Kashmiri Lamb Biryani", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop", description: "Fragrant rice with lamb" },
        { id: "nvdm5", name: "Goan Fish Curry", image: "https://images.unsplash.com/photo-1626777542461-93d18689c180?w=800&auto=format&fit=crop", description: "Fish in coconut curry" }
      ],
      desserts: [
        { id: "nvdd1", name: "Baklava", image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=800&auto=format&fit=crop", description: "Layered pastry with nuts" },
        { id: "nvdd2", name: "Crème Brûlée", image: "https://images.unsplash.com/photo-1615561437250-7f8d8ce621c2?w=800&auto=format&fit=crop", description: "Custard with caramelized top" },
        { id: "nvdd3", name: "Chocolate Truffle Cake", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop", description: "Rich chocolate cake" },
        { id: "nvdd4", name: "Tiramisu", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop", description: "Coffee-flavored Italian dessert" }
      ]
    }
  }
};
