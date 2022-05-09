import React from 'react';
import { Skeleton } from '@chakra-ui/react';

import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import { ConnectInfo } from '../Connects/ConnectInfo';



function MapComponent({ position, google, connectsDocs, otherLocations, connectDocument }) {

    const [activeConnect, setActiveConnect] = React.useState(connectDocument)
    const [showInfoWindow, setShowInfoWindow] = React.useState(false)


    const handleOpenInfoWindow = (connect) => {
        if (connect) {
            setActiveConnect(connect)
            setShowInfoWindow(true)
        }
    }


    return (
        position && connectDocument ? <>
            <Map
                google={google}
                style={{ width: "100%", height: "100%" }}
                zoom={12}
                initialCenter={connectDocument.location}
            >
                <Marker onClick={() => handleOpenInfoWindow(connectDocument)} title={connectDocument.area} name={connectDocument.area} position={connectDocument.location} />

                {otherLocations.map(connect => (
                    <Marker key={connect.place_id}  onClick={() => handleOpenInfoWindow(connect)} title={location.area} name={location.area} position={connect.location} />
                ))}


                <InfoWindow style={{ borderRadius: 0 }} visible={showInfoWindow} position={activeConnect?.location} ><ConnectInfo connect={activeConnect} /></InfoWindow>


            </Map>
        </> :
            <><Skeleton w={'full'} h={'full'} /></>

    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDyHvOysOuKGS7Wk-ixjbfx_IILBa1ESQM',
    LoadingContainer: () => (
        <Skeleton width={'full'} height={'full'} />
    )
})(MapComponent)
