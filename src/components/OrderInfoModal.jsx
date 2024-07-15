//DOCCUMENTATION: States used: NONE
/*
REDUCERS USED: "state + dispatch" using tarp_order_reducer_function'.
The "state" reducer is for the data that the form will use.

FUNCTIONS USED:
fetch_local_storage = its purpose is to conditionally get localstorage data that is saved when we try to edit the form whether it will fetch "updateState" or "addState" based on the props passed.. Because this comp is used twice, when adding orders and updating orders, thats why this comp should know what it is currently doing (adding or updating orders). And adding uses addState while updating uses the other

decide_what_data = it returns 3 different data to populate the FORM fields. First, if the "props.order" contains value and if we are using the updating version of this comp, then we return that props.order value
Second, if the first one is false then we try to fetch to the local storage...
and Lastly, if there are no data on the localstorage, then we will use the dummy obj from order_obj variable as datas for the FORM.


handleSubmit =  first if this modal type is adding, then we call the props.save data something...otherwise, we call the props.update data something (i forgot the function names).
Then we update the reducer states. if modal is updating, we update the updating state. and so on.. The purpose of this is so that we can close this modal..(But i think i should only close this modal once it finishes updating or saving..probably add this feature later). 
Then we set the local storage to false.


Other functions are handle events or self explanatory, so i will not include it here.


Click events = some click events are self explanatory. But there are some notable one's.
We have the closing the modal btn...it will update reducer states associated to adding or updating versions of this modal
And We also have the Delete BTN, which also does what the Close Btn do, but it also callse the props.delete something (forgot the name) function, which deletes the order data from the Database
*/


import React, { useEffect, useReducer } from "react";
import {
  tarp_order_reducer_function,
  ACTIONS,
} from "../reducer/reducer_functions";

