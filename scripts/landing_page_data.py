"""Content definitions for Caliber landing pages."""

import json

SITE = "https://calibercarservice.com"

# List labels (parallel to "LaGuardia (LGA)") and full name for strategy ledes.
JFK_LABEL = "John F. Kennedy (JFK)"
JFK_FULL = "John F. Kennedy International Airport"

TRUST_STRIP = [
    {"value": "★★★★★", "label": "Five-Star Rated"},
    {"value": "24/7", "label": "Dispatch Available"},
    {"value": "Flat", "label": "Fixed Rates"},
    {"value": "2004", "label": "Family Owned"},
]


def svc_schema(name, stype, desc):
    return json.dumps({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Caliber Car Service",
            "telephone": "+15165952391",
            "address": {"@type": "PostalAddress", "addressRegion": "NY", "addressLocality": "Long Island"},
        },
        "serviceType": stype,
        "areaServed": "Long Island, New York",
        "description": desc,
    }, indent=2)


def place_schema(name, desc, area_served=None):
    if area_served is None:
        area_served = name.replace(" Car Service", ", NY") if " Car Service" in name else f"{name}, NY"
    return json.dumps({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": f"Caliber Car Service — {name}",
        "telephone": "+15165952391",
        "description": desc,
        "areaServed": area_served,
        "parentOrganization": {"@type": "LocalBusiness", "name": "Caliber Car Service"},
    }, indent=2)


def strategy_card(code, name, badge, body, href, highlight=False):
    card = {"code": code, "name": name, "badge": badge, "body": body, "href": href}
    if highlight:
        card["highlight"] = True
    return card


def airport_strategy(title, lede, cards, eyebrow="Airport Strategy"):
    return {"eyebrow": eyebrow, "title": title, "lede": lede, "cards": cards}


def base(slug, ptype, name, seo_title, seo_desc, hero, features, glove, faq, **extra):
    landing = {
        "type": ptype,
        "slug": slug,
        "name": name,
        "seo": {
            "title": seo_title,
            "description": seo_desc,
            "url": f"{SITE}/{slug}/",
        },
        "hero": hero,
        "trust": list(TRUST_STRIP),
        "features": features,
        "glove": glove,
        "faq": faq,
    }
    landing.update(extra)
    return {
        "seo": {
            "title": seo_title,
            "description": seo_desc,
            "ogDescription": seo_desc[:200],
        },
        "landing": landing,
        "schema": extra.get("_schema", svc_schema(name, "Chauffeur Service", seo_desc)),
    }


ALL_PAGES = {}

# --- Service pages ---
ALL_PAGES["corporate"] = base(
    "corporate", "service", "Corporate Travel",
    "Corporate Car Service Long Island | Caliber Car Service",
    "Dedicated corporate accounts for Long Island executives — monthly billing, one dispatch contact, sedan to Sprinter fleet. Family owned since 2004. (516) 595-2391.",
    {"line1": "CORPORATE", "line2": "TRAVEL.", "sub": "One dispatch line for your executive team — dedicated accounts, monthly billing, and chauffeurs who understand board schedules, not just addresses."},
    [
        {"title": "Dedicated Account Manager", "desc": "A single point of contact at dispatch who knows your travelers, preferences, and billing codes — not a new voice every call."},
        {"title": "Monthly Consolidated Billing", "desc": "Itemized invoices with trip detail for accounting. No per-ride card swipes cluttering expense reports."},
        {"title": "Priority Scheduling", "desc": "Advance reservations and same-day requests handled with your account flagged — ideal for roadshows and recurring airport runs."},
        {"title": "Fleet Flexibility", "desc": "Executive sedan for solo travel, Escalade for small teams, Sprinter for groups — one vendor, consistent standards."},
        {"title": "24/7 Dispatch Line", "desc": "Early flights, late returns, and last-minute gate changes — your team calls one number that is always answered."},
        {"title": "TLC Licensed & Insured", "desc": "Fully compliant vehicles and chauffeurs for corporate duty-of-care requirements across NY, NJ, and CT."},
    ],
    {"headline": "YOUR TEAM.<br><span class=\"gold\">ONE VENDOR.</span>", "body": "Most companies stitch together rideshare receipts and ad-hoc sedans until an executive misses a board meeting. We built corporate accounts so travel coordinators stop chasing receipts and start trusting one dispatch desk that picks up at 4 a.m."},
    [
        {"q": "How do we open a corporate account?", "a": "Call dispatch at (516) 595-2391 or email info@calibercarservice.com with your company name, billing contact, and typical routes. We set up your account profile and confirm billing terms before the first trip."},
        {"q": "Can multiple employees book under one account?", "a": "Yes. Travel coordinators, EAs, and authorized bookers can reserve on behalf of any traveler. Trip detail appears on your consolidated invoice with passenger names and cost centers when you provide them."},
        {"q": "Do you support multi-stop roadshows?", "a": "Yes. As-directed hourly service works well for investor days and client visits. Share your itinerary at booking so dispatch can assign the right vehicle and build realistic timing between stops."},
        {"q": "What vehicles do executives typically use?", "a": "Solo airport and Manhattan runs usually go in our executive sedan (Cadillac CT6 class). Teams of three to six often choose the premium SUV. Groups use the executive Sprinter with limo-style seating."},
        {"q": "Are airport rates the same for corporate accounts?", "a": "Corporate travelers receive the same flat-rate airport pricing as individual clients, with the advantage of account billing and priority handling. JFK, LGA, EWR, and HPN are all covered."},
        {"q": "Is gratuity included on corporate invoices?", "a": "Gratuity policy is confirmed when your account is opened. Many corporate clients prefer gratuity included for simplicity; others handle it separately — we document your preference on file."},
    ],
    related=[
        {"label": "Hourly Chauffeur", "href": "hourly/"},
        {"label": JFK_LABEL, "href": "jfk/"},
        {"label": "Manhattan Runs", "href": "manhattan/"},
    ],
    airportStrategy=airport_strategy(
        "Airports your executives use",
        "Corporate travelers on Long Island rarely use just one hub. Share airline and terminal at booking — we route and price each trip flat, with account billing on the back end.",
        [
            strategy_card("LGA", "LaGuardia", "Nassau & NYC domestic", "Closest major airport for many Nassau offices and Manhattan-adjacent departures — ideal for East Coast domestic schedules.", "lga/"),
            strategy_card("JFK", JFK_FULL, "International hub", "Six terminals, global carriers, and meet-and-greet on request — the default for international and many premium domestic routes.", "jfk/", True),
            strategy_card("EWR", "Newark", "United & westbound", "Strong for United-heavy itineraries and some transatlantic schedules — toll-inclusive quotes from LI and NYC.", "ewr/"),
            strategy_card("HPN", "White Plains", "Northern routes", "Compact terminal, shorter lines — worth comparing when carriers and drive time align for northern Nassau or CT-border travelers.", "hpn/"),
        ],
    ),
    _schema=svc_schema("Corporate Car Service", "Corporate Transportation", "Dedicated corporate chauffeur accounts for Long Island and tri-state executives."),
)

