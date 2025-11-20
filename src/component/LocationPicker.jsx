import { React, useState } from 'react';
import axios from 'axios';
import { MapContainer,TileLayer,Marker,useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from'leaflet/dist/images/marker-shadow.png';
import { Button,Input,List,Spin } from 'antd'
const{Search}=Input

let DefaultIcon=L.icon({
    iconUrl:icon,
   shadowUrl:iconShadow,
   iconSize:[25,41],
   iconAnchor:[12,41]
})

L.Marker.prototype.options.icon=DefaultIcon;

function LocationPicker({onLocationSelect}) {
    const[loading,setLoading]=useState(false)
    const[locations,setLocations]=useState([])
    const[selectedLocation,setSelectedLocation]=useState(null)
    const[mapCenter,setMapCenter]=useState([35,6892, 51.3890])

    const searchLocation=async(value)=>{
        setLoading(true);
        try{
            const response=await
             axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
             setLocations(response.data);
             if(response.data.length>0){
                //تغییر مختصات مرکزنقشه
                setMapCenter([parseFloat(response.data[0].lat),
                parseFloat(response.data[0].lon)])
             }
        }
        catch(error)
        {console.error('ERROR FETCHING LOCATION',error)}
        finally{setLoading(false)}
    }

    const handlerLocationSelect=(location)=>{
        setSelectedLocation(location)
        setMapCenter([parseFloat(location.lat),parseFloat(location.lon)])
        onLocationSelect({
            address:location.display_name,
            lat:location.lat,
            lon:location.lon
        });
    };

    function ChangeView({center}){
        const map=useMap();
        map.setView(center,map.getZoom())
        return null
    }

  return (
    <div>
        <Search
        placeholder='آدرس خودرا وارد کنید'
        onSearch={searchLocation}
        style={{width:'100%',marginBottom:16}}
        loading={loading}
        />
        {loading && <Spin/>}
        <MapContainer center={mapCenter} zoom={13} style={{width:'100%' , height:'400px'} }>
            <ChangeView center={mapCenter}/>
            {/* تصاویر نقشه =عکس پس زمینه */}
            <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {selectedLocation && (
             <Marker position={[parseFloat(selectedLocation.lat),parseFloat(selectedLocation.lon)]}/>
            )}
        </MapContainer> 
        <List
        itemLayout='horizontal'
        dataSource={locations}
        renderItem={(item)=>(
            <List.Item>
                <List.Item.Meta 
                title={item.display_name}
                description={`${item.lat},${item.lon}`} 
                />
                <Button  onClick={()=>handlerLocationSelect(item)}>انتخاب</Button>
            </List.Item>       
        )}
        />
    </div>
  )
}
export default LocationPicker