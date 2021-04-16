import React, {useState} from "react";
import img from "../imgs/example.jpg";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Product} from "../Type";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import {Category} from "../Enums/Category";
import ProductService from "../Service/ProductService";
import {UPDATE_PRODUCT} from "../redux/Actions/ProductActionTypes";
import CategoryDragDownMenu from "../Styles/MaterialUI/ForEmployeeOrderDetailPage/CategoryDragDownMenu";

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
    submit: {
      margin: theme.spacing(0.5, 0, 2),
      height: 50,
    },
  })
);

function ProductDetails() {
  const classes = useStyles();
  let { id }: any = useParams();

  const selectProductById = (state: any) => {
    return state.productReducer.find((product: Product) => product.id === id);
  };
  const history=useHistory();
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  //elements in product
  const [myImg, setMyImg]=useState({
    file: '',
    imagePreviewUrl: '',
  });

  //const [imgUrlByteArray, setImgUrlByteArray]=useState<Uint8Array>();
  const [name, setName] = useState(product.productName);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.retailPrice);
  const [cost, setCost] = useState(product.cost);
  const [description, setDescription] = useState(product.description);
  const categories = [Category.FOOD, Category.ELECTRONICS, Category.SNEAKERS, Category.DRINK];
  const [returnCategory,setReturnCategory]=useState<Category>(Category.FOOD);
//transfer from string to byte array
  function saveIMG(image:any) {
    const startIndex = image.indexOf("base64,") + 7;
    const b64 = image.substr(startIndex);
    const byteCharacters = atob(b64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  function handleSubmit() {
    //setImgUrlByteArray(saveIMG(myImg.imagePreviewUrl));
   // console.log(imgUrlByteArray);

    const newProduct = {
      id: product.id,
      productName: name,
      quantity: quantity,
      retailPrice: price,
      cost: cost,
      description: description,
      pictureURL:myImg.imagePreviewUrl,
      category: returnCategory,
    };
    console.log(newProduct.pictureURL)
    ProductService.UpdateProduct(newProduct).then((response) => {
      dispatch({ type: UPDATE_PRODUCT, UpdatedProduct: response.data });
    });

  }
  const myCallback=(returnCategory:Category)=>{
    setReturnCategory(returnCategory);
  }
function handleAddNew(){
  history.push("/addNewProduct");
}
function handleDelete(){
    ProductService.DeleteProduct(product.id).then((response)=>{
      history.push("/");
    })
}
function handleImgChange(e:any){
    e.preventDefault();
  let reader = new FileReader();
  let file = e.target.files[0];
  reader.onloadend = () => {
    // @ts-ignore
    setMyImg({ file: file, imagePreviewUrl: reader.result });
  }
  reader.readAsDataURL(file)
}
//URL.createObjectURL(e.target.files[0])
  return (
    <div className={classes.root}>
      <Container>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              ProductName:
              <TextField
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              Stock:
              <TextField
                type="number"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Grid>

            <Grid container item xs={12}>
              <img
               // src={"https://images-na.ssl-images-amazon.com/images/I/81sQxjJBn1L._AC_SX679_.jpg"}
                  className="img"
                  src={myImg.imagePreviewUrl ? myImg.imagePreviewUrl : product.pictureURL}
                alt={id}
              />
              img link:
              <input type="file" name="myImg" onChange={handleImgChange}/>

            </Grid>
            <Grid item>
              <Grid>
                Unit Price: $
                <TextField
                  type="number"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </Grid>
              <Grid>
                Cost
                <TextField
                  type="number"
                  variant="outlined"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                />
              </Grid>
              <Grid>product description :</Grid>
              <Grid>
                <TextField
                  className="description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid>
                <CategoryDragDownMenu categories={categories}
                                      callbackFromParent={myCallback}
                />
              </Grid>
              <Grid>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleAddNew}
                >
                  AddNewProduct
                </Button>
                  <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDelete}
                  >
                      DeleteThisProduct
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
export default ProductDetails;
