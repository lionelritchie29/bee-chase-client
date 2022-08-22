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
};

const Map = ({
  targetLatitude,
  targetLongitude,
  sourceLatitude,
  sourceLongitude,
  radius,
}: Props) => {
  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      center={[sourceLatitude, sourceLongitude]}
      zoom={18}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Circle radius={radius} center={[targetLatitude, targetLongitude]} />
      <Marker position={[sourceLatitude, sourceLongitude]}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
