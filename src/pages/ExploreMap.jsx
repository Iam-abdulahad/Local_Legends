import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "../styles/leaflet/MarkerCluster.css";
import "../styles/leaflet/MarkerCluster.Default.css";
import { useData } from "../context/DataContext";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ExploreMap = () => {
  const { allData, loading } = useData();
  const [storyLocations, setStoryLocations] = useState([]);
  const [loadingMarkers, setLoadingMarkers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const enrichLocations = async () => {
      const enriched = await Promise.all(
        allData.map(async (story) => {
          const locationStr = story.location;

          // CASE 1: "Lat: xx, Lng: yy"
          if (typeof locationStr === "string" && locationStr.includes("Lat:")) {
            const lat = parseFloat(
              locationStr.match(/Lat:\s*(-?\d+(\.\d+)?)/)?.[1]
            );
            const lng = parseFloat(
              locationStr.match(/Lng:\s*(-?\d+(\.\d+)?)/)?.[1]
            );
            if (!isNaN(lat) && !isNaN(lng)) {
              return {
                id: story.id,
                title: story.title,
                coords: { lat, lng },
              };
            }
          }

          // CASE 2: Named location
          try {
            const res = await axios.get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                locationStr
              )}`
            );
            const geo = res.data[0];
            if (geo) {
              return {
                id: story.id,
                title: story.title,
                coords: {
                  lat: parseFloat(geo.lat),
                  lng: parseFloat(geo.lon),
                },
              };
            }
          } catch (err) {
            console.error("Geocoding failed for:", locationStr, err);
          }

          return null;
        })
      );

      setStoryLocations(enriched.filter(Boolean));
      setLoadingMarkers(false);
    };

    if (!loading && allData.length) {
      enrichLocations();
    }
  }, [allData, loading]);

  return (
    <div className="relative h-screen w-full">
      {loading || loadingMarkers ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F2EFE7] z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#7D0A0A] border-opacity-75"></div>
        </div>
      ) : null}

      <MapContainer center={[23.685, 90.3563]} zoom={7} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {storyLocations.map((story) => (
            <Marker
              key={story.id}
              position={[story.coords.lat, story.coords.lng]}
              eventHandlers={{
                click: () => navigate(`/stories/${story.id}`),
              }}
            >
              <Tooltip>{story.title}</Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
