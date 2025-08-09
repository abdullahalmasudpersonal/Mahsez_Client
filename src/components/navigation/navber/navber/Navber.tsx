
import { Col, Image, Row, Typography } from 'antd';
import './Navber.css';
import logo from '../../../../../public/assets/img/logo/mahsez.head.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

const Navber = () => {
  return (
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 16px",  border: '2px solid red' }}>
      {/* <div>
        Top Header
      </div> */}
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={8}>
         <Image src={logo} />

        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "right" }}>
          Menu / Actions
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "right" }}>
         <FontAwesomeIcon icon={faHeadset} />
         <Typography>Call us now : (+88) 01737-906772</Typography>
         <Typography>Email : m.mahsez@gmail.com</Typography>
        </Col>
      </Row>
      {/* <div>
        buttom header
      </div> */}
    </div>
  );
};

export default Navber;