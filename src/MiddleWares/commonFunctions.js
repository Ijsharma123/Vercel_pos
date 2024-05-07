
const Company = require('../Models/wpsAdmin/company')
const User = require('../Models/wpsAdmin/user')
const Privilege = require('../Models/wpsAdmin/privilege')
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
exports.updateSubscription = async (addDate, subscription_id) => {
    try {
        const findsubscription = await Subscription.findOne({ _id: subscription_id })
        const CompanyDate = addDate
        const FinalDays = await ExpireDate(CompanyDate, findsubscription.no_of_day)
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

    nDate = nDate + remainDays;
    console.log("2-------", nDate, remainDays)
    remainDays = 0;

    // return new Date(nYear, nMonth, nDate + 1);  // This is use for postman because expire date difference of 1 day (This work well in local but not in live)
    return new Date(nYear, nMonth, nDate); //This is use for live
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

    // return new Date(nYear, nMonth, nDate + 1);  // This is use for postman because expire date difference of 1 day (This work well in local but not in live)
    return new Date(nYear, nMonth, nDate); //This is use for live
};

/* Calculate Days Of Month */
// const DaysOfMonth = async (nYear, nMonth) => {
//     switch (nMonth) {
//         case 0:     // January
//             return 31; break;
//         case 1:     // February
//             if ((nYear % 4) == 0) {
//                 return 29;
//             }
//             else {
//                 return 28;
//             };
//             break;
//         case 2:     // March
//             return 31; break;
//         case 3:     // April
//             return 30; break;
//         case 4:     // May
//             return 31; break;
//         case 5:     // June
//             return 30; break;
//         case 6:     // July
//             return 31; break;
//         case 7:     // August
//             return 31; break;
//         case 8:     // September
//             return 30; break;
//         case 9:     // October
//             return 31; break;
//         case 10:     // November
//             return 30; break;
//         case 11:     // December
//             return 31; break;
//     }
// };

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

/*---------------------------------- Privelege Validate Function Module Start ---------------------------------*/

exports.listPermission = async (Id, Module) => {
    try {
        let optionData = []
        let namevalue = ''
        let checkedvalue = ''
        let moduleName = ''
        let msg = ''
        let error = ''


        const companyData = await Company.findById({ _id: Id })
        var user = await User.findById({ _id: Id })
        const company = (companyData != null) ? companyData : user
        const privilegeData = await Privilege.find({ _id: company.privilege })

        if (privilegeData.length > 0) {
            await Promise.all(privilegeData[0].access.map(async (x, i) => {
                moduleName = x.name == Module
                if (moduleName) {
                    optionData = x.options
                    const newArray = await Promise.all(optionData.map(async (element) => {
                        namevalue = element['name']
                        checkedvalue = element['checked']
                        if (namevalue == 'list' && checkedvalue == true) {
                            msg = { msg: Constant.MODULE_ACCESS }
                        }
                    }))
                }
            }))
        } else {
            msg = { error: Constant.PRIVILEGE_ERROR }
        }
        return msg
    } catch (error) {
        return error
    }
}

exports.addPermission = async (Id, Module) => {
    try {
        let optionData = []
        let namevalue = ''
        let checkedvalue = ''
        let moduleName = ''
        let msg = ''
        let error = ''

        const companyData = await Company.findById({ _id: Id })
        var user = await User.findById({ _id: Id })
        const company = (companyData != null) ? companyData : user
        const privilegeData = await Privilege.find({ _id: company.privilege })

        if (privilegeData.length > 0) {
            await Promise.all(privilegeData[0].access.map(async (x, i) => {
                moduleName = x.name == Module
                if (moduleName) {
                    optionData = x.options
                    const newArray = await Promise.all(optionData.map(async (element) => {
                        namevalue = element['name']
                        checkedvalue = element['checked']
                        if (namevalue == 'add' && checkedvalue == true) {
                            msg = { msg: Constant.MODULE_ACCESS }
                        }
                    }))
                }
            }))
        } else {
            msg = { error: Constant.PRIVILEGE_ERROR }
        }
        return msg
    } catch (error) {
        return error
    }
}

exports.editPermission = async (Id, Module) => {
    try {
        let optionData = []
        let namevalue = ''
        let checkedvalue = ''
        let moduleName = ''
        let msg = ''
        let error = ''

        const companyData = await Company.findById({ _id: Id })
        var user = await User.findById({ _id: Id })
        const company = (companyData != null) ? companyData : user
        const privilegeData = await Privilege.find({ _id: company.privilege })

        if (privilegeData.length > 0) {
            await Promise.all(privilegeData[0].access.map(async (x, i) => {
                moduleName = x.name == Module
                if (moduleName) {
                    optionData = x.options
                    const newArray = await Promise.all(optionData.map(async (element) => {
                        namevalue = element['name']
                        checkedvalue = element['checked']
                        if (namevalue == 'edit' && checkedvalue == true) {
                            msg = { msg: Constant.MODULE_ACCESS }
                        }
                    }))
                }
            }))
        } else {
            msg = { error: Constant.PRIVILEGE_ERROR }
        }
        return msg
    } catch (error) {
        return error
    }
}

exports.deletePermission = async (Id, Module) => {
    try {
        let optionData = []
        let namevalue = ''
        let checkedvalue = ''
        let moduleName = ''
        let msg = ''
        let error = ''

        const companyData = await Company.findById({ _id: Id })
        var user = await User.findById({ _id: Id })
        const company = (companyData != null) ? companyData : user
        const privilegeData = await Privilege.find({ _id: company.privilege })

        if (privilegeData.length > 0) {
            await Promise.all(privilegeData[0].access.map(async (x, i) => {
                moduleName = x.name == Module
                if (moduleName) {
                    optionData = x.options
                    const newArray = await Promise.all(optionData.map(async (element) => {
                        namevalue = element['name']
                        checkedvalue = element['checked']
                        if (namevalue == 'delete' && checkedvalue == true) {
                            msg = { msg: Constant.MODULE_ACCESS }
                        }
                    }))
                }
            }))
        } else {
            msg = { error: Constant.PRIVILEGE_ERROR }
        }
        return msg
    } catch (error) {
        return error
    }
}

exports.viewPermission = async (Id, Module) => {
    try {
        let optionData = []
        let namevalue = ''
        let checkedvalue = ''
        let moduleName = ''
        let msg = ''
        let error = ''

        const companyData = await Company.findById({ _id: Id })
        var user = await User.findById({ _id: Id })
        const company = (companyData != null) ? companyData : user
        const privilegeData = await Privilege.find({ _id: company.privilege })

        if (privilegeData.length > 0) {
            await Promise.all(privilegeData[0].access.map(async (x, i) => {
                moduleName = x.name == Module
                if (moduleName) {
                    optionData = x.options
                    const newArray = await Promise.all(optionData.map(async (element) => {
                        namevalue = element['name']
                        checkedvalue = element['checked']
                        if (namevalue == 'view' && checkedvalue == true) {
                            msg = { msg: Constant.MODULE_ACCESS }
                        }
                    }))
                }
            }))
        } else {
            msg = { error: Constant.PRIVILEGE_ERROR }
        }
        return msg
    } catch (error) {
        return error
    }
}

/*---------------------------------- Privelege Validate Function Module End ---------------------------------*/



