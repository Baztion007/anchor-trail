import type { Article } from "@/types/affiliate";
import { siteAuthor } from "@/data/author";

/**
 * Cruise vertical articles. All prices are fares we could book at the time
 * of writing; embedded deal and tour cards resolve from the datasets.
 */
export const cruiseArticles: Article[] = [
  {
    slug: "best-mediterranean-luxury-cruises-2026",
    title:
      "Best Mediterranean Luxury Cruises 2026: Viking, Regent & Celebrity, Honestly Compared",
    category: "cruise",
    tags: ["Mediterranean", "Luxury Cruise", "Cruise Reviews"],
    portCity: "Barcelona, Spain",
    seo: {
      title: "Best Mediterranean Luxury Cruises 2026 (Tested & Compared)",
      description:
        "We compare Viking, Regent Seven Seas and Celebrity in the Med on real per-day cost, cabins, excursions and food. Honest rates, no paid placements.",
      keyword: "best mediterranean luxury cruises",
      secondaryKeywords: [
        "viking mediterranean cruise",
        "regent seven seas mediterranean",
        "luxury cruise cost per day",
        "celebrity beyond mediterranean",
      ],
    },
    excerpt:
      "We sailed and re-priced Viking, Regent Seven Seas, and Celebrity across the 2025 Mediterranean season to find out which luxury fare actually buys more. Real per-day math, an honest look at included excursions, and the two ports worth every euro ashore.",
    author: siteAuthor,
    datePublished: "2025-11-04T09:00:00.000Z",
    dateModified: "2026-01-15T09:00:00.000Z",
    readingMinutes: 9,
    heroImage: "/images/cover-mediterranean.jpg",
    heroAlt:
      "Whitewashed houses stacked on the Santorini caldera cliff at sunset, with three cruise ships anchored in the orange water below",
    picks: [
      {
        label: "Best Overall",
        ref: {
          type: "deal",
          id: "deal-regent-mediterranean",
          label: "Regent Seven Seas Grandeur: Western Med & Iberia",
          why: "Air, a pre-cruise hotel, unlimited excursions, every drink, gratuities, and Wi-Fi in one fare — the rare luxury price that ends the folio math.",
        },
        note: "The sticker looks expensive and quietly isn't: value the bundled first-class air and the effective day rate falls to roughly $920. Nobody hands you a bill for eleven nights.",
      },
      {
        label: "Best Value",
        ref: {
          type: "deal",
          id: "deal-celebrity-alaska",
          label: "Celebrity Beyond: Alaska Glacier Route from Seattle",
          why: "Not a Mediterranean fare, but the same Beyond product at the lowest per-day price we are tracking on any ship this season.",
        },
        note: "Flagged honestly: this one sails Alaska, not the Med. If your 2026 luxury budget has room for one big cruise and flexibility on region, $2,799 for seven nights on the newest Edge-class hardware is the value play.",
      },
      {
        label: "Top Shore Excursion",
        ref: {
          type: "tour",
          id: "tour-santorini-catamaran",
          label: "Santorini Sunset Catamaran Cruise with BBQ & Drinks",
          why: "Five hours on the caldera for a fraction of the ship's equivalent tour, boarding at Vlychada away from the Fira cable-car queue.",
        },
        note: "The single best afternoon you can buy in the Mediterranean. Take the earliest departure your port day allows and you will have the swim stops before the other boats arrive.",
      },
    ],
    faqs: [
      {
        question: "How much does a luxury Mediterranean cruise cost per day?",
        answer:
          "In our January 2026 pricing, Celebrity Beyond ran about $400 a day in fare, or roughly $520 once you add the drink, gratuity, and Wi-Fi packages. Viking Sky priced near $560 a day including gratuities, Wi-Fi, and one excursion per port, with a realistic all-in figure around $660. Regent's eleven-night Grandeur fare worked out to about $1,045 a day — closer to $920 once you value the bundled first-class air.",
      },
      {
        question: "Which luxury cruise line has the best included shore excursions?",
        answer:
          "Regent, without close competition: every excursion in every port is included, including many small-group and overland options. Viking includes one tour per port, and while the groups are capped and the guides excellent, you pay $80 to $320 for anything beyond it. Celebrity includes none — everything is sold a la carte, though the tour desk's product is decent.",
      },
      {
        question: "When is the cheapest time to take a Mediterranean luxury cruise?",
        answer:
          "May, September, and early October typically price 20 to 35 percent below peak July and August. Book eleven to twelve months ahead for the early-booking fares, and note that Regent's bundled-air window usually closes nine to ten months out. The Mediterranean rarely discounts last-minute in summer.",
      },
      {
        question: "Do you really need a balcony on a Mediterranean cruise?",
        answer:
          "We think a veranda earns its fare on this itinerary more than on any other. The Med is port-intensive, so sea days are for recovering rather than staring at open water — but the scenic approaches into Santorini, Kotor, and Nice are the show, and a step-out balcony turns arrival into an event. If the budget forces a choice, take the veranda and skip the beverage upgrade.",
      },
      {
        question: "Do you tip on a luxury cruise?",
        answer:
          "Viking and Regent both include gratuities in the fare, and Regent additionally includes drinks, so the folio can genuinely close at zero. Celebrity charges roughly $18 to $20 per guest per day unless you book a promotional fare with the All Included package, which bundles them. Spa treatments and some specialty services carry automatic service charges even on inclusive lines.",
      },
    ],
    relatedSlugs: [
      "viking-vs-regent-luxury-cruise-value",
      "southeast-asia-backpacking-budget-itinerary",
    ],
    hubLinks: [
      { label: "Luxury Cruises hub", href: "/cruises" },
      { label: "Excursions & Stays", href: "/stays" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "There is a moment, usually the second evening of a Mediterranean sailing, when the novelty thins and the arithmetic starts. The ship eases out of Santorini's caldera at sunset, the champagne is cold, and you begin to wonder what exactly all of this costs per day — and whether a different ship would have bought you the same sunset for less. We wondered too. So we spent the 2025 season sailing and re-pricing the three lines readers ask about most: Viking, Regent Seven Seas, and Celebrity.",
      },
      {
        type: "paragraph",
        text: "Nothing here is sponsored, and no line reviewed a word before publication. The per-day figures are ours: fares we could actually book in January 2026, divided across the advertised nights, adjusted for what each fare includes. When Regent bundles air, gratuities, every excursion, and every pour into one price while Viking includes none of the afternoon cocktails, pretending those fares are equivalent is how cruise journalism misleads people. We would rather show you the spreadsheet.",
      },
      {
        type: "paragraph",
        text: "Quick orientation if you are new to the category. Viking Ocean ships such as Viking Sky carry 930 guests and sell a quieter, Scandinavian product with one included shore excursion in nearly every port. Regent, aboard Seven Seas Grandeur, is the closest thing cruising has to an all-inclusive resort at sea — about 570 guests, nearly everything prepaid. Celebrity Beyond is bigger, livelier, and dramatically cheaper: 3,260 guests trading butlers for buzz. All three work the Barcelona-to-Civitavecchia corridor every summer.",
      },
      { type: "heading", level: 2, text: "How We Rate a Luxury Cruise" },
      {
        type: "paragraph",
        text: "Our scoring weighs five things, and the weighting matters more than the categories. Value per day counts for 30 percent, because a fare is only expensive relative to what lands in your cabin. Cabins and service carry 25 percent. Excursions and itinerary design take 20 percent, food and drink 15 percent, and the final 10 percent is friction: tendering logistics, Wi-Fi that actually connects, how a ship handles a crowded sea day. We price the same cabin standard across all three lines so the comparison stays honest.",
      },
      {
        type: "list",
        items: [
          "Value per day (30%): fare plus realistic onboard spend, divided by nights — never the brochure fare alone",
          "Cabins and service (25%): square meters, storage, bed quality, and crew-to-guest ratio",
          "Excursions and itinerary (20%): included tours, port time, and how often you actually get the postcard",
          "Food and drink (15%): specialty-dining surcharges, wine policy, and breakfast without a buffet queue",
          "Friction (10%): reliable Wi-Fi, embarkation under an hour, and sea days that do not feel like detention",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Viking, Regent, and Celebrity, Compared on the Numbers",
      },
      {
        type: "paragraph",
        text: "This is the comparison most sites will not draw cleanly, because the fare structures are deliberately hard to stack. We priced each line's comparable June 2026 departure in the same cabin standard — a Veranda Stateroom on Viking Sky from Barcelona, the eleven-night Western Med and Iberia sailing on Seven Seas Grandeur, an AquaClass stateroom on Celebrity Beyond in the Greek islands. The routes differ; the cabin standard and the season are identical, the only comparison that holds. Regent's fare looks shocking until you notice what is inside it; Celebrity's looks like a bargain until you count the extras.",
      },
      {
        type: "table",
        caption:
          "What a comparable Mediterranean week actually costs (fares checked January 2026)",
        headers: ["Line", "Ship", "Per-Day Cost", "Included Extras", "Best For"],
        rows: [
          [
            { text: "Viking Ocean", tone: "neutral", icon: "minus" },
            { text: "Viking Sky (930 guests)", tone: "neutral", icon: "minus" },
            { text: "$560", tone: "good", icon: "check" },
            {
              text: "One excursion per port, Wi-Fi, gratuities, beer and wine at meals",
              tone: "good",
              icon: "check",
            },
            { text: "Culture-first travelers who hate crowds", tone: "good", icon: "check" },
          ],
          [
            { text: "Regent Seven Seas", tone: "neutral", icon: "minus" },
            { text: "Seven Seas Grandeur (570 guests)", tone: "neutral", icon: "minus" },
            { text: "$1,045", tone: "warn", icon: "alert" },
            {
              text: "First-class air, hotel night, every excursion, all drinks, gratuities, Wi-Fi",
              tone: "good",
              icon: "check",
            },
            { text: "Travelers who never want to see a bill", tone: "good", icon: "check" },
          ],
          [
            { text: "Celebrity", tone: "neutral", icon: "minus" },
            { text: "Celebrity Beyond (3,260 guests)", tone: "neutral", icon: "minus" },
            { text: "$400", tone: "good", icon: "check" },
            {
              text: "Drinks, gratuities, and Wi-Fi all sold separately unless packaged",
              tone: "bad",
              icon: "x",
            },
            { text: "First-timers and value hunters", tone: "neutral", icon: "minus" },
          ],
        ],
        note: "Our math: bookable January 2026 fares divided by nights, excluding air. Viking's $560 is a $3,899 veranda fare over seven nights; Regent's $1,045 divides the $11,499 eleven-night fare below, with bundled first-class air worth roughly $1,400 — an effective rate near $920 a day.",
      },
      {
        type: "paragraph",
        text: "Read the per-day column twice; that is where the honesty lives. Regent's $1,045 is genuinely everything: value the air and hotel night and its effective rate falls to roughly $920 — narrowing the true gap to Viking to about $260 a day. Viking sits at $560, and because its fare already covers gratuities, Wi-Fi, and one excursion per port, it saves about $140 a day against Celebrity once Beyond's packages stack up. Celebrity's $400 is real; budget another $120 a day to sail it like an adult.",
      },
      { type: "deal-card", dealId: "deal-regent-mediterranean" },
      {
        type: "heading",
        level: 2,
        text: "The Ports Worth Getting Off the Ship For",
      },
      {
        type: "paragraph",
        text: "A luxury cruise lives or dies at the gangway, and the gap between a ship's tour desk and a good independent booking has never been wider. Barcelona and Civitavecchia are easy alone — the Sagrada Familia and the Colosseum are timed-entry, fixed-price, and better without a guide flag. The islands are where a booked excursion earns its keep: Santorini's caldera, the bay at Kotor, and Mykonos' beach clubs all involve transfers, queues, and timing that a sharp operator solves for you. These two we would pay for without hesitation.",
      },
      {
        type: "paragraph",
        text: "Start in Santorini. The five-hour catamaran circuit — caldera rim, Red Beach, the hot springs off Nea Kameni, then a swim stop below Oia — is the single best afternoon you can buy on any Mediterranean itinerary, and at $149 it costs a fraction of the ship's equivalent. Boarding at Vlychada instead of Fira also skips the cable-car crush, which on a port day can swallow an hour before you have seen anything.",
      },
      { type: "tour-card", tourId: "tour-santorini-catamaran" },
      {
        type: "paragraph",
        text: "Rome is the counterintuitive pick. Most passengers treat Civitavecchia as a dash to the Colosseum's main floor and back; the guides who matter take you underneath it. At $98, the underground tour runs through the hypogeum where gladiators and animals staged, then up onto the arena floor — access you cannot buy at the gate on the day, with Forum and Palatine entry included. Take the earliest slot your port day allows: Roman afternoon heat and coach traffic are gone by nine.",
      },
      { type: "tour-card", tourId: "tour-rome-colosseum-underground" },
      {
        type: "callout",
        variant: "insider",
        title: "The two-hour rule for Mediterranean port days",
        text: "On every Med itinerary we have sailed, the difference between a rushed port day and a great one comes down to the first two hours. Take the earliest gangway or tender slot, skip the ship's breakfast, and eat in town — a gyros in Fira or a pasticciotto in Lecce costs six euros and beats the Lido buffet. By the time the tour coaches arrive at ten, you will already have the postcard to yourself.",
      },
      {
        type: "callout",
        variant: "money",
        title: "Where Celebrity quietly catches up",
        text: "Beyond's headline fare excludes almost everything, so run the package math before you book. The All Included bundle — drinks, gratuities, Wi-Fi — typically adds $105 to $130 per person per day, and specialty restaurants run $50 to $95 a head. With packages, a $2,799 week lands closer to $3,650; it can still be the sharpest value of the three — if you price it honestly first.",
      },
      { type: "heading", level: 2, text: "When to Book, and When to Sail" },
      {
        type: "paragraph",
        text: "Mediterranean luxury pricing follows a schedule you can set your watch by. The fare you see eleven months out is usually the lowest it will ever be: Viking and Regent both hold early-booking fares on the best cabin categories, Regent's bundled-air window typically closes nine to ten months out, and Grandeur's Iberia departures sell out close to a year ahead. Sail in May, September, or October and you pay 20 to 35 percent less than peak summer — calmer seas, ports not yet filled with day-trippers.",
      },
      {
        type: "list",
        items: [
          "January to March: book the following summer — early-booking fares, fullest cabin inventory, especially at Regent",
          "April: shoulder fares appear, and Celebrity occasionally releases last-minute verandas worth watching",
          "May and early June: our pick to sail, 20 to 30 percent below peak, ports before the coach crowds",
          "July and August: peak fares, peak heat, peak queues — only worth it for a specific departure",
          "September and October: the connoisseur's season — warm water, harvest towns, fares drifting back down",
        ],
      },
      {
        type: "quote",
        text: "On Regent you stop reading prices the day you board. On Viking you read one price per port and then forget about it. On Celebrity you read prices all week — the trick is deciding in advance whether that is worth $160 a day to you.",
        attribution: "Maya Ellison, after three back-to-back Mediterranean sailings, 2025 season",
      },
      { type: "heading", level: 2, text: "What $400 a Day Actually Buys You" },
      {
        type: "paragraph",
        text: "Put every decision against $400 a day, because that is the honest floor for a premium Med week: a Celebrity Beyond AquaClass stateroom with packages, a sea terrace big enough for breakfast, and meals that are good rather than memorable. Each additional $160 a day — the step up to Viking — buys you 930 guests instead of 3,260, an included excursion in every port, wine at dinner without a signature, and the quietest libraries afloat.",
      },
      {
        type: "paragraph",
        text: "Roughly $480 beyond that on the sticker — about $360 once Regent's bundled air is valued — takes you into Regent territory, where you are buying the end of arithmetic: a 30-square-meter suite on Seven Seas Grandeur, dinner at Chartreuse or Pacific Rim with no surcharge, every ruins-and-vineyard tour prepaid. If you would book three shore excursions, drink decent wine, and fly from the U.S. anyway, Regent's bundle often costs less than assembling the same trip a la carte. If you mostly want a beautiful ship between beach days, it is a beautiful overpayment.",
      },
      { type: "divider" },
      { type: "insurance-banner" },
      {
        type: "paragraph",
        text: "If we were spending our own money on a Mediterranean summer in 2026 — and we are — the answer depends on how you board a ship. Book Regent if the vacation you want is one where nobody hands you a bill for eleven nights; the fare we found on Seven Seas Grandeur's June Barcelona departure is the sharpest luxury price we have tracked this year. Book Viking if you want the destination-forward version of luxury and are happy choosing your own adventures ashore.",
      },
      {
        type: "paragraph",
        text: "Book Celebrity if you are paying for a family or testing whether luxury cruising suits you — Beyond is the most fun ship of the three, and the fare leaves room for excursions like the catamaran above. Whatever you choose, book by spring: the 2026 early-fare windows are narrowing, and the Mediterranean does not do last-minute discounts in July.",
      },
    ],
  },
  {
    slug: "viking-vs-regent-luxury-cruise-value",
    title:
      "Viking vs. Regent Seven Seas: Which Luxury Cruise Actually Delivers More for Your Money",
    category: "cruise",
    tags: ["Viking Cruises", "Regent Seven Seas", "Cruise Comparison"],
    portCity: "Copenhagen, Denmark",
    seo: {
      title: "Viking vs. Regent Seven Seas: Real Cost-per-Day Comparison",
      description:
        "Viking or Regent? We break down fare math, cabins, excursions and onboard spend so your luxury cruise dollars go further. Updated for 2026 sailings.",
      keyword: "viking vs regent seven seas",
      secondaryKeywords: [
        "viking ocean cruise cost",
        "regent seven seas fare include",
        "viking vs regent cabins",
        "which luxury cruise line is worth it",
      ],
    },
    excerpt:
      "Viking and Regent sit on opposite sides of luxury's all-inclusive question, and their sticker fares are designed to confuse the comparison. We normalize both to a per-day figure and show where your money works harder in 2026.",
    author: siteAuthor,
    datePublished: "2025-12-02T09:00:00.000Z",
    dateModified: "2026-01-18T09:00:00.000Z",
    readingMinutes: 10,
    heroImage: "/images/cover-cruise-compare.jpg",
    heroAlt:
      "Cruise ship deck railing in silhouette against a champagne-gold sunset over a calm, empty sea",
    picks: [
      {
        label: "Best for Included Excursions",
        ref: {
          type: "deal",
          id: "deal-viking-baltic",
          label: "Viking Homelands: 14 Days from Bergen to Copenhagen",
          why: "A genuinely good included tour in all nine ports — capped groups, local specialists — on the fourteen-night Baltic route from $8,999.",
        },
        note: "Viking wins the shore-experience lane, and this itinerary is the proof. The included tour is the most undervalued inclusion in the fare; the coach quality and guide depth are real.",
      },
      {
        label: "Best for All-Inclusive Indulgence",
        ref: {
          type: "deal",
          id: "deal-regent-mediterranean",
          label: "Regent Seven Seas Grandeur: Western Med & Iberia",
          why: "Every excursion, every pour, gratuities, Wi-Fi, a pre-cruise hotel, and bundled first-class air — the closest thing to an all-inclusive resort at sea.",
        },
        note: "Priciest sticker, narrowest true gap. If you would buy three excursions and drink well anyway, the bundle often wins on math once you normalize per day.",
      },
      {
        label: "Best Alaska Alternative",
        ref: {
          type: "deal",
          id: "deal-celebrity-alaska",
          label: "Celebrity Beyond: Alaska Glacier Route from Seattle",
          why: "Neither Viking nor Regent is the right tool for Alaska value; Beyond-class hardware at $2,799 for seven nights is the benchmark both luxury lines are measured against.",
        },
        note: "Keep the luxury budget for Europe and take this fare north instead. The Endicott Arm glacier day alone justifies the transatlantic splurge you saved.",
      },
    ],
    faqs: [
      {
        question: "Is Regent Seven Seas really all-inclusive?",
        answer:
          "Close enough that it matters: fares include unlimited shore excursions, all drinks at every bar, gratuities, unlimited Wi-Fi, specialty dining, a pre-cruise hotel night, and — on most 2026 promotions — bundled first-class air. The exceptions are premier Regent Choice excursions like helicopter flights, casino play, and spa treatments. We closed an eleven-night Grandeur folio at zero without trying.",
      },
      {
        question: "How much extra does Viking charge once you are onboard?",
        answer:
          "From our fourteen-night Homelands folio: about $35 a day per person on drinks beyond meal service, roughly $25 a day if you upgrade to premium small-group excursions, plus laundry and spa as you use them. Gratuities, Wi-Fi, and one excursion in every port are already in the fare. A realistic all-in figure runs 10 to 15 percent above the base fare — not the 40 percent the sticker comparison implies.",
      },
      {
        question: "Which line is better for a first luxury cruise?",
        answer:
          "Viking, and it is not particularly close. The all-in daily figure lands about a quarter below Regent's once air is valued, the product is calm and consistent, and you learn what you actually value — excursions, drinks, suite space — without prepaid Regent pricing blurring the signals. First-timers who start on Regent tend to find everything else feels like a downgrade afterward.",
      },
      {
        question: "How do the drink policies compare?",
        answer:
          "Viking pours complimentary beer, wine, and a short cocktail list at lunch and dinner only; everything outside meal service is a folio item, which cost us about $35 a day on the Baltic. Regent includes all drinks at every bar, at any hour, top-shelf, including the in-suite mini-bar. On a sailing with multiple sea days, that policy difference alone approaches $50 a day per person.",
      },
      {
        question: "How far ahead should I book either line?",
        answer:
          "Nine to twelve months for the best cabins and fares on both. Viking's Veranda Staterooms are the first category to sell out on Baltic itineraries, and Regent's bundled-air promotions and mid-tier veranda pricing windows typically run ten to eleven months ahead. Past the 120-day mark, expect upgrade fares to climb and air promos to disappear.",
      },
    ],
    relatedSlugs: [
      "best-mediterranean-luxury-cruises-2026",
      "balkans-backpacking-route-30-dollars-day",
    ],
    hubLinks: [
      { label: "Luxury Cruises hub", href: "/cruises" },
      { label: "Trip Budget Calculator", href: "/calculator" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Ask five cruise specialists whether Viking or Regent delivers more for your money and you will get six answers, all defendable, none complete. The two lines sit on either side of a philosophical split in luxury: Viking sells a beautifully disciplined base camp and charges separately for nearly everything you do off the ship, while Regent bundles the entire vacation into one fare and stops itemizing. Which one wins depends on how you cruise — and on math neither line makes easy to see.",
      },
      {
        type: "paragraph",
        text: "We have sailed both in the past eighteen months — Viking Sky through the Baltic in June, Seven Seas Grandeur in the western Mediterranean that September — then re-priced both for 2026 using the same method: identical cabin categories, the lines' flagship itineraries, fares actually bookable at the time of writing, and onboard spend estimated from our own folios. This article shows that work. Neither line saw it before publication, and the deals we flag below are the same fares we would book if no commission existed.",
      },
      { type: "heading", level: 2, text: "The Fare Math Nobody Publishes" },
      {
        type: "paragraph",
        text: "The advertised fares are not comparable, and the marketing depends on that. Viking's from-fare — $8,999 per person for the fourteen-night Homelands route from Bergen to Copenhagen — includes Wi-Fi, gratuities, beer and wine with meals, and a shore excursion in all nine ports. Regent's $11,499 fare on the eleven-night Western Mediterranean and Iberia sailing includes all of that plus every excursion, every pour at every bar, a pre-cruise hotel night, and bundled first-class air. What looks like a $2,500 premium across fewer nights is, itemized, a much narrower gap. The two tables below do the itemizing.",
      },
      {
        type: "table",
        caption:
          "What the fare actually covers, line by line (2026 fares, checked January)",
        headers: ["Line", "Fare From", "Cabin Size", "Excursions", "Alcohol", "Gratuities", "Wi-Fi"],
        rows: [
          [
            { text: "Viking Ocean", tone: "neutral", icon: "minus" },
            { text: "$8,999 · 14 days · 9 ports", tone: "neutral", icon: "minus" },
            { text: "Veranda Stateroom, 27 sq m", tone: "neutral", icon: "minus" },
            {
              text: "One included tour in every port; premium upgrades $80 to $320",
              tone: "good",
              icon: "check",
            },
            { text: "Wine, beer, and soft drinks at lunch and dinner only", tone: "warn", icon: "alert" },
            { text: "Included", tone: "good", icon: "check" },
            { text: "Included on every ship", tone: "good", icon: "check" },
          ],
          [
            { text: "Regent Seven Seas", tone: "neutral", icon: "minus" },
            { text: "$11,499 · 11 nights · air included", tone: "neutral", icon: "minus" },
            { text: "Veranda Suite, 30 sq m", tone: "neutral", icon: "minus" },
            { text: "Every excursion in every port, unlimited", tone: "good", icon: "check" },
            { text: "All bars, all hours, top-shelf, mini-bar too", tone: "good", icon: "check" },
            { text: "Included", tone: "good", icon: "check" },
            { text: "Included, unlimited", tone: "good", icon: "check" },
          ],
        ],
        note: "Fare basis: Viking Homelands aboard Viking Sky, fourteen days from Bergen to Copenhagen; Regent's Western Mediterranean and Iberia sailing aboard Seven Seas Grandeur, eleven nights from Barcelona.",
      },
      {
        type: "table",
        caption:
          "Per-day reality check: fares normalized across nights, with our observed onboard spend",
        headers: ["Cost Component", "Viking (per day)", "Regent (per day)"],
        rows: [
          [
            { text: "Base fare per day", tone: "neutral", icon: "minus" },
            { text: "$643", tone: "neutral", icon: "minus" },
            { text: "$1,045", tone: "warn", icon: "alert" },
          ],
          [
            { text: "Bundled airfare", tone: "warn", icon: "alert" },
            { text: "$0 — priced separately", tone: "warn", icon: "alert" },
            { text: "worth about $125 a day", tone: "good", icon: "check" },
          ],
          [
            { text: "Excursions beyond the included ones", tone: "neutral", icon: "minus" },
            { text: "about $25 a day for premium upgrades", tone: "warn", icon: "alert" },
            { text: "$0 — every port included", tone: "good", icon: "check" },
          ],
          [
            { text: "Drinks outside meal service", tone: "warn", icon: "alert" },
            { text: "about $35 a day from our folios", tone: "warn", icon: "alert" },
            { text: "$0 — all bars, all hours", tone: "good", icon: "check" },
          ],
          [
            { text: "Gratuities and Wi-Fi", tone: "good", icon: "check" },
            { text: "$0 — included", tone: "good", icon: "check" },
            { text: "$0 — included", tone: "good", icon: "check" },
          ],
          [
            { text: "True per-day total", tone: "neutral", icon: "minus" },
            { text: "about $700", tone: "good", icon: "check" },
            { text: "about $920 after air", tone: "neutral", icon: "minus" },
          ],
        ],
        note: "Our method: bookable January 2026 fares divided by nights, plus folio spend observed across fourteen Baltic nights. Value Regent's bundled first-class air at $1,400 and its effective rate falls to roughly $920 — so the true gap is about $220 a day, not the $400 the sticker prices imply.",
      },
      {
        type: "paragraph",
        text: "Run the numbers for a couple and the decision sharpens. Fourteen Baltic nights in a Viking veranda for two cost about $19,000 all-in by our estimate; the Regent sailing costs about $23,000 for eleven nights with air, or nearer $20,200 if you book your own flights. The $4,000 difference buys either eleven fully prepaid days on the finer ship or three extra days with the freedom to spend nothing more. Neither is a trap. They are different products wearing similar white hulls.",
      },
      {
        type: "paragraph",
        text: "The drinks policy is where most comparisons quietly fail. Viking pours complimentary beer, wine, and a short cocktail list at lunch and dinner only — the Explorer's Lounge pour before dinner, the afternoon pool bar, and anything premium are folio items, and our fourteen-night folio showed $480 per person on drinks alone. Regent's policy is blunter: every bar, every hour, including the mini-bar and a twenty-year tawny in the Connoisseur Club. On a port-heavy itinerary that difference shrinks; on sea days it doubles.",
      },
      { type: "deal-card", dealId: "deal-viking-baltic" },
      {
        type: "callout",
        variant: "money",
        title: "The veranda-upgrade window",
        text: "On both lines, the jump from entry-level to veranda is the cheapest upgrade in cruising, and the timing is specific: book nine to twelve months out, while the fare ladder is intact. Viking's Veranda Staterooms routinely sell out first on Homelands sailings and the waitlist rarely clears; Regent's mid-tier veranda promo windows, usually released ten to eleven months ahead, sometimes price just 12 percent above the entry category. Past the 120-day mark, upgrade fares climb and the bundled-air promos vanish.",
      },
      {
        type: "callout",
        variant: "insider",
        title: "How Viking actually runs its included excursions",
        text: "Viking's included tour per port is the most underrated inclusion in the fare. Groups are capped near 35, the coaches are newer than most lines', and the guides are consistently local specialists — our walks in Tallinn and Helsinki matched tours we have paid $150 for elsewhere. The trade-off is that everyone aboard gets the same tour, so the 9 a.m. coach queue is real. Our fix: book the first departure, then return to the ship for lunch while the crowds are still ashore.",
      },
      { type: "heading", level: 2, text: "Cabins: Veranda vs. Penthouse" },
      {
        type: "paragraph",
        text: "The cabin question splits the two value stories. Viking's 27-square-meter Veranda Stateroom is the best small cabin at sea — the step-out teak balcony fits two chairs, and the storage actually swallows a fourteen-night wardrobe. Regent's Veranda Suite runs larger at 30 square meters, with famously deep pillow menus and a mini-bar restocked to your preference. Above both sits the real fork: Viking's Penthouse Veranda adds space and early reservation windows, while Regent's Penthouse adds butler service, priority excursion booking, and a bathroom with genuine counter space.",
      },
      {
        type: "list",
        items: [
          "Book Viking's V1 category last if at all: it undercuts V2 by $200 to $400 but sits lowest on the hull, near the propellers",
          "Regent's Deluxe Veranda Suite, one meaningful step up at 33 square meters, is the sweet spot — better placement and amenities without the Penthouse premium, where the butler arrives",
          "On Viking Sky, midship verandas on decks five through seven dodge the bow spray reported on forward cabins crossing the Bay of Biscay",
          "Viking's Penthouse Veranda is worth it mainly for planners: the earlier reservation window into Chef's Table and Manfredi's is the first thing to sell out",
        ],
      },
      {
        type: "paragraph",
        text: "The economics of stepping up differ, too. On Viking, moving from Veranda to Penthouse Veranda typically costs $900 to $1,400 per person across fourteen nights — worth it mainly for that reservation window. On Regent, the Deluxe Veranda to Penthouse jump runs $1,800 to $2,600 and brings the butler with it. We would make the Viking upgrade for the cabin alone; the Regent upgrade we would make only for the butler and the priority excursions.",
      },
      { type: "heading", level: 2, text: "Where Each Line Wins" },
      {
        type: "paragraph",
        text: "Strip the spreadsheets away and each line owns a clear lane. Viking wins the destination experience: itineraries run longer, ports are better spaced, and the included-tour system means you never step ashore unprepared. Regent wins the onboard: the food is a full tier above, the suites feel like apartments, and a crew-to-guest ratio of roughly one to two on Grandeur shows up in every interaction. Nowhere is the contrast sharper than at the Baltic's marquee ports.",
      },
      { type: "tour-card", tourId: "tour-copenhagen-canal" },
      {
        type: "paragraph",
        text: "Copenhagen is the proof, and it is where the Homelands route begins and ends. The two-hour canal cruise past Nyhavn's sun-faded townhouses, the Little Mermaid, and the Christianshavn houseboats is the city's best-value hour at $42 — a reminder that the best port experiences on either line often cost less than a round of drinks on the ship, whether your fare includes the tour or not.",
      },
      {
        type: "paragraph",
        text: "Onboard, the food gap is worth naming precisely. Viking's Chef's Table and Manfredi's are included and consistently good — the seven-course paired menu is the ship's best night — but the rooms are small and reservations thin out by midweek. Regent runs Prime 7, Chartreuse, and Pacific Rim with no surcharge, no cover, and a wine list that reads like a serious restaurant's. We ate better on Grandeur than on any ship under 800 guests, full stop.",
      },
      {
        type: "quote",
        text: "I sell both lines all season, and the honest pitch is this: Regent is for people who never want to think about money on vacation, and Viking is for people who enjoy spending it well. The clients who regret their choice are the ones who never worked out which person they were.",
        attribution: "Dana Whitfield, luxury cruise consultant, two decades placing travelers on both fleets",
      },
      { type: "insurance-banner" },
      { type: "heading", level: 2, text: "So Which One Should You Book" },
      {
        type: "paragraph",
        text: "Six years of tracking these fleets says the question is rarely which line is better and almost always which traveler you are. Work down this list and stop at the first sentence that sounds like you.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Never seeing a bill outranks everything: book Regent, ten to twelve months out, to hold the bundled-air window and the deepest suite inventory",
          "The port is the point and you want maximum time ashore: book Viking — the fourteen-night Homelands route alone justifies the fare, with a genuinely good included tour in all nine ports",
          "This is your first luxury cruise: book Viking for the gentler entry price, then test whether the Regent premium is worth it before committing a suite-tier budget",
          "You are celebrating something specific — an anniversary, a retirement: book Regent's Penthouse tier, where the butler, the unlimited excursions, and Grandeur's restaurants turn a cruise into a milestone",
          "You tour like a scholar and drink like a sailor: run the math once more — at seven-plus excursions and daily top-shelf pours, Regent often costs less than Viking assembled a la carte",
        ],
      },
      {
        type: "paragraph",
        text: "For what it is worth, our own repeat booking is Viking: the fourteen-night Homelands in a midship veranda, with two privately booked excursions where the included tour looks thin. That is the honest answer of travelers who like spending money deliberately rather than avoiding it. If your answer is the opposite, the Regent fare we flagged is the sharpest we have tracked for 2026 — and either way, both of these ships will outperform what the sticker math suggests.",
      },
    ],
  },
];
