import GettingStartedClient from "@/components/GettingStartedClient";
import { COMMERCIAL_PILLAR_HUB } from "@/data/pillarHubs";
import { COMMERCIAL_DISCOVERY_DECK } from "@/data/discoveryDecks";

export default function CommercialGetStartedPage() {
  return <GettingStartedClient hub={COMMERCIAL_PILLAR_HUB} deck={COMMERCIAL_DISCOVERY_DECK} />;
}

