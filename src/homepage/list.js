import { Table , Card} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { getFiles, deleteFile } from "../api/fileupload.js";
const ListFile =()=>{   
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  useEffect(()=>{
    getFilesData();
  },[])
  const getFilesData = () => {
    getFiles()
    .then((res) => {
      setFiles(res.data);
    })
    .catch((e) => {
      console.log(`${e?.data?.message}`, "error");
    })
    
  };
    const columns = 
        [
            {
              title: 'File Name',
              dataIndex: 'filename',
              key: 'filename',
            
            },
            {
              title: 'File Size',
              dataIndex: 'filesize',
              key: 'filesize',
            },
            {
                title: 'Uploaded Date',
                dataIndex: 'uploadeddate',
                key: 'uploadeddate',
              },
          
    ] 
    return(
     <>
        <div>List Of files</div> 
        <Card>
            <button onClick={()=>  navigate('/create')} >Create</button>
        </Card>
        <Table columns={columns} dataSource={files}></Table>
     </>
    )   
 }
 export default ListFile;