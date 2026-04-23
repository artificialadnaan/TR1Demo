// Realistic storm damage scope for a single-family residence
// Xactimate codes based on public IICRC/restoration industry references
// Pricing is representative — actual Xactimate pricing varies by ZIP/date

export type Severity = 'moderate' | 'severe' | 'total';
export type Confidence = 'high' | 'medium' | 'low';
export type PriceSource = 'historical' | 'market' | 'manual';

export interface DamageItem {
  id: string;
  startTime: number; // seconds in video
  endTime: number;
  location: string;
  description: string;
  narrationExcerpt: string;
  severity: Severity;
  confidence: Confidence;
  xactimateCode: string;
  xactimateDesc: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  laborPrice: number;
  farPhoto: string;
  closePhoto: string;
  needsRecapture?: boolean;
  notes?: string;
}

export interface ProjectMeta {
  address: string;
  clientName: string;
  claimNumber: string;
  dateOfLoss: string;
  causeOfLoss: string;
  inspector: string;
  inspectionDate: string;
  walkthroughDuration: string;
  totalItems: number;
}

export const projectMeta: ProjectMeta = {
  address: "4812 Oak Hollow Lane, Oklahoma City, OK 73142",
  clientName: "Morrison Residence",
  claimNumber: "CLM-2026-04-18723",
  dateOfLoss: "April 14, 2026",
  causeOfLoss: "Wind & Hail — Severe Thunderstorm",
  inspector: "D. Whitaker, Field Estimator",
  inspectionDate: "April 22, 2026",
  walkthroughDuration: "4:18",
  totalItems: 11,
};

export const transcriptSegments = [
  { start: 0, end: 18, text: "Alright, we're at the Morrison property on Oak Hollow — loss date was the storm on the 14th. Starting with the north elevation so I can give you the full context shot of the front of the house. You can see the general impact pattern from the ridge line down." },
  { start: 18, end: 42, text: "Pulling in close here on the front slope — you can see granule loss across basically the entire field. Count me maybe thirty, thirty-five bruises per test square. This whole slope is totaled, it's not a repair. We're looking at a full tear-off and re-roof on this side at minimum." },
  { start: 42, end: 68, text: "Moving up to the ridge cap — you can see multiple pieces have lifted. Wind damage, not hail on this one. Looks like maybe fifteen linear feet of ridge that needs to come off and be replaced. Getting my close-up now." },
  { start: 68, end: 92, text: "Chimney flashing — look at this. The step flashing is completely pulled away from the chimney on the east side. Water's been getting in here, I can see the staining on the underside of the soffit below. Flashing needs replacement and we need to check for interior water damage when we get inside." },
  { start: 92, end: 118, text: "Alright, moving around to the east elevation. Gutters — you can see the entire run here is dented, impact marks consistent with hail. Downspout on the corner is also damaged. That's about forty feet of gutter plus one downspout." },
  { start: 118, end: 145, text: "Window screens on the east side — both the kitchen and bedroom windows have torn screens from debris. Two screens to replace. The windows themselves look OK, no cracking in the glass." },
  { start: 145, end: 172, text: "Siding here on the south elevation — significant hail damage. You can see the dimpling across this whole wall. Vinyl siding, I'd say a good two hundred square feet needs to come off and be replaced. The impact pattern is consistent with the rest of the claim." },
  { start: 172, end: 195, text: "AC unit — look at the fins on the condenser. Completely flattened from the hail. Unit's still running but the efficiency is gonna be shot. We'll need a fin comb repair at minimum, possibly full coil replacement depending on what HVAC finds." },
  { start: 195, end: 220, text: "Moving to the back — there's the patio cover. Aluminum, you can see the panels are dented pretty badly. Homeowner says it was installed two years ago, was in perfect shape before the storm. Whole cover needs replacement, that's about one-twenty square feet." },
  { start: 220, end: 245, text: "Garage door on this side — a few impact dents visible, but nothing that affects operation. I'm flagging it for the adjuster to decide on cosmetic repair versus full panel replacement. Close-up coming." },
  { start: 245, end: 272, text: "Back inside the main roof slope — this is the south-facing slope, same story as the north. Heavy granule loss, bruising throughout. This is gonna be a full replacement, no question." },
  { start: 272, end: 298, text: "Last item — gutter guards. The existing guards on the front are bent up pretty badly from hail. About thirty-five linear feet to replace. Alright, that's the full exterior walk. Back to the truck to write this up." },
];

