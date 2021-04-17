import React, {useState} from "react";
import img from "../imgs/example.jpg";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import {Category} from "../Enums/Category";
import ProductService from "../Service/ProductService";
import {ADD_PRODUCT} from "../redux/Actions/ProductActionTypes";
import CategoryDragDownMenu from "../Styles/MaterialUI/ForEmployeeProductDetailPage/CategoryDragDownMenu";

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

function AddNewProductPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history=useHistory();
    const categories = [Category.FOOD, Category.ELECTRONICS, Category.SNEAKERS, Category.DRINK];
    //elements in product
    const [myImg, setMyImg]=useState({
        file: '',
        imagePreviewUrl: '',
    });
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0.00);
    const [cost, setCost] = useState<number>(0.00);
    const [description, setDescription] = useState("");
    const [returnCategory, setReturnCategory]=useState<Category>(Category.FOOD);
    function handleSubmit() {
        const newProduct = {
            id: "",
            productName: name,
            quantity: quantity,
            retailPrice: price,
            cost: cost,
            description: description,
            pictureURL:myImg.imagePreviewUrl,
            category: returnCategory,
        };
        ProductService.AddNewProduct(newProduct).then((response) => {
            dispatch({ type: ADD_PRODUCT, UpdatedProduct: response.data });
            history.push(`/productDetail/${response.data.id}`);
        });

    }
    const myCallback=(returnCategory:Category)=>{
        setReturnCategory(returnCategory);
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
                                src={myImg.imagePreviewUrl}
                                alt={"id"}
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
                            <Grid><CategoryDragDownMenu
                                categories={categories}
                                callbackFromParent={myCallback}/></Grid>
                            <Grid>
                                {" "}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}
export default AddNewProductPage;