ALL_PAGES["hourly"] = base(
    "hourly", "service", "Hourly Chauffeur",
    "Hourly Chauffeur Service Long Island | Caliber Car Service",
    "As-directed hourly black car service on Long Island — meetings, errands, full-day itineraries with a dedicated chauffeur. Call (516) 595-2391 for block-time availability.",
    {"line1": "HOURLY", "line2": "CHAUFFEUR.", "sub": "Block-time service with one dedicated driver for as-directed travel — board meetings, client visits, shopping, or a full day across the tri-state."},
    [
        {"title": "As-Directed Flexibility", "desc": "Your chauffeur follows your schedule — multiple stops, wait time included while you are in meetings, no meter running street by street."},
        {"title": "Dedicated Vehicle & Driver", "desc": "The same chauffeur and vehicle for your entire block — continuity matters when bags stay in the car between stops."},
        {"title": "Tri-State Coverage", "desc": "Long Island, Manhattan, Westchester, New Jersey, and Connecticut — tell dispatch your boundaries at booking."},
        {"title": "Sedan, SUV, or Sprinter", "desc": "Match vehicle class to party size — sedan for 1–3, Escalade-class SUV for families, Sprinter for groups up to 14."},
        {"title": "24/7 Booking", "desc": "Reserve days ahead or call dispatch for same-day availability — subject to fleet schedule."},
        {"title": "Flat Block Pricing", "desc": "Quoted by the hour for your vehicle class — no surge pricing. Call dispatch for current minimum hours and billing increments."},
    ],
    {"headline": "YOUR DAY.<br><span class=\"gold\">YOUR ROUTE.</span>", "body": "Point-to-point transfers work until your schedule has four stops and a dinner afterward. Hourly service keeps a professional chauffeur with you — door held, car staged, timing adjusted when meetings run long."},
    [
        {"q": "What is the minimum booking for hourly service?", "a": "Minimum hours depend on date, vehicle class, and itinerary. Call dispatch at (516) 595-2391 for current minimums — we will quote your block time upfront before you confirm."},
        {"q": "Can we make unplanned stops during the block?", "a": "Yes, within the geographic scope agreed at booking. Tell your chauffeur or dispatch if the day expands — additional time may be billed in agreed increments."},
        {"q": "Is wait time at each stop included?", "a": "Standard hourly blocks include reasonable wait time while you are at appointments. Extended waits (e.g., multi-hour events) should be discussed when booking so dispatch can plan."},
        {"q": "When is hourly better than point-to-point?", "a": "Choose hourly when you have three or more stops, uncertain meeting lengths, or need the vehicle to stay nearby all day. Single airport or Manhattan legs are usually better as flat transfers."},
        {"q": "Do you provide child seats?", "a": "Request special equipment when booking. Dispatch will confirm availability for your vehicle class and date."},
        {"q": "Can hourly service start in Manhattan and end on Long Island?", "a": "Yes. Cross-region itineraries are common for client entertainment and shopping days. Share the full route at booking for accurate timing and pricing."},
    ],
    related=[
        {"label": "Corporate Accounts", "href": "corporate/"},
        {"label": "Manhattan Runs", "href": "manhattan/"},
        {"label": "Events & Weddings", "href": "events/"},
    ],
    airportStrategy=airport_strategy(
        "Airports on hourly itineraries",
        "Hourly blocks often end at an airport or start after a red-eye arrival. Tell dispatch your flight details up front so we keep the same chauffeur and vehicle class through the airport leg.",
        [
            strategy_card("JFK", JFK_FULL, "Multi-terminal", "Best when your day includes international arrivals or departures — 60-minute complimentary wait on arrivals.", "jfk/"),
            strategy_card("LGA", "LaGuardia", "Quick domestic", "Fits same-day loops between Nassau, Manhattan, and LGA without switching vendors.", "lga/", True),
            strategy_card("EWR", "Newark", "Cross-state", "Useful for Newark meetings plus EWR pickup in one as-directed block — tolls quoted upfront.", "ewr/"),
            strategy_card("HPN", "White Plains", "Regional", "Pairs well with Westchester or Connecticut stops before or after a flight.", "hpn/"),
        ],
    ),
    _schema=svc_schema("Hourly Chauffeur Service", "Hourly Transportation", "As-directed hourly luxury chauffeur service across Long Island and the tri-state."),
)

def borough_page(slug, name, line1, seo_title, seo_desc, hero_sub, features, glove, faq, routes, airport_strategy_data, related):
    return base(
        slug, "borough", name, seo_title, seo_desc,
        {"line1": line1, "line2": "BOROUGH.", "sub": hero_sub},
        features,
        glove,
        faq,
        routes=routes,
        airportStrategy=airport_strategy_data,
        related=related,
        _schema=place_schema(f"{name} Car Service", seo_desc, area_served=f"{name}, NY"),
    )


ALL_PAGES["manhattan"] = borough_page(
    "manhattan", "Manhattan", "MANHATTAN",
    "Manhattan Car Service & Airport Transfers | Caliber",
    "Manhattan black car service — Midtown, Financial District, Upper East & West Side. Airport transfers, Long Island connections, flat rates. (516) 595-2391.",
    "Midtown boardrooms, downtown courts, hospital entrances, and hotel staging — chauffeured service in Manhattan with Long Island roots since 2004.",
    [
        {"title": "All Manhattan Neighborhoods", "desc": "Financial District, Midtown, Chelsea, Upper East and West Side, Harlem — door-to-door, not corner drop-offs."},
        {"title": "Airport Transfers", "desc": "Flat-rate JFK, LGA, and EWR from your Manhattan address — flight tracking and meet-and-greet on request."},
        {"title": "Long Island Connections", "desc": "Daily service between Manhattan and Nassau, Suffolk, and the Hamptons — toll-inclusive flat quotes."},
        {"title": "Bridge & Tunnel Routing", "desc": "Queens Midtown, Lincoln, Holland, FDR — we pick crossings based on live traffic, not habit."},
        {"title": "Hourly & Corporate", "desc": "As-directed days and executive accounts for teams with NYC and Long Island travel."},
        {"title": "24/7 Dispatch", "desc": "Theater exits, gala returns, and 5 a.m. airport departures — (516) 595-2391 always answered."},
    ],
    {"headline": "THE CITY<br><span class=\"gold\">DONE RIGHT.</span>", "body": "Manhattan punishes drivers who only know highways. Our chauffeurs stage at building loading zones, know hotel bell desks, and build tunnel buffer into every airport run — whether you live here or are crossing in from Long Island."},
    [
        {"q": "Do you pick up anywhere in Manhattan?", "a": "Yes — provide the full address, building name, or cross streets. We coordinate staging rules for residential towers and commercial high-rises."},
        {"q": "How long from Midtown to JFK?", "a": "Typically 45–75 minutes depending on tunnel choice and time of day. We confirm pickup when you book with flight details."},
        {"q": "Do you offer Long Island to Manhattan service?", "a": "Yes — daily flat-rate service from Nassau and Suffolk. Many clients book round-trip dinners or commutes under corporate accounts."},
        {"q": "Which airport is best from the Upper East Side?", "a": "LaGuardia for many domestic routes; JFK for international. Share your airline and we recommend the sensible hub."},
    ],
    [
        {"dest": "Midtown → JFK", "time": "45–75 min typical", "note": "Tunnel or bridge routing based on traffic at booking."},
        {"dest": "Upper East Side → LaGuardia", "time": "25–45 min typical", "note": "Often the fastest airport from East Side residences."},
        {"dest": "Manhattan → Garden City, LI", "time": "45–75 min typical", "note": "Reverse commute and weekend home runs."},
    ],
    airport_strategy(
        "Which airport from Manhattan",
        "Your neighborhood determines the fastest hub — not airline marketing alone.",
        [
            strategy_card("LGA", "LaGuardia", "East Side & Midtown", "Short hop for many domestic departures — ideal after evenings in Manhattan.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Six terminals, global carriers — meet-and-greet available.", "jfk/"),
            strategy_card("EWR", "Newark", "United & westbound", "Competitive for United itineraries — toll-inclusive from Manhattan.", "ewr/"),
        ],
    ),
    [{"label": "New York City", "href": "nyc/"}, {"label": "Brooklyn", "href": "brooklyn/"}, {"label": "LaGuardia", "href": "lga/"}, {"label": "Corporate", "href": "corporate/"}],
)

ALL_PAGES["brooklyn"] = borough_page(
    "brooklyn", "Brooklyn", "BROOKLYN",
    "Brooklyn Car Service & Airport Transfers | Caliber",
    "Brooklyn black car service — airport transfers to JFK, LGA, EWR, Manhattan connections, and Long Island. Flat rates. (516) 595-2391.",
    "Brownstone pickups, waterfront towers, and cruise terminals — chauffeured service across Brooklyn with drivers who know bridge timing to JFK and Manhattan.",
    [
        {"title": "All Brooklyn Neighborhoods", "desc": "Park Slope, DUMBO, Williamsburg, Brooklyn Heights, Bay Ridge, and beyond — residential and commercial staging."},
        {"title": "JFK & LGA Proximity", "desc": "Outer-borough pickups often beat Manhattan drive times to Kennedy and LaGuardia."},
        {"title": "Cruise Terminal Access", "desc": "Red Hook Brooklyn Cruise Terminal — door-to-gangway with luggage capacity matched to your party."},
        {"title": "Manhattan & Long Island", "desc": "Daily cross-borough and LI connections — flat-rate quotes with tolls included."},
        {"title": "Hourly As-Directed", "desc": "Client dinners in Manhattan with return to Brooklyn — one chauffeur, your schedule."},
        {"title": "24/7 Dispatch", "desc": "Early JFK departures from Brooklyn brownstones — pickup windows confirmed at booking."},
    ],
    {"headline": "BRIDGES<br><span class=\"gold\">WITHOUT GUESSING.</span>", "body": "Brooklyn airport runs live or die on bridge math. We route via Verrazzano, Brooklyn Battery, or Queens crossings depending on time of day — and we quote flat so toll surprises never hit at the end."},
    [
        {"q": "Do you serve all of Brooklyn?", "a": "Yes — provide your full address. We regularly serve neighborhoods from Greenpoint to Canarsie."},
        {"q": "How long from Park Slope to JFK?", "a": "Typically 35–55 minutes depending on traffic and terminal. We build buffer at booking."},
        {"q": "Can you take us from Brooklyn to Long Island?", "a": "Yes — flat-rate service to Nassau and Suffolk is available daily."},
        {"q": "Do you serve the Brooklyn cruise terminal?", "a": "Yes — see our cruise terminal page for Red Hook embarkation timing."},
    ],
    [
        {"dest": "Brooklyn → JFK", "time": "35–55 min typical", "note": "Often faster than routing from Manhattan for southern Brooklyn."},
        {"dest": "Brooklyn → LaGuardia", "time": "40–65 min typical", "note": "Cross-borough via Queens — traffic-dependent."},
        {"dest": "Brooklyn → Manhattan", "time": "25–50 min typical", "note": "Bridge or tunnel selected for time of day."},
    ],
    airport_strategy(
        "Which airport from Brooklyn",
        "Brooklyn sits between JFK and Manhattan — the right hub depends on your carrier and neighborhood.",
        [
            strategy_card("JFK", JFK_FULL, "Closest major hub", "Best for most international and many domestic flights — short hop from much of Brooklyn.", "jfk/", True),
            strategy_card("LGA", "LaGuardia", "Domestic option", "Competitive for East Coast schedules — especially from northern Brooklyn.", "lga/"),
            strategy_card("EWR", "Newark", "Cross-harbor", "United and some westbound fares — toll-inclusive flat rates.", "ewr/"),
        ],
    ),
    [{"label": "New York City", "href": "nyc/"}, {"label": JFK_LABEL, "href": "jfk/"}, {"label": "Cruise Terminals", "href": "cruise/"}, {"label": "Queens", "href": "queens/"}],
)

