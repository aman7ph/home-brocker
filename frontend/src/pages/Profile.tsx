import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { userInterface } from "../types";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePercentage, setFilePercentage] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState<userInterface>({
    _id: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    avatar: "",
    role: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        _id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        password: "",
        avatar: currentUser.avatar,
        role: currentUser.role,
      });
    }
  }, [currentUser]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUplod(file);
      setFile(null);
    }
  }, [file]);

  const handleFileUplod = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleImageClick = () => {
    fileRef.current?.click(); //
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:8080/api/user/update/${currentUser?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeletUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:8080/api/user/delete/${currentUser?._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOutUser = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`http://localhost:8080/api/auth/signout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error: any) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div>
      <Header />
      <div>
        <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-5 sm:mt-44 lg:py-0 overflow-hidden">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-500 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center	 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Profile
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="file"
                    onChange={handleImageChange}
                    ref={fileRef}
                    hidden
                    accept="image/*"
                  />
                  <img
                    src={formData.avatar || currentUser?.avatar}
                    onClick={handleImageClick}
                    alt="profile"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 mx-auto"
                  />
                  <p className="text-sm text-center self-center">
                    {fileUploadError ? (
                      <span className="text-red-700">
                        Error Image upload (image must be less than 2 mb)
                      </span>
                    ) : filePercentage > 0 && filePercentage < 100 ? (
                      <span className="text-slate-100">{`Uploading ${filePercentage}%`}</span>
                    ) : filePercentage === 100 ? (
                      <span className="text-green-900">
                        Image successfully uploaded!
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      username
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="username"
                      id="username"
                      defaultValue={currentUser?.username}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={currentUser?.email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    ></input>
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      onChange={handleChange}
                      defaultValue={currentUser?.phoneNumber}
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0911 --- ---"
                    ></input>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></input>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {loading ? "Loading...." : "update"}
                  </button>
                  {currentUser?.role === "admin" && (
                    <Link
                      to={"/creatlisting"}
                      className="w-full text-white bg-primary-600 mt-5 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-center font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Creat Listing
                    </Link>
                  )}
                </form>
                <p className="text-red-700 mt-5">{error ? error : ""}</p>
                <p className="text-green-700 mt-5">
                  {updateSuccess ? "User is updated successfully!" : ""}
                </p>
                <div className="flex justify-between mt-5">
                  <span
                    onClick={handleDeletUser}
                    className="text-red-700 cursor-pointer"
                  >
                    Delete account
                  </span>
                  <span
                    onClick={handleSignOutUser}
                    className="text-red-700 cursor-pointer"
                  >
                    Sign out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
