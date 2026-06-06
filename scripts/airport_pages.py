"""Airport landing page definitions (JFK, LGA, EWR, HPN)."""

from landing_page_data import SITE, TRUST_STRIP, airport_strategy, strategy_card, svc_schema

TRUST_DEFAULT = [
    TRUST_STRIP[0],
    {"value": "24/7", "label": "Dispatch Available"},
    {"value": "Flat", "label": "Fixed Rates"},
    {"value": "Live", "label": "Flight Tracking"},
]


def airport_page(slug, code, name, full_name, seo_title, seo_desc, hero, trust, features, strategy, glove, faq):
    landing = {
        "type": "airport",
        "slug": slug,
        "code": code,
        "name": name,
        "fullName": full_name,
        "seo": {
            "title": seo_title,
            "description": seo_desc,
            "url": f"{SITE}/{slug}/",
        },
        "hero": hero,
        "trust": trust,
        "features": features,
        "airportStrategy": strategy,
        "glove": glove,
        "faq": faq,
    }
    return {
        "seo": {
            "title": seo_title,
            "description": seo_desc,
            "ogDescription": seo_desc[:200],
        },
        "landing": landing,
        "schema": svc_schema(f"{name} Airport Car Service", "Airport Transfer", seo_desc),
    }


AIRPORT_PAGES = {
    "jfk": airport_page(
        "jfk",
        "jfk",
        "JFK",
        "John F. Kennedy International Airport",
        "JFK Airport Car Service Long Island | Caliber Car Service",
        "Fixed-rate JFK airport car service from Long Island. Meet-and-greet in arrivals, live flight tracking, 60-min complimentary wait. Family owned since 2004. Call (516) 595-2391.",
        {
            "line1": "JFK",
            "line2": "AIRPORT.",
            "sub": "Fixed-rate, meet-and-greet service from every Long Island zip code to John F. Kennedy International Airport. Live flight tracking, 60-minute complimentary wait, and a driver who knows every terminal exit.",
        },
        TRUST_DEFAULT,
        [
            {"title": "Meet & Greet in Arrivals", "desc": "Your chauffeur meets you inside the terminal with a name sign — no searching, no curb chaos."},
            {"title": "Live Flight Tracking", "desc": "We monitor your flight from departure to touchdown. Delays and early arrivals adjust automatically."},
            {"title": "Fixed Rates — No Surge", "desc": "Flat-rate pricing quoted upfront. No meters, no dynamic pricing, no surprises at the end."},
            {"title": "60-Min Wait Included", "desc": "Your complimentary wait starts from actual landing time — not scheduled arrival. Delays are on us."},
            {"title": "All Six JFK Terminals", "desc": "T1, T2, T4, T5, T7, T8 — we know every arrivals hall, exit, and traffic pattern by heart."},
            {"title": "24/7 Dispatch", "desc": "Red-eyes, early departures, last-minute bookings — one number, always answered."},
        ],
        airport_strategy(
            "When JFK is the right choice",
            "John F. Kennedy International Airport is the tri-state international hub — but it is not always the fastest ground trip from Nassau. We help you compare JFK against LGA and EWR when you book.",
            [
                strategy_card("JFK", "John F. Kennedy International Airport", "Best for you", "International flights, wide-body domestic, and carriers that only operate from JFK. All six terminals, 60-minute complimentary wait, meet-and-greet in arrivals.", "jfk/", True),
                strategy_card("LGA", "LaGuardia", "Closer from Nassau", "Often faster for East Coast domestic when your airline flies from LGA — especially from Great Neck, Manhasset, and Garden City.", "lga/"),
                strategy_card("EWR", "Newark", "United & westbound", "Strong for United-heavy schedules and some transatlantic options — toll-inclusive flat rates from Long Island.", "ewr/"),
            ],
        ),
        {
            "headline": 'EVERY DETAIL,<br><span class="gold">HANDLED.</span>',
            "body": "Twenty years of JFK runs taught us that the airport isn't where the journey ends — it's where the experience begins. Your driver is inside, sign in hand, before your bags hit the belt. You'll never wonder where your ride is.",
        },
        [
            {"q": "How long does it take to get from Long Island to JFK?", "a": "Typically 30–75 minutes depending on your pickup location and traffic conditions. We recommend booking at least 3 hours before your departure time, and our team will confirm a precise pickup window."},
            {"q": "Do you monitor my flight for delays?", "a": "Yes. We track every flight in real time. If your flight is delayed, arrives early, or changes gates, your driver adjusts automatically — at no extra charge."},
            {"q": "Which JFK terminals do you serve?", "a": "All six terminals: T1 (Air France, Korean Air), T2 (Delta domestic), T4 (Delta international, Emirates, Lufthansa), T5 (JetBlue), T7 (British Airways), and T8 (American Airlines). Your driver will know your terminal and the right arrivals exit."},
            {"q": "Is there a wait fee if my flight is delayed?", "a": "No. Your 60-minute complimentary wait begins from actual touchdown — not the original scheduled arrival. If your flight is significantly delayed, we stay in contact and adjust at no penalty."},
            {"q": "Can I book a JFK ride same-day?", "a": "Yes, subject to availability. For urgent or last-minute bookings, call our dispatch line directly at (516) 595-2391 rather than booking online."},
            {"q": "Are your JFK rates truly flat — no tolls on top?", "a": "Yes. The rate you receive at booking is the rate you pay. Tolls, bridge fees, and gratuity are all-inclusive unless otherwise noted."},
        ],
    ),
    "lga": airport_page(
        "lga",
        "lga",
        "LGA",
        "LaGuardia Airport",
        "LGA Airport Car Service Long Island | Caliber Car Service",
        "LGA airport car service from Long Island. Nassau County's closest airport — meet-and-greet, live flight tracking, fixed rates. Family owned since 2004. Call (516) 595-2391.",
        {
            "line1": "LGA",
            "line2": "AIRPORT.",
            "sub": "The closest major airport to Nassau County — and the one that punishes late arrivals the hardest. We've been running this route since 2004, and we know every terminal, every loop, every shortcut.",
        },
        TRUST_DEFAULT,
        [
            {"title": "Meet & Greet in Arrivals", "desc": "Your chauffeur is inside, name sign ready, before you reach baggage claim. No curb scramble."},
            {"title": "Live Flight Tracking", "desc": "We monitor your flight in real time. Delays and early arrivals are handled automatically, no calls needed."},
            {"title": "Fixed Rates — No Surprises", "desc": "One flat rate quoted at booking. No meters, no surge pricing, no added fees at the end."},
            {"title": "45-Min Wait Included", "desc": "Your complimentary wait begins from actual landing — not the scheduled time. You have room to breathe."},
            {"title": "All Four LGA Terminals", "desc": "Terminal A, B, C, and D — we know every drop-off loop, arrivals exit, and traffic bottleneck."},
            {"title": "24/7 Dispatch", "desc": "Early morning flights, late-night returns, last-minute changes — one number, always answered."},
        ],
        airport_strategy(
            "When LaGuardia is the right choice",
            "LGA is Nassau County's closest major airport for many domestic routes — but international and some carriers still require JFK or EWR.",
            [
                strategy_card("LGA", "LaGuardia", "Best for you", "East Coast domestic, short security lines relative to JFK, and the shortest drive from most of Nassau. All four terminals, 45-minute complimentary wait.", "lga/", True),
                strategy_card("JFK", "John F. Kennedy International Airport", "International", "When your itinerary is global or your airline only flies from Kennedy — we run this corridor daily with full terminal knowledge.", "jfk/"),
                strategy_card("HPN", "White Plains", "Northern LI", "Worth comparing from northern Nassau when your carrier and schedule align — less terminal congestion.", "hpn/"),
            ],
        ),
        {
            "headline": 'NEAREST AIRPORT.<br><span class="gold">NO SHORTCUTS.</span>',
            "body": "LGA's compact layout and high passenger volume make precision non-negotiable. Your driver knows the drop-off loops, the terminal exits, and the fastest path through Queens traffic. You won't have to think about any of it.",
        },
        [
            {"q": "How far is LaGuardia from Long Island?", "a": "LGA is the closest major airport to Nassau County — typically 20–45 minutes depending on your pickup location and traffic. We factor in real-time traffic patterns when confirming your pickup window."},
            {"q": "Which LGA terminals do you serve?", "a": "All four: Terminal A (Delta Connection), Terminal B (American, Southwest, United, and others), Terminal C (Delta), and Terminal D (American). Your confirmation will include your specific terminal."},
            {"q": "Is there a wait fee if my flight is delayed?", "a": "No. Your 45-minute complimentary wait starts from actual landing time. If your flight is substantially delayed, we stay in contact and won't charge a penalty."},
            {"q": "Why choose LGA for domestic travel?", "a": "LaGuardia is ideal for East Coast domestic routes and is significantly closer to Nassau County than JFK or EWR. For New York City-area destinations, it often means less total travel time."},
            {"q": "Do you offer corporate accounts for regular LGA trips?", "a": "Yes. We offer dedicated corporate accounts with monthly billing, priority scheduling, and a single point of dispatch. Ideal for executives who fly LGA regularly."},
        ],
    ),
    "ewr": airport_page(
        "ewr",
        "ewr",
        "EWR",
        "Newark Liberty International Airport",
        "Newark Airport Car Service Long Island | Caliber Car Service",
        "EWR airport car service from Long Island. Cross-state flat rates including tolls and bridges. Meet-and-greet, live tracking, all terminals. Family owned since 2004. (516) 595-2391.",
        {
            "line1": "NEWARK",
            "line2": "AIRPORT.",
            "sub": "Cross-state, flat-rate service from Long Island to Newark Liberty International. Tolls and bridges included in every quote — no last-minute surprises, no meters, no compromise.",
        },
        [
            TRUST_STRIP[0],
            {"value": "24/7", "label": "Dispatch Available"},
            {"value": "All", "label": "Tolls Included"},
            {"value": "Live", "label": "Flight Tracking"},
        ],
        [
            {"title": "Meet & Greet in Arrivals", "desc": "Your chauffeur meets you inside Newark arrivals with a name sign — no hunting for your car at the curb."},
            {"title": "Live Flight Tracking", "desc": "We monitor your EWR flight from departure to wheels-down. Delays adjust automatically at no charge."},
            {"title": "All Tolls & Bridges Included", "desc": "Goethals, Outerbridge, Turnpike, tunnels — all built into your flat rate. One price, no surprises."},
            {"title": "60-Min Wait Included", "desc": "Your complimentary wait starts at actual landing. Cross-state logistics means we're never in a rush."},
            {"title": "Terminals A, B & C", "desc": "We serve all three Newark terminals and know every arrivals hall, ground-transport exit, and pickup lane."},
            {"title": "24/7 Dispatch", "desc": "Red-eyes into Newark, 5am departures, same-day bookings — one number, always answered."},
        ],
        airport_strategy(
            "When Newark is the right choice",
            "EWR rewards travelers on United and many westbound routes — with toll-inclusive flat rates from Long Island so bridge math never surprises you.",
            [
                strategy_card("EWR", "Newark Liberty", "Best for you", "United hub operations, many transatlantic options, and competitive fares for western Nassau. All terminals, tolls included, 60-minute wait.", "ewr/", True),
                strategy_card("JFK", "John F. Kennedy International Airport", "International alt.", "When schedule or fare beats Newark for your carrier — especially for non-United international itineraries.", "jfk/"),
                strategy_card("LGA", "LaGuardia", "Closer domestic", "Some domestic travelers still save ground time via LGA from Nassau — we compare when you share flight details.", "lga/"),
            ],
        ),
        {
            "headline": 'TRI-STATE WITHOUT<br><span class="gold">THE HEADACHE.</span>',
            "body": "Newark is the smart choice for United routes and westward flights. We know the New Jersey Turnpike, the tunnel alternatives, and exactly how much time to build in for Long Island pickups. You'll arrive at the right time — not early, not late.",
        },
        [
            {"q": "How long does it take from Long Island to Newark?", "a": "Typically 60–90 minutes depending on your pickup location, time of day, and traffic conditions. We account for bridge and tunnel times at booking and build in buffer for busy periods."},
            {"q": "Are tolls really included in the quote?", "a": "Yes. Our Newark rates are all-inclusive — Goethals Bridge, Outerbridge Crossing, New Jersey Turnpike tolls, Lincoln Tunnel — everything is factored into the flat rate you see at booking."},
            {"q": "Which EWR terminals do you serve?", "a": "All three: Terminal A (United regional, Southwest), Terminal B (United international, Air Canada, others), and Terminal C (United hub operations). Your driver will know your exact arrivals exit."},
            {"q": "Why fly out of Newark instead of JFK?", "a": "EWR frequently has less congestion, competitive fares on United and transatlantic routes, and can be a strong choice for travelers based in western Nassau County or picking up en route from Connecticut or Westchester."},
            {"q": "Is there a wait fee for EWR delays?", "a": "No. Your 60-minute complimentary wait starts from actual landing time. Newark delays are never your problem — they're ours."},
        ],
    ),
    "hpn": airport_page(
        "hpn",
        "hpn",
        "HPN",
        "Westchester County Airport",
        "White Plains Airport Car Service Long Island | Caliber Car Service",
        "HPN airport car service from Long Island. Westchester County Airport transfers with meet-and-greet, live flight tracking, and fixed rates. Family owned since 2004. Call (516) 595-2391.",
        {
            "line1": "WHITE PLAINS",
            "line2": "AIRPORT.",
            "sub": "Westchester County Airport — the smart choice for northern Nassau, Suffolk, and Connecticut travelers. Fixed-rate service, live flight tracking, and a chauffeur who knows HPN inside and out.",
        },
        TRUST_DEFAULT,
        [
            {"title": "Meet & Greet in Arrivals", "desc": "Your chauffeur meets you inside the terminal with a name sign — no curb confusion at HPN's compact arrivals area."},
            {"title": "Live Flight Tracking", "desc": "We monitor your flight from departure to touchdown. Delays and early arrivals adjust automatically at no charge."},
            {"title": "Fixed Rates — No Surprises", "desc": "One flat rate quoted at booking. No meters, no surge pricing, no added fees when you arrive."},
            {"title": "45-Min Wait Included", "desc": "Your complimentary wait begins from actual landing — not the scheduled time. You have room to collect bags."},
            {"title": "Main Terminal Coverage", "desc": "We serve all HPN gates and know the pickup loops, drop-off lanes, and fastest routes through Westchester."},
            {"title": "24/7 Dispatch", "desc": "Early morning departures, late-night returns, same-day changes — one number, always answered."},
        ],
        airport_strategy(
            "When White Plains is the right choice",
            "HPN is the compact alternative to the NYC hubs — ideal when your carrier flies here and you want shorter lines and honest drive times from northern Nassau or Connecticut.",
            [
                strategy_card("HPN", "White Plains", "Best for you", "Select JetBlue, American, and domestic routes with a small-terminal experience — 45-minute complimentary wait, full terminal coverage.", "hpn/", True),
                strategy_card("LGA", "LaGuardia", "NYC domestic", "When your airline does not serve HPN or fare is better from LaGuardia — common for southern Nassau pickups.", "lga/"),
                strategy_card("JFK", "John F. Kennedy International Airport", "International", "Required for most overseas travel — we route from northern LI and CT when JFK is the only option that fits your schedule.", "jfk/"),
            ],
        ),
        {
            "headline": 'WESTCHESTER\'S<br><span class="gold">HIDDEN GEM.</span>',
            "body": "HPN is smaller, faster, and often less congested than JFK or LGA — especially for travelers in northern Nassau, western Suffolk, or Connecticut. We've been running this corridor since 2004 and know exactly how much time to build in.",
        },
        [
            {"q": "How long does it take from Long Island to White Plains Airport?", "a": "Typically 45–90 minutes depending on your pickup location and traffic. Northern Nassau pickups are often under an hour; eastern Suffolk may take longer. We confirm a precise pickup window at booking."},
            {"q": "Why choose HPN over JFK or LaGuardia?", "a": "Westchester County Airport is ideal for travelers based in northern Nassau, western Suffolk, or Connecticut who want a smaller terminal, shorter security lines, and competitive fares on select domestic routes — especially JetBlue and American."},
            {"q": "Do you monitor my flight for delays?", "a": "Yes. We track every flight in real time. If your flight is delayed, arrives early, or changes gates, your driver adjusts automatically — at no extra charge."},
            {"q": "Is there a wait fee if my flight is delayed?", "a": "No. Your 45-minute complimentary wait starts from actual landing time. If your flight is substantially delayed, we stay in contact and won't charge a penalty."},
            {"q": "Can I book an HPN ride same-day?", "a": "Yes, subject to availability. For urgent or last-minute bookings, call our dispatch line directly at (516) 595-2391 rather than booking online."},
            {"q": "Are your HPN rates truly flat — no tolls on top?", "a": "Yes. The rate you receive at booking is the rate you pay. Tolls and bridge fees are included unless otherwise noted at confirmation."},
        ],
    ),
}
