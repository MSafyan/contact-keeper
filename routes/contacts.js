const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Contact = require("../models/contact");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error({ msg: err.message });
    res.send({ msg: err.message });
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("name", "please enter a name").exists(),
      check("email", "enter a valid email").isEmail(),
      check("phone", "enter a phone number atleast 11 digits").isLength({
        min: 11
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const { name, type, email, phone } = req.body;
      const contact = new Contact({
        name,
        type,
        phone,
        email,
        user: req.user.id
      });
      await contact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.json({ msg: "server error" });
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const { type, name, email, phone } = req.body;

  const updatedFields = {};
  if (name) {
    updatedFields.name = name;
  }
  if (phone) {
    updatedFields.phone = phone;
  }
  if (email) {
    updatedFields.email = email;
  }
  if (type) {
    updatedFields.type = type;
  }

  try {
    let contact = await Contact.findById({ _id: req.params.id });

    if (!contact) {
      return res.status(500).send("contact not found");
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send("you are not allowed to change contact");
    }
    console.log(
      "inside routes contact updata" +
        contact +
        "updated stuff" +
        updatedFields +
        req
    );
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );
    res.json({ contact });
  } catch (err) {
    console.log(err.msg);
    res.status(500).send("server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  // console.log(contact.user.toString() + " and ");
  // console.log(req.user.id);

  try {
    let contact = await Contact.findOne({ _id: req.params.id });
    if (!contact) {
      return res.status(500).send("contact not found");
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send("you are not allowed to change contact");
    }
    console.log("contact is deleted" + req.params.id);
    contact = await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "contact is deleted" });
  } catch (err) {
    // console.log(err.msg);
    res.status(500).send({ msg: "server error" + err.message });
  }
});

module.exports = router;
