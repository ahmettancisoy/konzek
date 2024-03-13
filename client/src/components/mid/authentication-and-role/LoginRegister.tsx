import { useState } from "react";
import InputPassword from "./InputPassword";
import InputUserName from "./InputUserName";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setContext } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

const LoginRegister = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(["user"]);

  const dispatch = useDispatch();

  const router = useRouter();

  const primaryColor = useSelector(
    (state: RootState) => state.themeColor.primaryColor
  );

  const secondaryColor = useSelector(
    (state: RootState) => state.themeColor.secondaryColor
  );

  const navigateAfterSign = (roles: string[]) => {
    if (roles.includes("admin")) router.push("/authentication-and-role/admin");
    else if (roles.includes("user"))
      router.push("/authentication-and-role/user");
  };

  const handleRegister = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/signup`;

      const response = await axios.post(url, {
        name: userName,
        password: password,
        roles: role,
      });

      dispatch(setContext(response.data));
      localStorage.setItem("auth", JSON.stringify(response.data));

      navigateAfterSign(response.data.roles);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/login`;

      const response = await axios.post(url, {
        name: userName,
        password: password,
      });

      dispatch(setContext(response.data));
      localStorage.setItem("auth", JSON.stringify(response.data));

      navigateAfterSign(response.data.roles);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRole = (val: string[]) => {
    setRole(val);
  };

  return (
    <div className="w-fit min-w-72">
      <InputUserName value={userName} setValue={setUserName} />
      <InputPassword value={password} setValue={setPassword} />
      <div className="px-4 pb-4">
        <div className="space-x-4 pb-6 flex text-sm">
          <label
            htmlFor="user"
            className="space-x-1 items-center flex select-none"
          >
            <input
              className={`focus:ring-0 focus:ring-offset-0 ${primaryColor.radioColor}`}
              type="radio"
              name="user"
              id="user"
              value={["user"]}
              checked={role[0] === "user"}
              onChange={() => handleRole(["user"])}
            />
            <span>User</span>
          </label>
          <label
            htmlFor="admin"
            className="space-x-1 items-center flex select-none"
          >
            <input
              className={`focus:ring-0 focus:ring-offset-0 ${primaryColor.radioColor}`}
              type="radio"
              name="admin"
              id="admin"
              value={["admin, user"]}
              checked={role[0] === "admin"}
              onChange={() => handleRole(["admin", "user"])}
            />
            <span>Admin</span>
          </label>
        </div>
        <div className="flex justify-between">
          <button
            className={`${secondaryColor.background} ${secondaryColor.backgroundHover} text-white p-2 rounded-md transition-colors`}
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className={`${secondaryColor.background} ${secondaryColor.backgroundHover} text-white p-2 rounded-md transition-colors`}
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
