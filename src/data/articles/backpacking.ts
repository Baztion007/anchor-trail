import type { Article } from "@/types/affiliate";
import { siteAuthor } from "@/data/author";

/**
 * Backpacking vertical: two flagship budget-route features.
 * All deal/tour/hostel/stay ids reference the shared dataset.
 */
export const backpackingArticles: Article[] = [
  {
    slug: "southeast-asia-backpacking-budget-itinerary",
    title: "Three Weeks in Southeast Asia on $1,400: The Honest Backpacking Budget",
    category: "backpacking",
    tags: ["Southeast Asia", "Budget Itinerary", "Thailand", "Vietnam", "Insurance"],
    seo: {
      title: "Southeast Asia Backpacking Budget: 3 Weeks for $1,400 (2026)",
      description:
        "A real three-week Thailand, Cambodia and Vietnam itinerary with daily costs, hostel picks, transit fares and the honest math behind a $1,400 budget.",
      keyword: "southeast asia backpacking budget",
      secondaryKeywords: [
        "thailand backpacking cost per day",
        "southeast asia itinerary 3 weeks",
        "cheap hostels southeast asia",
        "klook asia transport booking",
      ],
    },
    excerpt:
      "The real math behind three weeks in Thailand, Cambodia and Vietnam: weekly burn rates, $11 dorms, $25 sleeper buses, 220-baht ATM fees, and the four places every budget actually breaks.",
    tldr:
      "Yes — $1,400 covers three weeks in Thailand, Cambodia and Vietnam if your long-haul flight is booked separately and daily spend stays near $66. The weekly rates total about $990 before visas, one regional flight, and a buffer. The budget breaks after sunset, not at ticket counters; if discipline after 10 p.m. is doubtful, budget $1,700 and have a better trip.",
    author: siteAuthor,
    datePublished: "2025-11-18T09:00:00.000Z",
    dateModified: "2026-01-16T09:00:00.000Z",
    readingMinutes: 9,
    heroImage: "/images/cover-seasia.jpg",
    heroAlt: "Longtail boat on a turquoise Thai bay with limestone cliffs",
    picks: [
      {
        label: "Best Route Deal",
        ref: {
          type: "deal",
          id: "deal-thailand-overland",
          label: "Thailand Overland Loop",
          why: "Locks the big intercity legs at near off-the-street rates so improvisation cannot eat the transport budget.",
        },
        note: "Pairs with Klook for the legs it does not cover; together they replaced a $600 group tour on my last run.",
      },
      {
        label: "Best Social Hostel",
        ref: {
          type: "hostel",
          id: "hostel-bangkok-dorm",
          label: "Bangkok Riverside Dorm with Pool",
          why: "Pool, lockers and a midnight bar curfew — social where it counts, quiet where it pays.",
        },
        note: "Book four to six weeks ahead for November–February; the pool-facing dorms go first.",
      },
      {
        label: "Best Street-Food Intro",
        ref: {
          type: "tour",
          id: "tour-bangkok-street-food",
          label: "Bangkok Street-Food Night",
          why: "Teaches the follow-the-locals rule in one evening, which saves money every day after.",
        },
        note: "Come hungry and skip lunch; there are more tastings than the itinerary admits.",
      },
    ],
    faqs: [
      {
        question: "Is $1,400 really enough for three weeks in Southeast Asia?",
        answer:
          "Yes — as long as the $1,400 covers everything after landing and your long-haul flight is booked separately. Three weeks at the weekly rates in the table totals about $990, and visas, one regional flight and a buffer carry it to roughly $1,400. The number breaks when daily spending drifts past $66, which happens after sunset, not at ticket counters.",
      },
      {
        question: "How much should flights cost?",
        answer:
          "Regional hops are cheap: AirAsia and VietJet seats move for $30–90 booked two or three weeks out, and overnight buses booked through Klook often beat them — the $25 Bangkok–Chiang Mai sleeper also saves a hotel night. Long-haul is the real variable: Europe to Bangkok runs $350–500 in low season, the US West Coast $550–750 on sales. Set alerts and never buy the first fare you see.",
      },
      {
        question: "Is Southeast Asia safe for solo backpackers?",
        answer:
          "Broadly yes — violent crime against travelers is rare across Thailand, Cambodia and Vietnam, and hostel culture makes companions easy to find. The genuine risks are road-related: scooter crashes and unlicensed riding top most insurance claims, and boat operators vary wildly between islands. Petty theft targets phones on Khao San, and bag-snatchers on motorbikes work parts of Ho Chi Minh City, so keep bags zipped and off the traffic side.",
      },
      {
        question: "Do you need to book transport ahead?",
        answer:
          "Anything over four hours: yes, especially night buses, ferries and December trains, which sell out in high season. Klook covers the major Thai, Cambodian and Vietnamese bus and ferry routes with card payment and e-voucher delivery, so there is no ticket-office dance. Short local rides can stay spontaneous — those you buy at the station on the day.",
      },
      {
        question: "What are the best months for this route?",
        answer:
          "November to February is the mainland sweet spot: dry, cooler and busy, so book beds a week ahead. May and June are the budget shoulder — prices drop 10–15% and crowds thin, at the cost of some loud afternoon storms. Avoid September's Gulf storms and April, when Bangkok's heat makes $11 dorms with pools very popular indeed.",
      },
    ],
    relatedSlugs: [
      "balkans-backpacking-route-30-dollars-day",
      "best-mediterranean-luxury-cruises-2026",
    ],
    hubLinks: [
      { label: "Budget Backpacking hub", href: "/backpacking" },
      { label: "Trip Budget Calculator", href: "/calculator" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Twenty-one days, three countries, and a number I have argued about in hostel bars on three continents: $1,400. It is enough. It is not comfortable, and it will not survive contact with a traveler who treats every evening as a cocktail occasion. But if you sleep in dorms, eat where the plastic stools outnumber the chairs and let buses do the long miles, the math in this article is real. I ran it on my last November loop through Thailand, Cambodia and Vietnam, down to the 220-baht ATM fees.",
      },
      {
        type: "paragraph",
        text: "A quick honesty note before the spreadsheets: $1,400 here means everything after you land — twenty-one days across Bangkok, Siem Reap and central Vietnam, every bus and ferry, all visas, insurance, and a buffer for the days you get wrong. It does not include your long-haul flight from home — different article, different sale alerts. Land costs only — that is the deal, and every figure below is one I actually paid or watched hostel friends pay in late 2025.",
      },
      { type: "heading", level: 2, text: "The $1,400 Line-by-Line Budget" },
      {
        type: "paragraph",
        text: "Here is the engine of the whole trip: three ordinary weeks, each burning roughly the same fuel. I track budgets in weeks rather than days because days lie — a $6 day in Kampot hides the $95 day you spent rerouting around a missed ferry. Three weeks at the rates in the table comes to about $990, and the one-off extras carry the total to roughly $1,400.",
      },
      {
        type: "table",
        caption: "Weekly burn — solo, dorms, November–February high season",
        headers: ["Category", "Weekly Cost", "Notes"],
        rows: [
          [
            { text: "Bed", tone: "good", icon: "check" },
            { text: "$60–80", tone: "good", icon: "check" },
            { text: "Dorms $9–14 region-wide; the $11 Bangkok pick has pool, lockers and a midnight curfew.", tone: "good", icon: "check" },
          ],
          [
            { text: "Food", tone: "good", icon: "check" },
            { text: "$55–70", tone: "good", icon: "check" },
            { text: "$1 pad thai from a cart, 60-baht curries, dollar fruit shakes off the tourist strip.", tone: "good", icon: "check" },
          ],
          [
            { text: "Transport", tone: "neutral", icon: "minus" },
            { text: "$45–75", tone: "neutral", icon: "minus" },
            { text: "$25 Bangkok–Chiang Mai sleeper, $9 shuttles, $5 trains. Book long legs ahead.", tone: "neutral", icon: "minus" },
          ],
          [
            { text: "Things to do", tone: "neutral", icon: "minus" },
            { text: "$40–60", tone: "neutral", icon: "minus" },
            { text: "$37 Angkor day pass, $15 cooking class, $3 temple donations.", tone: "neutral", icon: "minus" },
          ],
          [
            { text: "Coffee, beer, chaos", tone: "warn", icon: "alert" },
            { text: "$30–45", tone: "warn", icon: "alert" },
            { text: "Chang is 60 baht in a 7-Eleven, 250 on Khao San. The line where budgets go to die.", tone: "warn", icon: "alert" },
          ],
          [
            { text: "Insurance, visas, fees", tone: "warn", icon: "alert" },
            { text: "$25–35", tone: "warn", icon: "alert" },
            { text: "220-baht ATM fees, $25 e-visas, about $2 a day for travel medical cover.", tone: "warn", icon: "alert" },
          ],
        ],
        note: "One-offs: visas about $55, one regional flight $110–130, sundries, a $150 buffer. Three weeks lands near $1,400.",
      },
      { type: "deal-card", dealId: "deal-thailand-overland" },
      {
        type: "paragraph",
        text: "Why book a routed deal? The classic mistake is treating Thailand as a horseshoe you can improvise. The country is 1,600 kilometers end to end, and figure-it-out-later costs real money when you retrace a leg over unchecked festival dates. A pre-priced overland loop locks the big transfers near off-the-street rates and leaves the small decisions — which beach, which second breakfast — flexible. Structure for the boring parts, freedom for the fun ones.",
      },
      {
        type: "paragraph",
        text: "Transport is where the $1,400 either holds or collapses, and my rule is boring: anything over four hours books ahead through Klook, everything else books on the day. The Bangkok to Chiang Mai sleeper bus runs about $25 on the platform, with operator ratings and an e-voucher that lands in your email — no printing, no ticket office, no 40-baht agency fee collected by a man with a laminated spreadsheet. Night buses also save a hotel night — an $11 bed becomes two travel days for the price of one.",
      },
      { type: "heading", level: 2, text: "Bangkok: The Launchpad" },
      {
        type: "paragraph",
        text: "Give Bangkok three nights, not one. It is the cheapest airport city you will ever acclimatize in: 40-baht Skytrain hops, river piers on the Chao Phraya, street food that makes home prices feel like a prank. Stay riverside-adjacent rather than on Khao San itself: close enough for the chaos walk, far enough to sleep. The dorm I use every trip costs $11, has a pool for the 38-degree afternoons and stops pouring beer at midnight. That is not puritanism; it is budget engineering.",
      },
      { type: "hostel-card", hostelId: "hostel-bangkok-dorm" },
      {
        type: "paragraph",
        text: "Do one organized thing in Bangkok and make it the street-food night. For roughly the price of two airport sandwiches you get a guide who orders the things you would never point at, from boat noodles to the crispy-pork rice that sells out by 8 p.m. More valuable than the food is the lesson: follow locals, skip menus with photos, and eat where the woks are loud. That rule saves a few dollars every day for two weeks.",
      },
      { type: "tour-card", tourId: "tour-bangkok-street-food" },
      {
        type: "callout",
        variant: "money",
        title: "The Quiet Taxes: Visa Runs and ATM Fees",
        text: "Thai ATMs charge a fixed 220-baht fee (about $6.40) on every foreign-card withdrawal, so pull the 20,000-baht machine maximum weekly, not $40 five times. Cambodia's tourist visa costs $30 at Poipet, and someone will offer to arrange it for a $5–10 processing fee — the fee is optional, the visa is not. Thailand gives most passports 60 days visa-free; do not ride a bus to the border to renew it without checking current rules.",
      },
      {
        type: "callout",
        variant: "safety",
        title: "Scooter Rentals: Where Trips End Early",
        text: "Rental shops love holding passports — hand over a cash deposit instead, photograph every existing scratch before you roll, and know most travel insurance is void without a motorcycle license or an IDP with the motorcycle endorsement. Police fines for riding unlicensed run about 500 baht, a fraction of the $200 scratch bill that appears at return time. If you have never ridden in Southeast Asian traffic, the Skytrain is a marvel. Use it.",
      },
      { type: "heading", level: 2, text: "Crossing Borders Without Getting Ripped Off" },
      {
        type: "paragraph",
        text: "Poipet, the Thailand–Cambodia crossing, is the most rehearsed scam in Southeast Asia and it still works. Touts sell a $28 VIP express bus from Khao San, the bus ends at a travel office four hundred meters short of the border, and a taxi cartel quotes $60 to Siem Reap. The honest route costs a fraction: train to Aranyaprathet from 50 baht, walk across on foot, pay the $30 visa, take the $10 government shuttle. The saving is roughly four road days.",
      },
      {
        type: "paragraph",
        text: "Vietnam is simpler. Skip every site charging $50 to arrange your e-visa; the official portal costs $25, takes about three working days and, since 2023, covers 90 days with multiple entries. Print the PDF — airlines still ask for it at check-in. At land crossings keep small, crisp US dollars; crumpled bills get rejected at invented exchange rates. Never hand your passport to a helpful stranger at a border window; helpers are why the scam economy survives.",
      },
      { type: "heading", level: 3, text: "Vietnam: Where Your Money Goes Furthest" },
      {
        type: "paragraph",
        text: "Cambodia is charming; Vietnam is cheap. Across the border, the same weekly food line buys more: $1.50 banh mi that outclass most $12 sandwiches at home, 40,000-dong iced coffee, noodle bowls under $2. In Da Nang, dorms drop to $8–12 steps from a beach that charges exactly nothing, and the Marble Mountains cost about $1.60 to climb. This is where you bank days if week two ran hot, and the hostel below is where I do the banking.",
      },
      { type: "hostel-card", hostelId: "hostel-da-nang-beach" },
      {
        type: "paragraph",
        text: "Budget one splurge in Vietnam and make it the Hoi An cooking class — not the $12 group version in a converted warehouse, but the small-market class where you shop for herbs before you cook. Around $30 buys four dishes, a market tour and recipes that survive the flight home. The old town needs a 120,000-dong ticket (about $5) covering five heritage houses; buy it, use it, and finish at the market-side banh mi cart everyone claims to have discovered.",
      },
      { type: "tour-card", tourId: "tour-hoi-an-cooking" },
      {
        type: "quote",
        text: "You do not run out of money in Southeast Asia. You run out of discipline, usually around 11 p.m. on Khao San Road.",
        attribution: "Every hostel bar in Bangkok, eventually",
      },
      { type: "insurance-banner" },
      { type: "heading", level: 2, text: "Where the Budget Breaks (and How to Fix It)" },
      {
        type: "paragraph",
        text: "Every failed $1,400 trip I have watched, usually from the adjacent hammock, failed in the same handful of places. Not flights, not visas, not some surprise fee at a train station. Decisions made after sunset, a taxi taken instead of a ten-minute walk, one we-are-on-holiday dinner that cost a day's budget. Here is the honest list, fix attached, so you recognize the moment when it arrives.",
      },
      {
        type: "list",
        items: [
          "Island-hopping on vibes. Every ferry is $15–30 plus a $12–20 night on a beach with nothing cheap nearby. Fix: cap it at two islands.",
          "Festival weeks. Beds on Koh Phangan triple and dorm social life becomes the event. Fix: build the calendar around dates, not the reverse.",
          "Drunk upgrades at 2 a.m. The $25 sleeper becomes a $70 VIP van of unclear lineage. Fix: long bookings made sober, in daylight, through Klook.",
          "Budget-airline baggage fees. VietJet and AirAsia charge over 7 kg in the cabin. Fix: one 40-litre pack, weighed at home, twice.",
          "The ATM drip. Five $40 withdrawals a week burns $32 in fixed fees alone. Fix: one maximum withdrawal weekly; refuse dynamic currency conversion.",
        ],
      },
      { type: "divider" },
      {
        type: "paragraph",
        text: "So is the $1,400 honest? It is honest the way a good friend is: it tells you what you can afford, then lets you ruin it. Follow the table and you finish three weeks with change in your daypack; follow the night and you will wire yourself money from a Siem Reap counter at a 4 percent surcharge. The number does not decide anything. You do, mostly between nine p.m. and midnight.",
      },
      {
        type: "paragraph",
        text: "My last run came in at $1,387: three weeks, Bangkok to Hanoi, one cooking class, one kayak, one regrettable pair of authentic elephant pants. If your long-haul flight is booked separately and your discipline holds before ten p.m., you can match that number. If neither is true, budget $1,700 and have a better trip for it. That is the most honest sentence in this budget, and the one travelers skip.",
      },
    ],
  },
  {
    slug: "balkans-backpacking-route-30-dollars-day",
    title: "The Balkans on $30 a Day: A Two-Week Route Through Croatia, Bosnia & Montenegro",
    category: "backpacking",
    tags: ["Balkans", "Budget Itinerary", "Montenegro"],
    seo: {
      title: "Balkans Backpacking Route: Croatia, Bosnia & Montenegro on $30/Day",
      description:
        "A tested two-week Split to Kotor route with real hostel prices, bus fares and the daily math that keeps the Balkans under $30 a day.",
      keyword: "balkans backpacking route",
      secondaryKeywords: [
        "balkans budget travel",
        "croatia backpacking cost",
        "mostar to kotor bus",
        "expedia balkans stays",
      ],
    },
    excerpt:
      "A tested two-week Split to Kotor route with $12 dorms in Bosnia, $12 buses to Kotor and the daily math that keeps Croatia's prices from wrecking a $30-a-day average.",
    tldr:
      "$30/day is a realistic shoulder-season average in the Balkans: Split → Mostar → Sarajevo → Kotor → Dubrovnik, with Bosnia's $18–22 days absorbing Croatia's $34–40 coast days. Order matters more than thrift — cheap country in the middle of the calendar. Travel May–June or September–October, when dorms and buses run 30–40% below July's doubled prices.",
    author: siteAuthor,
    datePublished: "2025-12-09T09:00:00.000Z",
    dateModified: "2026-01-14T09:00:00.000Z",
    readingMinutes: 10,
    heroImage: "/images/cover-balkans.jpg",
    heroAlt: "Bay of Kotor with red-roofed old town and pine slopes",
    picks: [
      {
        label: "Best Route Deal",
        ref: {
          type: "deal",
          id: "deal-balkans-loop",
          label: "Balkans Loop",
          why: "Prices the whole Split–Mostar–Sarajevo–Kotor arc so the coast cannot ambush the average.",
        },
        note: "Shoulder-season departures match the daily budgets in the table almost line for line.",
      },
      {
        label: "Best Character Stay",
        ref: {
          type: "hostel",
          id: "hostel-sarajevo-bb",
          label: "Sarajevo Family B&B with Breakfast",
          why: "A Habsburg-era townhouse with a breakfast that cancels lunch, at dorm prices.",
        },
        note: "Books out weeks ahead June–September; reserve it the day you buy flights.",
      },
      {
        label: "Best Value Day Out",
        ref: {
          type: "tour",
          id: "tour-kotor-kayak",
          label: "Kotor Bay Kayak",
          why: "Two hours on the bay with a swim stop, for less than one Dubrovnik museum hop.",
        },
        note: "Late-afternoon slots catch the best light and the fewest boats.",
      },
    ],
    faqs: [
      {
        question: "Is $30 a day realistic in Croatia?",
        answer:
          "In shoulder season, yes: a $20 dorm, $8–10 in bakery and market food and a few dollars of transit fit inside it, and Split's best swimming is free. In July and August the dorm line alone can hit $35–50, and the honest fix is structural — sleep inland, or let Bosnia's $18–22 days pull the trip average back under $30. Croatia is where the budget breathes hardest, not where it dies.",
      },
      {
        question: "Which countries use euros, and where do I need local cash?",
        answer:
          "Croatia and Montenegro both use the euro, though Montenegro adopted it unilaterally, so no machine will refuse your notes. Bosnia uses the convertible mark (KM), pegged at about 1.96 to the euro. Bosnia is still a cash country — buses, cevapi stands and small museums prefer it — so withdraw from a bank-branch ATM in Sarajevo rather than the freestanding ones charging tourist fees.",
      },
      {
        question: "How do I get from Dubrovnik to Kotor?",
        answer:
          "The direct bus costs about $12, takes two hours and crosses the Debeli Brijeg border, where you will queue twice — exit Croatia, enter Montenegro. Buy tickets a day ahead at the main station or online in summer, because the morning departures fill with day-trippers. The coastal approach through the bay is the point: sit on the right side.",
      },
      {
        question: "How bad are peak-season prices?",
        answer:
          "July and August roughly double the coast: Dubrovnik dorms climb from the mid-$20s past $50, Kotor's old town follows, and Split is the worst value night on the route. Fixed dates mean booking beds by February and eating one street inland. Flexible dates mean May–June or September–October, when the same sea, walls and buses cost 30–40% less.",
      },
      {
        question: "Is the Balkans safe to backpack?",
        answer:
          "Yes — violent crime against travelers is rare, locals are famously direct about helping, and the old war-era warnings mostly concern remote, unmarked backcountry rather than any town on this route. Stay on marked trails in rural Bosnia, watch for pickpockets in Dubrovnik's walled city at cruise-arrival hours, and treat mountain roads with respect if you rent anything with wheels. None of this differs much from Portugal.",
      },
    ],
    relatedSlugs: [
      "southeast-asia-backpacking-budget-itinerary",
      "viking-vs-regent-luxury-cruise-value",
    ],
    hubLinks: [
      { label: "Budget Backpacking hub", href: "/backpacking" },
      { label: "Excursions & Stays", href: "/stays" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "The Balkans still run on a rumor: that Europe's prettiest coastline must cost the same as its prettiest cities. It does not. Fourteen days through Croatia, Bosnia and Montenegro at $30 a day is not backpacking folklore — it is a specific route with specific bus timetables, and I have now run it twice, once in shoulder season and once, foolishly, in August. This is the version that works: Split to Kotor, two currencies, and one border queue you should never arrive at hungry.",
      },
      {
        type: "paragraph",
        text: "A second honesty note, because I promised one: $30 a day is an average, not a flat rate. Croatia will bill you $34–40 on some days and Bosnia will apologize with $18 ones, and the average lands at thirty. The route below is built so the cheap country sits in the middle of the calendar, absorbing the damage the coast inflicts. Flip that order — cheap first, expensive last — and the budget dies in week two. Order matters more than thrift.",
      },
      {
        type: "paragraph",
        text: "Shoulder season is the real trick. May–June and September–October deliver the same turquoise Adriatic with dorm prices 30–40% lower, buses you can board without a reservation, and old towns you can photograph without four thousand cruise passengers in the frame. Every price I quote below is shoulder-season reality. Come in July or August anyway if you must — half this route is a beach, after all — but then read the money callout below like a contract.",
      },
      { type: "heading", level: 2, text: "The Route at a Glance" },
      {
        type: "paragraph",
        text: "Fifteen nights, five stops, one direction — south, with the sea on your right. Fly into Split and out of Dubrovnik, or reverse the whole thing if open-jaw fares say otherwise. Every leg runs by bus or train; there is not a single domestic flight on this route, and that is precisely the point of it. Buy the long legs a day or two ahead and the rest of the fortnight runs itself.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Fly into Split (SPU), shoulder season if the fare allows. Three nights: Diocletian's Palace, Marjan hill swims, bus tickets south bought two days out.",
          "Bus Split to Mostar, about 4.5 hours and €28–35. Two border checks, both quick off-peak, both slower with a tour group ahead of you.",
          "Mostar, three nights. Stari Most divers at noon, Blagaj and Kravice on day two — the cheapest good days of the trip.",
          "Slow train Mostar to Sarajevo, about two hours and roughly $11 — the best railway scenery per hour in Europe.",
          "Sarajevo, three nights. Tunnel of Hope, bazaar lanes, burek breakfasts that run about $2.",
          "Seasonal summer bus Sarajevo to Kotor via Nikšić, about 6.5 hours, then four nights; finish with two in Dubrovnik and fly out of DBV.",
        ],
      },
      {
        type: "table",
        caption: "Nights and daily budgets, shoulder-season rates",
        headers: ["Stop", "Nights", "Daily Budget", "Highlight"],
        rows: [
          [
            { text: "Split, Croatia" },
            { text: "3" },
            { text: "$34", tone: "warn", icon: "alert" },
            { text: "Diocletian's Palace basements, free swim beaches" },
          ],
          [
            { text: "Mostar, Bosnia" },
            { text: "3" },
            { text: "$20", tone: "good", icon: "check" },
            { text: "Bridge divers, Kravice Falls, $3 cevapi" },
          ],
          [
            { text: "Sarajevo, Bosnia" },
            { text: "3" },
            { text: "$22", tone: "good", icon: "check" },
            { text: "Tunnel of Hope, bazaar streets, burek by the kilo" },
          ],
          [
            { text: "Kotor, Montenegro" },
            { text: "4" },
            { text: "$26", tone: "good", icon: "check" },
            { text: "Walls at 7 a.m., kayak at sunset, free old town" },
          ],
          [
            { text: "Dubrovnik, Croatia" },
            { text: "2" },
            { text: "$38", tone: "warn", icon: "alert" },
            { text: "Walk the walls early, sleep in Lapad, not the old town" },
          ],
        ],
        note: "The average lands at $28 a day across fifteen nights, leaving $2 a day of slack in the $30 target for the occasional miss.",
      },
      { type: "deal-card", dealId: "deal-balkans-loop" },
      { type: "heading", level: 2, text: "Split & the Marina Crowd" },
      {
        type: "paragraph",
        text: "Split is the most expensive city on this route and the most misunderstood. The marina crowd moors yachts beside a Roman palace, yes, but backpacker Split lives one street inland: bakeries selling $2 burek until noon, a green market where peaches are priced for locals, and free swimming at Bene on Marjan hill, a half-hour walk from anything expensive. Three nights is right. Any more and you start paying island-ferry prices for the privilege of indecision.",
      },
      { type: "hostel-card", hostelId: "hostel-split-marina" },
      {
        type: "paragraph",
        text: "Book the marina-side dorm deliberately. It sits ten minutes' walk from the ferry terminal and the bus station — the two buildings that control your next fortnight — and the walk home along the water at night costs nothing and feels like theft. Ask reception which kiosk sells the Mostar run; in shoulder season you can buy on the day, but the 8 a.m. departure is the one that sells out first.",
      },
      { type: "heading", level: 2, text: "Mostar: The Budget Sweet Spot" },
      {
        type: "paragraph",
        text: "Cross into Bosnia and the math changes religion. A bed in Mostar runs $12–15, a plate of cevapi with somun bread is $3–4, Bosnian coffee comes with a ritual you did not pay extra for, and the town's star attraction — young men diving off the Stari Most into icy green water — costs exactly zero to watch at noon. This is where your Croatian overspend goes to be forgiven. Stay three nights minimum.",
      },
      {
        type: "paragraph",
        text: "The best bed of the whole route, though, is not in Mostar at all. It sits two hours northeast in Sarajevo: a family-run bed-and-breakfast in a late-Habsburg townhouse that costs $12 a night and includes the kind of breakfast that cancels lunch. It books out weeks ahead in season, so reserve it the day you buy flights. Below is the card; the town around it is covered a section down.",
      },
      { type: "hostel-card", hostelId: "hostel-sarajevo-bb" },
      {
        type: "paragraph",
        text: "In Mostar itself, go one tier up from the dorm: the heritage house behind the old bazaar rents doubles from around $35 with breakfast, which for a couple is cheaper than two beds anywhere in Croatia, and for a solo traveler is the affordable splurge night every itinerary needs. The courtyard, the fig trees, the 9 a.m. call to prayer drifting over the river — this is the stay people mean when they say Bosnia felt like a secret.",
      },
      { type: "stay-card", stayId: "stay-mostar-heritage" },
      {
        type: "paragraph",
        text: "Give Mostar two full days: one for the bridge and the bazaar, one for Blagaj's tekke tucked under a cliff spring (entry about $3) and the Kravice Falls swim, which charges about $10 in high season and delivers a freshwater lagoon for the whole afternoon. Then ride the slow train northeast to Sarajevo, a city where $22 a day still buys the Tunnel of Hope museum, burek by the kilo and the title of Europe's most underpriced capital. The tunnel costs about $8 and explains the 1990s better than any book I read beforehand.",
      },
      {
        type: "callout",
        variant: "insider",
        title: "Border Buses, Balkan Style",
        text: "Balkan buses are cash economies with borders attached. Carry euros in small notes — several drivers still collect a €1–2 luggage fee by hand — keep your passport loose, because you will show it at least twice between Dubrovnik and Kotor, and never board the last crossing of the day without a plan B phone number. Buy tickets a day ahead at station kiosks in July; GetByBus and BusTicket4.me cover most legs online.",
      },
      {
        type: "callout",
        variant: "money",
        title: "July Prices Are a Different Country",
        text: "Dubrovnik dorms jump from the mid-$20s to $50-plus, Kotor's old town doubles, and Split in August is the single worst value night in the Balkans. If your dates are fixed, book beds by February and eat one street inland from the water. If they are not, move the whole route to late May–June or September, when the same sea costs 30–40% less and the buses actually have seats.",
      },
      { type: "heading", level: 3, text: "Kotor on a Budget" },
      {
        type: "paragraph",
        text: "Montenegro takes the euro but not the euro prices, and Kotor proves it nightly. The walled town is free to wander once the day-trippers leave, the wall walk (about 1,350 steps) costs €15 — worth it only if you start at 7 a.m., for the light and the solitude both — and the bay does its best work free from a rock past the bus station. The smart money move is one paid thing, done properly.",
      },
      { type: "tour-card", tourId: "tour-kotor-kayak" },
      {
        type: "paragraph",
        text: "The kayak session is that paid thing: two hours paddling the bay as the cruise-day crowds drain out, with a swim stop off a pebble beach most day-trippers never find. It costs less than a Dubrovnik museum hop and beats it on every metric I track. Add the €10 round-trip boat to Perast and Our Lady of the Rocks on another morning, and you have seen the bay properly for under $40 total.",
      },
      {
        type: "paragraph",
        text: "Getting here is the other bargain. The Dubrovnik to Kotor bus costs about $12 and takes two hours including the Debeli Brijeg border check; in summer it fills up, so buy a day ahead or line up at Dubrovnik's main station thirty minutes early. Your reward for the paperwork is your first proper look at Europe's southernmost fjord, arriving at sea level, where it photographs best.",
      },
      {
        type: "quote",
        text: "Somewhere between the third burek and the fourth border check, you stop converting prices. That is when the Balkans get cheap for real.",
        attribution: "My own notebook, night five, Sarajevo",
      },
      { type: "insurance-banner" },
      { type: "heading", level: 2, text: "The Verdict: Two Weeks, Two Currencies, One Good Month" },
      {
        type: "paragraph",
        text: "Run the table again and the route averages about $28 a day across fifteen nights, with Croatia's warn cells offset by Bosnia's green ones — which is the entire design. The Balkans are not expensive; they are uneven, and a good route simply makes the uneven parts cancel. This one does. My September run came to $431 for the whole loop, buses included; the August attempt cost $590 and considerably more patience.",
      },
      {
        type: "paragraph",
        text: "Who this route suits: anyone who wants Europe's postcard coastline at Southeast Asian discipline, history that outranks the beaches, and borders you can feel rather than fly over. Who it does not: travelers who need reliable July party infrastructure on a $30 budget — that number and that month cannot both be true. Pick the shoulder season, keep the order as written, and the $30 holds. It did for me, twice.",
      },
      { type: "divider" },
    ],
  },
];
