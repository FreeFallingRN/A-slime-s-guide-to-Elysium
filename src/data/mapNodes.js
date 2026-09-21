/**
 * @typedef {Object} MapNode
 * @property {string} id - Unique node identifier
 * @property {string} name - Display name of the territory or landmark
 * @property {number} x - Relative X coordinate (0-100 percentage)
 * @property {number} y - Relative Y coordinate (0-100 percentage)
 * @property {string} level - Level recommendation, zone status, or region classification
 * @property {"Elysium"|"Sectors"} world - World dimension ("Elysium" or "Sectors")
 * @property {number} chapter - Unlocked at or after this chapter
 * @property {string} details - Lore and narrative description of this node
 */

/** @type {MapNode[]} */
export const mapNodesData = [
  // Elysium World Nodes
  {
    id: "slime_clearing",
    name: "Forest Clearing",
    x: 25,
    y: 30,
    level: "Starting Zone",
    world: "Elysium",
    chapter: 1,
    details: "The starting forest clearing where Lohan devours grass and avoids corporate paladins."
  },
  {
    id: "ant_trail",
    name: "Ant Colony Trail",
    x: 55,
    y: 38,
    level: "Suggested Lv: 5-8",
    world: "Elysium",
    chapter: 10,
    details: "Coordinate line of giant ant workers and fast scout ants."
  },
  {
    id: "elven_woods",
    name: "Elven Woods Crossing",
    x: 74,
    y: 48,
    level: "Suggested Lv: 10-15",
    world: "Elysium",
    chapter: 17,
    details: "Lush ancient woodland pathways where Lohan first encounters the Elven girl."
  },
  {
    id: "goblin_outpost",
    name: "Goblin Sentry Outpost",
    x: 80,
    y: 35,
    level: "Suggested Lv: 15-20",
    world: "Elysium",
    chapter: 19,
    details: "Low-level goblin outpost where scout sentries guard the pathways."
  },
  {
    id: "kobold_camp",
    name: "Kobold Camp",
    x: 45,
    y: 22,
    level: "Suggested Lv: 2-4",
    world: "Elysium",
    chapter: 39,
    details: "A campground of level 1-2 Kobolds where Halon and Lisa hunt together."
  },
  {
    id: "thalendor",
    name: "Thalendor Royal Capital",
    x: 85,
    y: 70,
    level: "Elven Capital",
    world: "Elysium",
    chapter: 45,
    details:
      "The high elven capital built over 30,000 years ago with suspended glowing vine bridges."
  },
  {
    id: "gray_wolf_forest",
    name: "Gray Wolf Woodlands",
    x: 62,
    y: 15,
    level: "Suggested Lv: 2-3",
    world: "Elysium",
    chapter: 47,
    details: "Territory of pack Gray Wolves where Halon coordinates his combat skills."
  },
  {
    id: "bear_grounds",
    name: "Bear Hunting Grounds",
    x: 50,
    y: 10,
    level: "Suggested Lv: 3-5",
    world: "Elysium",
    chapter: 49,
    details: "Deep woodlands inhabited by level 2-4 bears, used for cooperative grinding."
  },
  {
    id: "amber_tree_dungeon",
    name: "Fossilized Amber Tree",
    x: 78,
    y: 58,
    level: "Suggested Lv: 8-10",
    world: "Elysium",
    chapter: 93,
    details:
      "A towering amber tree dungeon inhabited by Level 10 Glass Beetles, designated by Lisa as the future Guild Base."
  },
  {
    id: "petal_village",
    name: "Petal Village",
    x: 72,
    y: 55,
    level: "Woodland Settlement",
    world: "Elysium",
    chapter: 95,
    details:
      "A secluded fairy village in Mythlorien where invisible forest gardeners maintain floral mana balance."
  },

  // Sectors World Nodes (Real World)
  {
    id: "operator_pod",
    name: "Lohan's Pod Room",
    x: 22,
    y: 45,
    level: "Lower Zone",
    world: "Sectors",
    chapter: 1,
    details: "Small operator cube pod housing Lohan's neural immersion tank and metal paste."
  },
  {
    id: "bus_transit",
    name: "Air-Bus Route",
    x: 48,
    y: 55,
    level: "Mid Zone Route",
    world: "Sectors",
    chapter: 6,
    details: "Flying transit line crossing the cloud limits from the lower zone."
  },
  {
    id: "academic_dome",
    name: "University Campus Dome",
    x: 72,
    y: 68,
    level: "Upper Zone",
    world: "Sectors",
    chapter: 6,
    details: "A clear acrylic globe keeping pollution out. Site of Lohan's assistant job."
  },
  {
    id: "flight_route",
    name: "Dystopian Airway Corridor",
    x: 60,
    y: 75,
    level: "Upper Zone",
    world: "Sectors",
    chapter: 20,
    details: "The transit skyline where flying motorcycles swerve around corporate buses."
  }
];
