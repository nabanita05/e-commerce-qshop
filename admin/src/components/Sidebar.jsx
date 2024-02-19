

import {
    
    Nav,
 
} from "react-bootstrap";
import dashboardIcon from "../assets/home.png"
import "./custom.css";
import StorageImg from "../assets/storage.png"


const Sidebar = () => {


    return (
        <div className="sidebar_content">
            <div className="sodebarLogo">
                <h1>QShop Admin</h1>
            </div>
            <div className="sidebarMenu">
                <Nav>
                    <Nav.Item>
                        <Nav.Link
                            href="#"
                            active={true}
                            onClick={()=>{}}
                        >
                            <img
                                src={dashboardIcon}
                                className="navImg"
                                alt="dashboard"
                              
                            />
                            <span>Dashboard</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            href="#"
                            active={true}
                            onClick={()=>{}}
                        >
                            <img
                                src={StorageImg}
                                className="navImg"
                                alt="storage"
                              
                            />
                            <span>Add Products</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
