import "./Profile.css";
import profile from "../../../Assets/img/profile/profile.png";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetMyProfileQuery } from "../../../redux/features/user/userApi";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const Profile = () => {
  const { data: userData } = useGetMyProfileQuery({});
  const { id, email, name } = userData?.data || {};
  const { register, handleSubmit, reset } = useForm();

  // const [user] = useAuthState(auth);
  const [edit, setEdit] = useState(false);
  // const imageStorageKey = 'a3d4bff21c6d258146feb02c43808485';

  //   const [userInfo, setuserInfo] = useState({
  //     file: [],
  //     filepreview: null,
  //   });
  //     const handleInputChange = (event) => {
  //         setuserInfo({
  //             ...userInfo,
  //             file: event.target.files[0],
  //             filepreview: URL.createObjectURL(event.target.files[0]),
  //         });
  //     };

  // const onSubmit = async (data, event) => {
  //     event.preventDefault();
  //     const profileImg = data.profileImg[0];
  //     const formData = new FormData();
  //     formData.append('Image', profileImg);
  //     const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
  //     fetch(url, {
  //         method: 'POST',
  //         body: formData
  //     })
  //         .then(res => res.json())
  //         .then(imgData => {
  //             if (imgData.success) {
  //                 // const img = imgData.data.url;
  //                 const updateUserProfileInfo = {
  //                     profileImg: imgData.data.url,
  //                     name: data.name
  //                 }
  //                 fetch('http://localhost:5000/user', {
  //                     method: "POST",
  //                     headers: {
  //                         'content-type': 'application/json'
  //                     },
  //                     body: JSON.stringify(updateUserProfileInfo)
  //                 })
  //                     .then(res => res.json())
  //                     .then(inserted => {
  //                         if (inserted.insertedId) {

  //                         }
  //                         else {
  //                         }
  //                     })
  //             }
  //         })
  // }

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="My Profile " />
      <div className="pt-4 px-4 profile-top-part">
        <h4 className="fw-bold side-header">My Profile</h4>
        <button className="profile-edit-btn" onClick={() => setEdit(!edit)}>
          <FontAwesomeIcon icon={faEdit} />
          <span>&nbsp;Edit</span>
        </button>
      </div>
      <hr />
      <div className="p-2">
        {edit ? (
          <form /* onSubmit={handleSubmit(onSubmit)} */>
            <div className="my-profile py-4">
              {/* <div className="my-profile-img">
                {userInfo.filepreview !== null ? (
                  <img
                    width="170px"
                    height="170px"
                    src={userInfo.filepreview}
                    alt=""
                  />
                ) : (
                  <img width="170px" height="170px" src={profile} alt="" />
                )}
                <input className='custom-file-input' type="file" name='profileImg' required onChange={handleInputChange}  />
              </div> */}

              <div className="my-profile-img"></div>

              <div className="edit-user-profile-info">
                <label className="">
                  <small>Full Name</small>
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  defaultValue={name}
                  {...register("userName", { required: false })}
                />
                <br />
                <label className="">
                  <small>Email Address</small>
                </label>
                <br />
                <input
                  type="email"
                  placeholder="Enter Email"
                  defaultValue={email}
                  {...register("userEmail", { required: false })}
                />
                <br />
                <label className="">
                  <small>Phone Number </small>
                </label>
                <br />
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.slice(0, 11).replace(/\D/g, "");
                  }}
                  {...register("phoneNumber", { required: false })}
                />

                <br />
              </div>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <input
                type="Submit"
                value="Save Change"
                className="change-profile-save"
              />
            </div>
          </form>
        ) : (
          <div>
            <div className="my-profile py-4">
              <div className="my-profile-img">
                <img width="170px" height="170px" src={profile} alt="" />
              </div>

              <div className="edit-user-profile-info">
                <label className="">
                  <small>Full Name</small>
                </label>
                <br />
                <h6 className="mb-0"> {name}</h6>
                <label className="">
                  <small>Email Address</small>
                </label>
                <h6 className="mb-0">{email}</h6>
                <label className="">
                  <small>Phone Number </small>
                </label>
                <br />
                <h6 className="mb-0">01737906772</h6>
                <br />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
