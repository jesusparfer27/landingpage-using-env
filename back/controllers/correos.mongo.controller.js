import { connectDB } from '../data/mongodb.js'
// import { User, Email} from '../data/mongodb.js'

connectDB();

export const getSavedEmails = async(req, res, next) => {
    res.send("Hola")
}

export const getEmailById = async(req, res, next) => {
    res.send("Hola")
}

export const fetchEmailsByType = async(req, res, next) => {
    res.send("Hola")

}
export const createEmail = async(req, res, next) => {
    res.send("Hola")

}
export const markAsDeleted = async(req, res, next) => {
    res.send("Hola")

}
export const answerEmail = async(req, res, next) => {
    res.send("Hola")

}
export const updateEmail = async(req, res, next) => {
    res.send("Hola")

}