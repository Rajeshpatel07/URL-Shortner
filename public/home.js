const form=document.querySelector('form')
const loader=document.querySelector('#loader')
const div=document.querySelector('#link')
const url=document.querySelector('h5')
const copyimg=document.querySelector('#copy')
const err=document.querySelector('p')

loader.style.display='none'
div.style.display='none'
err.style.display='none'

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    div.style.display='none'
    err.style.display='none'

    const formdata=form.link.value
    
    const link=formdata.trim()
    if(link.length===0){
        err.style.display='block'
        return err.innerText="Please Enter URL"
    }
    
    console.log(link)
    loader.style.display='block'


    setTimeout(()=>{
        loader.style.display='none'
        div.style.display='block'
    },2000)

    copyimg.addEventListener('click',(e)=>{
        e.preventDefault()
        navigator.clipboard.writeText(url.innerText);
        copyimg.setAttribute('src','Tick.png')
        
        setTimeout(() => {
            copyimg.setAttribute('src','copy.png')
        },4000);
    })


   try{
    const req=await fetch('/upload',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({link:link})
    })

    const res=await req.json();
    console.log(res)
    
    if(res){
        if(res.opurl){
            url.innerText=res.opurl;
        }
        if(res.message){
            url.innerText=res.message;
        }
    }else{
        url.innerText='Please try again..'
    }
   } 
   catch{
    console.log('Server Breakdown')
   }
})