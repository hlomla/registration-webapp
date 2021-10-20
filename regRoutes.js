module.exports = function(RegNumbers){
    
    async function home(req, res){
        console.log(RegNumbers.regNoSelected)
        res.render('index', {output: await RegNumbers.regNoSelected(

        )}
        )
    }
    return {
        home
    }
}