ALL_PAGES["queens"] = borough_page(
    "queens", "Queens", "QUEENS",
    "Queens Car Service & Airport Transfers | Caliber",
    "Queens car service — JFK and LaGuardia specialists, all neighborhoods, Long Island connections. Family owned since 2004.",
    "The borough that touches both major airports — Flushing, Astoria, Forest Hills, and JFK-adjacent pickups with terminal-level chauffeur knowledge.",
    [
        {"title": "JFK & LGA Home Field", "desc": "We run both airports daily from Queens addresses — terminal loops, arrivals halls, and staging lanes."},
        {"title": "All Queens Neighborhoods", "desc": "Long Island City, Astoria, Flushing, Jamaica, Forest Hills — residential towers and houses."},
        {"title": "Long Island Connections", "desc": "Queens borders Nassau — fast flat-rate service to Great Neck, Manhasset, and beyond."},
        {"title": "Manhattan Crossings", "desc": "Midtown and downtown via Queensboro, Midtown Tunnel, or Brooklyn routes — timed for rush hour."},
        {"title": "Meet & Greet Airports", "desc": "Inside arrivals with name sign — complimentary wait per airport policy."},
        {"title": "24/7 Dispatch", "desc": "Red-eyes from JFK and early LGA — one phone line, always answered."},
    ],
    {"headline": "TWO AIRPORTS.<br><span class=\"gold\">ONE BOROUGH.</span>", "body": "Queens clients should not pay Manhattan drive-time penalties to reach their own airports. We quote from your door to the correct terminal — and we have been doing it since 2004."},
    [
        {"q": "Which airport is closer from Astoria?", "a": "LaGuardia is typically closer; JFK for international. We advise when you book with flight details."},
        {"q": "Do you serve JFK and LaGuardia from Queens?", "a": "Yes — this is among our most frequent daily routes."},
        {"q": "Can you pick up in Flushing and drop in Nassau County?", "a": "Yes — cross-county flat rates are quoted at booking."},
    ],
    [
        {"dest": "Astoria → LaGuardia", "time": "15–30 min typical", "note": "Among the shortest airport drives in the tri-state."},
        {"dest": "Jamaica → JFK", "time": "15–25 min typical", "note": "Terminal confirmed at booking."},
        {"dest": "Queens → Great Neck, LI", "time": "20–40 min typical", "note": "Cross-border Nassau service daily."},
    ],
    airport_strategy(
        "Which airport from Queens",
        "Most Queens addresses have a clear best hub — we tell you which saves time, not just miles.",
        [
            strategy_card("LGA", "LaGuardia", "Western Queens", "Often fastest from Astoria, LIC, and northern Queens — domestic schedules.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Default for global travel — all six terminals, 60-minute wait on arrivals.", "jfk/"),
            strategy_card("EWR", "Newark", "Alternate", "When fare or carrier fits — toll-inclusive from Queens.", "ewr/"),
        ],
    ),
    [{"label": "New York City", "href": "nyc/"}, {"label": JFK_LABEL, "href": "jfk/"}, {"label": "LaGuardia", "href": "lga/"}, {"label": "Great Neck", "href": "great-neck/"}],
)

ALL_PAGES["bronx"] = borough_page(
    "bronx", "The Bronx", "THE BRONX",
    "Bronx Car Service & Airport Transfers | Caliber",
    "Bronx black car service — LaGuardia, JFK, Manhattan, and Westchester connections. Flat-rate chauffeur service. (516) 595-2391.",
    "Riverdale, Fordham, the South Bronx, and Co-op City — chauffeured pickups with fast access to LGA, HPN, and Manhattan via the GW Bridge corridor.",
    [
        {"title": "All Bronx Neighborhoods", "desc": "Riverdale, Fordham, Pelham, Throgs Neck — residential and hospital destinations."},
        {"title": "LaGuardia & JFK Access", "desc": "Flat-rate airport service with toll-inclusive quotes across bridges."},
        {"title": "Manhattan Connections", "desc": "Daily service to Midtown and downtown — FDR and bridge routing optimized."},
        {"title": "Westchester & HPN", "desc": "Northern Bronx pickups often pair well with White Plains Airport — we compare at booking."},
        {"title": "Long Island Service", "desc": "Bronx to Nassau and Suffolk for family and corporate travel."},
        {"title": "24/7 Dispatch", "desc": "Early airport departures — confirmed pickup windows, live flight tracking."},
    ],
    {"headline": "NORTH<br><span class=\"gold\">GATEWAY.</span>", "body": "The Bronx connects Manhattan, Westchester, and the airports in between. Our chauffeurs know GW Bridge timing, Cross Bronx congestion, and when HPN beats fighting traffic to JFK."},
    [
        {"q": "Do you serve the entire Bronx?", "a": "Yes — provide your full address for a flat-rate quote."},
        {"q": "How long from Riverdale to LaGuardia?", "a": "Typically 25–45 minutes depending on route and traffic."},
        {"q": "Is White Plains Airport an option from the Bronx?", "a": "Often yes for select carriers — we compare HPN vs LGA vs JFK when you book."},
    ],
    [
        {"dest": "Riverdale → LaGuardia", "time": "25–45 min typical", "note": "GW Bridge corridor factored at booking."},
        {"dest": "Bronx → JFK", "time": "35–60 min typical", "note": "Cross-borough routing with traffic buffer."},
        {"dest": "Bronx → Midtown Manhattan", "time": "25–45 min typical", "note": "Off-peak often under 35 minutes."},
    ],
    airport_strategy(
        "Which airport from the Bronx",
        "Northern NYC geography opens LGA, JFK, and sometimes HPN — we pick based on carrier and traffic.",
        [
            strategy_card("LGA", "LaGuardia", "Often closest", "Strong for domestic departures from western and central Bronx.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Required for most overseas itineraries — full terminal coverage.", "jfk/"),
            strategy_card("HPN", "White Plains", "Northern Bronx", "Worth comparing for select JetBlue and American when schedule fits.", "hpn/"),
        ],
    ),
    [{"label": "New York City", "href": "nyc/"}, {"label": "LaGuardia", "href": "lga/"}, {"label": "Westchester & CT", "href": "westchester-ct/"}, {"label": "Manhattan", "href": "manhattan/"}],
)

ALL_PAGES["staten-island"] = borough_page(
    "staten-island", "Staten Island", "STATEN ISLAND",
    "Staten Island Car Service & Airport Transfers | Caliber",
    "Staten Island car service — Newark, JFK, Manhattan, and Long Island via Verrazzano. Flat-rate chauffeur. (516) 595-2391.",
    "Verrazzano crossings to Brooklyn, Manhattan, and New Jersey — chauffeured service with toll-inclusive flat quotes and airport expertise.",
    [
        {"title": "All Staten Island", "desc": "North Shore, South Shore, St. George, and Tottenville — door-to-door residential service."},
        {"title": "Newark (EWR) Access", "desc": "Geographically logical for United and many NJ departures — tolls included in flat quotes."},
        {"title": "JFK & LaGuardia", "desc": "Cross-bridge routing with realistic timing — we never underestimate Verrazzano traffic."},
        {"title": "Manhattan & Brooklyn", "desc": "Daily service via Verrazzano or ferry-adjacent pickups — flat-rate clarity."},
        {"title": "Cruise & Bayonne", "desc": "Cape Liberty cruise port is a natural pairing for Staten Island clients."},
        {"title": "24/7 Dispatch", "desc": "Early EWR and JFK departures — pickup confirmed with buffer built in."},
    ],
    {"headline": "VERRAZZANO<br><span class=\"gold\">MASTERS.</span>", "body": "Staten Island is not Brooklyn with a different zip code. Bridge and toll math define every quote — we include it upfront so your flat rate is actually flat."},
    [
        {"q": "Do you serve all of Staten Island?", "a": "Yes — north and south shore, all neighborhoods."},
        {"q": "Is Newark the best airport from Staten Island?", "a": "Often for United and many NJ-bound flights — we still compare JFK and LGA when you share your itinerary."},
        {"q": "How long to EWR from Staten Island?", "a": "Typically 25–45 minutes depending on route and time of day."},
    ],
    [
        {"dest": "Staten Island → Newark (EWR)", "time": "25–45 min typical", "note": "Often the most direct major airport."},
        {"dest": "Staten Island → JFK", "time": "45–70 min typical", "note": "Verrazzano and Brooklyn routing — buffer at booking."},
        {"dest": "Staten Island → Manhattan", "time": "35–60 min typical", "note": "Via Brooklyn or Holland depending on destination."},
    ],
    airport_strategy(
        "Which airport from Staten Island",
        "EWR is often closest — but JFK and LGA still win on many fares and carriers.",
        [
            strategy_card("EWR", "Newark", "Often closest", "United hub and many NJ departures — toll-inclusive flat rates.", "ewr/", True),
            strategy_card("JFK", JFK_FULL, "International", "When EWR does not have your route — cross-bridge timing built in.", "jfk/"),
            strategy_card("LGA", "LaGuardia", "Domestic alt.", "Competitive for some East Coast schedules.", "lga/"),
        ],
    ),
    [{"label": "New York City", "href": "nyc/"}, {"label": "Newark (EWR)", "href": "ewr/"}, {"label": "Cruise Terminals", "href": "cruise/"}, {"label": "Brooklyn", "href": "brooklyn/"}],
)

