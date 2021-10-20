module.exports = function RegNo(pool) {
    var regArray = {}
    var regList = regArray || {};
    var filteredReg = {}


     async function insertReg(registrations) {
        try {
            var ifRegExists = await pool.query('select name from registration where name = $1', [registrations])
            if(ifRegExists.rowCount === 0){
                await pool.query('insert into registrations(name,begin) values("CA","CW", "CY")')
            }
        } catch (error) {
            
        }
     }
     async function regNoSelected(registrations) {
         try {
            var regTowns = registrations.trim().toUpperCase()
            var regex = /^C(A|Y|W)\s[0-9]{6}$/

            if (regex.test(regTowns)) {
                if (!regList.includes(regTowns))
                    regList.push(regTowns)
                console.log(regList);
                return regList
            } else {
                return 'Invalid Entry!'
            }
         } catch (error) {
             
         }
    }

     async function setRegNo(reg) {
         try {
            for (var i = 0; i < regList.length; i++) {
                if (!regList[i].startsWith(reg)) {
                    filteredReg.push(regList[i])
                }
            }
            return filteredReg
         } catch (error) {
             
         }
       
    }

    function getRegList() {
        return regList
    }
    function regError(reg) {
        if (reg === "") {
            return "Please enter a registration number!"
        }
        else if (regList.includes(reg)) {
            return "Registration already added!"
        }

    }
    function successMessage() {
            return "Registration number added successfully!"
        
    }
    function regErrTime() {
        return " "
    }

    return {
        insertReg,
        regNoSelected,
        setRegNo,
        getRegList,
        regError,
        regErrTime,
        successMessage
    }
}