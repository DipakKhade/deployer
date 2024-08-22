import { Router } from "express";
import { db } from "../db";
import { sendTokenViaEmail } from "../lib/mail";
import crypto from "crypto";
import { FRONTEND_URL } from "../lib/exports";
import jwt from "jsonwebtoken";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
        success:false,
      message: "enter valid email",
    });
  }

  try {
    const is_already_user=await db.user.findFirst({
        where:{
            email
        }
    })
    if(is_already_user){
        return res.json({
            success:false,
            message:"already have an account , please login"
        })
    }
    const token = crypto.randomBytes(32).toString("hex");
    const user_to_add = await db.user.create({
      data: {
        email,
        isVerified: false,
        token: {
          create: {
            token,
          },
        },
      },
    });

    const message = `${FRONTEND_URL}/verify/${user_to_add.id}/${token}`;
    console.log(message);
    // await sendTokenViaEmail(email,message)
    return res.status(200).json({
        success:true,
      message: `open your Gmail to verify ${email}`,
    });
  } catch (e) {
    console.log(e);
  }
});

userRouter.get("/verify/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await db.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        token: {
          select: {
            token: true,
          },
        },
      },
    });

    if (!user) {
      res.status(400).json({
        message: "invalid url",
      });
    }

    if (user?.token?.token == token) {
      await db.user.update({
        where: {
          id: Number(id),
        },
        data: {
          isVerified: true,
        },
      });

      res.status(200).json({
        success: true,
        userid: user.id,
        email: user.email,
        token,
        message: "verification successful",
      });
    } else {
      res.json({
        message: "invalid url",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      message: "something went wrong",
    });
  }
});

userRouter.post("/addpassword/:userid", async (req, res) => {
  const { userid } = req.params;
  const { password, token } = req.body;

  const user = await db.user.findFirst({
    where: {
      id: Number(userid),
    },
    include: {
      token: true,
    },
  });

  if (!user?.isVerified) {
    res.json({
      success: false,
      message: "invalid user",
    });
  }
  if (user?.token?.token === token) {
    const token = jwt.sign({
        id:user?.id,
        email:user?.email
    },process.env.JWT_SEC as string)

    await db.user.update({
      where: {
        id: Number(userid),
      },
      data: {
        password,
      },
    });

    res.status(200).json({
      success: true,
      token,
      message: "signup successfull",
    });
  }else{
    res.json({
        success: false,
        message: "something went wrong",
      });
  }

 
});


userRouter.post('/login',async(req,res)=>{
  const {email , password} = req.body

  if(!email || !password){
    return res.json({
      success:false,
      message:'invalid creditionals'
    })
  }



  const user = await db.user.findFirst({
    where:{
      email
    }
  })
  if(user?.password===password){
    const token = jwt.sign({
      id:user?.id,
      email:user?.email
    },process.env.JWT_SEC as string)

    return res.status(200).json({
      success:true,
      token,
      message:'login successfull'
    })
  }

  return res.json({
    success:false,
    message:'invalid creditionals'
  })
})
