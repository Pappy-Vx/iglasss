import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [
  {
    id: '1',
    name: 'Ray-Ban RX5154 Clubmaster',
    image: 'https://images2.ray-ban.com//cdn-record-files-pi/f86e1cf9-5724-4f2e-a333-a358001dffeb/e78786a1-8f2d-4e88-b565-ad34017cbfec/0RX5154__2012__STD__shad__fr.png?impolicy=RB_Product_clone&width=720&bgc=%23f2f2f2',
    price: 98.97,
    
  },
  {
    id: '2',
    name: 'Zeelool Square Prescription Glasses',
    image: 'https://s3.zeelool.com/admin/product/image/918b8f89b742c466c4b0ce16a3fe0b67.jpg?im=Resize%2Cwidth%3D800',
    price: 5.74,
  },
  {
    id: '3',
    name: 'Minguela Glasses',
    image: 'https://s3.zeelool.com/admin/product/image/bb10b15366f6917eda352a5e294dbcfa.jpg?im=Resize%2Cwidth%3D800',
    price: 50.00,
  
  },
  {
    id: '4',
    name: 'Ralph by Ralph Lauren RA7158U',
    image: 'https://assets.lenscrafters.com/is/image/LensCrafters/8056597905428__STD__shad__fr.png?impolicy=LC_grey',
    price: 48.35,
  
  },
  {
    id: '5',
    name: 'Ray-Ban RX6335',
    image: 'https://images2.ray-ban.com//cdn-record-files-pi/278e72ab-61af-471a-9e0f-a42a00a0cdf4/aa1d3830-0f39-46a0-8d83-ad9500f3bf06/0RX6335__2855__STD__shad__cfr.png?impolicy=RB_Product_clone&width=720&bgc=%23f2f2f2',
    price: 71.20,
    
  },
  {
    id: '6',
    name: 'Prada PR A01S 16K08Z',
    image: 'https://assets2.sunglasshut.com/cdn-record-files-pi/3ef1786b-f40a-4b13-ab89-b00b0107fc1b/a7940580-c980-4803-b40e-b00b01080873/0PR_A01S__16K08Z__P21__shad__cfr.png?impolicy=SGH_bgtransparent&width=1024',
    price: 162.97,
  
  },
  {
    id: '7',
    name: 'Gucci GG0061S Sunglasses',
    image: 'https://assets2.sunglasshut.com/cdn-record-files-pi/7784a70f-07fe-46e2-85a1-a6ff00221403/dac6057c-8f60-409c-aa99-a74a01183844/0GC000994__2300L1_000A.png?impolicy=SGH_bgtransparent&width=1024',
    price: 196.27,
   
  },
  {
    id: '8',
    name: 'Dolce & Gabbana DG5026',
    image: 'https://assets.lenscrafters.com/is/image/LensCrafters/8053672822182_shad_fr.png?impolicy=LC_grey',
    price: 105.89,

  },
  {
    id: '9',
    name: 'MAUI JIM PEAHI',
    image: 'https://images.mauijim.com/sunglasses/621/DGS621-16_front.jpg?imwidth=900',
    price: 131.71,
    
  },
  {
    id: '10',
    name: 'Oakley Radar EV Path',
    image: 'https://assets2.oakley.com/cdn-record-files-pi/359bc1e6-bc77-4e8f-9578-a71000709bfb/6fea9b88-b41d-446e-ad14-ad7901526884/0OO9208__920852__P21__shad__cfr.png?impolicy=OO_ratio&width=1000',
    price: 194.00,
    
  }
],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
