module.exports = function RegNo(pool) {

    async function insertReg(registration) {
        const storeID = registration.trim().toUpperCase(2).substring(0, 2);
        console.log(storeID.length);
        try {
                            await pool.query(`insert into registration(theReg,id_town) values($1,$2)`, [registration, storeID])            
        } catch (error) {
            console.error('insertReg fun ==>', error)
        }
    }

    async function getId(id) {
        try {
            let townId = await pool.query(`select id_town FROM registration where id_town = '${id}'`);
            console.log("***********"+townId.rows[0].id);
        return townId.rows[0].id;
        } catch (error) {
            console.log(`getId ==${error}`);
        }
    }

    async function regNoSelected(registrations) {

        try {
            var townReg = registrations.trim().toUpperCase()
            var regex = /^C(A|Y|W)\s[0-9]{6}$/

        if (regex.test(townReg)) {
            if (!regList.includes(townReg))
                regList.push(townReg)
            console.log(regList);
            return regList
        } else {
            return 'Invalid Entry!'
        }
            
        } catch (error) {
            console.log(`regNoSelected ==> ${error}`);
        }
        
    }

    async function townAdded(regName, placeReg){
        await pool.query('insert into regTowns(name,begin) values($1, $2)', [regName, placeReg]);
    }

    async function getRegList() {
        var regList = await pool.query('Select * from registration')
        return regList.rows;
    }
    async function resetBtn() {
        await pool.query('DELETE FROM registration')
    }
    return {
        getId,
        townAdded,
        insertReg,
        regNoSelected,
        getRegList,
        resetBtn
    }
}