ALL_PAGES["events"] = base(
    "events", "service", "Events & Occasions",
    "Wedding & Event Transportation Long Island | Caliber Car Service",
    "Wedding, gala, and special-event transportation on Long Island — Sprinter bridal parties, discreet sedans, coordinated timing. Family owned since 2004. (516) 595-2391.",
    {"line1": "EVENTS &", "line2": "OCCASIONS.", "sub": "Weddings, galas, anniversaries, and milestones — multi-vehicle coordination, immaculate Sprinters, and chauffeurs who understand that being early is the only kind of on-time that matters."},
    [
        {"title": "Wedding Party Sprinters", "desc": "Bridal parties, groomsmen, and family groups — standing-height cabin, limo seating, room for gowns and garment bags."},
        {"title": "Multi-Vehicle Coordination", "desc": "Ceremony, photos, reception — dispatch sequences arrivals so no guest is waiting on a curb."},
        {"title": "Discreet Executive Sedans", "desc": "Parents, VIP guests, and late arrivals — quiet sedans with professional presentation."},
        {"title": "Photo-Location Buffers", "desc": "We build extra time between stops because photos always run long — your planner will thank you."},
        {"title": "Detailed Timeline Review", "desc": "Share your run-of-show — we align chauffeur staging with venue load-in rules and traffic patterns."},
        {"title": "24/7 Day-Of Contact", "desc": "Dispatch stays reachable on the wedding day for timing shifts — hair running late happens."},
    ],
    {"headline": "CALM<br><span class=\"gold\">ARRIVALS.</span>", "body": "The ride before the aisle sets the tone. We have moved bridal parties across Long Island since 2004 — drivers in pressed suits, vehicles detailed before every pickup, and no radio chatter when silence is what the moment needs."},
    [
        {"q": "How far in advance should we book wedding transportation?", "a": "Peak season (May–October) fills quickly — book as soon as venues and times are set. Six months ahead is ideal; dispatch can sometimes accommodate shorter windows by phone."},
        {"q": "Can you handle multiple venues in one evening?", "a": "Yes. Provide ceremony, photo, and reception addresses with estimated durations. We assign vehicles and chauffeurs to each leg and stage backups when guest counts require."},
        {"q": "Do you provide a coordinator on the wedding day?", "a": "Dispatch acts as your logistics contact — chauffeurs follow the timeline you approve. For complex multi-vehicle weddings, we recommend sharing your planner's contact at booking."},
        {"q": "What is your cancellation policy for events?", "a": "Event deposits and cancellation terms are confirmed in writing at booking — policies vary by date and fleet commitment. Call dispatch for your specific event date."},
        {"q": "Can guests book their own airport rides after the wedding?", "a": "Yes. Individual airport transfers can run on the same weekend — share flight details early so fleet availability is held."},
        {"q": "Which vehicle fits a bridal party of eight?", "a": "Our executive Sprinter accommodates up to 14 passengers with generous luggage — most bridal parties of six to ten choose it for comfort and headroom."},
    ],
    related=[
        {"label": "Executive Sprinter Fleet", "href": "/#fleet"},
        {"label": "Hamptons Events", "href": "hamptons/"},
        {"label": "Great Neck", "href": "great-neck/"},
    ],
    airportStrategy=airport_strategy(
        "Airports for wedding guests",
        "Out-of-town guests rarely know which NYC airport is closest to your venue. Share their flight info when booking — we coordinate multiple airport pickups with the same dispatch team.",
        [
            strategy_card("JFK", JFK_FULL, "Out-of-town guests", "Most international and many domestic guests land here — meet-and-greet keeps arrivals calm before the venue.", "jfk/", True),
            strategy_card("LGA", "LaGuardia", "East Coast", "Closer for many domestic guests heading to Nassau venues — less ground time after landing.", "lga/"),
            strategy_card("EWR", "Newark", "Alternate hub", "Some guests book United into Newark — flat-rate quotes include cross-state tolls.", "ewr/"),
        ],
    ),
    _schema=svc_schema("Event Transportation", "Special Event Transportation", "Wedding and special-event chauffeur service on Long Island."),
)

ALL_PAGES["cruise"] = base(
    "cruise", "service", "Cruise Terminals",
    "Cruise Terminal Car Service NYC & NJ | Caliber Car Service",
    "Long Island to Brooklyn, Manhattan, and Bayonne cruise terminals — door to gangway, luggage handled, flat rates. (516) 595-2391.",
    {"line1": "CRUISE", "line2": "TERMINALS.", "sub": "Brooklyn Red Hook, Manhattan cruise piers, and Cape Liberty Bayonne — chauffeured transfers from Long Island with timing built around embarkation windows and heavy luggage."},
    [
        {"title": "Brooklyn Cruise Terminal", "desc": "Red Hook — we know pier access, staging lanes, and Brooklyn bridge traffic from Nassau and Suffolk."},
        {"title": "Manhattan Cruise Terminal", "desc": "Pier 88/90 on the West Side — drop-off at the correct pier for your sailing line."},
        {"title": "Cape Liberty (Bayonne)", "desc": "New Jersey sailings — cross-harbor routing with tolls included in your flat quote."},
        {"title": "SUV & Sprinter Options", "desc": "Families with multiple suitcases often prefer Escalade-class SUVs or Sprinters — match capacity to your party."},
        {"title": "Embarkation Timing", "desc": "We recommend boarding-window arrival — share your line's check-in time and we build pickup accordingly."},
        {"title": "Return Pickups", "desc": "Disembarkation day transfers home — track your ship's arrival and adjust for customs delays when needed."},
    ],
    {
        "headline": "DOOR TO<br><span class=\"gold\">GANGWAY.</span>",
        "body": "Cruise luggage is not airport luggage — oversize bags, strollers, and group pickups need the right vehicle staged at the right pier. We confirm your terminal and sailing line at booking so nobody is circling the wrong dock.",
        "alt": "Executive Sprinter at cruise terminal with chauffeur and luggage — Caliber Car Service",
    },
    [
        {"q": "How early should we leave Long Island for a Manhattan cruise sailing?", "a": "Typically plan 90–120 minutes before your line's boarding window, depending on pickup location and pier. Dispatch confirms pickup time when you book with your ship and terminal."},
        {"q": "Which terminals do you serve?", "a": "Brooklyn Cruise Terminal (Red Hook), Manhattan Cruise Terminal (Piers 88/90), and Cape Liberty Cruise Port in Bayonne, NJ."},
        {"q": "Can you pick us up after the cruise returns?", "a": "Yes. Provide disembarkation date and estimated clearance time. We monitor adjustments and keep dispatch reachable when immigration runs long."},
        {"q": "What vehicle fits a family of four with large suitcases?", "a": "Premium SUV is the common choice — six bag capacity with comfortable seating. Larger groups or extra gear may warrant the executive Sprinter."},
        {"q": "Are tolls to New Jersey included for Bayonne?", "a": "Yes — Bayonne quotes are flat-rate and include bridge/tunnel tolls unless otherwise noted at confirmation."},
        {"q": "Do you offer round-trip cruise packages?", "a": "Yes. Book embarkation and return together for consistent vehicle class and account billing. Policies for schedule changes are confirmed at booking."},
    ],
    related=[
        {"label": "Manhattan Runs", "href": "manhattan/"},
        {"label": "Premium SUV Fleet", "href": "/#fleet"},
        {"label": "Newark Airport", "href": "ewr/"},
    ],
    airportStrategy=airport_strategy(
        "Which terminal for your sailing",
        "Cruise traffic is pier-specific — the wrong terminal adds an hour. Confirm your line and ship at booking; we stage at the correct loop with luggage capacity matched to your party.",
        [
            strategy_card("BKN", "Brooklyn", "Red Hook", "Brooklyn Cruise Terminal — common for Cunard and other lines; bridge timing from Nassau built into quotes.", "cruise/", True),
            strategy_card("MHT", "Manhattan", "Piers 88 & 90", "West Side Manhattan terminals — tight staging windows on embarkation day.", "cruise/"),
            strategy_card("BAY", "Bayonne", "Cape Liberty", "New Jersey sailings — toll-inclusive flat rates from Long Island and NYC.", "cruise/"),
        ],
        eyebrow="Terminal Strategy",
    ),
    _schema=svc_schema("Cruise Terminal Transportation", "Cruise Transfer", "Long Island to NYC and NJ cruise terminal chauffeur service."),
)

