//DOCUMENTATION:
//STATES USED:
  //  --> filterString = it contains the string representation of the filter orders (EX: "ALL ORDERS")
   // --> loading and saving states = loading has 3 possible values. true , false and -1..If true, loading component will be shown, false means it is hidden, and -1 means no internet
  //  Now, saving will also show a saving screen or not, based on a true or false value
  //  --> tarps_orders_db_data = it is an empty array at first but then will be popultated by tarp orders coming from the db 
  // --> db_data = it is a duplacate of the tarps_orders_db_data. But its only purpose is to serve as an editable tarps_orders_db_data version. bcoz there are times that i need to mutate the tarps_orders_db_data but at the same time, i can also get the past version of the tarps_orders_db_data if i want to. So i use db_data for this..if I need to mutate the tarps_orders_db_data, i mutate db_data instead, and use those mutated and new data. And if i want to go back to the past version of the data, i use the tarps_orders_db_data datas instead.
  // --> fetch = its purpose is to alert the useEffect so that it will fetch data to the db. useEffect listens to any changes on this state, wheater true or false.


//REDUCERS USED:
  // state = it is an object that uses the tarp_order_reducer_function as the reducer func and the dispatch func to call the reducer func for updating purposes
      // this state obj has:
        // modal_order = is an obj. When we display the orders, if we clicked on them, we will se a modal about the order's info. Now, how did the modal know what order's info it will display?  that is the purpose of the modal_order state. After clicking an order, modal_order state will be updated and will now contain the specific order (as an obj ofcoarse), so that we will know what order to show info.   
        // modal_show = it is a true or false state. Its purpose is to display the modal about the order or not display it if set to false. 
        // add_modal = same purpose as modal_show but for the modal of adding orders  
        // show_filter = is a true or false, that show the FilterComp if set to true and hide it if false  ...FilterComp is a comp that will show a dropdown that we can choose what type of order we wanna display  
        // filter_val = purpose of this is to know what filter or type of order we wanna display. it accepts interger from -1 to 4 
        // search_val = purpose is to store the value of the search input field          

//FUNCTIONS USED, NOT EVENT HANDLERS:
  // fetch_tarps_data = purpose of this is when invoked, it will do a get request to the db to fetch datas.   it will also update a lot of STATES.. just read the inner code to understand
        


import React, { useState } from "react";
import { useReducer } from "react";
import { sample_order_array } from "../localData";
import OrderInfoModal from "../components/OrderInfoModal";
import { FilterComp } from "../components/FilterComp";

import {
  tarp_order_reducer_function,
  tarp_orders_db_data_reducer_func,
} from "../reducer/reducer_functions";
import { ACTIONS } from "../reducer/reducer_functions";
import {
  addDoc,
  db,
  deleteDoc,
  doc,
  getDocs,
  tarp_orders_ref,
  updateDoc,
} from "../../server/firebase-config";
import { useEffect } from "react";
import Footer from "../components/Footer";

