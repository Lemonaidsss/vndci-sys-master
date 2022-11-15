const express = require("express");
const router = express.Router();

const {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
} = require("../controllers/itemController");

router.post("/create",createItem);
router.patch("/update",  updateItem);
router.get("/",  getItems);
router.get("/get",  getItem);
router.delete("/:id",  deleteItem);

module.exports = router;