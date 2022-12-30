import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip } from 'react-leaflet'
import { useEffect, useState } from 'react'
import React from 'react'
import { useSelector } from 'react-redux';
import { HiOutlineBookOpen } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import Book from './Book';
import { Modal } from 'flowbite-react';
import L from 'leaflet';

function MyComponent(props) {
  const map = useMap()

  useEffect(() => {

    map.flyTo(props.position)
  }, [props.position])
}


export function MyMapComponent() {
  const user = useSelector(state => state.users.user);
  const books = useSelector(state => state.books.booksArr);
  const [openModal, setOpenModal] = useState(false);

  // by default the location will be the users address
  const [position, setPosition] = useState([user.lat, user.long])
  
  const bookIcon=new L.icon({
    iconUrl:`https://iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png`,
    iconSize:[35,45]
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
    <MyComponent position={position} />
  }, [])

  return (
    <>

      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        zoom={13}
        center={[31.79592425, 35.21198075969497]}
        scrollWheelZoom={true}
        fadeAnimation={true}
        markerZoomAnimation={true}
        className='z-10'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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

        {/* <Marker position={[32.0803902, 34.8275162]}>
        <Popup>
          my house. <br /> with nominatim
        </Popup>
      </Marker>

      <Marker position={[32.0889388, 34.8264839]}>
        <Popup>
          שפינגרן <br /> Easily customizable.
        </Popup>
      </Marker> */}
        {console.log(position)}
        <MyComponent position={position} />
      </MapContainer>


      {/* <React.Fragment >
        <Modal show={openModal} onClose={() => setOpenModal(false)}  >
          <Modal.Header />
          <Modal.Body>
            jhglkjglj
            // {/* <Book book={item}/> */}
          {/* </Modal.Body>
        </Modal>
      </React.Fragment> */} 
    </>
  )
}