export default function OrderInfoModal(props) {
  let order_obj = {
    cust_name: "",
    contact_info: "",
    fb_acc: "",
    date_rec: "",
    due_date: "",
    size: { w: 0, h: 0},
    qty: 0,
    eyelet: false,
    payment: { stat: 0, dp_amnt: 0 },
    price: 0,
    order_stat: 0,
    description: "",
    layout: "",
  };

//GET LOCAL STORAGE DATA
function fetch_local_storage() {
  const local_data = localStorage.getItem(`${props.modal_type === 0 ? "updateState" : "addState"}`);
  const data = JSON.parse(local_data);  //PARSE converts JSON STRING TO OBJECTS OR PRIMIS
  return data;
}


function decide_what_data(){
 if(Object.values(props.order).length >= 1 && props.modal_type === 0 ){
    return props.order
  }else  if(fetch_local_storage()){
    return fetch_local_storage();
  }else{
    return order_obj
  }
}




//END Of GETTING LOCAL STORAGE DATA

//STATE DECLARAION..CONDITIONAL SETTING TOO, IF THERE IS DATA IN LOCAL STORAgE
  let [state, dispatch] = useReducer(tarp_order_reducer_function, decide_what_data());

  //SUBMIT HANDLER
  function handleSubmitBtn(a){
    a.preventDefault();
    if(!state.cust_name || state.cust_name === "" || state.cust_name === null){
        alert("CUSTOMER NAME IS REQUIRED!");
    }else{
        if(props.modal_type === 1){
          props.save_tarp_order(state);
        }else if(props.modal_type === 0){
          props.update_order(props.order.id, state);
        }
        props.dispatch({
          //CONDITIONALLY CLOSE WHICH MODAL IS ACTIVE, BECAUSE THERE IS UPDATE ORDER MODAL, AND ADD ORDER MODAL
          type: props.modal_type === 1 ? ACTIONS.ADD_MODAL : ACTIONS.MODAL_SHOW,
          payload: { value: false },
        });
        // if (props.modal_type === 1) {
        //   props.dispatch({
        //     type: ACTIONS.SHOW_FILTER,
        //     payload: { value: false},
        //   });
        // }

        localStorage.setItem(`${props.modal_type === 0 ? "updateState" : "addState"}`, false);
    }
}

  //END OF SUBMIT HANDLER


  //SAVING TO LOCAL STORAGE
  function save_to_local_storage(){
    localStorage.setItem(`${props.modal_type === 0 ? "updateState" : "addState"}`, JSON.stringify(state));
  }
  //END OF SAVING TO LOCAL STORAGE



  //EVERY RENDER
  useEffect(() => {
     save_to_local_storage();
  },[state]);


// END OF EVERY RENDER

  // ON CHANGE HANDLERS
  function cust_name_change(e) {
    dispatch({ type: ACTIONS.cust_name, payload: { value: e } });
  }
  function contact_info_change(e) {
    dispatch({ type: ACTIONS.contact_info, payload: { value: e } });
  }
  function fb_acc_change(e) {
    dispatch({ type: ACTIONS.fb_acc, payload: { value: e } });
  }
  function date_rec_change(e) {
    dispatch({ type: ACTIONS.date_rec, payload: { value: e } });
  }
  function due_date_change(e) {
    dispatch({ type: ACTIONS.due_date, payload: { value: e } });
  }
  function width_change(e) {
    dispatch({ type: ACTIONS.width, payload: { value: e } });
  }
  function height_change(e){
    dispatch({ type: ACTIONS.height, payload: { value: e } });
  }
  function qty_change(e) {
    dispatch({ type: ACTIONS.qty, payload: { value: e } });
  }
  function eyelet_change(e) {
    dispatch({ type: ACTIONS.eyelet, payload: { value: e } });
  }
  function payment_stat_change(e) {
    dispatch({ type: ACTIONS.payment, payload: { value: e } });
   }
   
  function dp_change(e){
    dispatch({ type: ACTIONS.dp_amnt, payload: { value: e } });
  }
  function price_change(e) {
    dispatch({ type: ACTIONS.price, payload: { value: e } });
  }
  function order_stat_change(e) {
    dispatch({ type: ACTIONS.order_stat, payload: { value: e } });
  }
  function description_change(e) {
    dispatch({ type: ACTIONS.description, payload: { value: e } });
  }
  function layout_change(e) {
    dispatch({ type: ACTIONS.layout, payload: { value: e } });
  }

  //END OF ON CHANGE HANDLERS

  return (
    <div className=" tw-flex  tw-fixed tw-z-[51] tw-top-0 tw-fdlex tw-items-center tw-justify-center tw-left-0 tw-right-0 tw-h-[100vh] tw-bg-opacity-80 tw-bg-black">
      <div
        className=" tw-font-semibold tw-text-gray-500 md:tw-px-[50px]
       tw-bg-slate-100 tw-relative tw-w-[90%] tw-h-[80%] tw-overflow-y-scroll tw-py-8"
      >
        <h1 className=" tw-bg-blue-100 tw-p-4 tw-rounded-xl tw-text-center tw-mx-5">{props.modal_type === 1 ? "ADD ORDER" : "ORDER DETAILS"}</h1>

        {/* //CLOSE BUTTPON */}
        <div
          onClick={() => {
            props.dispatch({
              //CONDITIONALLY CLOSE WHICH MODAL IS ACTIVE, BECAUSE THERE IS UPDATE ORDER MODAL, AND ADD ORDER MODAL
              type: props.modal_type === 1 ? ACTIONS.ADD_MODAL : ACTIONS.MODAL_SHOW,
              payload: { value: false },
            });
            // if (props.modal_type === 0) {
            //   localStorage.setItem("updateState", false);
            // }
          }}
          className=" tw-fixed tw-bg-emerald-600 tw-cursor-pointer tw-p-2 tw-px-4 tw-rounded-3xl tw-top-[10px] tw-right-[10px]"
        >
          X
        </div>

        {/* FORM */}
        <form className=" tw-px-7 " onSubmit={(e) => {handleSubmitBtn(e)}}>
          <div className=" tw-mt-6 tw-text-gray-500 tw-grid tw-gap-3 tw-grid-cols-1 md:tw-grid-cols-2">
            <div className=" tw-flex tw-items-center tw-bg-sfuchsia-300">
              <span className=" tw-mr-2 tw-bg-fsuchsia-400">Name</span>
              <input
                onChange={(e) => {
                  cust_name_change(e.target.value);
                }}
                value={state.cust_name}
                className=" tw-border-b-4 tw-outline-none tw-bg-transparent tw-rounsded-3xl tw-p-2"
                type="text"
                placeholder="Customer"
              />
            </div>
            <div className=" tw-flex tw-items-center tw-sbg-slate-600">
              <span className=" tw-mr-2 tw-bg-fuchssia-400">Contact Info</span>
              <input
                onChange={(e) => {
                  contact_info_change(e.target.value);
                }}
                value={state.contact_info}
                className=" tw-border-b-4 tw-outline-none tw-bg-transparent tw-rousnded-3xl tw-p-2"
                type="text"
                placeholder="Contact Info"
              />
            </div>
            <div className=" tw-flex tw-items-center tw-bg-sfuchsia-300">
              <span className=" tw-mr-2 tw-bg-fuchsisa-400">FB Acc</span>
              <input
                onChange={(e) => {
                  fb_acc_change(e.target.value);
                }}
                value={state.fb_acc}
                className=" tw-border-b-4 tw-outline-none tw-bg-transparent tw-roundsed-3xl tw-p-2"
                type="text"
                placeholder="FB ACC"
              />
            </div>
            <div className=" tw-flex tw-items-center tw-bg-sfuchsia-300">
              <span className=" tw-mr-2 tw-bg-fucshsia-400">Received</span>
              <input
                onChange={(e) => {
                  date_rec_change(e.target.value);
                }}
                value={state.date_rec}
                className=" tw-border-b-4 tw-outline-none tw-bg-transparent tw-rounsded-3xl tw-p-2"
                type="date"
                placeholder="date rec"
              />
            </div>
            <div className=" tw-flex tw-items-center tw-bg-sfuchsia-300">
              <span className=" tw-mr-2 tw-bg-fucshsia-400">Due</span>
              <input
                onChange={(e) => {
                  due_date_change(e.target.value);
                }}
                value={state.due_date}
                className=" tw-border-b-4 tw-outline-none tw-bg-transparent tw-rousnded-3xl tw-p-2"
                type="date"
                placeholder="due date"
              />
            </div>
            <div className=" tw-flex tw-items-center tw-bg-sslate-600">
              <span className=" tw-mr-2 tw-bg-sfuchsia-400">Size (WxH)</span>
              <div className=" tw-flex">
                <input
                  onChange={(e) => {
                    width_change(e.target.value);
                  }}
                  value={state.size.w}
                  className=" tw-outline-none tw-border-b-4  tw-w-[100%] tw-bg-transparent tw-rousnded-3xl tw-p-2"
                  type="number"
                  placeholder="Width"
                />
                <input
                  onChange={(e) => {
                    height_change(e.target.value);
                  }}
                  value={state.size.h}
                  className=" tw-outline-none tw-border-b-4 tw-bg-transparent tw-w-[100%] tw-roundesd-3xl tw-p-2"
                  type="number"
                  placeholder="Height"
                />
              </div>
            </div>
            <div className=" tw-flex tw-items-center tw-sbg-slate-600">
              <span className=" tw-mr-2 tw-bg-fuchssia-400">Qty</span>
              <input
                onChange={(e) => {
                  qty_change(e.target.value);
                }}
                value={state.qty}
                className=" tw-outline-none tw-border-b-4 tw-bg-transparent tw-roundesd-3xl tw-p-2"
                type="number"
                placeholder="Qty"
              />
            </div>
            <div className=" tw-flex tw-items-center tw-sbg-slate-600">
              <span className=" tw-mr-2 tw-bg-fuschsia-400">Eyelet?: </span>
              <select
                onChange={(e) => {
                  eyelet_change(e.target.value);
                }}
                value={state.eyelet}
                className=" tw-w-[50%] tw-outline-none tw-p-3 tw-bg-transparent"
                name=""
                id=""
              >
                <option value="-1">N/A</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className=" tw-flex tw-items-center tw-sbg-slate-600">
              <span className=" tw-mr-2 tw-bg-fsuchsia-400">Payment Status</span>
              <div className=" tw-flex tw-flex-col">
                <select
                  onChange={(e) => {
                    payment_stat_change(e.target.value);
                  }}
                  value={state.payment.stat}
                  className=" tw-w-[100%] tw-border-b-4 tw-outline-none tw-p-3 tw-bg-transparent"
                  name=""
                  id=""
                >
                  <option value="0">No Payment</option>
                  <option value="1">Paid</option>
                  <option value="2">Downpayment</option>
                  <option value="3">Credit</option>
                </select>
                <input
                  onChange={(e) => {
                    dp_change(e.target.value);
                  }}
                  value={state.payment.dp_amnt}
                  className={`${Number(state.payment.stat) === 2 ? "tw-outline-none tw-border-b-4 tw-bg-transparent tw-rousnded-3xl tw-p-2" : "tw-hidden"}`}
                  type="number"
                  placeholder="DP amount"
                />
              </div>
            </div>
            <div className=" tw-flex tw-items-center tw-sbg-slate-600">
              <span className=" tw-mr-2 tw-bg-fuchssia-400">Price: </span>
              <input
                onChange={(e) => {
                  price_change(e.target.value);
                }}
                value={state.price}
                className=" tw-outline-none tw-bg-transparent tw-border-b-4 tw-roundsed-3xl tw-p-2"
                type="number"
                placeholder="Total Price"
              />
            </div>
          </div>
          <div className=" md:tw-justify-center tw-flex tw-items-center tw-sbg-slate-600">
            <span className=" tw-mr-2 tw-bg-fuchssia-400">Order Status</span>
            <select
              onChange={(e) => {
                order_stat_change(e.target.value);
              }}
              value={state.order_stat}
              className=" tw-w-[50%] tw-border-b-4 tw-outline-none tw-p-3 tw-bg-transparent"
              name=""
              id=""
            >
              <option value="0">Designing</option>
              <option value="1">For Approval</option>
              <option value="2">Printing</option>
              <option value="3">For Pickup</option>
              <option value="4">Completed</option>
            </select>
          </div>
          <div className=" tw-flex tw-items-center tw-justify-center tw-sbg-slate-600">
            {/* <span classsName=" tw-mr-2 tw-bg-fuchsia-400">icon: </span> */}
            <textarea
              onChange={(e) => {
                description_change(e.target.value);
              }}
              value={state.description}
              name=""
              id=""
              className=" tw-w-[100%] md:tw-w-[60%] tw-min-h-[100px] tw-max-h-[100px] md:tw-min-h-[200px] md:tw-max-h-[200px] tw-outline-none tw-mt-4"
              placeholder=" Description of the order"
            ></textarea>
          </div>
          <div className=" tw-flex tw-items-center tw-justify-center tw-flex-col tw-sbg-slate-600">
            <span classsName=" tw-mr-2 tw-bg-fuchsia-400">LAYOUT LINK:</span>
            <input
              onChange={(e) => {
                layout_change(e.target.value);
              }}
              value={state.layout}
              className=" tw-outline-none tw-bg-transparent tw-border-b-4 tw-roundsed-3xl tw-p-2"
              type="text"
              name=""
              id=""
              placeholder="google drive link"
            />
        
          </div>

          <div className=" tw-flex tw-justify-center tw-py-10">
            <button className=" tw-bg-blue-200 tw-w-[200px] tw-p-5 tw-rounded-3xl">
              SAVE
            </button>
            {
              props.modal_type === 0 ? <p className=" tw-bg-red-400 tw-text-white tw-p-4 tw-ml-2 tw-p-5 tw-rounded-3xl" onClick={() => {props.delete_order(props.order.id); props.dispatch({
                //CONDITIONALLY CLOSE WHICH MODAL IS ACTIVE, BECAUSE THERE IS UPDATE ORDER MODAL, AND ADD ORDER MODAL
                type: props.modal_type === 1 ? ACTIONS.ADD_MODAL : ACTIONS.MODAL_SHOW,
                payload: { value: false },
              });}}>DELETE ORDER</p> : null
            }
          </div>
        </form>
        {/* END OF FORM */}
      </div>
    </div>
  );
}
