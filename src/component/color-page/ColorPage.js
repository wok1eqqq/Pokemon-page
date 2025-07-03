import "./ColorPage.css"
import React, { useEffect, useState } from "react"

import { NavLink } from "react-router-dom"





const colors = [
  "#74CB48",
  "#F57D31",
  "#6493EB",
  "#A7B723",
  "#F9CF30",
  "#70559B",
  "#AAA67F",
  "#FB5584",
  "#B7B9D0",
]
function ColorPage() {
    return (
        <div id="main-wrapper-color">
      {colors.map((color) => (
        <div className="main-colour-wrapper" style={{ backgroundColor: color , color: color}}>
          <div className="colour-name-wrapper">
            <div className="color-center">
              <h1>{color}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>

    )
}
export default ColorPage