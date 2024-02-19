import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import AddProduct from "../components/AddProducts";

const AddProducts = () => {
  return (
    <div className="bodyArea">
      <Container fluid className="">
        <Row>
          <Col md={3} className="sidebarDv">
            <Sidebar />
          </Col>
          <Col md={9} className="mainDv">
            <Navbar></Navbar>
            <div className="innerPages">
              <AddProduct />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AddProducts;
