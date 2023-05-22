import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./Admin.css"


const Admin = () => {
    // const [isEditMode, setIsEditMode] = useState(false);
    // const [selectedProductId, setSelectedProductId] = useState(null);
    
    //   const handleEdit = (productId) => {
    //     setIsEditMode(true);
    //     setSelectedProductId(productId);
    //   };

    return (
        <div className="admin">
            <Dashboard/>
        </div>
    )
}

export default Admin;