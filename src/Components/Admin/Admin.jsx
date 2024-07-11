import { Outlet } from "react-router-dom"
import DashBoard from "./DashBoard"

function Admin() {
  return (
    <>
      <DashBoard />
      <div className="py-3"><Outlet /></div>
    </>
  )
}

export default Admin