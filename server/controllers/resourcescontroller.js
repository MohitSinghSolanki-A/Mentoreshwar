const cloudinary = require("../config/cloudinary");
const Resource = require("../models/resources");


exports.uploadResource = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.file.path;

        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: "free_resources",
        });

        const newResource = new Resource({
            Name: req.body.Name,
            pdfUrl: result.secure_url,
            Category: req.body.Category,
        });

        await newResource.save();

        res.json({
            message: "Resource uploaded successfully",
            cloudinaryUrl: result.secure_url,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json({
            message: "Resources fetched successfully",
            data: resources.map(resource => ({
                id: resource._id,
                name: resource.Name,
                downloadUrl: resource.pdfUrl,
                Category: resource.Category,
            })),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch resources", error: error.message });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: "Resource not found" });

        const fileUrl = resource.pdfUrl;
        const publicId = fileUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`free_resources/${publicId}`);

        await resource.deleteOne();

        res.json({ message: "Resource deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete resource", error: error.message });
    }
};
