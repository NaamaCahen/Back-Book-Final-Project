import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip ,useMapEvents} from 'react-leaflet'
import { useEffect, useState } from 'react'
import React from 'react'
import { useSelector } from 'react-redux';
import Book from './Book';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import logo from '../logo/logo.png'

function MyComponent(props) {
  const map = useMap(L.Events)

  useEffect(() => {
    map.flyTo(props.position)
  }, [props.position])
  
}


export function MyMapComponent() {
  const user = useSelector(state => state.users.user);
  const books = useSelector(state => state.books.booksArr);

  // by default the location will be the users address
  const [position, setPosition] = useState([user.lat, user.long])
  console.log(position);
  const bookIcon = new L.icon({
    iconUrl:'https://w7.pngwing.com/pngs/469/374/png-transparent-ibooks-computer-icons-desktop-ios-7-book-miscellaneous-blue-angle.png',
    iconSize: [45, 35]
  })

  useEffect(() => {

    const success = (pos) => {
      const crd = pos.coords;
      setPosition([crd.latitude, crd.longitude])
    }

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  return (
    <>

      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        zoom={13}
        center={position}
        scrollWheelZoom={true}
        fadeAnimation={true}
        markerZoomAnimation={true}
        className='z-10'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {
            books.length > 0 ? books.map(item => {
              return (
                <>
                  <Marker position={[item.lat, item.long]} icon={bookIcon}>
                    <Popup>
                      <Book book={item} />
                    </Popup>
                    <Tooltip>{item.title}</Tooltip>
                  </Marker>
                </>
              )
            }) : null

          }

        </MarkerClusterGroup>
        <MyComponent position={position}/>
      </MapContainer>
    </>
  )
}


