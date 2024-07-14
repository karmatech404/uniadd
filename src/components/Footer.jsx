import FooterBg from "../assets/bg/footer.png"
import addBtn from "../assets/bg/addBTN.png"
import { ACTIONS } from "../reducer/reducer_functions";

export default function Footer(props){
    return (
        <div style={{backgroundImage:`url(${FooterBg})`,backgroundSize:"100% 100%"}} className=" tw-left-0 tw-flex tw-p-[12px] tw-justify-center tw-bg-gresen-400 tw-min-h-[100px] tw-bg-no-repeat tw-bg-coantain tw-fixed tw-bottom-0 tw-w-full">
                <div className="tw-flex tw-justify-between tw-mt-[40px] tw-w-[70%]">
                    <button onClick={() => { props.dispatch({type:ACTIONS.SHOW_FILTER,payload:{value: props.show_filter ? false : true}})}}  className=" tw-min-w-[50px] tw-outline-none tw-min-h-[50px] tw-h-[50px]">Filter</button>

                    <button onClick={() => { props.dispatch({type:ACTIONS.ADD_MODAL,payload:{value:true}})}}  style={{backgroundImage:`url(${addBtn})`,backgroundSize:"100% 100%"}} className=" tw-outline-none tw-mt-[-40px] tw-min-w-[50px] tw-min-h-[50px] tw-h-[50px]"> </button>

                    <button onClick={() => { props.dispatch({type:ACTIONS.SHOW_FILTER,payload:{value: props.show_filter ? false : true}})}}className=" tw-min-w-[50px] tw-min-h-[50px] tw-outline-none tw-h-[50px]">Login</button>
                </div>
        </div>
    )
}