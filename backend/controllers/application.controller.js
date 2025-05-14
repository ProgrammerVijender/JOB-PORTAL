import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async(req, res) => {
    // console.log("work")
    try{
        const userId = req.id;
        const jobId = req.params.id;
        
        if(!jobId){
            return res.status(400).json({
                message:"job id is required",
                success:false
            });
        }
        // const job = await Job.findById(jobId);

        const existingApplication = await Application.findOne({applicant:userId, job:jobId});

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            });
        }

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            });
        }

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        });
    }
    catch(error){
        console.log(error);
    }
};
    


export const getAppliedJobs = async (req, res) => {
    try{
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{
                sort:{createdAt:-1}
            },
            populate:{
                path:"company",
                options:{
                    sort:{createdAt:-1}
                }
            }
        });

        if(!application){
            return res.status(404).json({
                message:"No applications found",
                success:false
            });
        }

        return res.status(200).json({
            // message:"applications found",
            application,
            success:true
        });
    }
    catch(error){
        console.log(error);
    }
}


// admin dekhega kitne user ne apply kiya h 
export const getApplicants = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            populate:{
                path:"applicant"
            }
        });

        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            });
        }

        return res.status(200).json({
            job,
            success:true
        });
    }
    catch(error){
        console.log(error);
    }
} 

export const updateStatus = async (req,res) =>{
    try{
        const {status } = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                message:"status is required",
                success:false
            });
        }

        const application = await Application.findById({_id:applicationId});

        if(!application){
            return res.status(404).json({
                message:"application not found",
                success:false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status updated successfully",
            success:true
        });
        }
    catch(error){
        console.log(error);
    }
}