export const damageItems: DamageItem[] = [
  {
    id: "01",
    startTime: 18,
    endTime: 42,
    location: "North elevation — front slope",
    description: "Full roof replacement — composition shingles",
    narrationExcerpt: "granule loss across basically the entire field... thirty-five bruises per test square... this whole slope is totaled",
    severity: "total",
    confidence: "high",
    xactimateCode: "RFG 300S",
    xactimateDesc: "Roofing — 3-tab composition shingles, 25 yr",
    quantity: 24.5,
    unit: "SQ",
    unitPrice: 385.00,
    laborPrice: 175.00,
    farPhoto: "/images/far_01.jpg",
    closePhoto: "/images/close_01.jpg",
  },
  {
    id: "02",
    startTime: 42,
    endTime: 68,
    location: "North ridge",
    description: "Ridge cap replacement — wind lifted",
    narrationExcerpt: "multiple pieces have lifted... fifteen linear feet of ridge that needs to come off",
    severity: "moderate",
    confidence: "high",
    xactimateCode: "RFG RIDGC",
    xactimateDesc: "Roofing — Ridge cap, composition shingle",
    quantity: 15,
    unit: "LF",
    unitPrice: 8.45,
    laborPrice: 4.20,
    farPhoto: "/images/far_02.jpg",
    closePhoto: "/images/close_02.jpg",
  },
  {
    id: "03",
    startTime: 68,
    endTime: 92,
    location: "East chimney",
    description: "Chimney step flashing replacement + water intrusion check",
    narrationExcerpt: "step flashing is completely pulled away from the chimney... water's been getting in",
    severity: "severe",
    confidence: "high",
    xactimateCode: "RFG FLCH-C",
    xactimateDesc: "Flashing — chimney, step",
    quantity: 1,
    unit: "EA",
    unitPrice: 145.00,
    laborPrice: 285.00,
    farPhoto: "/images/far_03.jpg",
    closePhoto: "/images/close_03.jpg",
    notes: "Interior water damage inspection required — not yet scoped",
  },
  {
    id: "04",
    startTime: 92,
    endTime: 118,
    location: "East elevation — eave line",
    description: "Gutter replacement — hail impact damage",
    narrationExcerpt: "the entire run here is dented, impact marks consistent with hail... forty feet of gutter",
    severity: "severe",
    confidence: "high",
    xactimateCode: "GTR ALUM",
    xactimateDesc: "Gutter — aluminum, 5\" K-style",
    quantity: 40,
    unit: "LF",
    unitPrice: 4.85,
    laborPrice: 3.90,
    farPhoto: "/images/far_04.jpg",
    closePhoto: "/images/close_04.jpg",
  },
  {
    id: "05",
    startTime: 92,
    endTime: 118,
    location: "East corner",
    description: "Downspout replacement",
    narrationExcerpt: "Downspout on the corner is also damaged",
    severity: "moderate",
    confidence: "high",
    xactimateCode: "GTR DWN",
    xactimateDesc: "Downspout — aluminum, 2x3",
    quantity: 1,
    unit: "EA",
    unitPrice: 22.50,
    laborPrice: 35.00,
    farPhoto: "/images/far_05.jpg",
    closePhoto: "/images/close_05.jpg",
  },
  {
    id: "06",
    startTime: 118,
    endTime: 145,
    location: "East windows — kitchen & bedroom",
    description: "Window screen replacement",
    narrationExcerpt: "both the kitchen and bedroom windows have torn screens from debris",
    severity: "moderate",
    confidence: "high",
    xactimateCode: "WDW SCR",
    xactimateDesc: "Window screen — replace, standard size",
    quantity: 2,
    unit: "EA",
    unitPrice: 45.00,
    laborPrice: 35.00,
    farPhoto: "/images/far_06.jpg",
    closePhoto: "/images/close_06.jpg",
  },
  {
    id: "07",
    startTime: 145,
    endTime: 172,
    location: "South elevation — main wall",
    description: "Vinyl siding replacement — hail damage",
    narrationExcerpt: "significant hail damage... two hundred square feet needs to come off and be replaced",
    severity: "severe",
    confidence: "high",
    xactimateCode: "SDG VINL",
    xactimateDesc: "Siding — vinyl, standard profile",
    quantity: 200,
    unit: "SF",
    unitPrice: 3.25,
    laborPrice: 2.85,
    farPhoto: "/images/far_07.jpg",
    closePhoto: "/images/close_07.jpg",
  },
  {
    id: "08",
    startTime: 172,
    endTime: 195,
    location: "South — HVAC pad",
    description: "AC condenser fin comb / repair",
    narrationExcerpt: "fins on the condenser completely flattened from hail... fin comb repair at minimum",
    severity: "moderate",
    confidence: "medium",
    xactimateCode: "HVC FINR",
    xactimateDesc: "HVAC — AC condenser fin comb & repair",
    quantity: 1,
    unit: "EA",
    unitPrice: 125.00,
    laborPrice: 215.00,
    farPhoto: "/images/far_08.jpg",
    closePhoto: "/images/close_08.jpg",
    notes: "HVAC tech inspection may warrant coil replacement — flagged for adjuster",
  },
  {
    id: "09",
    startTime: 195,
    endTime: 220,
    location: "Rear patio",
    description: "Aluminum patio cover replacement",
    narrationExcerpt: "panels are dented pretty badly... whole cover needs replacement... one-twenty square feet",
    severity: "severe",
    confidence: "high",
    xactimateCode: "AWN ALUM",
    xactimateDesc: "Awning — aluminum patio cover, insulated panel",
    quantity: 120,
    unit: "SF",
    unitPrice: 12.50,
    laborPrice: 6.75,
    farPhoto: "/images/far_09.jpg",
    closePhoto: "/images/close_09.jpg",
  },
  {
    id: "10",
    startTime: 220,
    endTime: 245,
    location: "Side garage door",
    description: "Garage door — cosmetic damage assessment",
    narrationExcerpt: "a few impact dents visible, but nothing that affects operation... flagging for the adjuster",
    severity: "moderate",
    confidence: "low",
    xactimateCode: "GDR PAN",
    xactimateDesc: "Garage door — panel replacement or cosmetic repair",
    quantity: 1,
    unit: "EA",
    unitPrice: 285.00,
    laborPrice: 165.00,
    farPhoto: "/images/far_10.jpg",
    closePhoto: "/images/close_10.jpg",
    needsRecapture: true,
    notes: "Close-up photo captured but adjuster determination needed on cosmetic vs. replacement scope",
  },
  {
    id: "11",
    startTime: 272,
    endTime: 298,
    location: "Front gutter line",
    description: "Gutter guard replacement",
    narrationExcerpt: "existing guards on the front are bent up pretty badly from hail... thirty-five linear feet",
    severity: "moderate",
    confidence: "high",
    xactimateCode: "GTR GRD",
    xactimateDesc: "Gutter guard — aluminum mesh screen",
    quantity: 35,
    unit: "LF",
    unitPrice: 6.25,
    laborPrice: 2.50,
    farPhoto: "/images/far_11.jpg",
    closePhoto: "/images/close_11.jpg",
  },
];

export const calcTotals = () => {
  const subtotal = damageItems.reduce((sum, item) => {
    return sum + item.quantity * (item.unitPrice + item.laborPrice);
  }, 0);
  const overhead = subtotal * 0.10;
  const profit = subtotal * 0.10;
  const tax = (subtotal + overhead + profit) * 0.0825;
  const total = subtotal + overhead + profit + tax;
  return { subtotal, overhead, profit, tax, total };
};