# NYC overview hub — links to each borough page
ALL_PAGES["nyc"] = {
    "seo": {
        "title": "NYC Black Car Service | All Five Boroughs | Caliber",
        "description": "Executive black car service in all five NYC boroughs — airport transfers, Long Island connections, hourly and corporate travel. Family owned since 2004.",
        "ogDescription": "Chauffeured service in Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.",
    },
    "landing": {
        "type": "hub",
        "slug": "nyc",
        "name": "New York City",
        "seo": {
            "title": "NYC Black Car Service | All Five Boroughs | Caliber",
            "description": "Executive black car service in all five NYC boroughs — airport transfers, Long Island connections, hourly and corporate travel.",
            "url": f"{SITE}/nyc/",
        },
        "hero": {
            "line1": "NEW YORK",
            "line2": "CITY.",
            "sub": "Family owned on Long Island, running New York City daily since 2004 — choose your borough for local airport strategy, routes, and flat-rate quotes.",
        },
        "hubGroups": [
            {
                "title": "NYC Boroughs",
                "links": [
                    {"label": "Manhattan", "href": "manhattan/"},
                    {"label": "Brooklyn", "href": "brooklyn/"},
                    {"label": "Queens", "href": "queens/"},
                    {"label": "The Bronx", "href": "bronx/"},
                    {"label": "Staten Island", "href": "staten-island/"},
                ],
            },
            {
                "title": "Airports",
                "links": [
                    {"label": JFK_LABEL, "href": "jfk/"},
                    {"label": "LaGuardia (LGA)", "href": "lga/"},
                    {"label": "Newark (EWR)", "href": "ewr/"},
                ],
            },
            {
                "title": "From NYC",
                "links": [
                    {"label": "Long Island Towns", "href": "areas/"},
                    {"label": "Corporate Travel", "href": "corporate/"},
                    {"label": "Hourly Chauffeur", "href": "hourly/"},
                ],
            },
        ],
        "faq": [
            {"q": "Are you based in NYC?", "a": "We are family owned and operated on Long Island with daily NYC service since 2004. Dispatch is (516) 595-2391 — we serve all five boroughs."},
            {"q": "Which borough page should I read?", "a": "Each borough has its own page with airport strategy and typical routes — start with the borough where your pickup or drop-off occurs."},
        ],
        "related": [
            {"label": "Service Areas", "href": "areas/"},
            {"label": JFK_LABEL, "href": "jfk/"},
            {"label": "About Caliber", "href": "about/"},
        ],
    },
    "schema": place_schema("New York City", "Executive black car service in all NYC boroughs."),
}

# Regional hubs
ALL_PAGES["hamptons"] = base(
    "hamptons", "area", "Hamptons & East End",
    "Hamptons Car Service & Airport Transfers | Caliber Car Service",
    "Hamptons and East End chauffeur service — JFK, HPN, seasonal traffic expertise, weddings and summer events. 24/7 dispatch. (516) 595-2391.",
    {"line1": "HAMPTONS", "line2": "& EAST END.", "sub": "Seasonal traffic, Friday exodus, and event weekends — chauffeured service from Montauk to Manhattan with drivers who plan buffer time honestly."},
    [
        {"title": "Summer & Event Season", "desc": "Weddings, benefits, and house weekends — book early for June through September peak dates."},
        {"title": "JFK for International", "desc": "Most Hamptons international departures still route through JFK — we know drive-time variability on 27 and the LIE."},
        {"title": "HPN for Select Domestic", "desc": "Westchester County Airport can save time for eastern Suffolk and Connecticut-border pickups on certain carriers."},
        {"title": "Manhattan Evenings", "desc": "Dinner and theater runs — late returns with chauffeurs who know when Sunday eastbound traffic eases."},
        {"title": "Multi-Day Hourly", "desc": "House guests and weekend itineraries — as-directed blocks keep one vehicle with your party."},
        {"title": "Sprinter Groups", "desc": "Golf outings, family reunions, and event shuttles — up to 14 passengers, generous luggage."},
    ],
    {"headline": "SUMMER<br><span class=\"gold\">WITHOUT SURPRISES.</span>", "body": "Hamptons runs punish optimism. We quote drive times with seasonal reality — not off-season maps — and recommend pickup windows that respect Friday traffic and event-gridlock villages."},
    [
        {"q": "How long from Southampton to JFK?", "a": "Typically 90–120+ minutes depending on day and time — Friday afternoons and summer Saturdays need the most buffer. Dispatch confirms pickup when you book."},
        {"q": "JFK or MacArthur (ISP) for Hamptons travelers?", "a": "JFK and LGA remain the primary hubs for most international and major domestic routes. ISP works for select carriers and eastern Suffolk convenience — we advise case by case when you book."},
        {"q": "How far ahead should Hamptons weddings book transport?", "a": "Peak weekends book months ahead. Contact dispatch as soon as venue times are set — multi-vehicle weddings especially."},
        {"q": "Do you run winter service to the Hamptons?", "a": "Yes, 24/7 year-round. Off-season trips often have more predictable drive times and wider fleet availability."},
        {"q": "Can you do Manhattan pickup to a Hamptons house?", "a": "Yes — reverse-direction runs are common for weekend arrivals. Flat-rate quotes depend on pickup and drop-off addresses."},
    ],
    airportStrategy=airport_strategy(
        "Which airport from the Hamptons",
        "Summer Fridays change every estimate. We quote with seasonal buffer — and tell you honestly when JFK is worth the drive versus a closer option.",
        [
            strategy_card("JFK", JFK_FULL, "International & major domestic", "Still the primary hub for most Hamptons international travel — plan 90–120+ minutes ground time in peak season.", "jfk/", True),
            strategy_card("LGA", "LaGuardia", "Some domestic", "Works for select East Coast itineraries when schedule and traffic align — we compare when you book.", "lga/"),
            strategy_card("HPN", "White Plains", "Northern East End", "Can save time for eastern Suffolk and north-fork pickups on certain JetBlue and American routes.", "hpn/"),
        ],
    ),
    related=[
        {"label": JFK_LABEL, "href": "jfk/"},
        {"label": "Events & Weddings", "href": "events/"},
        {"label": "Huntington", "href": "huntington/"},
    ],
    _schema=place_schema("Hamptons and East End", "Executive car service for the Hamptons and Long Island East End."),
)

ALL_PAGES["north-shore"] = base(
    "north-shore", "area", "North Shore",
    "North Shore Long Island Car Service | Caliber Car Service",
    "North Shore Long Island black car service — Garden City, Great Neck, Manhasset, LGA and HPN expertise. Family owned since 2004.",
    {"line1": "NORTH", "line2": "SHORE.", "sub": "Nassau's Gold Coast — Garden City, Great Neck, Manhasset, and surrounding villages with airport and Manhattan patterns built on twenty years of daily runs."},
    [
        {"title": "LaGuardia Proximity", "desc": "LGA is often the fastest major airport from Nassau's North Shore — we optimize for terminal and traffic loop."},
        {"title": "HPN Alternative", "desc": "White Plains works well for northern Nassau and Connecticut-border travelers on select JetBlue and American routes."},
        {"title": "Manhattan Daily", "desc": "Commutes, dinners, and hospital visits — predictable flat rates for recurring riders."},
        {"title": "Corporate Accounts", "desc": "Melville-adjacent offices and executive homes — consolidated billing for teams."},
        {"title": "School & Event Timing", "desc": "Graduations, bar mitzvahs, and charity galas — multi-vehicle coordination available."},
        {"title": "Residential Pickups", "desc": "Gated communities and private driveways — chauffeurs stage discreetly and assist with luggage."},
    ],
    {"headline": "GOLD COAST<br><span class=\"gold\">LOGISTICS.</span>", "body": "North Shore clients value consistency — the same chauffeur presentation, the same dispatch voices, the same flat-rate clarity trip after trip. That is what we built since 2004."},
    [
        {"q": "Which airport is best from Great Neck?", "a": "LGA is usually closest for domestic travel. JFK for most international. HPN when carrier and schedule fit — we help you choose when you book with flight details."},
        {"q": "Do you serve all North Shore villages?", "a": "Yes — Garden City, Great Neck, Manhasset, Munsey Park, Flower Hill, Port Washington, and adjacent Nassau communities."},
        {"q": "How long to Midtown Manhattan from Manhasset?", "a": "Typically 35–55 minutes off-peak; rush hour can extend that. We set pickup times accordingly."},
        {"q": "Can I set up a corporate account for our Melville office?", "a": "Yes — many North Shore companies use corporate billing for executives commuting to Manhattan or airports. Call dispatch to open an account."},
    ],
    airportStrategy=airport_strategy(
        "Which airport from the North Shore",
        "Gold Coast geography favors LaGuardia for time — but international schedules still pull toward JFK. Share your airline; we pick the airport that saves ground time, not just miles.",
        [
            strategy_card("LGA", "LaGuardia", "Often closest", "Default for many Nassau domestic departures — shortest loops from Great Neck, Manhasset, and Garden City.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Six terminals, global carriers — meet-and-greet and 60-minute wait on arrivals.", "jfk/"),
            strategy_card("HPN", "White Plains", "Northern Nassau", "Strong when your carrier flies from HPN — less congestion than the NYC hubs.", "hpn/"),
        ],
    ),
    related=[
        {"label": "Garden City", "href": "garden-city/"},
        {"label": "Great Neck", "href": "great-neck/"},
        {"label": "Manhasset", "href": "manhasset/"},
        {"label": "LaGuardia", "href": "lga/"},
    ],
    _schema=place_schema("North Shore Long Island", "Executive black car service for Nassau County North Shore."),
)

