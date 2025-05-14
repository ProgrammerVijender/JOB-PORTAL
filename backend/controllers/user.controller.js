import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

export const register = async (req, res) => {
    try {

        const {fullname , email, password, phoneNumber , role} = req.body;
        // console.log(fullname , email, password, phoneNumber , role);

        if(!fullname || !email || !password || !phoneNumber || !role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
    };

    const user = await User.findOne({email});

    if(user){
        return res.status(400).json({
            message:"user already exists",
            success:false
        });
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        fullname,
        email,
        password:hashedPassword,
        phoneNumber,
        role
    });

    return res.status(201).json({
        message:"user created successfully",
        success:true
    });
    } catch (error) {
        console.log(error);
    }
};


export const login = async (req, res) =>{
        try{
            // console.log('input is ' + req.body.input)
            const {email, password,role} = req.body;

            console.log(email , password,role)
            
            if(!email || !password || !role){

                return res.status(400).json({
                    message:"something is missing",
                    success:false
                });
            }

            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"Incorrect email or password",
                    success:false
                })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if(!isPasswordMatch){
                
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
            }
        

        if(role !== user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                success:false
            })
        };

        const tokenData = {
            userid:user._id,
            // role:user.role
        };

        let token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

        user  = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        };
        
        
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly :true, sameSite:'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success:true,
            
        })
    }
        catch (error) {
            console.log(error);
        }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"user logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    
    try {
        const { fullname, email, phoneNumber, bio,skills } = req.body;

        // if( !fullname || !email || !phoneNumber || !bio || !skills){
        //     return res.status(400).json({
        //         message:"something is missing",
        //         success:false
        //     });
        // };

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        

        const userId = req.id;
        
        console.log(req.id);
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            });
        }

        console.log('work')
        //update data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;



        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        await user.save();

        user  = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        


        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true
        })
    }
    catch (error) {
        console.log(error);
    }
}


    

