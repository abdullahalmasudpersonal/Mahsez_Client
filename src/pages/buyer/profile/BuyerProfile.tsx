import Loader from "@/pages/shared/loader/Loader";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Button, Card, Descriptions, } from "antd";
import { useEffect, useState } from "react";
import profile from "@/assets/img/profile/profileAvater.jpg";
import Title from "antd/es/typography/Title";
import './BuyerProfile.css';
import UpdateBuyerProfile from "./UpdateBuyerProfile";
import PageTitle from "@/pages/shared/PageTitle/PageTitle";

const BuyerProfile = () => {
    const [edit, setEdit] = useState(false);
    const [column, setColumn] = useState(window.innerWidth < 850 ? 1 : 2);
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

    useEffect(() => {
        const handleResize = () => {
            setColumn(window.innerWidth < 850 ? 1 : 2);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    // const handleDelete = (id: string) => {
    //     message.success(`Device ${id} deleted!`);
    //     // TODO: এখানে API কল যোগ করবে
    // };
    // const handleDeleteAll = () => {
    //     message.success("All devices deleted!");
    //     // TODO: এখানে API কল যোগ করবে
    // };
    // const columns = [
    //     {
    //         title: "Device",
    //         dataIndex: "device",
    //         key: "device",
    //     },
    //     {
    //         title: "Location",
    //         dataIndex: "location",
    //         key: "location",
    //     },
    //     {
    //         title: "Last Active",
    //         dataIndex: "lastActive",
    //         key: "lastActive",
    //     },
    //     {
    //         title: "Action",
    //         key: "action",
    //         render: (_: any, record: any) => (
    //             <Popconfirm
    //                 title="Delete this device?"
    //                 onConfirm={() => handleDelete(record.id)}
    //                 okText="Yes"
    //                 cancelText="No"
    //             >
    //                 <Button type="link" danger>
    //                     Delete
    //                 </Button>
    //             </Popconfirm>
    //         ),
    //     },
    // ];

    // const deviceActivity = [
    //     { device: "Windows PC", location: "Dhaka, Bangladesh", lastActive: "2025-08-15 14:22" },
    //     { device: "Android Phone", location: "Chattogram, Bangladesh", lastActive: "2025-08-14 20:10" },
    //     { device: "iPhone 13", location: "Rajshahi, Bangladesh", lastActive: "2025-08-13 09:45" },
    // ];

    return (
        <div style={{ flex: 1, }}>
             <PageTitle pageTitle="My Profile " />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#002952b2', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>My Profile</h5>
                <Button onClick={() => setEdit(!edit)}>
                    <FontAwesomeIcon icon={faEdit} />
                    <span>&nbsp;{edit === false ? "Edit" : "Cancel"}</span>
                </Button>
            </div>
            {
                edit ? <div>
                    <UpdateBuyerProfile setEdit={setEdit} />
                </div > : (<>
                    {isLoading ? (<div
                        style={{
                        }}>
                        <Loader />
                    </div>) :
                        <>
                            <div className="coverPhoto"></div>
                            <div className="topProfileData" >
                                {profileImg ? (
                                    <img width="170px" height="170px" src={profileImg} alt="" />
                                ) : (
                                    <img width="170px" height="170px" src={profile} alt="" />
                                )}
                                <h5 style={{ textAlign: 'center',fontSize:'24px',color:'#ffffffff',  }}>{name}</h5>
                            </div>

                            <Card style={{ borderRadius: 2, marginTop: 20, backgroundColor: '#0b2644ff', border: '1px solid #2a405cff', }}>
                                <Title level={4} style={{ marginBottom: 20, color: 'white', }}>
                                    Personal Information
                                </Title>

                                <Descriptions
                                    bordered
                                    column={column}
                                    labelStyle={{ fontWeight: 800, width: 185 }}
                                    contentStyle={{ color: 'white' }}
                                >
                                    <Descriptions.Item style={{ color: 'white' }} label="Name">{name || "-"}</Descriptions.Item>
                                    <Descriptions.Item label="Email" style={{ color: 'white' }}>{email || "-"}</Descriptions.Item>
                                    <Descriptions.Item label="Contact" style={{ color: 'white' }}>{contactNo || "-"}</Descriptions.Item>
                                    <Descriptions.Item label="Company" style={{ color: 'white' }}>{companyName || "-"}</Descriptions.Item>
                                    <Descriptions.Item label="City" style={{ color: 'white' }}>{city || "-"}</Descriptions.Item>
                                    <Descriptions.Item label="Gender" style={{ color: 'white' }}>
                                        {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Post Code" style={{ color: 'white' }}>{postCode || "-"}</Descriptions.Item>
                                    <Descriptions.Item label="Present Address" style={{ color: 'white' }}>{presentAddress || "-"}</Descriptions.Item>
                                    <Descriptions.Item label="Permanent Address" span={2} style={{ color: 'white' }}>
                                        {permanentAddress || "-"}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            {/* <Card style={{ borderRadius: 0, marginTop: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                    <Title level={4} style={{ margin: 0 }}>
                                        Device Activity
                                    </Title>
                                    <Popconfirm
                                        title="Delete all devices?"
                                        onConfirm={handleDeleteAll}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger type="primary">
                                            Delete All
                                        </Button>
                                    </Popconfirm>
                                </div>

                                <Table
                                    dataSource={deviceActivity}
                                    columns={columns}
                                    rowKey="id"
                                    pagination={{ pageSize: 5 }}
                                    scroll={{ x: "max-content" }}
                                />
                            </Card> */}
                        </>}
                </>)
            }

        </div>
    );
};

export default BuyerProfile;