ALL_PAGES["westchester-ct"] = base(
    "westchester-ct", "area", "Westchester & Connecticut",
    "Westchester & Connecticut Car Service | Caliber Car Service",
    "Executive car service for Westchester County and Connecticut — HPN airport, cross-border runs, corporate travel. (516) 595-2391.",
    {"line1": "WESTCHESTER", "line2": "& CT.", "sub": "White Plains Airport, Connecticut border towns, and cross-county executive travel — chauffeurs who route across state lines with tolls and timing built into flat quotes."},
    [
        {"title": "HPN Specialists", "desc": "White Plains County Airport — compact terminal, shorter security, ideal for select domestic routes."},
        {"title": "Cross-Border Runs", "desc": "Greenwich, Stamford, Darien, and Fairfield County pickups coordinated with Long Island dispatch."},
        {"title": "Corporate Commuters", "desc": "Monthly billing for executives splitting time between LI offices and Westchester homes."},
        {"title": "Manhattan Connections", "desc": "Many itineraries include Manhattan legs — one account covers the full day."},
        {"title": "Northern Nassau Pickups", "desc": "Great Neck and Manhasset clients often choose HPN over JFK for time savings."},
        {"title": "24/7 Dispatch", "desc": "Early HPN departures and late returns — live support, not an app queue."},
    ],
    {"headline": "HPN AS YOUR<br><span class=\"gold\">SHORTCUT.</span>", "body": "Westchester County Airport rewards travelers who match carrier to convenience. We run HPN daily from northern Nassau and western Suffolk — and we know when JFK still wins on schedule or fare."},
    [
        {"q": "Do you pick up in Connecticut?", "a": "Yes — Fairfield County and Connecticut shoreline towns on regular routes. Confirm address at booking for flat-rate quote."},
        {"q": "How long from Greenwich to HPN?", "a": "Often 25–40 minutes depending on route and traffic — significantly less than routing to JFK for many travelers."},
        {"q": "Can Long Island residents use you for HPN departures?", "a": "Yes — northern Nassau and parts of Suffolk use HPN regularly. Drive time varies; dispatch quotes each itinerary."},
        {"q": "Are Connecticut tolls included?", "a": "Flat-rate quotes for cross-border trips include applicable tolls unless otherwise noted at confirmation."},
    ],
    airportStrategy=airport_strategy(
        "Which airport from Westchester & CT",
        "HPN is the local hub — but JFK and LGA still win on many fares. We compare schedule, carrier, and drive time when you book — not just habit.",
        [
            strategy_card("HPN", "White Plains", "Regional default", "Compact terminal, shorter security — ideal for JetBlue, American, and select domestic when your carrier flies here.", "hpn/", True),
            strategy_card("JFK", JFK_FULL, "International", "When HPN does not have your route or you need global connections — full meet-and-greet service.", "jfk/"),
            strategy_card("LGA", "LaGuardia", "NYC domestic", "Competitive for Manhattan-adjacent Connecticut commuters on East Coast schedules.", "lga/"),
        ],
    ),
    related=[
        {"label": "White Plains (HPN)", "href": "hpn/"},
        {"label": "Great Neck", "href": "great-neck/"},
        {"label": "Corporate Travel", "href": "corporate/"},
    ],
    _schema=place_schema("Westchester and Connecticut", "Chauffeur service for Westchester County and Connecticut."),
)

# About
ALL_PAGES["about"] = {
    "seo": {
        "title": "About Caliber Car Service | Long Island Since 2004",
        "description": "Family-owned executive black car service on Long Island since 2004 — TLC compliant, licensed, insured, 24/7 dispatch. Meet the team behind your ride.",
        "ogDescription": "Family-owned executive black car service on Long Island since 2004.",
    },
    "landing": {
        "type": "about",
        "slug": "about",
        "name": "About Caliber",
        "seo": {
            "title": "About Caliber Car Service | Long Island Since 2004",
            "description": "Family-owned executive black car service on Long Island since 2004 — TLC compliant, licensed, insured, 24/7 dispatch.",
            "url": f"{SITE}/about/",
        },
        "hero": {
            "line1": "ABOUT",
            "line2": "CALIBER.",
            "eyebrow": "Family Owned Since 2004",
            "sub": "Executive black car service built on Long Island — not a national franchise, not a rideshare algorithm. Real dispatchers, real chauffeurs, real accountability.",
            "bgImage": "/assets/images/whiteglove.webp",
        },
        "aboutBlocks": [
            {"title": "Family owned and operated", "body": "Caliber Car Service has operated from Long Island since 2004. The same family that answers strategy questions still cares whether your 6 a.m. JFK pickup happened on time — because reputation in this business is every single trip."},
            {"title": "How dispatch works", "body": "When you call (516) 595-2391, you reach our dispatch desk — not an overseas call center. We confirm your flight, assign your chauffeur, and stay reachable when plans change. For corporate accounts, you get a consistent billing contact and trip records your travel team can audit."},
            {"title": "Licensed, insured, TLC compliant", "body": "Our vehicles and chauffeurs meet New York TLC requirements. We carry commercial insurance appropriate for executive transportation. If your company needs certificates for vendors, ask dispatch — we provide documentation regularly."},
            {"title": "What we drive", "body": "Executive sedans (Cadillac CT6 class), premium SUVs (Escalade and similar), and executive Sprinters for groups. Every vehicle is detailed before pickup. Wi-Fi, chargers, and water are standard — presentation matters because it is part of your arrival."},
        ],
        "glove": {
            "headline": "FIVE-STAR RATED.<br><span class=\"gold\">ONE STANDARD.</span>",
            "body": "Clients stay with us because the ride is predictable — on-time staging, discreet chauffeurs, flat-rate clarity, and a phone line that works at four in the morning. That is the product.",
        },
        "faq": [
            {"q": "Where are you based?", "a": "We are family owned and operated on Long Island, New York, serving Nassau, Suffolk, NYC, New Jersey, Connecticut, and Westchester."},
            {"q": "How do I book?", "a": "Book online through our Moovs reservation link, call (516) 595-2391, or email info@calibercarservice.com. Same-day availability is subject to fleet schedule — call for urgent trips."},
            {"q": "Do you only do airports?", "a": "No. Airports are a core specialty, but we also handle corporate travel, hourly as-directed service, Manhattan runs, weddings and events, and cruise terminals."},
            {"q": "Can I request the same chauffeur?", "a": "We note preferences on your account when possible. Chauffeur assignment depends on schedule and vehicle class for each trip."},
        ],
        "related": [
            {"label": "Service Areas", "href": "areas/"},
            {"label": "Our Fleet", "href": "/#fleet"},
            {"label": "Corporate Accounts", "href": "corporate/"},
        ],
    },
    "schema": json.dumps({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Caliber Car Service",
        "telephone": "+15165952391",
        "foundingDate": "2004",
        "description": "Family-owned executive black car service on Long Island since 2004.",
        "areaServed": ["Long Island", "New York City", "New Jersey", "Connecticut"],
    }, indent=2),
}

