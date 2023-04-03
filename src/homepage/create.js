import { Form } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Button, Input,message, Card } from 'antd';
import { useState } from 'react';
import { createFile } from "../api/fileupload";
import { useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';
  
 const CreateFile =()=>{
  const [defaultFileList, setDefaultFileList] = useState([]);
 

  const navigate = useNavigate();
   const handleOnChange = ({ fileList}) => {
    setDefaultFileList(fileList);
  };
   const submitForm = async (formData) => {
    
    var myfile = await getBase64(defaultFileList[0].originFileObj);
    var filename = defaultFileList[0].name;
    var fileSize = defaultFileList[0].size;
    var newdata = {
      filename: filename,
      filecontent: myfile,
      fileSize: fileSize,
    };   
    console.log(filename);
    createFile(newdata)
        .then(() => {
          navigate('/')
        })
        .catch((e) => {
         console.log(`${e?.data?.message}`, "error");
        })   
    };

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    const uploadImage = async (options) => {
      const { onSuccess } = options;
  
      onSuccess('OK');
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

   return(
    <>
     <Row>
      <Col span={8}></Col>
      <Col span={8}>
     <Card style={{marginTop: "250px"}}>

     </Card>
     <Form
       className="w-full overflow-auto my-10"
       layout="vertical"
       name="form"
       onFinish={submitForm}
     >
     <Form.Item
      
       name="filename"
     >
           <Upload
                      accept="application/pdf"
                      customRequest={uploadImage}
                      onChange={handleOnChange}
                      listType="picture-card"
                      defaultFileList={defaultFileList}
                      className="image-upload-grid"
                    >
                      {defaultFileList.length >= 1 ? null : (
                        <div>Upload Your File</div>
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
     </Col>
     <Col span={8}></Col>
    </Row>
     
    </>
   )   
}
export default CreateFile;