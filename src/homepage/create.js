import { Form } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Button, message } from 'antd';
import { useState } from 'react';
import { createFile } from "../api/fileupload";
import { useNavigate } from "react-router-dom";

 const CreateFile =()=>{
   
   const history = useNavigate();
   const submitForm = async (formData) => {
    
       var data = null;
       createFile(data)
        .then(() => {
        console.log("added file");
        })
        .catch((e) => {
         console.log(`${e?.data?.message}`, "error");
        })
      
    };

   const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      // if (!isJpgOrPng) {
      //   message.error('You can only upload JPG/PNG file!');
      // }
       const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!isLt2M) {
      //   message.error('Image must smaller than 2MB!');
      // }
      return true && isLt2M;
    };

    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    };

    const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    };
    const uploadButton = (
      <div>
        {loading ? <></> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
   return(
    <>
    <div>create </div>
     <Form
       className="w-full overflow-auto"
       layout="vertical"
       name="form"
       onFinish={submitForm}
     >
     <Form.Item
       label= "Upload File"
       name="newfile"
     >
            <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      </Form.Item> 
      <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block 
                >
                 Upload File
                </Button>
     </Form>
    </>
   )   
}
export default CreateFile;