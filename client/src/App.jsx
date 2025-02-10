import React, { useState } from "react";
import UsersTable from "./components/usersTable";
import OrdersTable from "./components/ordersTable";

const App = () => {
    const [menu, setMenu] = useState("users");

    return (
        <div style={{display: "flex", height: "100vh" }}>
            <nav style={{ width: "200px", background: "#282c34", color: "white", padding: "20px" }}>
                <h3>Dashboard</h3>
                <ul>
                    <li onClick={() => setMenu("users")} style={{ cursor: "pointer", padding: "10px" }}>
                        Пользователи
                    </li>
                    <li onClick={() => setMenu("orders")} style={{ cursor: "pointer", padding: "10px" }}>
                        Заказы
                    </li>
                </ul>
            </nav>
            <main style={{ flex: 1, padding: "20px" }}>
                {menu === "users" && <UsersTable />}
                {menu === "orders" && <OrdersTable />}
            </main>
        </div>
    );
};

export default App;