import SyncLoader from "react-spinners/SyncLoader";
import GridLoader from "react-spinners/GridLoader";
export default function TarpOrders() {
  // const tarp_db_data_obj = {
  //   cust_name:"",
  //   contact_info: "",
  //   fb_acc:"",
  //   date_rec:"",
  //   due_date:"",
  //   size:{width:0,height:0},
  //   qty:0,
  //   eyelet:0,
  //   payment_stat:0,
  //   dp_amnt:0,
  //   total_price:0,
  //   status:0,
  //   desc:"",
  //   layout:""

  // }

  const [filterString, setFilterString] = useState("All Orders");
  const [tarps_orders_db_data, setTarps_orders_db_data] = useState([]);
  const [db_data, setDb_data] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [state, dispatch] = useReducer(tarp_order_reducer_function, {
    modal_order: {},
    modal_show: false,
    add_modal: false,
    show_filter: false,
    filter_val: -1,
    search_value: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  //CRUD METHODSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  useEffect(() => {
    fetch_tarps_data();
  }, [fetch, state.filter_val]);

  useEffect(() => {
    searchFormLogic();
  }, [state.search_value]);

  //GET REQUESTSSSSSS____________________________________________________
  function fetch_tarps_data() {
    setLoading(true);
    getDocs(tarp_orders_ref)
      .then((res) => {
        if (res.empty || res.metadata.fromCache) { //CHECKS IF IT HAS INTERNET
          setLoading(-1);
          // setTarps_orders_db_data();  
        } else {
          let data = [];
          res.docs.forEach((e, i) => {
            if (state.filter_val === "-1" || state.filter_val === -1) {
              data.push({ ...e.data(), id: e.id });
            } else if (String(e.data().order_stat) === state.filter_val) {
              data.push({ ...e.data(), id: e.id });
            }
          });
          setTarps_orders_db_data(data);
          setDb_data(data);
          console.log("TARPS ORDER DATA ", tarps_orders_db_data);

          setLoading(false);
          setTimeout(() => {
            setLoading(0);
          }, [3000]);
        }
      })
      .catch((err) => {
        console.log(err);
        // setLoading("ERROR OCCURED");
      });
  }
  //GET REQUESTSSSSSS____________________________________________________

  //POST REQUESTSSSS__________________________________________________________
  const save_tarp_order = (d) => {
    setSaving(true);
    addDoc(tarp_orders_ref, d)
      .then((res) => {
        if (res.empty || res.metadata.fromCache) {
          // alert("No Internet");
          // console.log("NO INTERNET BITCH");
          setSaving(-1);
        } else {
          setSaving(false);
          alert("ORDER SAVED!");
          setFetch((ps) => {
            return !ps;
          });
        }
      })
      .catch((err) => {
        alert("ERROR SAVING");
      });
  };
  //END OF POST REQUESTS_________________________________________________________

  //DELETE REQUESTS_________________________________________________
  function delete_order(id) {
    const delete_ref = doc(db, "tarp_orders", id);
    deleteDoc(delete_ref)
      .then(() => {
        alert("ORDER DELETED");
        setFetch((ps) => {
          return !ps;
        });
      })
      .catch(() => {
        alert("ERROR OCCURED");
      });
  }

  //END OF DELETE REQUESTS_________________________________________________

  //UPDATE REQUESWTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
  function update_order(id, data) {
    const update_ref = doc(db, "tarp_orders", id);
    setSaving(true);
    updateDoc(update_ref, data)
      .then((res) => {
        if (res?.empty || res?.metadata?.fromCache) {
          alert("No Internet");
        } else {
          setSaving(false);
          alert("CHANGES SAVED");
          setFetch((ps) => {
            return !ps;
          });
        }
      })
      .catch("ERROR SAVING  CHANGES");
  }
  // END OF UPDATE REQUESTSSS___________________________________________________

  //END CRUD METHODSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

  //SERACH__________________________________________\
  function search_logic() {}

  // END OF SEARCH_______________________________________

  //CLICK EVENTS FUNCTIONS
  let searchFormLogic = () => {
    let dummy_data = [];
    console.log(state.search_value);
    for (let i = 0; i < db_data.length; i++) {
      if (state.search_value?.length === 0) {
        dummy_data.push(db_data[i]);
      } else if (
        db_data[i]?.cust_name
          ?.toLowerCase()
          .includes(state.search_value.toLowerCase()) ||
        db_data[i]?.description
          ?.toLowerCase()
          .includes(state.search_value.toLowerCase())
      ) {
        dummy_data.push(db_data[i]);
      }
    }
    setTarps_orders_db_data(dummy_data);
  };

  function showState() {
    console.log("LOADING STATE: ", loading);
    console.log("LOADING STATE2: ", tarps_orders_db_data);
  }

  //END OF CLICK EVENTS FUNCTIONS

  //FILTER ORDERS METHODS______________________________

  function filter_by_status() {
    let dummy_data = [];
    let dummy_data2 = [...tarps_orders_db_data];
    for (let i = 0; i < dummy_data2.length; i++) {
      if (String(dummy_data2[i].order_stat) === state.filter_val) {
        dummy_data.push(dummy_data2[i]);
        console.log(true);
      }
      console.log(typeof state.filter_val);
    }
    setTarps_orders_db_data(dummy_data);
  }

  useEffect(() => {
    if (state.filter_val === "-1" || state.filter_val === null) {
      setFilterString("All Orders");
    } else if (state.filter_val === "0") {
      setFilterString("Designing");
    } else if (state.filter_val === "1") {
      setFilterString("For Approvals");
    } else if (state.filter_val === "2") {
      setFilterString("Printing");
    } else if (state.filter_val === "3") {
      setFilterString("For Pickup");
    } else if (state.filter_val === "4") {
      setFilterString("Completed");
    }
  }, [state.filter_val]);

  //END OF FILTER ORDERS METHODS______________________________

  return (
    <div className=" tw-p-2  md:tw-pt-[70px] tw-pt-[70px]">
      <div className=" tw-bg-slatse-700 tw-grid tw-grid-cols-1 tw-min-h-[50px]">
        <div className=" tw-border-4 tw-border-blue-100 tw-h-[80%] tw-flex tw-w-[70%] tw-drop-shadow-lg tw-m-auto tw-bg-white tw-rounded-3xl">
          {/* SEARCH ICON  */}
          <div
            onClick={() => {
              searchFormLogic();
            }}
            className=" tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-bg-gsray-200 tw-w-[10%] tw-h-[100%]:"
          >
            O
          </div>
          {/* SEARCH INPUT */}
          <input
            type="text"
            onChange={(e) => {
              dispatch({
                type: ACTIONS.search_val,
                payload: { value: e.target.value },
              });
              searchFormLogic();
            }}
            value={state.search_value}
            placeholder="Search..."
            className=" tw-outline-none tw-bg-resd-100 tw-w-[85%] tw-h-[100%]"
            name=""
            id=""
          />
        </div>
      </div>
      <div className=" tw-w-full tw-flex tw-justify-center">
      <div className=" tw-bg-blsue-200 tw-p-3 tw-rounded-lg  tw-max-w-[200px]">
        Showing {filterString}
      </div>

      </div>
      {/* DEBUGGING PURPOSES */}
      {/* //FETCHING DATA LOADER */}
      <div
        className={
          loading && loading !== -1
            ? " tw-flex tw-bg-blue-500 tw-fixed tw-top-0 tw-h-[100vh] tw-justify-center tw-items-center tw-w-[100vw] tw-left-0 tw-z-[101]"
            : " tw-hidden"
        }
      >
        <SyncLoader />
      </div>

      {/* //SAVING DATA LOADER */}
      <div
        className={
          saving && saving !== -1
            ? "  tw-left-0 tw-flex tw-flex-col tw-bg-green-500 tw-fixed tw-top-0 tw-h-[100vh] tw-justify-center tw-items-center tw-w-[100vw] tw-z-[101]"
            : " tw-hidden"
        }
      >
        <p>SAVING CHANGES</p>
        <br />
        <GridLoader />
      </div>

      {/* <div className={loading === 0 ? " tw-hidden" : " tw-flex"}>
        <div className={!loading ? " tw-flex tw-bg-green-300" : " tw-hidden"}>
          Data LOADED
        </div>
      </div> */}
      <div className={loading === -1 || saving === -1 ? " tw-flex" : " tw-hidden"}>
        No INTERNET
      </div>

      {/*END OF DEBUGGING PURPOSES */}

      {/* ORDERS DIV!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <div className=" tw-mt-9 tw-bg-red-20s0 tw-text-[13px] tw-max-h-[55vh] tw-min-h-[55vh] tw-overflow-y-scroll tw-bg-slate-1s00 tw-font-thin tw-grid sm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-p-4 tw-gap-2 ">
        {/* LOOPING ALL ORDERS */}
        {tarps_orders_db_data.length > 0
          ? tarps_orders_db_data.map((e, i) => {
              let status = "";
              let color = "";
              if (Number(e.order_stat) === 0) {
                status = "Designing";
              } else if (Number(e.order_stat) === 1) {
                status = "For Approval";
              } else if (Number(e.order_stat) === 2) {
                status = "Printing";
              } else if (Number(e.order_stat) === 3) {
                status = "For Pickup";
              } else if (Number(e.order_stat) === 4) {
                status = "Completed";
                color = " tw-text-green-300";
              }

              return (
                <div
                  key={i}
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.MODAL_ORDER,
                      payload: { value: e },
                    });
                    dispatch({
                      type: ACTIONS.MODAL_SHOW,
                      payload: { value: true },
                    });
                  }}
                  className=" tw-cursor-pointer tw-grid md:tw-grid-cols-1 tw-grid-cols-2 hover:tw-scale-105 md:tw-gap-7 tw-h-[80px] md:tw-h-[150px] tw-bg-sslate-400 tw-rounded-2xl tw-p-2 tw-bg-white tw-drop-shadow-md"
                >
                  <div>
                    {/* CUST NAME */}
                    <h1>{e.cust_name}</h1>
                    {/* DESCRIPTION */}
                    <h2 className="   tw-rounded-2xl tw-bg-blue-50 tw-p-1 tw-flex md:tw-py-5 md:tw-justify-center">
                      {e.description}
                    </h2>
                  </div>
                  {/* STATUS */}
                  <div
                    className={`md:-tw-my-8 tw-flex tw-justify-center ${color}`}
                  >
                    {status}
                  </div>
                </div>
              );
            })
          : "No Data"}
      </div>
      {/* END OF ORDERS DIV */}

      {state.modal_show ? (
        <OrderInfoModal
          modal_type={0}
          dispatch={dispatch}
          order={state.modal_order}
          save_tarp_order={save_tarp_order}
          fetch={setFetch}
          delete_order={delete_order}
          update_order={update_order}
        />
      ) : null}

      {/* CRAZY DIV */}
      <Footer show_filter={state.show_filter} dispatch={dispatch} />
      <div className=" tw-z-[100] tw-cursor-pointer tw-fixed tw-left-0 tw-bottom-[40%] tw-rounsded-full tw-hidden tw-ansmate-pulse  tw-bg-green-200 tw-p-8s">
        <h1
          onClick={() => {
            dispatch({
              type: ACTIONS.SHOW_FILTER,
              payload: { value: state.show_filter ? false : true },
            });
          }}
          className="tw-text-[30px] tw-p-[20px] tw-bg-slaste-200 tw-text-gray-500 tw-text-s3xl"
        >
          {state.show_filter ? "<" : ">"}
        </h1>
        <div className=" tw-relative">
          {state.show_filter ? (
            <div>
              <div className=" tw-text-gray-500 tw-absolute tw-top-[-110px] tw-right-[-230px] tw-bg-blue-100 tw-p-3">
                Filter Orders
                <select
                  onChange={(e) => {
                    dispatch({
                      type: ACTIONS.SHOW_FILTER,
                      payload: { value: state.show_filter ? false : true },
                    });
                    dispatch({
                      type: ACTIONS.FILTER_VAL,
                      payload: { value: e.target.value },
                    });
                    filter_by_status();
                  }}
                  value={state.filter_val}
                  className="tw-text-gray-500 tw-ml-1 tw-sp-2 tw-outline-none tw-border-blue-400"
                  name=""
                  id=""
                >
                  <option value="-1">All Orders</option>
                  <option value="0">Designing</option>
                  <option value="1">For Approval</option>
                  <option value="2">Printing</option>
                  <option value="3">For Pickup</option>
                  <option value="4">Completed</option>
                </select>
              </div>
              <div
                onClick={() => {
                  dispatch({
                    type: ACTIONS.ADD_MODAL,
                    payload: { value: true },
                  });
                }}
                className=" tw-absolute tw-right-[-120px] tw-top-[-35px] tw-bg-blue-200 tw-p-3 tw-rounded-full"
              >
                ADD ORDER
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {state.add_modal ? (
        <OrderInfoModal
          modal_type={1}
          dispatch={dispatch}
          order={{}}
          save_tarp_order={save_tarp_order}
          fetch={setFetch}
        />
      ) : null}
      {/* END OF CRAZY DIV */}
      <div
        className={` ${
          state.show_filter
            ? "flex tw-fixed tw-z-[99] tw-top-0 tw-left-0 tw-right-0 tw-h-[100vh] tw-bg-black tw-bg-opacity-40"
            : "hidden"
        } `}
      ></div>
      <FilterComp
        filter_val={state.filter_val}
        filter_by_status={filter_by_status}
        show_filter={state.show_filter}
        dispatch={dispatch}
      />
    </div>
  );
  {
    /* END OF ORDERS DIV!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  }
}

// NOTES: 5.26.2024

// I USE A CUSTOM MODAL CALLED ORDERINFOMODAL:
// IT USES SIMPLE LOGIC:
// IT WILL ONLY BE SHOWN  IF THE state.modal_show is TRUE...
// The state.modal_show will be true if one of the orders is clicked..
// the useReducer handles all the state amangement of the states