# Areas hub
ALL_PAGES["areas"] = {
    "seo": {
        "title": "Service Areas | Caliber Car Service Long Island",
        "description": "Caliber Car Service coverage — Long Island towns, NYC airports, Manhattan, Hamptons, Westchester, and Connecticut. Find your route.",
        "ogDescription": "Executive black car service areas across Long Island and the tri-state.",
    },
    "landing": {
        "type": "hub",
        "slug": "areas",
        "name": "Service Areas",
        "seo": {
            "title": "Service Areas | Caliber Car Service Long Island",
            "description": "Caliber Car Service coverage — Long Island towns, NYC airports, Manhattan, Hamptons, Westchester, and Connecticut.",
            "url": f"{SITE}/areas/",
        },
        "hero": {
            "line1": "SERVICE",
            "line2": "AREAS.",
            "sub": "Airports, services, NYC boroughs, and Long Island towns — plus Westchester and Connecticut. Pick your destination below.",
        },
        "hubGroups": [
            {
                "title": "Airports",
                "links": [
                    {"label": JFK_LABEL, "href": "jfk/"},
                    {"label": "LaGuardia (LGA)", "href": "lga/"},
                    {"label": "Newark (EWR)", "href": "ewr/"},
                    {"label": "White Plains (HPN)", "href": "hpn/"},
                ],
            },
            {
                "title": "Services",
                "links": [
                    {"label": "Corporate Travel", "href": "corporate/"},
                    {"label": "Hourly Chauffeur", "href": "hourly/"},
                    {"label": "Events & Weddings", "href": "events/"},
                    {"label": "Cruise Terminals", "href": "cruise/"},
                ],
            },
            {
                "title": "NYC Boroughs",
                "links": [
                    {"label": "NYC Overview", "href": "nyc/"},
                    {"label": "Manhattan", "href": "manhattan/"},
                    {"label": "Brooklyn", "href": "brooklyn/"},
                    {"label": "Queens", "href": "queens/"},
                    {"label": "The Bronx", "href": "bronx/"},
                    {"label": "Staten Island", "href": "staten-island/"},
                ],
            },
            {
                "title": "Long Island",
                "links": [
                    {"label": "Hamptons & East End", "href": "hamptons/"},
                    {"label": "North Shore", "href": "north-shore/"},
                    {"label": "Garden City", "href": "garden-city/"},
                    {"label": "Great Neck", "href": "great-neck/"},
                    {"label": "Manhasset", "href": "manhasset/"},
                    {"label": "Rockville Centre", "href": "rockville-centre/"},
                    {"label": "Melville", "href": "melville/"},
                    {"label": "Huntington", "href": "huntington/"},
                    {"label": "Syosset", "href": "syosset/"},
                    {"label": "Westchester & Connecticut", "href": "westchester-ct/"},
                ],
            },
        ],
        "faq": [
            {"q": "Do you cover all of Long Island?", "a": "Yes — Nassau and Suffolk, including the North Shore, South Shore, and the Hamptons. Town pages above cover our most frequent pickup areas."},
            {"q": "Do you serve Westchester and Connecticut?", "a": "Yes — they are not on Long Island, but we run them daily. See Westchester & Connecticut for HPN-focused guidance and cross-border flat rates."},
            {"q": "Do you serve all of New York City?", "a": "Yes — all five boroughs. Use the NYC Overview or go straight to your borough page for airport strategy and typical routes."},
        ],
        "related": [{"label": "About Caliber", "href": "about/"}],
    },
    "schema": place_schema("Tri-State Service Area", "Caliber Car Service coverage across Long Island and the tri-state."),
}


def town_page(slug, name, seo_title, seo_desc, hero_sub, routes, airport_strategy_data, faq, related):
    return base(
        slug, "town", name, seo_title, seo_desc,
        {"line1": name.upper(), "line2": "CAR SERVICE.", "sub": hero_sub},
        [
            {"title": "Airport Transfers", "desc": f"Flat-rate JFK, LGA, EWR, and HPN service from {name} — flight tracking and meet-and-greet on request."},
            {"title": "Manhattan Runs", "desc": "Dinner, theater, offices, and hospitals — chauffeurs who know your usual crossings."},
            {"title": "Corporate & Hourly", "desc": f"Dedicated accounts and as-directed blocks for executives based in {name}."},
            {"title": "Events & Weddings", "desc": "Sprinters and sedans for local celebrations — coordinated timing with your planner."},
            {"title": "24/7 Dispatch", "desc": "Call (516) 595-2391 for same-day availability and account bookings."},
            {"title": "Fixed-Rate Quotes", "desc": "Price confirmed at booking — tolls included on standard routes unless noted otherwise."},
        ],
        {"headline": "LOCAL<br><span class=\"gold\">EXPERTISE.</span>", "body": f"We have run {name} pickups daily for years — not occasional GPS guesses. Your chauffeur knows residential staging, school traffic pockets, and which airport makes sense for your flight."},
        faq,
        routes=routes,
        airportStrategy=airport_strategy_data,
        related=related,
        _schema=place_schema(f"{name} Car Service", seo_desc, area_served=f"{name}, NY"),
    )


ALL_PAGES["garden-city"] = town_page(
    "garden-city", "Garden City",
    "Garden City Car Service & Airport Transfers | Caliber",
    "Garden City, NY black car service — JFK, LGA, Manhattan with flat rates and 24/7 dispatch. Family owned since 2004.",
    "Garden City chauffeur service — central Nassau location with fast access to LGA, JFK, and Manhattan corridors.",
    [
        {"dest": "Garden City → LaGuardia", "time": "25–40 min typical", "note": "Often the closest major airport for domestic departures — we confirm terminal and pickup window at booking."},
        {"dest": "Garden City → JFK", "time": "35–55 min typical", "note": "International and many domestic routes — buffer for peak LIE and Van Wyck traffic."},
        {"dest": "Garden City → Midtown Manhattan", "time": "40–65 min typical", "note": "Evening returns available — flat-rate quotes for one-way and round-trip."},
    ],
    airport_strategy(
        "Which airport from Garden City",
        "Central Nassau puts you within reach of every major hub. We recommend based on airline, terminal, and traffic — not habit.",
        [
            strategy_card("LGA", "LaGuardia", "Domestic favorite", "Often the shortest drive for East Coast departures — we confirm terminal and pickup window at booking.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Default for overseas travel and many premium domestic carriers — 60-minute wait on arrivals.", "jfk/"),
            strategy_card("HPN", "White Plains", "Select carriers", "Worth comparing for northern-route JetBlue and American when schedule fits.", "hpn/"),
        ],
    ),
    [
        {"q": "Do you pick up at Garden City residences and Adelphi?", "a": "Yes — private homes, condos, and institutional addresses throughout the village and adjacent Nassau communities."},
        {"q": "Can I book a recurring Manhattan commute?", "a": "Yes — corporate and personal accounts support standing reservations. Call dispatch to set billing and preferred pickup times."},
        {"q": "Is meet-and-greet available at JFK?", "a": "Yes, on request — chauffeur inside arrivals with name sign. Included complimentary wait times follow airport policy (60 min JFK)."},
    ],
    [{"label": "North Shore", "href": "north-shore/"}, {"label": JFK_LABEL, "href": "jfk/"}, {"label": "LaGuardia", "href": "lga/"}],
)

ALL_PAGES["great-neck"] = town_page(
    "great-neck", "Great Neck",
    "Great Neck Car Service & Airport Transfers | Caliber",
    "Great Neck, NY executive car service — LGA proximity, JFK transfers, Manhattan runs. 24/7 dispatch. (516) 595-2391.",
    "Great Neck and the Great Neck peninsula — chauffeurs who know LGA loops, Kings Point staging, and Manhattan rush patterns.",
    [
        {"dest": "Great Neck → LaGuardia", "time": "20–35 min typical", "note": "Among the shortest major-airport drives from Nassau — ideal for many domestic itineraries."},
        {"dest": "Great Neck → JFK", "time": "35–60 min typical", "note": "International hub access — flight tracking and meet-and-greet available."},
        {"dest": "Great Neck → Midtown Manhattan", "time": "35–55 min typical", "note": "Common for dining and offices — late-night returns supported."},
    ],
    airport_strategy(
        "Which airport from Great Neck",
        "The peninsula is among the closest Nassau communities to LaGuardia — but international schedules still point to JFK.",
        [
            strategy_card("LGA", "LaGuardia", "Closest major hub", "Typically 20–35 minutes — ideal for time-sensitive domestic itineraries.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Full terminal knowledge for global carriers — meet-and-greet in arrivals on request.", "jfk/"),
            strategy_card("EWR", "Newark", "Alternate", "Some travelers prefer United into Newark — toll-inclusive flat rates.", "ewr/"),
        ],
    ),
    [
        {"q": "Do you serve Kings Point and Great Neck Plaza?", "a": "Yes — the entire peninsula including waterfront estates and village centers."},
        {"q": "Can you handle wedding transportation in Great Neck?", "a": "Yes — see our Events page for multi-vehicle coordination. Book peak dates early."},
        {"q": "Do you offer service to Manhattan hospitals?", "a": "Yes — URGENT and scheduled medical appointments with careful drop-off at hospital entrances."},
    ],
    [{"label": "North Shore", "href": "north-shore/"}, {"label": "Events", "href": "events/"}, {"label": "LGA", "href": "lga/"}],
)

ALL_PAGES["manhasset"] = town_page(
    "manhasset", "Manhasset",
    "Manhasset Car Service & Airport Transfers | Caliber",
    "Manhasset, NY black car service — North Shore chauffeur for LGA, JFK, HPN, and Manhattan. Flat rates. (516) 595-2391.",
    "Manhasset and Plandome — North Shore chauffeur service with LGA and HPN expertise for Gold Coast travel patterns.",
    [
        {"dest": "Manhasset → LaGuardia", "time": "25–40 min typical", "note": "Reliable domestic hub — terminal confirmed at booking."},
        {"dest": "Manhasset → White Plains (HPN)", "time": "30–50 min typical", "note": "Strong option for select JetBlue and American departures."},
        {"dest": "Manhasset → Midtown Manhattan", "time": "40–60 min typical", "note": "Northern Boulevard and LIE routing based on live traffic."},
    ],
    airport_strategy(
        "Which airport from Manhasset",
        "Northern Nassau sits between LGA and HPN — the right hub depends on carrier, not distance alone.",
        [
            strategy_card("LGA", "LaGuardia", "Domestic default", "Most NYC domestic flights — reliable loops from Manhasset and Plandome.", "lga/", True),
            strategy_card("HPN", "White Plains", "Less congestion", "Strong for select JetBlue and American when your flight departs from Westchester.", "hpn/"),
            strategy_card("JFK", JFK_FULL, "International", "When your schedule requires JFK — we build Van Wyck and LIE buffer into pickup time.", "jfk/"),
        ],
    ),
    [
        {"q": "Do you pick up along Northern Boulevard?", "a": "Yes — commercial and residential addresses along Northern Blvd and adjacent streets."},
        {"q": "Can executives set up corporate billing?", "a": "Yes — many Manhasset-based companies use corporate accounts for airport and Manhattan travel."},
        {"q": "How early should I leave Manhasset for a 7 a.m. LGA flight?", "a": "Dispatch recommends pickup based on time of day and terminal — typically 90+ minutes before boarding for domestic; share your flight when booking."},
    ],
    [{"label": "North Shore", "href": "north-shore/"}, {"label": "HPN", "href": "hpn/"}, {"label": "Corporate", "href": "corporate/"}],
)

