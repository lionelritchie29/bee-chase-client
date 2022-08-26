import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

type Props = {
  targetLatitude: number;
  targetLongitude: number;
  sourceLatitude: number;
  sourceLongitude: number;
  radius: number;
  dragging?: boolean;
};

const Map = ({
  targetLatitude,
  targetLongitude,
  sourceLatitude,
  sourceLongitude,
  radius,
  dragging = true,
}: Props) => {
  return (
    <MapContainer
      dragging={dragging}
      style={{ height: '100%', width: '100%' }}
      center={[sourceLatitude, sourceLongitude]}
      zoom={18}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {targetLatitude && targetLongitude && radius && (
        <Circle radius={radius} center={[targetLatitude, targetLongitude]} />
      )}
      <Marker position={[sourceLatitude, sourceLongitude]}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
