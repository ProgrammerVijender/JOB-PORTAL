import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    // console.log("work")
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if( !title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        };

        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        });
        
        return res.status(201).json({
            message:"job posted successfully",
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});

        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
};

        return res.status(200).json({
            message:"jobs found",
            jobs,
            success:true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        };

        return res.status(200).json({
            // message:"jobs found",
            job,
            success:true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});

        if(!jobs)
        {
            return res.json({
                message:"No jobs found",
                success:false
            });
        };

        return res.status(200).json({
            message:"jobs found created by you",
            jobs,
            success:true
        })
    }
    catch (error) {
        console.log(error);
    }
}   