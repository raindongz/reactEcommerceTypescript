import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
//import tileData from './tileData';
import img from "../../imgs/example.jpg";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../Service/ProductService";
import { RESTORE_ALL_PRODUCT } from "../redux/Actions/ProductActionTypes";
import { Link } from "react-router-dom";
//import imageToBase64 from 'image-to-base64'
import { Product } from "../Type";
import { Category } from "../Enums/Category";

const imageToBase64 = require("image-to-base64");
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1100,
      height: 650,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

export default function EmployeePage() {
  const selectProducts = (state: any) => {
    return state.productReducer.map((product: Product) => product);
  };
  const classes = useStyles();
  const productList = useSelector(selectProducts);
  const categories = [
    Category.FOOD,
    Category.ELECTRONICS,
    Category.SNEAKERS,
    Category.DRINK,
  ];

  const [imgBase64, setImgBase64] = useState("");
  const dispatch = useDispatch();
  // imageToBase64("../../imgs/example.jpg").then((response:string)=>{
  //    console.log(response);
  //  })
  useEffect(() => {
    ProductService.getAllProducts().then((response) => {
      if (response.data) {
        console.log(response.data);
        dispatch({ type: RESTORE_ALL_PRODUCT, productsList: response.data });
      }
    });
  }, []);
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          {" "}
        </GridListTile>
        {categories.map((category: Category) => (
          <GridListTile key={category.toString()}>
            <img
              //src={img /*`data:image/jpg;base64,${imgBase64}` tile.pictureURL*/}
              src={"https://source.unsplash.com/random"}
              alt={category.toString()}
            />
            <Link to={`/employeePage/employeeProductList/${category.toString()}`}>
              <GridListTileBar
                title={category.toString()}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${category}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
