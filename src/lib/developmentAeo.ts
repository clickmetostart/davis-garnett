import type { Development } from "@/data/developments";

export interface DevelopmentFaq {
  question: string;
  answer: string;
}

export interface DevelopmentAeo {
  quickAnswer: string;
  isCommercialFocused: boolean;
  faqs: DevelopmentFaq[];
}

/**
 * Generates plain-English AEO summaries and FAQ items grounded strictly in each
 * development's verified pricing, delivery, HOA/CDD, and property-type fields.
 */
export function buildDevelopmentAeo(dev: Development): DevelopmentAeo {
  const propertyTypesText = dev.propertyTypes.slice(0, 3).join(", ");
  const isPureCommercial =
    dev.isMixedUseCommercialResidential ||
    /commercial|industrial|retail|office|warehouse|logistics|medical|bpo|land|acreage/i.test(
      `${dev.name} ${dev.corridor} ${propertyTypesText}`
    ) && !/condo|single-family|townhome|villa|55\+/i.test(propertyTypesText);

  const quickAnswer = isPureCommercial
    ? `${dev.name} in ${dev.location} focuses on ${propertyTypesText.toLowerCase()} opportunities priced around ${dev.priceRange} (${dev.status}). ${dev.hoaCddInfo.financialNote}`
    : `${dev.name} offers ${propertyTypesText.toLowerCase()} in ${dev.corridorLabel} starting around ${dev.priceRange} with ${dev.delivery} availability. Estimated HOA is ${dev.hoaCddInfo.hoaEstimate} and CDD is ${dev.hoaCddInfo.cddEstimate}.`;

  const faqs: DevelopmentFaq[] = [
    {
      question: isPureCommercial
        ? `What property types and price ranges are available in ${dev.name}?`
        : `What do homes or residences cost in ${dev.name}, and when are they available?`,
      answer: `${dev.name} (${dev.location}) features ${propertyTypesText} priced in the ${dev.priceRange} range. Current market status is ${dev.status} with ${dev.delivery} timing across ${dev.unitsOrAcreage}.`,
    },
    {
      question: isPureCommercial
        ? `What zoning, NNN, or ownership costs should buyers check in ${dev.name}?`
        : `Are there HOA, CDD, or special property tax costs in ${dev.name}?`,
      answer: `Association or master upkeep is estimated at ${dev.hoaCddInfo.hoaEstimate}, with CDD fees at ${dev.hoaCddInfo.cddEstimate} and an estimated tax millage around ${dev.hoaCddInfo.estimatedTaxMillage}. ${dev.hoaCddInfo.financialNote}`,
    },
    {
      question: `How do Mark Davis and Rachael Garnett represent buyers or investors in ${dev.name}?`,
      answer: dev.isMixedUseCommercialResidential
        ? `Mark Davis (FL Lic BK3209459) and Rachael Garnett (FL Lic SL3378601) represent both residential buyers and commercial owners or tenants in ${dev.name}. Reach Mark at 941-737-4127 or Rachael at 727-808-3344 before visiting sales offices or signing Letters of Intent.`
        : `Registering Mark Davis (FL Lic BK3209459) and Rachael Garnett (FL Lic SL3378601) before touring lets us negotiate pricing, lot premiums, and closing terms independently on your behalf. In most new-build and resale deals, the builder or seller covers brokerage compensation.`,
    },
  ];

  return { quickAnswer, isCommercialFocused: isPureCommercial, faqs };
}

