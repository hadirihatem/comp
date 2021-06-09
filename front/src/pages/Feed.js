import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {loadUser} from '../action/authaction'
import{Button} from './Button'
import './Feed.css'
import '../App.css'
import {Link} from 'react-router-dom'


const Feed = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        if(!auth.user)
        dispatch(loadUser())
     
    }, [dispatch,auth.user])

    
    
    return (
        <div className='feed-container'>
        <video src="/videos/video-1.mp4" autoPlay loop muted/>
        <h1>adventure begings NOW</h1><br/>
       
       
        <div className='feed-btns'>
          
            <Button className='btns' buttonStyle='btn--outline'
            buttonSize='btn--large' >
                <Link to='/Profile' className='get-started' style={{textDecoration:'none'}}>
                GET STARTED
                </Link>
                </Button>
            </div>
            
            {auth.user &&<p>hello {auth.user.lastname}</p>}
        </div>

    )
}

export default Feed
