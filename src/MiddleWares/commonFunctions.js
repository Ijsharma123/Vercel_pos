
const Company = require('../Models/wpsAdmin/company')
const Subscription = require('../Models/wpsAdmin/subscription')
const Notification = require('../Models/wpsAdmin/notification')

const bcrypt = require('bcrypt');
const Constant = require('../MiddleWares/lib/constants')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


/* Token Generate Function */
exports.TokenGenerateFunction = async (payload) => {
    try {
        let Token = ''
        const TokenData = jwt.sign(payload, process.env.JWT_Key, { expiresIn: 86400 })                  // 86400 seconds means 24 hours
        if (TokenData) {
            const TokenGenerate = `Bearer ${TokenData}`
            Token = await TokenEncrypt(TokenGenerate, process.env.JWT_Key)
            return Token
        } else {
            return msg = "Something went wrong in Token Generate Function"
        }
    } catch (error) {
        return error
    }
}


/* Change Password Function */
exports.changePasswordFunction = async (hashField, model, Id) => {
    try {
        const newPassSave = await bcrypt.hash(hashField, 10)
        const dataSave = await model.findByIdAndUpdate(Id, { password: newPassSave })
        return msg = Constant.PASSWORD_MSG
    } catch (error) {
        return error
    }
}


/* Forget Password Function */
exports.forgetPasswordFunction = async (hashField, model, number) => {
    try {
        const passwordChange = await bcrypt.hash(hashField, 10)
        const dataSave = await model.findOneAndUpdate({ mobile_number: number }, { password: passwordChange })
        return msg = Constant.PASSWORD_MSG
    } catch (error) {
        return error
    }
}


/* Token Encrypt Function Using CryptoJS */
const TokenEncrypt = async (data, key) => {
    try {
        const encrypt = cryptoJS.AES.encrypt(data, key).toString()
        return encrypt
    } catch (error) {
        console.log("error", error);
        return error
    }
}


/* Token Decrypt Function Using CryptoJS */
exports.TokenDecrypt = async (data, key) => {
    try {
        if (data && key) {
            const decrypt = cryptoJS.AES.decrypt(data, key)
            const decryptedData = decrypt.toString(cryptoJS.enc.Utf8);
            return decryptedData
        } else {
            return decryptedData = "Something went wrong in Token Decrypt Function"
        }
    } catch (error) {
        console.log("error", error);
        return error
    }
}


/* Company Id Generate Function */
exports.randomCompanyId = async (name) => {
    try {
        const RANNUM = Math.floor(1000000000000 + Math.random() * 999999999999)
        const GENID = `COMP_ID${RANNUM}`
        return GENID
    } catch (error) {
        return error
    }
}


/* Company Id Generate Function For Admin */
exports.randomCompanyId = async (name) => {
    try {
        const RANNUM = Math.floor(100000000000000000 + Math.random() * 99999999999999999)
        const GENID = `COMP_ID${RANNUM}`
        return GENID
    } catch (error) {
        return error
    }
}

/*---------------------------------- Subscription Function Module Start ---------------------------------*/

/* Function For Update Subscription */
exports.updateSubscription = async (Id) => {
    try {
        const findCompany = await Company.findById({ _id: Id })
        const findsubscription = await Subscription.findOne({ _id: findCompany.subscription_id })
        const CompanyDate = findCompany.date
        const FinalDays = await ExpireDate(CompanyDate, findsubscription.no_of_day)
        const addExpiryDateInComp = await Company.findByIdAndUpdate({ _id: Id }, { subscription_expiry_date: FinalDays })
        const addExpiryDateInSubs = await Subscription.findByIdAndUpdate({ _id: findCompany.subscription_id }, { subscription_expiry_date: FinalDays })
        return FinalDays
    } catch (error) {
        return error
    }
}

