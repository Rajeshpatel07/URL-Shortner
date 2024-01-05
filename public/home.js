const form=document.querySelector('form')
const loader=document.querySelector('#loader')
const div=document.querySelector('#link')
const url=document.querySelector('h5')
const copyimg=document.querySelector('#copy')

loader.style.display='none'
div.style.display='none'

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    loader.style.display='block'
    div.style.display='none'

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

    const link=form.link.value

   try{
    const req=await fetch('/upload',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({link:link})
    })

    const res=await req.json();
    
    if(res){
        url.innerText=res.opurl;
    }else{
        url.innerText='Please try again..'
    }
   } 
   catch{
    console.log('Server Breakdown')
   }
})