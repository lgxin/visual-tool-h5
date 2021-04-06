import { Row, Col, Popover, Modal, Button} from 'antd';
import {useState} from 'react'
import QRCode from 'qrcode';
import API from '../../utils/api';
import { ArrowLeftOutlined, FileImageOutlined, CloudDownloadOutlined, CloseOutlined, CaretLeftOutlined} from '@ant-design/icons';
import html2canvas from 'html2canvas';
import Loading from './../loading';
import Preview from './../../pages/preview';

export default function PictureImage() {
    const [modalStatus, setModalStatus] = useState(false);
    const [defaultVisible, setDefaultVisible] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [qrcodeUrl, setQrcoderl] = useState('');
    const [loadingStatus, setloadingStatus] = useState(true);
    const [type, setType] = useState(0);
    const pictureImage = () => {
        setType(0);
        const resultsShow = document.querySelector('#resultsShow');
        setModalStatus(true);
        setTimeout(()=>{
            html2canvas(resultsShow, {
                allowTaint: true,
                useCORS: true,
                width: 380
            }).then(async function (canvas) {
                // toImage
                const dataImg = new Image()
                dataImg.src = canvas.toDataURL('image/png')
                setImageUrl(dataImg.src);
                try {
                    const {data} = await API.post('/upload/image',{file:dataImg.src});
                    QRCode.toDataURL(`http://10.0.0.175:8089/img/${data}.png`, { errorCorrectionLevel: 'H' }, function (err, url) {
                        setQrcoderl(url)
                        console.log(url);
                    })
                    setloadingStatus(false);
                } catch (error) {
                    console.log(error);
                }
                
            });
        })
    }
    const picturetemplate = () => {
        setModalStatus(true);
        setType(1);
        QRCode.toDataURL(`http://10.0.0.173:3000/preview`, { errorCorrectionLevel: 'H' }, function (err, url) {
            setQrcoderl(url)
            setloadingStatus(false);
        })
    }
    const downImage = () => {
        const alink = document.createElement("a");
        alink.href = imageUrl;
        alink.download = "image.jpg";
        alink.click();
        document.body.appendChild(alink);
        document.body.removeChild(alink);
    }
    const content = (
        <div>
           <div>
               <h4 style={{textAlign: 'center'}}>扫码预览</h4>
               <img style={{width:'100%',margin: '10px 0'}} src={qrcodeUrl} />
           </div>
           <div><Button type="primary" size="small" onClick={()=>{setModalStatus(false);setDefaultVisible(false);setloadingStatus(true);}}><CloseOutlined />关闭</Button></div>
           <div style={{marginTop: '10px'}}><Button type="primary" size="small" onClick={downImage}><CloudDownloadOutlined />下载</Button></div>
        </div>
      );
  return (
    <>
        <Row>
            <Col span={4} offset={0}><ArrowLeftOutlined /></Col>
            <Col span={12} offset={6}>
                <Popover placement="bottom" content='图片预览' trigger="hover">
                    <FileImageOutlined onClick={pictureImage}/>
                </Popover>
                <span style={{marginLeft: '20px'}}>
                    <Popover  placement="bottom" content='模板预览' trigger="hover">
                        <FileImageOutlined onClick={picturetemplate}/>
                    </Popover>
                </span>
            </Col>
        </Row>
        <Modal
            title={null}
            width={310}
            closable={false}
            visible={modalStatus}
            mask={true}
            footer={null}
            maskClosable={true}
            className="picture_image_modal"
        >
            {loadingStatus?<Loading/>:''}
            <img style={{
                position: 'absolute',
                top: 0,
                width: '100%'
            }} src="/images/phone.png" alt="底图" />
            <div className="picture_image" style={{
                position: 'relative',
                top: '-4px',
                height: '578px',
                left: '50%',
                borderRadius: '23px',
                marginLeft: '-110px',
                overflow: 'hidden',
                overflowY: 'auto',
                width: '267px',
                background: '#fff',
            }}>
                {!loadingStatus&&type==0? <img
                style={{ 
                    width: '100%',
                }} src={imageUrl} alt="底图" />:''}
                {!loadingStatus&&type==1?<Preview/>:''}
            </div>
            <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100px',
                textAlign: 'center',
                padding: '10px',
                right: '-130px',
                bottom: '20px',
                background: '#ffffff'
            }}>
                <div style={{
                    color: '#ffffff',
                    position: 'absolute',
                    top: '50%',
                    left: '-10px',
                    transform: 'translate(0, -50%)'
                }}><CaretLeftOutlined /></div>
                {content}
            </div>
        </Modal>
    </>
  )
}