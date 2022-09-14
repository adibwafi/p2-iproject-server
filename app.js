const cors = require("cors");
const express = require("express");
const app = express();
const { User, Item, RentItem } = require("./models/index");
const { compareSync } = require("bcryptjs");
const {
  hashPassword,
  comparePassword,
  signPayload,
  isValid,
} = require("./helpers/helper");
require("dotenv").config();

const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//register customer
app.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, username, password, phoneNumber, address, role } = req.body;
    const users = await User.create({
      email,
      username,
      password,
      phoneNumber,
      address,
      role: "customer",
    });
    if (!email) {
      throw { name: "EMAIL_IS_REQUIRED" };
    }
    res.status(201).json({
      id: users.id,
      name: users.name,
      email: users.email,
    });
  } catch (err) {
    console.log(err);
  }
});

//login
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email } });
    if (!email || !password) {
      throw { name: "USER/PASSWORD_NOT_FOUND" };
    }
    if (!findUser) {
      throw { name: "USER_NOT_FOUND" };
    }
    const isValid = comparePassword(password, findUser.password);
    if (!isValid) {
      throw { name: "USER_NOT_FOUND" };
    }
    const payload = {
      id: findUser.id,
    };
    const access_token = signPayload(payload, process.env.SECRET);
    res.status(200).json({
      access_token,
    });
  } catch (err) {
    console.log(err);
  }
});

//authentication
app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    // console.log(access_token)
    const payload = isValid(access_token);
    // console.log(payload)
    const foundUser = await User.findByPk(payload.id);
    if (!foundUser) {
      throw { name: INVALID_TOKEN };
    }
    req.user = {
      id: foundUser.id,
      email: foundUser.email,
    };
    // console.log(req.user)
    next();
  } catch (err) {
    console.log(err);
  }
});

//fetch items
app.get("/items", async (req, res, next) => {
  try {
    const items = await Item.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json({
      items,
    });
  } catch (err) {
    console.log(err);
  }
});

//fetch rentitems
app.get("/rentitems", async (req, res, next) => {
  try {
    const rentitems = await RentItem.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Item,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(200).json({
      rentitems,
    });
  } catch (err) {
    console.log(err);
  }
});

//add rentitems by id
app.post("/rentitems/:id", async (req, res, next) => {
  try {
    // console.log(req.params.id, "dkjhwajdhjhdahdljwhd")
    let { id } = req.params;
    const response = await RentItem.create({
      UserId: req.user.id,
      ItemId: id,
    });
    res.status(200).json({
      response,
    });
  } catch (err) {
    console.log(err);
  }
});

//update status
app.patch("/items/:id", async (req, res, next) => {
  try {
    console.log(req.body, "=============>>>>>>>>>>>");
    let id = req.params.id
    let { status } = req.body;
    const response = await Item.update(
      { status },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).json({
      response,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("terhubung di:", PORT);
});
