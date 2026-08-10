import { NavLink } from "react-router-dom";

interface SidebarItem {
    id: number,
    item: string;
    route: string;
}

const Sidebar = () => {

    const siderbarItems: SidebarItem[] = [
        { id: 1, item: "TodoList", route: "todo" },
        { id: 2, item: "Timer", route: "timer" },
        { id: 3, item: "Datatable", route: "datatable" },
        { id: 4, item: "Nested Checkbox", route: "nested_checkbox" },
        { id: 4, item: "OTP Input", route: "otp_input" },
    ]
    return (
        <div className='sidebar'>
            <h1>Machine Coding</h1>

            {
                siderbarItems.map((val) => (
                    <NavLink
                        key={val.id}
                        to={val.route}
                        className={({ isActive }) =>{
                            const isHome = location.pathname === "/" && val.route === "todo";
                           return `sidebarItem ${(isActive || isHome) ? "active" : ""}`
                        }
                            
                        }
                    >
                        <h3>{val.item}<span></span></h3>
                    </NavLink>
                ))
            }
        </div>
    )
}

export default Sidebar