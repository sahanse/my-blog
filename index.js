import express from "express";
import boyParser from "body-parser";
import bodyParser from "body-parser";

const port =4000;
const app= express();

app.use(boyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.json());

// //all posts
let posts = [
    {
      id: 1,
      title: "The Rise of Decentralized Finance",
      content:
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
      author: "Alex Thompson",
      date: "2023-08-01T10:00:00Z",
    },
    {
      id: 2,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content:
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
    },
    {
      id: 3,
      title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
      content:
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
      author: "Samuel Green",
      date: "2023-08-10T09:15:00Z",
    },
  ];

app.get("/posts",(req,res)=>{
    res.json (posts);
});

app.get("/edit/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const find_data= posts.find((post)=> post.id===id);
  res.json(find_data);
});

app.post("/post-new",(req,res)=>{
  const new_id= posts.length+1;
  const new_title=req.body.title;
  const new_content=req.body.content;
  const new_author= req.body.author;
  const new_date=new Date();
  const new_data={
    id: new_id,
    title:new_title,
    content:new_content,
    author:new_author,
    date:new_date
  }
  posts.push(new_data);
  res.status(200).json({message:"success"})
})

//patch the data
app.patch("/post/edit/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const post= posts.find((p)=>p.id===id);
  if(!post) res.status(400).json({message:"post not found"});

  if(req.body.title) post.title=req.body.title;
  if(req.body.content) post.content=req.body.content;
  if(req.body.author) post.author=req.body.author;
  console.log(post);
  res.status(200).json(post);
});

//deletintg the post
app.delete("/delete-post/:id",(req,res)=>{
  console.log("hello")
  const id = parseInt(req.params.id);
  const post_index=posts.findIndex((post)=> post.id===id);

  if(post_index>-1){
    posts.splice(post_index,1);
    res.status(200).json({message:"post deleted successfully"});
  }
});

//listening to port
app.listen(port,()=>{
    console.log("listening to port:",port);
});

