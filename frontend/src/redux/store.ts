import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReduce = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

// from store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";

// export const store = configureStore({
//   reducer: { user: userReducer },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// from slice.ts
// import { createSlice } from "@reduxjs/toolkit";
// import { userInterface } from "../../types";

// interface UserState {
//   currentUser: userInterface | null; // Define User interface for type safety
//   error: string | null;
//   loading: boolean;
// }

// const initialState: UserState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;
//     },
//     signInSuccess: (state, action: { payload: userInterface }) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     signInFailure: (state, action: { payload: string }) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

// export default userSlice.reducer;
// from SignIn.tsx
// import React, { useState } from "react";
// import Header from "../components/Header";
// import { Link, useNavigate } from "react-router-dom";
// import { signInInterface } from "../types";
// import { useDispatch } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import { useSelector } from "react-redux";

// const SignIn: React.FC = () => {
//   const [formData, setFormData] = useState<signInInterface>({
//     email: "",
//     password: "",
//   });

//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       dispatch(signInStart());
//       const res = await fetch("http://localhost:8080/api/user/signin", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       navigate("/");
//     } catch (error: any) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div>
//       {" "}
//       <Header />
//       <section>
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-5 sm:mt-44 lg:py-0 overflow-hidden">
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-500 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Login
//               </h1>
//               <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your email
//                   </label>
//                   <input
//                     onChange={handleChange}
//                     value={formData.email}
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     required
//                   ></input>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Password
//                   </label>
//                   <input
//                     onChange={handleChange}
//                     value={formData.password}
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required
//                   ></input>
//                 </div>

//                 <button
//                   disabled={loading}
//                   type="submit"
//                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   {loading ? "Loading...." : "Login"}
//                 </button>
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                   Already have an account?{" "}
//                   <Link
//                     to="/signup"
//                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                   >
//                     SignUp here
//                   </Link>
//                 </p>
//               </form>
//               {error && <p className="text-red-500 mt-5">{error}</p>}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SignIn;
// from Types.ts
// // Define your interface
// export interface RouerInt {
//   path: string;
//   element: React.ReactElement;
// }

// export interface signUpInterface {
//   username: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface signInInterface {
//   email: string;
//   password: string;
// }

// export interface userInterface {
//   username: string;
//   email: string;
//   phoneNumber: string;
// }
