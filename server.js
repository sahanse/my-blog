import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port=3000;
const app=express();
const api_url="http://localhost:4000"

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.json()); 

//for get request on root
app.get("/", async(req,res)=>{
    try{
        const response= await axios.get(api_url+`/posts`);
        res.render("index.ejs",{
            posts:response.data
        });
    }catch(error){
        res.render("index.ejs",{
            err:error.message
        })
    }
});

//to get request to create new post
app.get("/new-post",(req,res)=>{
    res.render("modify.ejs",{
        heading:"Create New Post",
        submit:"Submit Post"
    })
});

//get request on edit post
app.get("/edit-post/:id",async(req,res)=>{
    const id= parseInt(req.params.id);
    try{
        const response = await axios.get(api_url+`/edit/${id}`);
        const new_data= response.data;
        res.render("modify.ejs",{
            heading:"Edit Post",
            submit:"Edit Post",
            edit_data:new_data
        })
    }catch(error){

    }
});

//post request to post a new post
app.post("/new-data",async(req,res)=>{
    try{
        const response= await axios.post(api_url+`/post-new`,req.body);
        res.redirect("/")
    }catch(error){

    }
});

//post request to edit the data
app.post("/edit-data/:id", async(req,res)=>{
    const id= parseInt(req.params.id);
    
    try{
        const response =await axios.patch(api_url+`/post/edit/${id}`,req.body)
        res.redirect("/");
    }catch(error){

    }
});

app.get("/delete-post/:id", async(req,res)=>{
    const id = parseInt(req.params.id);
    try{
        const response =await axios.delete(api_url+`/delete-post/${id}`);
        res.redirect("/")
    }catch(error){

    }
})

//listening to the port
app.listen(port,()=>{
    console.log("listening to the port:",port);
});
