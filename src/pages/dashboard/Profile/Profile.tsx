import "./Profile.css";
import profile from "../../../../public/assets/img/profile/profileAvater.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetMyProfileQuery } from "../../../redux/features/user/userApi";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Form } from "antd";
import UpdateProfile from "./UpdateProfile";
import Loader from "../../shared/loader/Loader";

const Profile = () => {
  const { data: userData, isLoading } = useGetMyProfileQuery({});
  const {
    name,
    email,
    profileImg,
    contactNo,
    companyName,
    city,
    gender,
    postCode,
    presentAddress,
    permanentAddress,
  } = userData?.data || {};
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  //// set default values
  useEffect(() => {
    form.setFieldsValue({
      name: name,
      contactNo: contactNo,
      companyName: companyName,
      city: city,
      gender: gender,
      postCode: postCode,
      presentAddress: presentAddress,
      permanentAddress: permanentAddress,
    });
  }, [
    name,
    contactNo,
    companyName,
    city,
    gender,
    postCode,
    presentAddress,
    permanentAddress,
    form,
  ]);

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="My Profile " />
      <div className="pt-4 px-4 profile-top-part">
        <h4 className="fw-bold side-header">My Profile</h4>
        <button className="profile-edit-btn" onClick={() => setEdit(!edit)}>
          <FontAwesomeIcon icon={faEdit} />
          <span>&nbsp;{edit === false ? "Edit" : "Cancel"}</span>
        </button>
      </div>
      <hr style={{ marginBottom: "0" }} />
      {edit ? (
        <div className="p-3">
          <UpdateProfile setEdit={setEdit} />
        </div>
      ) : (
        <>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Loader />
            </div>
          ) : (
            <>
              <div className="coverPhoto"></div>
              <div className="topProfileData" data-aos="fade-zoom-in">
                {profileImg ? (
                  <img width="170px" height="170px" src={profileImg} alt="" />
                ) : (
                  <img width="170px" height="170px" src={profile} alt="" />
                )}
                <h5>{name}</h5>
              </div>
              <div className="profileAllInfo" data-aos="fade-zoom-in">
                <div className="profileUserInfo">
                  <h5
                    className="text-center mt-3 fw-bold"
                    style={{ color: "rgb(255, 115, 0)", marginBottom: "20px" }}
                  >
                    Personal Information
                  </h5>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      Email
                    </p>
                    <p className="m-0 fw-bold">{email}</p>
                  </div>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      Contact Number
                    </p>
                    <p className="m-0 fw-bold">{contactNo}</p>
                  </div>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      Gender
                    </p>
                    <p className="m-0 fw-bold">{gender}</p>
                  </div>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      Company Name
                    </p>
                    <p className="m-0 fw-bold">{companyName}</p>
                  </div>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      City
                    </p>
                    <p className="m-0 fw-bold">{city}</p>
                  </div>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      PostCode
                    </p>
                    <p className="m-0 fw-bold">{postCode}</p>
                  </div>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      Present Address
                    </p>
                    <p className="m-0 fw-bold">{presentAddress}</p>
                  </div>
                  <div className="personalInfoDiv">
                    <p className="m-0" style={{ color: "rgb(255, 115, 0)" }}>
                      Permanent Address
                    </p>
                    <p className="m-0 fw-bold">{permanentAddress}</p>
                  </div>
                </div>
                <div></div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
