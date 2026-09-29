export const GLOSSARY_DATA = [
  {
    "id": "taf",
    "term": "TAF",
    "expansion": "Terminal Aerodrome Forecast",
    "definition": "A coded forecast of the weather expected within 5 statute miles of the center of an airport’s runway complex for a set time period.",
    "source": "FAA Aviation Weather Handbook, 27.4",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=407"
  },
  {
    "id": "amd",
    "term": "AMD",
    "expansion": "Amended TAF",
    "definition": "TAF AMD marks a TAF the forecaster changed before the next scheduled issuance. It replaces the previous TAF immediately.",
    "source": "FAA Aviation Weather Handbook, 27.4.2.4",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=409"
  },
  {
    "id": "cor",
    "term": "COR",
    "expansion": "Corrected TAF",
    "definition": "TAF COR marks a TAF reissued to fix a mistake, such as a typo, an incorrect time, or a formatting error.",
    "source": "NWSI 10-813, Section 4.6",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=6"
  },
  {
    "id": "icao",
    "term": "ICAO identifier",
    "expansion": "ICAO location identifier",
    "definition": "The four-letter airport code at the start of each TAF; U.S. mainland codes begin with K.",
    "source": "NWSI 10-813, Appendix B1",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=11"
  },
  {
    "id": "z",
    "term": "Z",
    "expansion": "Zulu, UTC",
    "definition": "Letter added to TAF times to show they are in Coordinated Universal Time, not local time.",
    "source": "NWSI 10-813, Section 4.9",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=6"
  },
  {
    "id": "utc",
    "term": "UTC",
    "expansion": "Coordinated Universal Time",
    "definition": "The time standard used for all TAF times, shown with a Z.",
    "source": "NWSI 10-813, Section 4.9",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=6"
  },
  {
    "id": "kt",
    "term": "KT",
    "expansion": "Knots",
    "definition": "The wind speed unit used in TAFs.",
    "source": "NWSI 10-813, Appendix A",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=9"
  },
  {
    "id": "p6sm",
    "term": "P6SM",
    "expansion": "Plus 6 statute miles",
    "definition": "Visibility forecast to be greater than 6 statute miles.",
    "source": "NWSI 10-813, Appendix B2.5",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=15"
  },
  {
    "id": "agl",
    "term": "AGL",
    "expansion": "Above ground level",
    "definition": "Height above the airport surface. TAF cloud heights are in hundreds of feet AGL.",
    "source": "NWSI 10-813, Appendix B2.7.1",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=20"
  },
  {
    "id": "bkn",
    "term": "BKN",
    "expansion": "Broken",
    "definition": "Clouds covering 5 to 7 eighths of the sky; the lowest broken layer is the ceiling.",
    "source": "NWSI 10-813, Appendix A",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=9"
  },
  {
    "id": "ovc",
    "term": "OVC",
    "expansion": "Overcast",
    "definition": "Clouds covering the whole sky (8 oktas); an overcast layer below any broken layer is the ceiling.",
    "source": "NWSI 10-813, Appendix A",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=9"
  },
  {
    "id": "ceiling",
    "term": "Ceiling",
    "expansion": "",
    "definition": "The lowest broken or overcast layer, or the vertical visibility into an obscuration. VV008, BKN008, and OVC008 all mean an 800 ft ceiling.",
    "source": "NWSI 10-813, Appendix B2.7.1",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=21"
  },
  {
    "id": "llws",
    "term": "LLWS",
    "expansion": "Low-level wind shear",
    "definition": "A change in wind speed or direction close to the ground; the TAF WS group covers non-convective wind shear from the surface up to 2,000 ft AGL.",
    "source": "FAA Aviation Weather Handbook, 27.4.2.9.4",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=415"
  },
  {
    "id": "tempo",
    "term": "TEMPO",
    "expansion": "Temporarily: change group",
    "definition": "Temporary fluctuations with a better than 50% chance, each lasting one hour or less and covering less than half of the stated period; a TEMPO group never exceeds four hours.",
    "source": "NWSI 10-813, Appendix B2.9.3 and Section 4.12",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=25"
  },
  {
    "id": "mvfr",
    "term": "MVFR",
    "expansion": "Marginal VFR: flight category",
    "definition": "Ceiling 1,000 to 3,000 feet and/or visibility 3 to 5 miles.",
    "source": "AIM, 7-1-7",
    "url": "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_1.html#7-1-7"
  },
  {
    "id": "br",
    "term": "BR",
    "expansion": "Mist",
    "definition": "Fog that restricts visibility to between 5/8 and 6 statute miles; below 5/8 SM it is coded FG.",
    "source": "NWSI 10-813, Appendix B2.6.3",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=19"
  },
  {
    "id": "fg",
    "term": "FG",
    "expansion": "Fog",
    "definition": "A visible aggregate of tiny water droplets based at the surface that reduces visibility to less than 5/8 statute mile.",
    "source": "FAA Aviation Weather Handbook, 18.1.1",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=222"
  },
  {
    "id": "fm",
    "term": "FM",
    "expansion": "From: change group",
    "definition": "Marks a rapid change to a new set of prevailing conditions starting at the stated day and time; everything before it is replaced.",
    "source": "NWSI 10-813, Appendix B2.9.2",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=24"
  },
  {
    "id": "g",
    "term": "G",
    "expansion": "Gust",
    "definition": "Follows the mean wind speed and gives the peak gust, for example 16015G25KT is 15 knots gusting to 25.",
    "source": "NWSI 10-813, Appendix A and B2.4.1",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=9"
  },
  {
    "id": "sct",
    "term": "SCT",
    "expansion": "Scattered",
    "definition": "Clouds covering 3 to 4 eighths (oktas) of the sky.",
    "source": "NWSI 10-813, Appendix A",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=10"
  },
  {
    "id": "prob30",
    "term": "PROB30",
    "expansion": "30 percent probability group",
    "definition": "A 30% chance of a thunderstorm or precipitation event, with its related wind, visibility, and clouds, during a period of six hours or less. It is the only PROB group in NWS TAFs.",
    "source": "NWSI 10-813, Appendix B2.9.4",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=27"
  },
  {
    "id": "tsra",
    "term": "TSRA",
    "expansion": "Thunderstorm with rain",
    "definition": "A thunderstorm with moderate rain (add - for light or + for heavy rain).",
    "source": "NWSI 10-813, Appendix E4",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=39"
  },
  {
    "id": "cb",
    "term": "CB",
    "expansion": "Cumulonimbus",
    "definition": "Thunderstorm cloud. It is the only cloud type a TAF includes, added to the cloud layer whenever thunderstorms are forecast, even in the vicinity.",
    "source": "NWSI 10-813, Appendix B2.7.3",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=21"
  },
  {
    "id": "ts",
    "term": "TS",
    "expansion": "Thunderstorm",
    "definition": "A local storm produced by a cumulonimbus cloud and always accompanied by lightning and thunder.",
    "source": "FAA Aviation Weather Handbook, 22.1",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=256"
  },
  {
    "id": "metar",
    "term": "METAR",
    "expansion": "Aviation Routine Weather Report",
    "definition": "The standard coded report of the surface weather actually observed at an airport.",
    "source": "FAA Aviation Weather Handbook, 24.4",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=289"
  },
  {
    "id": "becmg",
    "term": "BECMG",
    "expansion": "Becoming",
    "definition": "A gradual change expected sometime between the two stated times. NWS TAFs do not use it; some joint civil/military, military, and international TAFs do.",
    "source": "NWSI 10-813, Appendix E2",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=37"
  },
  {
    "id": "vv",
    "term": "VV",
    "expansion": "Vertical visibility",
    "definition": "How far up you can see into a surface-based obscuration such as fog, in hundreds of feet; it counts as the ceiling.",
    "source": "NWSI 10-813, Appendix B2.7.2",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=21"
  },
  {
    "id": "vc",
    "term": "VC",
    "expansion": "Vicinity",
    "definition": "In U.S. TAFs, the ring between 5 and 10 statute miles from the center of the runway complex; used only as VCFG, VCSH, or VCTS.",
    "source": "NWSI 10-813, Appendix B2.6.4",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=19"
  },
  {
    "id": "lamp",
    "term": "LAMP",
    "expansion": "Localized Aviation MOS Program",
    "definition": "NWS computer-generated statistical forecast guidance, updated hourly for over 2,000 locations, that refreshes MOS with the latest observations.",
    "source": "FAA Aviation Weather Handbook, 27.16",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=456"
  },
  {
    "id": "mos",
    "term": "MOS",
    "expansion": "Model Output Statistics",
    "definition": "A statistical technique that improves computer weather model forecasts by relating model output to observed weather; the NWS uses it to make point forecast guidance.",
    "source": "NOAA MDL, MOS overview",
    "url": "https://vlab.noaa.gov/web/mdl/mos"
  },
  {
    "id": "afd",
    "term": "AFD",
    "expansion": "Aviation Forecast Discussion",
    "definition": "A plain-language text product in which NWS forecasters describe the weather for an area and explain what the TAF code cannot hold, such as the reasoning behind the forecast.",
    "source": "FAA Aviation Weather Handbook, 27.19",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=466"
  },
  {
    "id": "nws",
    "term": "NWS",
    "expansion": "National Weather Service",
    "definition": "The U.S. government weather agency that issues weather data, forecasts, and warnings, including TAFs.",
    "source": "FAA Aviation Weather Handbook, 2.2.2",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=19"
  },
  {
    "id": "wfo",
    "term": "WFO",
    "expansion": "Weather Forecast Office",
    "definition": "One of 122 local NWS offices; WFOs write the TAFs for their area.",
    "source": "FAA Aviation Weather Handbook, 2.2.2.1.9",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=21"
  },
  {
    "id": "faa",
    "term": "FAA",
    "expansion": "Federal Aviation Administration",
    "definition": "The U.S. agency that sets the requirements for aviation weather reports and forecasts.",
    "source": "FAA Aviation Weather Handbook, 2.3",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=21"
  },
  {
    "id": "amdnotsked",
    "term": "AMD NOT SKED",
    "expansion": "Amendment not scheduled",
    "definition": "The TAF is valid, but the forecaster will not issue amendments, usually because observations are missing or incomplete.",
    "source": "NWSI 10-813, Appendix D4.1",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=34"
  },
  {
    "id": "sm",
    "term": "SM",
    "expansion": "Statute miles",
    "definition": "Visibility unit in U.S. TAFs.",
    "source": "NWSI 10-813, Appendix A",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=10"
  },
  {
    "id": "shra",
    "term": "SHRA",
    "expansion": "Rain showers",
    "definition": "Showery rain, coded as the SH (shower) descriptor plus RA (rain); -SHRA is light and +SHRA is heavy.",
    "source": "FAA Aviation Weather Handbook, 24.4.3.8 (Table 24-3)",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=296"
  },
  {
    "id": "hz",
    "term": "HZ",
    "expansion": "Haze",
    "definition": "Extremely small particles, invisible to the naked eye, suspended in the air in numbers large enough to give it an opalescent look and reduce visibility.",
    "source": "FAA Aviation Weather Handbook, 18.1.3",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=229"
  },
  {
    "id": "ifr",
    "term": "IFR",
    "expansion": "Instrument flight rules: flight category",
    "definition": "Ceiling 500 to less than 1,000 feet and/or visibility 1 to less than 3 miles.",
    "source": "AIM, 7-1-7",
    "url": "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_1.html#7-1-7"
  },
  {
    "id": "prob40",
    "term": "PROB40",
    "expansion": "40 percent probability group",
    "definition": "A 40% chance group that NWS TAFs do not use, but U.S. military and international TAFs may.",
    "source": "FAA Aviation Weather Handbook, 27.4.2.10.3",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=418"
  },
  {
    "id": "cavok",
    "term": "CAVOK",
    "expansion": "Ceiling and visibility OK",
    "definition": "An international shorthand for good visibility, no low clouds, and no significant weather. NWS U.S. domestic TAFs do not use it.",
    "source": "FAA Aviation Weather Handbook, 27.4.2.6",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=411"
  },
  {
    "id": "vrb",
    "term": "VRB",
    "expansion": "Variable wind direction",
    "definition": "Used when no single wind direction can be forecast, typically very light winds (1 to 6 knots) or near thunderstorms.",
    "source": "NWSI 10-813, Appendix A and B2.4.3",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=10"
  },
  {
    "id": "ws",
    "term": "WS",
    "expansion": "Non-convective low-level wind shear group",
    "definition": "Low-level wind shear (not from thunderstorms) from the surface up to the stated height, with the wind at the top of that layer, for example WS020/27055KT.",
    "source": "NWSI 10-813, Appendix B2.8",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=23"
  },
  {
    "id": "nsw",
    "term": "NSW",
    "expansion": "No significant weather",
    "definition": "Used in a TEMPO group to show that significant weather is expected to end.",
    "source": "NWSI 10-813, Appendix A and B2.6",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=9"
  },
  {
    "id": "skc",
    "term": "SKC",
    "expansion": "Sky clear",
    "definition": "No clouds forecast (0 oktas). TAFs use SKC; the METAR code CLR is not used in TAFs.",
    "source": "NWSI 10-813, Appendix B2.7.1",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=20"
  },
  {
    "id": "clr",
    "term": "CLR",
    "expansion": "Clear: METAR only",
    "definition": "A METAR code from automated stations meaning no clouds detected below 12,000 feet; it is not used in TAFs.",
    "source": "AIM, 7-1-28",
    "url": "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_1.html#7-1-28"
  },
  {
    "id": "few",
    "term": "FEW",
    "expansion": "Few",
    "definition": "Clouds covering more than 0 up to 2 eighths (oktas) of the sky.",
    "source": "NWSI 10-813, Appendix A",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=9"
  },
  {
    "id": "intensity",
    "term": "- / +",
    "expansion": "Light / heavy",
    "definition": "A minus sign means light and a plus sign means heavy; no sign means moderate. In TAFs the sign refers to the precipitation, not the thunderstorm.",
    "source": "NWSI 10-813, Appendix B2.6 and B2.6.2",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=17"
  },
  {
    "id": "nil",
    "term": "NIL TAF",
    "expansion": "",
    "definition": "A TAF that is not issued, used only as a last resort when observations have been missing for an extended period and a forecast cannot be built.",
    "source": "NWSI 10-813, Appendix D4.4",
    "url": "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf#page=36"
  },
  {
    "id": "awc",
    "term": "AWC",
    "expansion": "Aviation Weather Center",
    "definition": "The NWS center in Kansas City that issues national aviation forecasts such as AIRMETs, SIGMETs, and Convective SIGMETs.",
    "source": "FAA Aviation Weather Handbook, 2.2.2.1.2",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=20"
  },
  {
    "id": "asos",
    "term": "ASOS",
    "expansion": "Automated Surface Observing System",
    "definition": "The automated weather station network that is the nation’s primary source of surface observations.",
    "source": "FAA Aviation Weather Handbook, 24.3.1",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=286"
  },
  {
    "id": "awos",
    "term": "AWOS",
    "expansion": "Automated Weather Observing System",
    "definition": "An automated weather station similar to ASOS that generally reports fewer elements.",
    "source": "FAA Aviation Weather Handbook, 24.3.2",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=287"
  },
  {
    "id": "speci",
    "term": "SPECI",
    "expansion": "Aviation Selected Special Weather Report",
    "definition": "An unscheduled weather report issued between hourly METARs when conditions change significantly.",
    "source": "FAA Aviation Weather Handbook, 24.4.2",
    "url": "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf#page=290"
  },
  {
    "id": "nbm",
    "term": "NBM",
    "expansion": "National Blend of Models",
    "definition": "NWS forecast guidance built by blending many NWS and non-NWS computer models into one calibrated set of forecasts.",
    "source": "NOAA MDL, NBM overview",
    "url": "https://vlab.noaa.gov/web/mdl/nbm"
  },
  {
    "id": "vfr",
    "term": "VFR",
    "expansion": "Visual flight rules: flight category",
    "definition": "Ceiling greater than 3,000 feet and visibility greater than 5 miles.",
    "source": "AIM, 7-1-7",
    "url": "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_1.html#7-1-7"
  },
  {
    "id": "lifr",
    "term": "LIFR",
    "expansion": "Low IFR: flight category",
    "definition": "Ceiling below 500 feet and/or visibility below 1 mile.",
    "source": "AIM, 7-1-7",
    "url": "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_1.html#7-1-7"
  },
  {
    "id": "frat",
    "term": "FRAT",
    "expansion": "Flight Risk Assessment Tool",
    "definition": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
    "source": "FAA Risk Management Handbook, Chapter 3, Using a Flight Risk Assessment Tool (FRAT)",
    "url": "https://www.faa.gov/sites/faa.gov/files/2022-06/risk_management_handbook_2A.pdf#page=28"
  }
]
