let localBasket = JSON.parse(localStorage.getItem("basket")) ?? [];
let specialCharater = /[&\/\\#,+()$~%.'":*?<>{}]/g;
let filter_bo_loc = "Bộ lọc";
let filter_hang = "Hãng";
let filter_gia = "Giá";
let filter_mau = "Màu";
let filter_ram = "RAM";
let filter_rom = "ROM";

export const intitalState = {
  products: [],
  details_product: [],
  product_category: [],
  rams: [],
  roms: [],
  colors: [],
  brands: [],
  basket: localBasket.length > 0 ? localBasket : [],
  loginedBasket: [],
  price_filter: [],
  profileCustomer: {
    gender: "Nam",
    full_name: "",
    phone_number: "",
    bill_address: "",
    bill_request: "",
  },
  isLogined: false,
  loginedUser: {},
  phone_filters: [filter_bo_loc, filter_hang, filter_gia, filter_ram],
  laptop_filters: [filter_bo_loc, filter_hang, filter_gia, filter_ram],
  tablet_filers: [filter_bo_loc, filter_hang, filter_gia, filter_ram],
  watch_filter: [filter_bo_loc, filter_hang, filter_gia],
  headphone_filters: [filter_bo_loc, filter_hang, filter_gia],
  category_name: "",
  accessToken: "",
  user: {},
  comments: [],
  productImageUrl: (path) => {
    return `http://localhost:5000/resource/ProductImages/${path}`;
  },
  brandImageUrl: (path) => {
    return `http://localhost:5000/resource/BrandImages/${path}`;
  },
  paymentMethods: [
    {
      payment_id: 1,
      payment_value: "default",
      payment_content: "Thanh toán khi giao hàng",
      payment_img_logo: "",
    },
    // {
    //   payment_id: 2,
    //   payment_value: "momo",
    //   payment_content: "Ví momo",
    //   payment_img_logo: "https://developers.momo.vn/v2/images/logo.svg",
    // },
    {
      payment_id: 2,
      payment_value: "paypal",
      payment_content: "Ví PayPal",
      payment_img_logo:
        "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png",
    },
  ],
  formatMoney: (num) => {
    return Number(num)
      .toFixed()
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  },
  cleanString: (str) => {
    const newId = removeAccents(str.toLowerCase())
      .replaceAll(" ", "-")
      .replaceAll(specialCharater, "");

    function removeAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    return newId;
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGINED":
      return { ...state, isLogined: action.payload };
    case "SET_LOGINED_USER":
      return { ...state, loginedUser: action.payload };
    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    case "SET_LOGINED_BASKET":
      return { ...state, loginedBasket: action.payload };
    case "SET_RAMS":
      return { ...state, rams: action.payload };
    case "SET_ROMS":
      return { ...state, roms: action.payload };
    case "SET_COLORS":
      return { ...state, colors: action.payload };
    case "ADD_TO_BASKET":
      if (
        state.basket.every(
          (item) =>
            item.details_product_id !==
            action.payload.product.details_product_id
        )
      ) {
        return {
          ...state,
          basket: [...state.basket, action.payload.product],
        };
      } else {
        let tempBasket = state.basket.map((item) => {
          if (
            item.details_product_id == action.payload.product.details_product_id
          ) {
            return {
              ...item,
              amount: item.amount + action.payload.product.amount,
            };
          }
          return item;
        });
        return { ...state, basket: tempBasket };
      }
    case "CHANGE_COLOR":
      let changeColorBasket = state.basket.map((item) => {
        if (item.details_product_id == action.payload.details_product_id) {
          let amount = item.amount;
          item = action.payload.newItem;
          return { ...item, amount: amount };
        }
        return item;
      });

      localStorage.setItem("basket", JSON.stringify(changeColorBasket));
      return { ...state, basket: changeColorBasket };
    case "INCREASE_BASKET":
      let increaseBasket = state.basket.map((item) => {
        if (item.details_product_id == action.payload.details_product_id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      console.log(action.payload.details_product_id);
      localStorage.setItem("basket", JSON.stringify(increaseBasket));
      return { ...state, basket: increaseBasket };
    case "DECREASE_BASKET":
      let decreaseBasket = state.basket.map((item) => {
        if (
          item.details_product_id == action.payload.details_product_id &&
          item.amount > 1
        ) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      localStorage.setItem("basket", JSON.stringify(decreaseBasket));
      return { ...state, basket: decreaseBasket };

    case "REMOVE_BASKET":
      localStorage.setItem(
        "basket",
        JSON.stringify([
          ...state.basket.filter(
            (item) =>
              item.details_product_id != action.payload.details_product_id
          ),
        ])
      );
      return {
        ...state,
        basket: [
          ...state.basket.filter(
            (item) =>
              item.details_product_id != action.payload.details_product_id
          ),
        ],
      };
    case "RESET_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "CHANGE_PROFILE":
      return {
        ...state,
        profileCustomer: {
          ...state.profileCustomer,
          full_name: action.payload.name,
          phone_number: action.payload.phone_number,
          bill_address: action.payload.address,
          bill_request: action.payload.request || "",
          user_id: action.payload.user_id || null,
          gender: action.payload.gender,
        },
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_DETAILS_PRODUCT":
      return {
        ...state,
        details_product: action.payload,
      };
    case "GET_PRODUCT_CATEGORY":
      return {
        ...state,
        product_category: action.payload,
      };
    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "GET_CATEGORY_NAME":
      return {
        ...state,
        category_name: action.payload,
      };
    case "GET_PRICE_FILTER":
      return {
        ...state,
        price_filter: action.payload,
      };
    case "ADD_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    case "REMOVE_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: "",
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
