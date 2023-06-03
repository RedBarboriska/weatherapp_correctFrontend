import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import MapViewer from "./MapViewer";
//import Button from "../../components/Button";

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapWrapper = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.4);
`

const ToolsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 0;
`

const ModalBackground = styled.div`
  background: #525b72;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1
`

const MapModal = ({onClose, defaultLocation = null}) => {

    const [selectedPoint, setSelectedPoint] = useState(null);
    console.log('MapModal')
    const onCloseHandler = useCallback(() => {
        if(selectedPoint){
        onClose(selectedPoint);}
        else{
            onClose(defaultLocation)
        }
    }, [onClose, selectedPoint]);

    return (
        <ModalWrapper>
            <MapWrapper>
                <MapViewer onClick={setSelectedPoint} defaultLocation={defaultLocation}/>
                <ToolsWrapper>
                    <input type='submit' onClick={onCloseHandler} value="OK"/>
                </ToolsWrapper>
            </MapWrapper>
            <ModalBackground/>
        </ModalWrapper>
    );
};

export default MapModal;
