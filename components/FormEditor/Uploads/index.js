import React from 'react';
import { Upload,message } from 'antd';
import { LoadingOutlined, PlusOutlined  } from '@ant-design/icons';
import {proxy} from './../../../config/index';
import { object } from 'prop-types';

class Uploads extends React.Component {
  state = {
    imgUrl: this.props.imgUrl||{},
    loading: false
  }
  beforeUpload = (file) => {
    console.log(this.props,'12121211212');
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  handleChange = (info) => {
    const {response} = info.file;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imgUrl: Object.assign(this.state.imgUrl, {url:`${proxy.api}${response.data}`}),
        loading: false,
      })
      this.props.onChange &&
      this.props.onChange({
        imgUrl: this.state.imgUrl
      });
    }
  }
  uploadButton = (
    <div>
      {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  render() {
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`${proxy.api}/upload/file`}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {this.state.imgUrl ? <img src={this.state.imgUrl.url} alt="avatar" style={{ width: '100%' }} /> : this.uploadButton}
        </Upload>
        {this.state.v?this.state.imgUrl.url:''}
      </div>
    );
  }
}

export default Uploads;
