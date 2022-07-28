import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import "./Grid.css";

const Grid = ({
  images,
  rowHeight,
  margin = 0,
  width,
}) => {
  
  const imageDataToImgTag = useCallback(
    (image, totalIndex, rowIndex, row, imageWidth) => {
      const calculatedRowHeight = width / imageWidth;

      let imageStyle = {
        height: calculatedRowHeight + "px",
        width: calculatedRowHeight * image[1] - margin + "px",
        marginRight: rowIndex === row.length - 1 ? 0 : margin + "px"
      };
      return (
        <img
          className={`grid-img`}
          style={imageStyle}
          data-index={totalIndex}
          src={image[0].src}
          alt={image[0].alt}
          key={"img_" + image[0].id + "_" + image[1]}
        />
      );
    },
    [margin, width]
  );

  const rows = useMemo(() => {
    let allRows = [];
    let row = [];
    let widthSoFar = 0;

    const minAspectRatio = width / rowHeight;

    for (let i = 0; i < images.length; i++) {
      let image = images[i];


      let ratio = image.width / image.height;

      if (widthSoFar <= minAspectRatio && i !== images.length - 1) {
        ratio += margin / image.height;
        row.push([image, ratio]);
        widthSoFar += ratio;
      } else {
        if (i === images.length - 1) {
          row.push([image, ratio]);
          widthSoFar += ratio;
        }
        let imageElements = [];
        for (let j = 0; j < row.length; j++) {
          imageElements.push(
            imageDataToImgTag(row[j], i - row.length + j, j, row, widthSoFar)
          );
        }
        
        allRows.push(imageElements);
        row = [[image, ratio]];
        widthSoFar = ratio;
      }
    }

    const divStyle = {
      display: "flex",
      marginBottom: margin + "px"
    };
    return allRows.map((row, index) => (
      <div className="grid-row" style={divStyle} key={"row_" + index}>
        {row}
      </div>
    ));
  }, [width, imageDataToImgTag, images, margin, rowHeight]);

  return (
    <>
      <div className="grid-container">{rows}</div>
    </>
  );
};

Grid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  rowHeight: PropTypes.number.isRequired,
  margin: PropTypes.number,
  isLightboxEnabled: PropTypes.bool
};

export default Grid;
