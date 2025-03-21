import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router'

import {  useEffect } from 'react';

import '../App.css'


function CreatePost() {


    let navigate = useNavigate();
    const initialValues = {
        title:"",
        postText:"",
    }

    useEffect(() => {
    if(!localStorage.getItem("accessToken")){
        navigate("/");
    }
    },[])
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Lütfen Başlık Giriniz."),
        postText: Yup.string().required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, {headers: {accessToken: localStorage.getItem("accessToken")}} )
        .then(() => { 
            navigate('/')
        })
    };


  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Title:</label>
                <ErrorMessage name="title" component="span"/>
                <Field autocomplate="off" id="inputCreatePost" name="title" placeholder="(Ex. Title...)" />
                
                <label>Post:</label>
                <ErrorMessage name="postText" component="span"/>
                <Field autocomplate="off" id="inputCreatePost" name="postText" placeholder="(Ex. Post...)" />
                
                
                <button type='submit'>Create Post</button>   
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost