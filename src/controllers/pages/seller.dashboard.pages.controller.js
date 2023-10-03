const Seller = require("../../models/db/db.sellers.models")
const Cars = require("../../models/db/db.cars.models")
const Customer = require("../../models/db/db.users.models")
const Invoice = require("../../models/db/db.invoices.models")
const History_Invoice = require("../../models/db/db.history.invoices")
const Seller_Service_Page = require("../../services/pages/seller.page.service")
const envConfig = require("../../../config/env.config")


const service = new Seller_Service_Page(Seller,Cars,Customer,Invoice,History_Invoice)



class Dashboard {
    async index(req,res,next){
        try {
            const id_params = req.params.id
            const data = await service.dashboard_page(id_params)
            const result = data.result
            res.render("seller/dashboard/dashboard.ejs",{layout :"seller/dashboard/Partials/main.ejs",result,data,title:"Dashboard"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok-3/seller/login")
        }
    }
    async data_cars(req,res,next){
        try {
            const id_params = req.params.id
            const data = await service.data_cars_page(id_params)
            const result = data.result
            res.render("seller/dashboard/dashboard-data-cars.ejs",{layout :"seller/dashboard/Partials/main.ejs",result,data,title:"Dashboard"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok-3/seller/login")
        }
    }
    async profile (req,res,next){
        try {
            const id_params = req.params.id
            const result = await service.profile_page(id_params)
            res.render("seller/dashboard/dashboard-profile.ejs",{layout :"seller/dashboard/Partials/main.ejs",result,title:"Profile"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok-3/seller/login")
        }
    }
    async settings (req,res,next){
        try {
            const id_params = req.params.id
            const result = await service.profile_page(id_params)
            res.render("seller/dashboard/dashboard-settings.ejs",{layout :"seller/dashboard/Partials/main.ejs",result,title:"Profile"})
        } catch (error) {
            next(error)
            res.redirect("/Kelompok-3/seller/login")
        }
    }

    async add_cars_page(req,res,next) {
        try {
            const id_params = req.params.id
            const result = await service.profile_page(id_params)
            res.render("seller/dashboard/dashboard-add-cars.ejs", { layout: "seller/dashboard/Partials/main.ejs", result, title: "Add-Cars" })
        } catch (error) {
            next(error)
            res.redirect("/Kelompok-3/seller/login")
        }
    }
}

module.exports = new Dashboard()