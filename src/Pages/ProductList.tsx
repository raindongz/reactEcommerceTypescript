import React, { useEffect } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import img from "../imgs/example.jpg";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Product } from "../Type";
import { Link } from "react-router-dom";
import PrimarySearchAppBar from "./HomePageComponents/PrimarySearchAppBar";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

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
      width: 1200,
      height: 650,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

function ProductList() {
  const classes = useStyles();
  let { id }: any = useParams();

  const selectProducts = (state: any) => {
    return state.productReducer.filter(
      (obj: Product) => obj.category === id.toString()
    );
  };
  const products:Product[] = useSelector(selectProducts);
  return (
    <div className={classes.root}>
      <Container>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PrimarySearchAppBar />
            </Grid>
            <h1>Category: {id}</h1>
            <GridList cellHeight={180} className={classes.gridList}>
              {products.map((product: Product) => (
                <GridListTile key={product.id}>
                  <img
                    //src={img /*`data:image/jpg;base64,${imgBase64}` tile.pictureURL*/}
                      src={product.pictureURL}
                    alt={product.productName}
                  />
                  <Link to={`/productDetail/${product.id}`}>
                    <GridListTileBar
                      title={product.productName}
                      actionIcon={
                        <IconButton
                          aria-label={`info about ${product.productName}`}
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
          </Grid>
        </form>
      </Container>
    </div>
  );
}
export default ProductList;
