import DiscoveryPanel from '../components/DiscoveryPanel';
import ItineraryPanel from '../components/ItineraryPanel';

export default function DiscoverPage() {
  return (
    <div style={{ paddingTop: '32px', minHeight: '100vh' }}>
      <DiscoveryPanel />
      <ItineraryPanel />
    </div>
  );
}