/* Calculate Subscription Expire Date */
const ExpireDate = async (dDate, skipDays) => {
    console.log(dDate, skipDays)
    var nYear = dDate.getFullYear();
    var nMonth = dDate.getMonth();
    var nDate = dDate.getDate();
    var remainDays = skipDays;

    while (remainDays > 0) {
        const calculateYearMonth = await DaysOfMonth(nYear, nMonth)
        remainDays_month = calculateYearMonth - nDate;
        console.log(remainDays_month)
        if (remainDays > remainDays_month) {
            remainDays = remainDays - remainDays_month;
            console.log(123, remainDays)
            nDate = 1;
            if (nMonth < 11) { nMonth = nMonth + 1; }
            else {
                nMonth = 0;
                nYear = nYear + 1;
            };
        }
        else {
            nDate === 1 ? nDate = 0 : nDate
            console.log("1----------", nDate, remainDays)
            nDate = nDate + remainDays;
            console.log("2-------", nDate, remainDays)
            remainDays = 0;
        };
    }
    return new Date(nYear, nMonth, nDate + 1);
};

/* Calculate Before 2 Days Expire Subscription Date */
const Before2Date = async (dDate, skipDays) => {
    var nYear = dDate.getFullYear();
    var nMonth = dDate.getMonth();
    var nDate = dDate.getDate() - 1;
    var remainDays = skipDays;

    console.log(nYear, nMonth, nDate, remainDays)

    nDate = nDate - remainDays;
    console.log('2-----------', nDate, remainDays)
    remainDays = 0;

    return new Date(nYear, nMonth, nDate + 1);
};

/* Calculate Days Of Month */
const DaysOfMonth = async (nYear, nMonth) => {
    switch (nMonth) {
        case 0:     // January
            return 31; break;
        case 1:     // February
            if ((nYear % 4) == 0) {
                return 29;
            }
            else {
                return 28;
            };
            break;
        case 2:     // March
            return 31; break;
        case 3:     // April
            return 30; break;
        case 4:     // May
            return 31; break;
        case 5:     // June
            return 30; break;
        case 6:     // July
            return 31; break;
        case 7:     // August
            return 31; break;
        case 8:     // September
            return 30; break;
        case 9:     // October
            return 31; break;
        case 10:     // November
            return 30; break;
        case 11:     // December
            return 31; break;
    }
};

/* Function For Check Subscription Expired Or Not */
exports.checkSubscription = async (Id) => {
    try {
        const findCompany = await Company.findById({ _id: Id })
        const subsExpiryDate = findCompany.subscription_expiry_date
        const currentDate = new Date()
        if (currentDate >= subsExpiryDate) {
            return { msg: (Constant.SUBSCRIPTION_EXPIRE) }
        }
        return subsExpiryDate
    } catch (error) {
        return error
    }
}

/* Before Subscription Expire push Notification Function */
exports.pushNotification = async (Id) => {
    try {
        const findCompany = await Company.findById({ _id: Id })
        const CompanyDate = findCompany.subscription_expiry_date
        const NotificationDate = 2
        const BeforeDate2 = await Before2Date(CompanyDate, NotificationDate)
        const BeforeDate = BeforeDate2.toISOString().split("T")[0]
        console.log("BeforeDate", BeforeDate)
        let currentDate = new Date()
        let FinalDate = currentDate.toISOString().split("T")[0]
        console.log(BeforeDate == FinalDate)
        if (FinalDate == BeforeDate) {
            await sendNotification(Id, CompanyDate, BeforeDate)
            return { msg: Constant.SEND_NOTIFICATION_MSG }
        }
        return BeforeDate
    } catch (error) {
        return error
    }
}

/* Send Notification Function */
const sendNotification = async (Id, CompanyDate, BeforeDate) => {
    try {
        const findCompany = await Company.findById({ _id: Id })
        const findsubscription = await Subscription.findOne({ _id: findCompany.subscription_id })
        const add = new Notification({
            subscription_id: findsubscription._id,
            company_id: findCompany._id,
            message: Constant.SUBSCRIPTION_MESSAGE,
            subscription_expiry_date: CompanyDate,
            notification_date: BeforeDate
        }).save()
        return { msg: Constant.STORED_MSG }
    } catch (error) {
        return error
    }
}

/*---------------------------------- Subscription Function Module End ---------------------------------*/



