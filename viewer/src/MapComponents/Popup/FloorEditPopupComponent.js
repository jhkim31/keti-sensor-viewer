import React, {useState} from "react";
import styled from "styled-components";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../ButtonComponent/Btn";
import { config } from "../../config";

const PopupItem = styled.div`
    z-index: 999;
    background:${config.layout.popup.bg_color};
    position:relative;
    left:25%;
    top:20%;
    width:50%;
    height:30%;    
`

const PopupBackground = styled.div`
    z-index:998;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,${config.layout.popup.bg_alpha});
`

const WrapDiv = styled.div`
    display:inline-block;
`

const MapPreview = styled.div`    
    width:80%;
    height:80%;
    background: no-repeat center/80% url(${props => props.url_new == '' ? props.url_origin : props.url_new });  
`
const FloorEditPopupComponent = ({
    properties
}) => {
    const [is_show, set_is_show] = useState(false);
    const [ImageSrc, setImageSrc] = useState('');    

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImageSrc(reader.result);
            resolve();
          };
        });
      };

    const open = () => {
        set_is_show(true);
    };

    const close = () => {
        set_is_show(false);
    };

    const post_file = () => {
        const url = '/uploader';
        const formData = new FormData();
        formData.append(
            'file',
            upload_file,
            `${properties.main_state.selected_factory},${properties.main_state.current_floor}`
        );
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        sensor_data_api.post(url, formData, config)        
    }
    const [upload_file, set_upload_file] = useState({});
    return (
        <WrapDiv>
            <Btn
                onClick={() => {
                    open()
                }}                                   
                value={"Map Edit"}
            />
            {           
                is_show && 
                <PopupBackground>
                    <PopupItem>
                        <button
                            onClick={() => {
                                close()
                            }}
                            style={{
                                float:"right",
                            }}
                        >close</button>                        
                        <MapPreview
                            url_origin={properties.main_data.map_list[properties.main_state.current_floor - properties.main_state.min_floor]+`?time=${new Date().getTime()}`}
                            url_new={ImageSrc}
                        />                                            
                        <button
                            onClick={() => {
                                post_file()
                                close()
                                properties.set_main_state({
                                    ...properties.main_state,                    
                                    "update_time" : new Date().toString()                    
                                })
                            }}
                            style={{
                                float:"right",
                            }}
                        >save</button>   

                        <input 
                            type="file"
                            onChange={(e) => {
                                set_upload_file(e.target.files[0]);
                                encodeFileToBase64(e.target.files[0]);
                            }}
                            style={{
                                float:"right",
                            }}
                        />                              
                        
                    </PopupItem>     
                </PopupBackground>           
            }
        </WrapDiv>    
    )
};

export default FloorEditPopupComponent;
