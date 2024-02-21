import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import UploadIcon from "../assets/upload-icon.png";
import UploadImg from "../assets/UploadImg.png";
import CrossIcon from "../assets/cross.png";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"
import "./custom.css"


const initialValues = {
  productName: "",
  des: "",
  price: "",
  color: "",
  badge: false,
  image: ""
};
const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
const imageValidation = yup
  .mixed()
  .test("fileOrUrl", "Invalid file or URL", (value) => {
    // Check if value is a file upload or a URL
    if (!value || (typeof value === "string" && isValidUrl(value))) {
      // Return true if no file is uploaded or if it's a URL
      return true;
    } else if (value && typeof value === "object") {
      // Check file size and type if it's a file upload
      if (value.size > 1024 * 1024 * 10) {
        throw new yup.ValidationError(
          "File size exceeds the limit of 10MB",
          value,
          "photo"
        );
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(value.type)) {
        throw new yup.ValidationError(
          "Invalid file type. Only JPEG, PNG, and GIF are allowed",
          value,
          "photo"
        );
      }
      return true;
    } else {
      return false;
    }
  })
  .required("Photo is required")
const AddLocationSchema = yup.object().shape({
  productName: yup.string().required("Product Name is a required field"),
  des: yup.string().required("Description is a required field"),
  price: yup.string().required("Price is required field"),
  color: yup.string().required("Color is required field"),
  badge: yup.boolean().required(),
  image: imageValidation
});

function createSlug(str) {
  // Convert the string to lowercase and replace spaces with hyphens
  return str.toLowerCase().replace(/\s+/g, '-');
}
const AddProduct = () => {

  const navigate = useNavigate()
  const handleAddProduct = async (data) => {
    const slug = createSlug(data.productName)
    data.slug = slug
    const file = await appwriteService.uploadFile(data.image);

    if (file) {
      const fileId = file.$id;
      data.featuredImage = fileId;
      console.log(data);
      const dbPost = await appwriteService.createPost({ ...data });

      if (dbPost) {
        toast.success("Product Added")
        navigate("/dashboard");
      }
    }
  }

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={AddLocationSchema}
        onSubmit={handleAddProduct}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="tabInner innerPages pt-5">
              <div className="innerHeading">
                <h1>Add Product</h1>
              </div>
              <Row>
                <Col md={6}>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        autoFocus
                        name="productName"
                        onChange={handleChange}
                        value={values.productName}
                        isValid={touched.productName && !errors.productName}
                        isInvalid={touched.productName && !!errors.productName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.productName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""

                        name="price"
                        onChange={handleChange}
                        value={values.price}
                        isValid={touched.price && !errors.price}
                        isInvalid={touched.price && !!errors.price}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""

                        name="color"
                        onChange={handleChange}
                        value={values.color}
                        isValid={touched.color && !errors.color}
                        isInvalid={touched.color && !!errors.color}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.color}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <div className="photo">
                        {
                          values.image && (
                            <div className="photo-upload-crossIcon">
                              <img
                                onClick={() => setFieldValue("image", "")}
                                src={CrossIcon}
                                alt="..."
                                style={{ height: "30px", width: "30px" }}
                              />
                            </div>
                          )
                        }
                        {values.image && (
                          <img
                            src={URL.createObjectURL(values.image)}
                            alt="..."
                            style={{ height: "200px", width: "150px", overflow: "hidden" }}
                          />
                        )}
                        {!values.image && (
                          <div className="photo-upload-userIcon">
                            <img
                              src={UploadImg}
                              alt="..."
                              style={{ height: "200px", width: "150px", overflow: "hidden" }}
                            />
                          </div>
                        )}
                      </div>
                      <Form.Label htmlFor="image" className="upload-btn">
                        <div className="upload-icon">
                          <img
                            src={UploadIcon}
                            alt="..."
                            style={{ height: "10px", width: "10px" }}
                          />
                        </div>
                        Upload
                      </Form.Label>
                      <Form.Control
                        className="photo-input"
                        style={{ display: "none" }}
                        id="image"
                        type="file"
                        placeholder=""
                        key={values.image}
                        autoFocus
                        name="image"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("image", e.target.files[0]);
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            // setImagePreview(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }}
                        isValid={touched.image && !errors.image}
                        isInvalid={touched.image && !!errors.image}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.image}
                      </Form.Control.Feedback>
                      <div>{values?.image?.name}</div>
                    </Form.Group>
                  </Col>
                </Col>
                <Col md={6}>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        className="txtArea"
                        as="textarea"
                        type="text"
                        placeholder=""

                        name="des"
                        onChange={handleChange}
                        value={values.des}
                        isValid={touched.des && !errors.des}
                        isInvalid={touched.des && !!errors.des}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.des}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label></Form.Label>
                      <Form.Check
                        type="checkbox"
                        label="Badge"
                        name="badge"
                        value={values.badge}
                        onChange={handleChange}
                        checked={values.badge}
                        className="badge-checkbox"
                      />
                    </Form.Group>
                  </Col>
                </Col>
              </Row>
            </div>
            <div className="border-0 d-flex align-items-center justify-content-end pt-1 pb-3 frmBtns">
              <Button type="submit" className="btn-cust ">
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default AddProduct;
