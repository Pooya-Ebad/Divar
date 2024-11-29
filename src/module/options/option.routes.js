const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router()

router.post("/", optionController.create)
router.get("/category-id/:categoryId", optionController.findByCategoryId)
router.get("/category-slug/:categorySlug", optionController.findByCategorySlug)
router.get("/:id", optionController.findById)
router.delete("/:id", optionController.removeById)
router.put("/:id", optionController.update)
router.get("/", optionController.find)

module.exports = {
    OptionRoutes : router
}