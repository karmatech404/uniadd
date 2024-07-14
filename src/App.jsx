import { useState } from "react"
import NavBar from "./components/NavBar";
import { RouterProvider,createBrowserRouter} from "react-router-dom";
import TarpOrders from "./pages/TarpOrders";
import Products from "./pages/Products";

export default function App() {
 let [state, setState] = useState({sidebar_is_open:false});
let router = createBrowserRouter([
  {
    path:"/tarp_orders",
    element:<TarpOrders />
  },
  {
    
      path:"/products",
      element:<Products />
    
  },
  {
    path:"/",
    element: <>THIS IS HOME</>
  }
]);

  return (
    <div className=" grid md:grid-cols-6 tw-min-h-[100vh] tw-bg-gresen-100">
        <NavBar />
        <RouterProvider router={router} />
    </div>
  )
}
