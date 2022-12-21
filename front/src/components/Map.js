import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import React from 'react'
  
export   function MyMapComponent() {
    return (
        <MapContainer
        style={{ width: "100%", height: "100vh" }}
        zoom={13}
        center={locate({setView: true, maxZoom: 16})}
        scrollWheelZoom={true}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[32.08039, 34.827516 ]}>
          <Popup>
            my house. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <Marker position={[32.0803902, 34.8275162 ]}>
          <Popup>
            my house. <br /> with nominatim
          </Popup>
        </Marker>
       
        <Marker position={[32.0889388, 34.8264839 ]}>
          <Popup>
            שפינגרן <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    )
}


