import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import { SendMoney } from "./components/send";
import { Signup } from "./components/signup";
import { Signin } from "./components/signin";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
function App() {
  return (
    <RecoilRoot>
      <div className="h-screen m-auto">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                localStorage.getItem("token") ? <Dashboard /> : <Signup />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/send" element={<SendMoney />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
