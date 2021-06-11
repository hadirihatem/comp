// import React, { useState, useEffect} from 'react'
// import { Typography, Button, Form, message, Input,  } from 'antd';
// import Dropzone from 'react-dropzone';

// import { onDrop } from '../action/postaction';

// const { Title } = Typography;
// const { TextArea } = Input;


//     const Private = [
//         { value: 0, label:'Private'},
//         { value: 1, label:'Public'}
//     ]
    
      
//     const Post = () => {
    
//         const [title, setTitle] = useState("");
//         const [Description, setDescription] = useState("");
//         // 0 for privet and 1 for public 
//         const [privacy, setPrivacy] = useState(0)
        
    
    
//         const handleChangeTitle = ( event ) => {
//             setTitle(event.currentTarget.value)
//         }
    
//         const handleChangeDecsription = (event) => {
//             console.log(event.currentTarget.value)
    
//             setDescription(event.currentTarget.value)
//         }
    
//         const handleChangeOne = (event) => {
//             setPrivacy(event.currentTarget.value)
//         }
         
//         const onSubmit = () => {
            
//         }
      

//     return (
//         <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
//         <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//             <Title level={2} > Upload Video</Title>
//         </div>

//         <Form onSubmit={onSubmit}>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Dropzone 
//                      onDropp ={onDrop}
//                     multiple={false}
//                     maxSize={800000000}>
//                     {({ getRootProps, getInputProps }) => (
//                         <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                             {...getRootProps()}
//                         >
//                             <input {...getInputProps()} />
                    

//                         </div>
//                     )}
//                 </Dropzone>

//                 {/* {thumbnail !== "" &&
//                     <div>
//                         <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
//                     </div>
//                 } */}
//             </div>

//             <br /><br />
//             <label>Title</label>
//             <Input
//                  onChange={handleChangeTitle}
//                  value={title}
//             />
//             <br /><br />
//             <label>Description</label>
//             <TextArea
//                  onChange={handleChangeDecsription}
//                  value={Description}
//             />
//             <br /><br />

//             <select onChange={handleChangeOne}>
//                 {Private.map((item, index) => (
//                     <option key={index} value={item.value}>{item.label}</option>
//                 ))}
//             </select>
//             <br /><br />

//             <Button type="primary" size="large" onClick={onSubmit}>
//                 Submit
//             </Button>

//         </Form>
//     </div>
//     )
// }






