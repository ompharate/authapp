import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState();
  const [imagePercentage, setImagePercentage] = useState(0);
  const [formData, setFormData] = useState({});
  console.log(formData);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = Date.now() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(parseInt(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePhoto: downloadURL });
          setImagePercentage(0);
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center ">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          className=""
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePhoto}
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
        />
        {imagePercentage ? (
          <p className="text-center text-green-500">
            uploading {imagePercentage}%
          </p>
        ) : null}
        <input
          placeholder="username"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          type="text"
          name="username"
        />
        <input
          placeholder="email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"
          type="text"
          name="email"
        />
        <input
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3"
          type="text"
          name="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete Account</span>
        <span className="text-red-700">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
