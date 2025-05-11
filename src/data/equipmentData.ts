export interface EquipmentData {
  line: string;
  stationCode: string;
  stationId: string;
  stationName: string;
  pdp: number;
  wideAisle: number;
  standardAisle: number;
  wideGate: number;
  gateArray: number;
  gate: number;
  tvm: number;
  tom: number;
  newTvm: number;
  newGate: number;
}

export const equipmentData: EquipmentData[] = [
  {
    line: "Red",
    stationCode: "RNST090",
    stationId: "ST01",
    stationName: "Lusail",
    pdp: 2,
    wideAisle: 3,
    standardAisle: 6,
    wideGate: 6,
    gateArray: 6,
    gate: 3,
    tvm: 12,
    tom: 4,
    newTvm: 2,
    newGate: 6
  },
  {
    line: "Red",
    stationCode: "RNST080",
    stationId: "ST02",
    stationName: "Qatar University",
    pdp: 1,
    wideAisle: 3,
    standardAisle: 4,
    wideGate: 2,
    gateArray: 4,
    gate: 1,
    tvm: 10,
    tom: 2,
    newTvm: 2,
    newGate: 2
  },
  // More station equipment data
  {
    line: "Green",
    stationCode: "GWST010",
    stationId: "ST19",
    stationName: "Al Mansoura",
    pdp: 1,
    wideAisle: 2,
    standardAisle: 8,
    wideGate: 4,
    gateArray: 8,
    gate: 2,
    tvm: 12,
    tom: 3,
    newTvm: 2,
    newGate: 1
  },
  // Gold line stations
  {
    line: "Gold",
    stationCode: "YWST070",
    stationId: "ST27",
    stationName: "Al Aziziyah",
    pdp: 1,
    wideAisle: 2,
    standardAisle: 6,
    wideGate: 4,
    gateArray: 6,
    gate: 2,
    tvm: 10,
    tom: 2,
    newTvm: 2,
    newGate: 4
  }
];

export const equipmentTotals = [
  {
    line: "Red",
    pdp: 21,
    wideAisle: 44,
    standardAisle: 108,
    wideGate: 84,
    gateArray: 102,
    gate: 40,
    tvm: 186,
    tom: 54,
    newTvm: 41,
    newGate: 14
  },
  {
    line: "Green",
    pdp: 10,
    wideAisle: 18,
    standardAisle: 46,
    wideGate: 35,
    gateArray: 46,
    gate: 17,
    tvm: 81,
    tom: 21,
    newTvm: 18,
    newGate: 4
  },
  {
    line: "Gold",
    pdp: 11,
    wideAisle: 20,
    standardAisle: 60,
    wideGate: 40,
    gateArray: 66,
    gate: 20,
    tvm: 106,
    tom: 24,
    newTvm: 22,
    newGate: 11
  },
  {
    line: "All Lines",
    pdp: 42,
    wideAisle: 82,
    standardAisle: 214,
    wideGate: 159,
    gateArray: 214,
    gate: 77,
    tvm: 373,
    tom: 99,
    newTvm: 81,
    newGate: 35
  }
];