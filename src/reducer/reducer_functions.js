let order_obj = {
  cust_name: "",
  contact_info: "",
  fb_acc: "",
  date_rec: "",
  due_date: "",
  size: { w: 0, h: 0 },
  qty: 0,
  eyelet: false,
  payment: { stat: 0, dp_amnt: 0 },
  price: 0,
  order_stat: 0,
  description: "",
  layout: "",
};

let ACTIONS = {
  MODAL_SHOW: "MODAL_SHOW",
  MODAL_ORDER: "MODAL_ORDER",
  ADD_MODAL: "ADD_MODAL",
  SHOW_FILTER: "SHOW_FILTER",
  FILTER_VAL: "FILTER_VAL",
  cust_name: "cust_name",
  contact_info: "contact_info",
  fb_acc: "fb_acc",
  date_rec: "date_rec",
  due_date: "due_date",
  width: "width",
  height: "height",
  qty: "qty",
  eyelet: "eyelet",
  payment: "payment_stat",
  dp_amnt: "dp_amnt",
  price: "price",
  order_stat: "order_stat",
  description: "description",
  layout: "layout",
  search_val: "search_val",
};
const tarp_db_data_obj = {
  cust_name:"",
  contact_info: "",
  fb_acc:"",
  date_rec:"",
  due_date:"",
  size:{width:0,height:0},
  qty:0,
  eyelet:0,
  payment_stat:0,
  dp_amnt:0,
  total_price:0,
  status:0,
  desc:"",
  layout:""

}

let ACTIONS_TWO = {
    cust_name:"cust_name",
    contact_info:"contact_info",
    fb_acc: "fb_acc",
  date_rec: "date_rec",
  due_date: "due_date",
  width: "width",
  height: "height",
  qty: "qty",
  eyelet: "eyelet",
  payment: "payment_stat",
  dp_amnt: "dp_amnt",
  price: "price",
  order_stat: "order_stat",
  description: "description",
  layout: "layout",
}




const tarp_order_reducer_function = (state, action) => {
  switch (action.type) {
    case ACTIONS.search_val:
      return {
        ...state,
        search_value: action.payload.value,
      };
      break;
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        add_modal: action.payload.value,
      };
      break;
      case ACTIONS.FILTER_VAL:
        return {
          ...state,
          filter_val: action.payload.value,
        };
        break;
      case ACTIONS.SHOW_FILTER:
        return {
          ...state,
          show_filter: action.payload.value,
        };
        break;
    case ACTIONS.MODAL_SHOW:
      return {
        ...state,
        modal_show: action.payload.value,
      };
      break;
    case ACTIONS.MODAL_ORDER:
      return {
        ...state,
        modal_order: action.payload.value,
      };
      break;
    case ACTIONS.cust_name:
      return {
        ...state,
        cust_name: action.payload.value,
      };
      break;
    case ACTIONS.contact_info:
      return {
        ...state,
        contact_info: action.payload.value,
      };
      break;
    case ACTIONS.fb_acc:
      return {
        ...state,
        fb_acc: action.payload.value,
      };
      break;
    case ACTIONS.date_rec:
      return {
        ...state,
        date_rec: action.payload.value,
      };
      break;
      case ACTIONS.due_date:
        return {
          ...state,
          due_date: action.payload.value,
        };
        break;
    case ACTIONS.width:
      return {
        ...state,
        size: {
            ...state.size,
            w:action.payload.value,
        },
      };
      break;
      case ACTIONS.height:
        return {
          ...state,
          size: {
              ...state.size,
              h:action.payload.value,
          },
        };
        break;
    case ACTIONS.qty:
      return {
        ...state,
        qty: action.payload.value,
      };
      break;
    case ACTIONS.eyelet:
      return {
        ...state,
        eyelet: action.payload.value,
      };
      break;
    case ACTIONS.payment:
      return {
        ...state,
        payment: {
            ...state.payment,
            stat: action.payload.value
        },
      };
      break;
    case ACTIONS.dp_amnt:
      return {
        ...state,
        payment: {
            ...state.payment,
            dp_amnt: action.payload.value
        }
      };
      break;
     
      case ACTIONS.price:
      return {
        ...state,
        price: action.payload.value
      }
      break;
      case ACTIONS.order_stat:
        return {
          ...state,
          order_stat: action.payload.value,
        };
        break;
        case ACTIONS.description:
      return {
        ...state,
        description: action.payload.value,
      };
      break;
      case ACTIONS.layout:
      return {
        ...state,
        layout: action.payload.value,
      };
      break;
  }
};


const tarp_orders_db_data_reducer_func = (state, action) => {
    switch (action.type) {
      case ACTIONS.cust_name:
        return {
          ...state,
          cust_name: action.payload.value,
        };
        break;
      case ACTIONS.contact_info:
        return {
          ...state,
          contact_info: action.payload.value,
        };
        break;
      case ACTIONS.fb_acc:
        return {
          ...state,
          fb_acc: action.payload.value,
        };
        break;
      case ACTIONS.date_rec:
        return {
          ...state,
          date_rec: action.payload.value,
        };
        break;
        case ACTIONS.due_date:
          return {
            ...state,
            due_date: action.payload.value,
          };
          break;
      case ACTIONS.width:
        return {
          ...state,
          size: {
              ...state.size,
              w:action.payload.value,
          },
        };
        break;
        case ACTIONS.height:
          return {
            ...state,
            size: {
                ...state.size,
                h:action.payload.value,
            },
          };
          break;
      case ACTIONS.qty:
        return {
          ...state,
          qty: action.payload.value,
        };
        break;
      case ACTIONS.eyelet:
        return {
          ...state,
          eyelet: action.payload.value,
        };
        break;
      case ACTIONS.payment:
        return {
          ...state,
          payment: {
              ...state.payment,
              stat: action.payload.value
          },
        };
        break;
      case ACTIONS.dp_amnt:
        return {
          ...state,
          payment: {
              ...state.payment,
              dp_amnt: action.payload.value
          }
        };
        break;
       
        case ACTIONS.price:
        return {
          ...state,
          price: action.payload.value
        }
        break;
        case ACTIONS.order_stat:
          return {
            ...state,
            order_stat: action.payload.value,
          };
          break;
          case ACTIONS.description:
        return {
          ...state,
          description: action.payload.value,
        };
        break;
        case ACTIONS.layout:
        return {
          ...state,
          layout: action.payload.value,
        };
        break;
    }
}


export { tarp_order_reducer_function,tarp_orders_db_data_reducer_func, ACTIONS };
