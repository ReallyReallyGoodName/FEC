import React from 'react';
const Slider = ({ segments, value, title, maxWidth = 270 }) => {
  if (value === undefined) { return <div>Error Loading Slider</div> }
  else if (value < 1 || value > 5) return <div>Value out of Bounds</div>
  const spaceBetween = 5;
  const arrowPosition = Math.floor((value - 1) / 4 * (maxWidth - 2 * spaceBetween) + spaceBetween);
  const arrowStyle = { position: "relative", left: `${arrowPosition}px`, fontSize: 15, width: 0 };
  const downArrow = <p style={arrowStyle}>&#9660;</p>
  const spaces = segments.length - 1;
  const spaceLength = spaces * spaceBetween;
  const remainingWidth = maxWidth - spaceLength;
  const singleSegmentWidth = Math.floor(remainingWidth / segments.length);
  const tableStyle = { borderSpacing: spaceBetween, width: maxWidth };

  return (
    <div className="slider">
      <div className="slider-title">{title}</div>
      <div style={{ width: maxWidth }}>{downArrow}</div>
      <table style={tableStyle}>
        <tr>
          {
            segments.map((seg, i) => <td style={tableStyle} className="slider-segment" ></td>)

          }</tr><tr>{
            segments.map((seg, i) => <td cstyle={tableStyle} lassName="slider-label" >{seg}</td>)
          }
        </tr>
      </table>

    </div>
  )
};
export default Slider;