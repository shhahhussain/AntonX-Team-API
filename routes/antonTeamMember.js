const express = require('express');
const multer = require("multer")

const router = express.Router();
const Anton = require('../model/antonTeamMember');

const storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cd) => { cd(null, Date.now + "-" + file.originalname) }
})

const upload = multer({
    storage: storage
}).single('image')

router.get('/', async (req, res) => {
    try {
        const teamMembers = await Anton.find();
        res.json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:atn_number', async (req, res) => {
    try {
        const atnNumber = req.params.atn_number;
        const teamMember = await Anton.findOne({ atnNumber: atnNumber });

        if (!teamMember) {
            return res.status(404).json({ message: 'Anton with the given ATN Number not found' });
        }

        res.json(teamMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        upload(req, res, async (error) => {
            if (error) {
                console.log(error);
            } else {
                try {
                    const teamMember = new Anton({
                        FullName: req.body.FullName,
                        email: req.body.email,
                        Dop: req.body.Dop,
                        atnNumber: req.body.atnNumber,
                        profileImage: {
                            data: req.file.filename,
                            contentType: 'image/png'
                        },
                        isAdmin: req.body.isAdmin
                    });

                    const savedTeamMember = await teamMember.save();
                    res.status(201).json(savedTeamMember);
                } catch (saveError) {
                    res.status(500).json({ message: saveError.message });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTeamMember = await Anton.deleteOne({ _id: req.params.id });

        if (!deletedTeamMember.deletedCount) {
            return res.status(404).json({ message: 'Anton with the given id not found' });
        }
        res.json({ deletedTeamMember });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const teamMemberId = req.params.id;
        const updatedFields = req.body;

        const updatedTeamMember = await Anton.findByIdAndUpdate(
            teamMemberId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedTeamMember) {
            return res.status(404).json({ message: 'Anton with the given id not found' });
        }

        res.json(updatedTeamMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
