const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadResource, getAllResources, deleteResource } = require("../controllers/resourcescontroller");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadResource);
router.get("/", getAllResources);
router.delete("/:id", deleteResource);

module.exports = router;