ALL_PAGES["huntington"] = town_page(
    "huntington", "Huntington",
    "Huntington NY Car Service & Airport Transfers | Caliber",
    "Huntington, Suffolk County car service — JFK, LGA, Manhattan with flat rates. East-end and North Shore expertise.",
    "Huntington and Huntington Bay — Suffolk anchor with different airport math than western Nassau — honest drive-time planning.",
    [
        {"dest": "Huntington → JFK", "time": "50–75 min typical", "note": "Primary international access from western Suffolk — LIE routing."},
        {"dest": "Huntington → LaGuardia", "time": "45–70 min typical", "note": "Domestic hub — confirm terminal at booking."},
        {"dest": "Huntington → Midtown Manhattan", "time": "55–85 min typical", "note": "Longer than Nassau runs — we build rush-hour buffer accordingly."},
    ],
    airport_strategy(
        "Which airport from Huntington",
        "Western Suffolk adds drive time to every hub — we quote honestly and recommend earlier pickups than Nassau clients need.",
        [
            strategy_card("JFK", JFK_FULL, "International", "Primary hub for most overseas and major domestic routes — plan 50–75+ minutes ground time.", "jfk/", True),
            strategy_card("LGA", "LaGuardia", "Domestic option", "Competitive on some East Coast schedules — we factor LIE traffic at booking.", "lga/"),
            strategy_card("HPN", "White Plains", "Northern Suffolk", "Occasionally best when carrier and eastern Suffolk pickup align.", "hpn/"),
        ],
    ),
    [
        {"q": "Do you serve Huntington Village and Huntington Bay?", "a": "Yes — village, bay, and surrounding Suffolk communities on regular routes."},
        {"q": "Is Huntington farther from airports than Nassau?", "a": "Yes — drive times run longer. We quote realistically and recommend earlier pickups than western Nassau clients need."},
        {"q": "Do you run to the Hamptons from Huntington?", "a": "Yes — East End and event transfers are available. Book peak summer weekends early."},
    ],
    [{"label": "Hamptons", "href": "hamptons/"}, {"label": JFK_LABEL, "href": "jfk/"}, {"label": "Manhattan", "href": "manhattan/"}],
)

ALL_PAGES["syosset"] = town_page(
    "syosset", "Syosset",
    "Syosset Car Service & Airport Transfers | Caliber",
    "Syosset and Woodbury car service — central Nassau airport and Manhattan transfers. Corporate-friendly billing.",
    "Syosset, Woodbury, and Jericho corridor — central Nassau with strong Melville corporate adjacency and LIE airport access.",
    [
        {"dest": "Syosset → LaGuardia", "time": "30–45 min typical", "note": "Common corporate airport — terminal and traffic loops factored at booking."},
        {"dest": "Syosset → JFK", "time": "40–60 min typical", "note": "International and domestic — meet-and-greet available."},
        {"dest": "Syosset → Midtown Manhattan", "time": "45–70 min typical", "note": "LIE and tunnel routing optimized for time of day."},
    ],
    airport_strategy(
        "Which airport from Syosset",
        "Central Nassau with fast LIE access — corporate and residential pickups share the same dispatch desk.",
        [
            strategy_card("LGA", "LaGuardia", "Corporate domestic", "Popular for Melville-adjacent offices and Syosset homes — 30–45 minute typical drive.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "International executives and roadshow guests — meet-and-greet available.", "jfk/"),
            strategy_card("EWR", "Newark", "United hub", "Alternative for United-heavy corporate travel — toll-inclusive quotes.", "ewr/"),
        ],
    ),
    [
        {"q": "Do you pick up in Woodbury and Jericho?", "a": "Yes — the entire 11791 area and adjacent ZIP codes on regular schedules."},
        {"q": "Can our company open a corporate account?", "a": "Yes — popular for Melville-area firms with executives in Syosset. Call dispatch for onboarding."},
        {"q": "Same-day airport booking from Syosset?", "a": "Subject to availability — call (516) 595-2391 for fastest confirmation."},
    ],
    [{"label": "Corporate Travel", "href": "corporate/"}, {"label": "LGA", "href": "lga/"}, {"label": "North Shore", "href": "north-shore/"}],
)

ALL_PAGES["rockville-centre"] = town_page(
    "rockville-centre", "Rockville Centre",
    "Rockville Centre Car Service & Airport Transfers | Caliber",
    "Rockville Centre, NY black car service — South Shore Nassau, LGA and JFK access, Manhattan runs. Flat rates. (516) 595-2391.",
    "Rockville Centre and the South Shore — village pickups with strong LaGuardia and JFK access via the Southern State and Belt Parkway corridors.",
    [
        {"dest": "Rockville Centre → LaGuardia", "time": "30–50 min typical", "note": "Belt Parkway and Grand Central routing — traffic-dependent."},
        {"dest": "Rockville Centre → JFK", "time": "35–55 min typical", "note": "Southern State to Van Wyck — buffer at booking."},
        {"dest": "Rockville Centre → Midtown Manhattan", "time": "45–70 min typical", "note": "Evening returns and corporate commutes available."},
    ],
    airport_strategy(
        "Which airport from Rockville Centre",
        "South Shore Nassau sits between JFK and LGA — we pick based on airline and real drive time, not habit.",
        [
            strategy_card("LGA", "LaGuardia", "Many domestic routes", "Competitive drive time for East Coast schedules — terminal confirmed at booking.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Default for overseas travel — meet-and-greet and 60-minute wait on arrivals.", "jfk/"),
            strategy_card("EWR", "Newark", "Alternate", "Some United and westbound fares — toll-inclusive quotes.", "ewr/"),
        ],
    ),
    [
        {"q": "Do you serve Rockville Centre and South Hempstead?", "a": "Yes — the village and adjacent South Shore communities on regular schedules."},
        {"q": "Is LGA or JFK closer from Rockville Centre?", "a": "Often similar drive time depending on traffic — share your flight and we recommend the sensible hub."},
        {"q": "Can I book wedding transportation in Rockville Centre?", "a": "Yes — see our Events page for multi-vehicle coordination."},
    ],
    [{"label": "Garden City", "href": "garden-city/"}, {"label": "LGA", "href": "lga/"}, {"label": "Events", "href": "events/"}],
)

ALL_PAGES["melville"] = town_page(
    "melville", "Melville",
    "Melville Car Service & Airport Transfers | Caliber",
    "Melville, NY corporate car service — Route 110 corridor, LGA and JFK, Manhattan. Executive accounts. (516) 595-2391.",
    "Melville and the Route 110 corporate corridor — executive home pickups and office-adjacent departures with dedicated account billing.",
    [
        {"dest": "Melville → LaGuardia", "time": "30–45 min typical", "note": "Popular corporate airport — Northern State and LIE routing."},
        {"dest": "Melville → JFK", "time": "40–60 min typical", "note": "International and domestic — meet-and-greet available."},
        {"dest": "Melville → Midtown Manhattan", "time": "45–70 min typical", "note": "Daily executive commutes under corporate accounts."},
    ],
    airport_strategy(
        "Which airport from Melville",
        "Central Nassau offices and homes — LGA wins on time for many domestic flights; JFK for international.",
        [
            strategy_card("LGA", "LaGuardia", "Corporate domestic", "Shortest major-airport drive for many Melville pickups.", "lga/", True),
            strategy_card("JFK", JFK_FULL, "International", "Executive international travel — priority dispatch for accounts.", "jfk/"),
            strategy_card("HPN", "White Plains", "Select carriers", "Occasionally best for northern-route schedules — we compare at booking.", "hpn/"),
        ],
    ),
    [
        {"q": "Do you serve the Route 110 office corridor?", "a": "Yes — Melville, Huntington (south), and adjacent commercial addresses daily."},
        {"q": "Can our company open a corporate account?", "a": "Yes — popular for firms along Route 110. Call dispatch to onboard billing and authorized bookers."},
        {"q": "Same-day airport booking from Melville?", "a": "Subject to availability — call (516) 595-2391 for fastest confirmation."},
    ],
    [{"label": "Corporate Travel", "href": "corporate/"}, {"label": "Syosset", "href": "syosset/"}, {"label": "LGA", "href": "lga/"}],
)

from airport_pages import AIRPORT_PAGES  # noqa: E402

ALL_PAGES.update(AIRPORT_PAGES)
