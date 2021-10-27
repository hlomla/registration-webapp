module.exports = function(RegNumbers){
    
    async function home(req, res){
        var regNo = await RegNumbers.getRegList();
        console.log(regNo);
        res.render('index', {output: regNo})
    }

    async function reg_numbers(req, res){
        var regOfTowns = req.body.theRegs
        var towns = req.body.location
        if(!regOfTowns){
            req.flash('error', 'Please enter a valid registration number!')
        }
        else{
            await RegNumbers.insertReg(regOfTowns);
            (regOfTowns === regOfTowns && towns === towns)
            req.flash('success', 'Registration added successfully!')
        }
        res.redirect('/')
           
    }
    async function reset(req, res){
        await Greet.resetBtn();
        req.flash('key', 'Database has been cleared successfully!');
        res.redirect('/');
    }
    return {
        home,
        reg_numbers,
        reset
    }
}