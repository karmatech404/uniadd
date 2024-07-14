import { ACTIONS } from "../reducer/reducer_functions";

const FilterComp = (props) => {
     return (
        <div className={` tw-z-[100] tw-min-h-[100vh] tw-max-h-[100vh] md:tw-min-w-[30%] tw-min-w-[60%] tw-absolute tw-top-0 tw-left-0 tw-bg-blue-100 ${props.show_filter ? "tw-flex tw-flex-col" : "tw-hidden"}`}>
            <div className=" tw-h-[100vh] tw-w-full tw-bgs-white tw-relative tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-[10px]">
                 <button onClick={() => {
                    props.dispatch({type:ACTIONS.SHOW_FILTER,payload:{value:!props.show_filter}})
                 }} className="tw-outline-none tw-absolute tw-top-3 tw-right-3">X</button>
                    <div className=""><h3>FILTER ORDERS</h3>
                        <div>
                        <select
                            onChange={(e) => {
                                props.dispatch({
                                type: ACTIONS.SHOW_FILTER,
                                payload: { value: !props.show_filter },
                                });
                                props.dispatch({
                                type: ACTIONS.FILTER_VAL,
                                payload: { value: e.target.value },
                                });
                                props.filter_by_status()
                            }}
                            value={props.filter_val}
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
                    </div>
            </div>

        </div>
     )
} 


export {FilterComp};