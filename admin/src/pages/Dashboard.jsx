
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const Dashboard = () => {
  
  return (
   
    <div className="bodyArea">
      <Container fluid className="">
        <Row>
          <Col md={3} className="sidebarDv">
            <Sidebar />
          </Col>
          <Col md={9} className=" mainDv">
            <Navbar></Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
