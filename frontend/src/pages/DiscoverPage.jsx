import DiscoveryPanel from '../components/DiscoveryPanel';
import ItineraryPanel from '../components/ItineraryPanel';

export default function DiscoverPage() {
  return (
   
    <div className="pt-8 min-h-screen">
      <DiscoveryPanel />
      <ItineraryPanel />
    </div>
  );
}