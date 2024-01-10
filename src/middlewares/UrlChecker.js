
function UrlChecker(req,res,next){
    const {link}=req.body;
    const isValidUrl = urlString=> {

        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    
    }
    
    if(isValidUrl(link)){
        next();
    }else{
        res.json({
            message:"In valid URL"
        })
        // throw new Error("Please Enter valid url")

    }
}

export default UrlChecker