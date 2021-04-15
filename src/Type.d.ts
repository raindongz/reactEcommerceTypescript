import {Category} from "./Enums/Category";
import {OrderStatus} from "./Enums/OrderStatus";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Set;
}
interface role {
  role: string;
}

interface Product {
  id: string;
  productName: string;
  quantity: number;
  retailPrice: number;
  cost: number;
  description: string;
  pictureURL: byte[];
  category: Category;
}
interface Order{
  id:string;
  customerId:string;
  shippingAddress:string;
  status:OrderStatus;
  orderItemsList:OrderItem[];
  historyProductList:Product[];
}
interface OrderItem{
  productId:string;
  productName:string;
  quantity:number;
  unitPrice:number;
}

type ProductActions={
    type:string;
    UpdatedProduct:Product;
    productsList:Product[];
}
type authAction = {
  type: string;
  userRole: string;
  token: string;
  tokenAndRole: role[];
};

type OrderActions={
  type:string;
  orders:Order[];
  updatedOrder:Order;
}
type AddressAction={
  type:string
  address:string[]
}