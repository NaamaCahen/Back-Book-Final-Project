import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import React from 'react'
  
function MyComponent(props) {
    const map = useMap()
  
    useEffect(()=>{
        map.flyTo(props.position)
    },[props.position])
  }


export   function MyMapComponent() {
    //dont forget! by default the location will be the users address
    const [position,setPosition]=useState([31.79592425,35.21198075969497])

      useEffect(()=>{
            const success=(pos) =>{
        
        const crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        setPosition([crd.latitude,crd.longitude])
        
      }
      
      const  error=(err)=> {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error);
      <MyComponent position={position}/>
        },[])
    
    return (
        <MapContainer
        style={{ width: "100%", height: "100vh" }}
        zoom={13}
        center={[31.79592425,35.21198075969497]}
        scrollWheelZoom={true}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       
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
        <MyComponent position={position}/>
      </MapContainer>
    )
}


