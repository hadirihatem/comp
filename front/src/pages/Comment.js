import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Comment = (props) => {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // const variables = { 
        //     content: Comment,
        //     writer: user.userData._id,
        //     postId: props.postId   
        //  }
        //  axios.post('', variables)
        //  .then(response=> {
        //      if(response.data.success) {
        //          setComment("")
        //          props.refreshFunction(response.data.result)
        //      } else {
        //          alert('Failed to save Comment')
        //      }
        //  })
        }
    return (
        <div>
            console.log(props.commentList)
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <input style={{width:'100%' , borderRadius:'5px'}}
                onChange ={handleChange}
                value ={Comment}
                placeholder="write your comment"/>
                <br/>
                <button style={{width:'20%' , height:'50px'}} onClick={onSubmit}>add comment</button>
            </form>
        </div>
    )
}

export default Comment
