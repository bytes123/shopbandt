import React, { useState, useEffect } from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useStateValue } from "../../../StateProvider";
import DropDown from "../dropdown/DropDown";
import Add from "../editor/Add";
import "./modal.scss";
import Toast from "../../../toast/Toast";

function UpdateProduct({ product }) {
  const [
    {
      productImageUrl,
      details_product,
      product_category,
      brands,
      products,
      rams,
      roms,
      colors,
    },
    dispatch,
  ] = useStateValue();

  const { error, success } = Toast;
  const [description, setDescription] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [categoryList, setCategoryList] = useState();
  const [brandList, setBrandList] = useState();
  const [ramList, setRamList] = useState();
  const [romList, setRomList] = useState();
  const [colorList, setColorList] = useState();
  const [productList, setProductList] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedRam, setSelectedRam] = useState();
  const [selectedRom, setSelectedRom] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState();
  const axios = require("axios");

  async function getDetailsProduct() {
    try {
      const response = await axios.get("http://localhost:5000/details_product");
      dispatch({
        type: "GET_DETAILS_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    // I've kept this example simple by using the first image instead of multiple
    if (!validImageTypes.includes(e.target.files[0].type)) {
      setErrors({ ...errors, image: "Vui l??ng ch???n h??nh ???nh h???p l???" });
    } else {
      setErrors({});
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // SET DEFAULT CATEGORY LIST AND SELECTED CATEOGRY FOR ADD FORM
  useEffect(() => {
    if (product_category) {
      const data = product_category.map((item, index) => {
        return {
          id: item.category_id,
          label: item.category_name,
        };
      });

      if (product) {
        const updateCategory = data.filter(
          (item) => item.id == product.category_id && item
        )[0];

        setSelectedCategory(updateCategory);
      }

      setCategoryList(data);
    }
  }, [product_category]);

  // SET DEFAULT BRAND LIST AND SELECTED BRAND FOR ADD FORM
  useEffect(() => {
    if (selectedCategory && brands.length > 0) {
      const data = brands
        .filter((item) => item.category_id == selectedCategory.id)
        .map((item, index) => {
          return {
            id: item.brand_id,
            label: item.brand_name,
          };
        });

      setBrandList(data);
    }
  }, [brands, selectedCategory]);

  // SET DEFAULT RAMS,ROM,COLOR LIST
  useEffect(() => {
    if (rams && selectedCategory) {
      setRamList(
        rams
          .filter((item) => {
            if (item.category_id == selectedCategory.id) {
              return item;
            }
          })
          .map((item) => {
            return {
              id: item.ram_id,
              label: item.ram_value,
            };
          })
      );
    }
  }, [selectedCategory, rams]);

  useEffect(() => {
    if (roms && selectedCategory) {
      setRomList(
        roms
          .filter((item) => {
            if (item.category_id == selectedCategory.id) {
              return item;
            }
          })
          .map((item) => {
            return {
              id: item.rom_id,
              label: item.rom_value,
            };
          })
      );
    }
  }, [selectedCategory, roms]);

  useEffect(() => {
    if (colors && selectedCategory) {
      setColorList(
        colors
          .filter((item) => {
            if (item.category_id == selectedCategory.id) {
              return item;
            }
          })
          .map((item) => {
            return {
              id: item.color_id,
              label: item.color_value,
            };
          })
      );
    }
  }, [selectedCategory, colors]);

  useEffect(() => {
    if (selectedBrand && details_product) {
      setProductList(
        products
          .filter((item) => {
            if (
              item.category_id == selectedCategory.id &&
              item.brand_id == selectedBrand.id
            ) {
              return item;
            }
          })
          .map((item) => {
            return {
              id: item.product_id,
              label: item.product_name,
            };
          })
      );
    }
  }, [details_product, selectedBrand]);

  //SELECTED RAMS,ROM,COLOR LIST FOR ADD FORM
  useEffect(() => {
    if (product && ramList) {
      const updateRam = ramList.filter(
        (item) => item.id == product.ram_id && item
      )[0];
      setSelectedRam(updateRam);
    }
  }, [ramList]);

  useEffect(() => {
    if (product && romList) {
      const updateRom = romList.filter(
        (item) => item.id == product.rom_id && item
      )[0];

      setSelectedRom(updateRom);
    }
  }, [romList]);

  useEffect(() => {
    if (product && colorList) {
      const updateColor = colorList.filter(
        (item) => item.id == product.color_id && item
      )[0];

      setSelectedColor(updateColor);
    }
  }, [colorList]);

  // SELECTED BRAND
  useEffect(() => {
    if (product && brandList) {
      const updateCategory = brandList.filter(
        (item) => item.id == product.brand_id && item
      )[0];

      setSelectedBrand(updateCategory);
    }
  }, [brandList]);

  useEffect(() => {
    if (product && productList) {
      const updateProduct = productList.filter(
        (item) => item.id == product.product_id && item
      )[0];

      console.log(updateProduct);
      setSelectedProduct(updateProduct);
    } else {
      setSelectedProduct();
    }
  }, [productList]);

  useEffect(() => {
    setAmount(product.product_storage);
    setDiscount(product.product_discount);
    setSelectedPrice(product.product_price);
    setDescription(product.product_description);
    setSelectedTitle(product.product_name);
  }, [product]);

  // SEND DATA TO SERVER
  async function updateProduct(data) {
    console.log(...data);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/update-product",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        getDetailsProduct();
        success(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SUBMIT FORM
  const handleSubmit = async (event) => {
    function containsSpecialChars(str) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(str);
    }
    event.preventDefault();
    if (
      !selectedRam ||
      !selectedRom ||
      !selectedColor ||
      !selectedBrand ||
      !selectedCategory
    ) {
      error("Vui l??ng ch???n ?????y ????? tr?????c khi c???p nh???t");
    }
    if (selectedTitle.trim().length == 0) {
      setErrors({ ...errors, title: "Vui l??ng nh???p t??n s???n ph???m" });
    } else if (containsSpecialChars(selectedTitle)) {
      setErrors({ ...errors, title: "Vui l??ng nh???p k?? t??? h???p l???" });
    } else if (selectedPrice.trim().length == 0) {
      setErrors({ ...errors, price: "Vui l??ng nh???p gi?? s???n ph???m" });
    } else if (discount > 100) {
      setErrors({ ...errors, discount: "Vui l??ng nh???p gi???m gi?? d?????i 100%" });
    } else {
      const data = {
        product_id: product.product_id,
        details_product_id: product.details_product_id,
        product_name: selectedTitle,
        category_id: selectedCategory.id,
        brand_id: selectedBrand.id,
        product_image: product.product_image,
        product_ram: selectedRam.id,
        product_rom: selectedRom.id,
        product_color: selectedColor.id,
        product_price: selectedPrice,
        product_discount: discount,
        product_storage: amount,
        product_description: description,
      };
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("data", JSON.stringify(data));
      updateProduct(formData);
    }
  };

  // CHANGE PRICE
  const handleChangePrice = (event) => {
    setErrors({});
    setSelectedPrice(event.target.value);
  };

  // CHANGE SELECTED TITLE

  const handleChangeTitle = (event) => {
    setErrors({});
    setSelectedTitle(event.target.value);
  };

  // CHANGE DISCOUNT
  const handleChangeDiscount = (event) => {
    setErrors({});
    setDiscount(event.target.value);
  };

  // CHANGE AMOUNT
  const handleChangeAmount = (event) => {
    setErrors({});
    setAmount(event.target.value);
  };

  return (
    <div className="modal_product-add modal_form">
      <div className="title">
        <AddBusinessIcon className="mb-2 cl-red" />
        <p>C???P NH???T S???N PH???M</p>
      </div>
      <form
        action="
          "
        className="modal_product-add-form"
      >
        <div className="product_image-add my-2">
          <label htmlFor="">H??nh s???n ph???m</label>
          {selectedFile ? (
            <>
              <br />
              <img src={preview} alt="" className="preview_image" />
            </>
          ) : (
            <>
              <br />
              <img
                src={
                  product && product.product_image
                    ? productImageUrl(product.product_image)
                    : ""
                }
                alt=""
                className="preview_image"
              />
            </>
          )}

          <br />
          <label className="product_image-add-main mt-3">
            <FileUploadIcon className="product_image-add-btn" />
            <input type="file" onChange={onSelectFile} />
          </label>
        </div>
        {errors && errors.image && <p className="error-text">{errors.image}</p>}
        <div className="product_name-add my-2">
          <label htmlFor="">T??n s???n ph???m</label>
          <br />
          <input
            type="text"
            name="product_name"
            className={
              errors && errors.title
                ? "product_name-input error-input"
                : "product_name-input"
            }
            value={selectedTitle}
            onChange={handleChangeTitle}
          />
        </div>
        {errors && errors.title && <p className="error-text">{errors.title}</p>}
        <div className="product_category-add my-2">
          <label htmlFor="">Ch???n danh m???c</label>
          <br />
          <DropDown
            data={categoryList}
            selectedItem={selectedCategory}
            onSelectedItem={setSelectedCategory}
          />
        </div>
        <div className="product_brand-add my-2">
          <label htmlFor="">Ch???n h??ng</label>
          <br />
          <DropDown
            data={brandList}
            selectedItem={selectedBrand}
            onSelectedItem={setSelectedBrand}
          />
        </div>
        <div className="product_ram-add my-2">
          <label htmlFor="">Ch???n RAM</label>
          <br />
          <DropDown
            data={ramList}
            selectedItem={selectedRam}
            onSelectedItem={setSelectedRam}
          />
        </div>
        <div className="product_rom-add my-2">
          <label htmlFor="">Ch???n ROM</label>
          <br />
          <DropDown
            data={romList}
            selectedItem={selectedRom}
            onSelectedItem={setSelectedRom}
          />
        </div>
        <div className="product_color-add my-2">
          <label htmlFor="">Ch???n m??u</label>
          <br />
          <DropDown
            data={colorList}
            selectedItem={selectedColor}
            onSelectedItem={setSelectedColor}
          />
        </div>
        <div className="product_price-add my-2">
          <label htmlFor="">Gi?? s???n ph???m</label>
          <br />
          <input
            type="number"
            name="product_price"
            className={
              errors && errors.price
                ? "product_price-input error-input"
                : "product_price-input"
            }
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            value={selectedPrice}
            onChange={handleChangePrice}
          />
        </div>
        {errors && errors.price && <p className="error-text">{errors.price}</p>}
        <div className="product_price-add discount my-2">
          <label htmlFor="">Gi???m gi?? %</label>
          <br />
          <input
            type="number"
            name="product_price"
            className={
              errors && errors.discount
                ? "product_price-input error-input"
                : "product_price-input"
            }
            value={discount}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onChange={handleChangeDiscount}
          />
        </div>
        {errors && errors.discount && (
          <p className="error-text">{errors.discount}</p>
        )}
        <div className="product_amount-add my-2">
          <label htmlFor="">S??? l?????ng s???n ph???m</label>
          <br />
          <input
            type="number"
            name="product_amount"
            value={amount}
            className={
              errors && errors.amount
                ? "product_amount-input error-input"
                : "product_amount-input"
            }
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onChange={handleChangeAmount}
          />
        </div>
        {errors && errors.amount && (
          <p className="error-text">{errors.amount}</p>
        )}
        <div className="product_description-add my-2">
          <label htmlFor="">M?? t???</label>
          <br />
          <Add description={description} onDescription={setDescription} />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          C???p nh???t
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
