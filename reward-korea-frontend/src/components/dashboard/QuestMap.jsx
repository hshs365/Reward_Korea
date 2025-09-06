import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap as useMapContext } from '../../store/MapContext';

// Leaflet의 기본 아이콘이 깨지는 것을 방지하기 위한 설정
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// 지도 뷰를 동적으로 변경하기 위한 컴포넌트
const MapUpdater = () => {
  const map = useMap();
  const { selectedQuest } = useMapContext();

  useEffect(() => {
    if (selectedQuest && selectedQuest.position) {
      map.flyTo(selectedQuest.position, 15); // Animate map to the quest's position
    }
  }, [selectedQuest, map]);

  return null;
};

const QuestMap = ({ className }) => {
  const { selectedQuest } = useMapContext();

  return (
    <div className="relative h-full">
      <MapContainer center={[37.5665, 126.9780]} zoom={13} scrollWheelZoom={true} className={className} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater />
        {selectedQuest && selectedQuest.position && (
          <Marker position={selectedQuest.position}>
            <Popup>
              {selectedQuest.title}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default QuestMap;
