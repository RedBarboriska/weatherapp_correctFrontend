import React from "react";
import {Tooltip} from "antd";
import styled from "styled-components";
import WeatherInfoMain from "../WeatherInfoMain";
import './UV.css';
import sunglasses from "../../../img/sunglasses.png";
import suncream from "../../../img/suncream.png";
import sunhat from "../../../img/sunhat.png";
import sunshirt from "../../../img/sunshirt.png";
import sunshade from "../../../img/sunshade.png";
import sunburn from "../../../img/sunburn.png";

const UV = ({uv}) => {
    let backgroundColor;
    let toolTipText;
    let backgroundColorHint
    if (uv >= 0 && uv <= 2) {
        backgroundColor = "rgba(184, 255, 147, 0.3)";
        backgroundColorHint = "rgb(164,234,158)"
        toolTipText = (
            <div>
                UV-індекс 0-2
                <br/> Необхідний мінімальний захист від сонця (за винятком випадків біля води чи снігу).
                Носіть сонцезахисні окуляри, якщо сонячно.

            </div>
        );
    } else if (uv >= 3 && uv <= 5) {
        backgroundColor = "rgba(255, 248, 65, 0.3)";
        backgroundColorHint = "rgb(255, 233, 144)"
        toolTipText = (
            <div>
                UV-індекс 3-5
                <br/> Дотримуйтеся запобіжних заходів - використовуйте сонцезахисні крем, капелюх, окуляри,
                шукайте тінь у години пік з 11:00 до 16:00.

            </div>
        );
    } else if (uv >= 6 && uv <= 7) {
        backgroundColor = "rgba(255, 150, 28, 0.3)";
        backgroundColorHint = "rgb(255, 166, 77)"
        toolTipText = (
            <div>
                UV 6-7
                <br/>Носіть сонцезахисні одяг, крем та шукайте тінь.

            </div>
        );
    } else if (uv >= 8 && uv <= 10) {
        backgroundColor = "rgba(255, 0, 0, 0.3)";
        backgroundColorHint = "rgb(232,105,124)"
        toolTipText = (
            <div>
                UV 8-10
                <br/> Шукайте тінь - носіть сонцезахисні одяг, крем, окуляри.
                Білий пісок збільшує вплив UV-випромінювання.

            </div>
        );
    } else {
        backgroundColor = "rgba(208,0,255,0.3)";
        backgroundColorHint = "rgb(202,121,229)"
        toolTipText = (
            <div>
                UV 11+
                <br/> Вживайте повних заходів безпеки.
                Незахищена шкіра може обгоріти за лічені хвилини.
                Уникайте сонця з 11:00 до 16:00, використовуйте усі сонцезахисні засоби.
            </div>
        );
    }

    const CustomTooltip = ({ className, children, ...restProps }) => (
        <Tooltip overlayClassName={className} {...restProps}>
            {children}
        </Tooltip>
    );

    const StyledTooltip = styled(CustomTooltip)`

      .ant-tooltip-arrow::before {
        background-color: ${backgroundColorHint};
        // etc
      }

      .ant-tooltip-inner {
        background-color: ${backgroundColorHint};
      }
    `;


    return (
        <StyledTooltip title={
            <React.Fragment>
                <div style={{color: "black"}}>
                    {toolTipText}
                    <img src={suncream} style={{height: '30px'}} alt="suncream"/>
                    <img src={sunglasses} style={{height: '30px'}} alt="sunglasses"/>
                    {uv >= 3 && <img src={sunhat} style={{height: '30px'}} alt="sunhat"/>}
                    {uv >= 3 && <img src={sunshade} style={{height: '30px'}} alt="sunshade"/>}
                    {uv >= 6 && <img src={sunshirt} style={{height: '30px'}} alt="sunshirt"/>}
                    {uv > 10 && <img src={sunburn} style={{height: '30px'}} alt="sunburn"/>}
                </div>
            </React.Fragment>}>
            <div className="wigetAttr" style={{backgroundColor}}>
                UV: {uv}
            </div>

        </StyledTooltip>
    );
};

export default UV;
