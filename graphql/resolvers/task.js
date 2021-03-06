const User = require('../../models/User')
const Task = require('../../models/Task')

module.exports  = {
    createTask: async (args , req) => {
        if(!req.isAuth) {
            throw new Error("Unauthorized!")
        }
        try {
            const user = await User.findById(req.userId);
            const task = new Task({
                title : args.title,
                details : args.details,
                user : user.id
            });
            await task.save();

            if(user) {
               user.tasks.push(task);
               await user.save();
               return {...task._doc , user:user._doc , _id : task.id ,}
            } else {
                throw new Error("user not exists")
            }
        } catch (err) {
            throw err
        }
    },
    tasksByUser: async (args , req) => {
        if(!req.isAuth) {
            throw new Error("Unauthorized!")
        }
         try {
             const user = await User.findById(args._id).populate('tasks').select('-password')
             if(!user) {
                 throw new Error("user not found");
             }
             return {...user._doc , date : user.date.toISOString()}
         } catch (err) {
             throw err
         }
    },
    deleteTask: async (args , req) => {
        if(!req.isAuth) {
            throw new Error("Unauthorized!")
        }
        try {
            const user = await User.findById(args.userId);
            if(!user) {
                throw new Error("User not found")
            } else {

                //the line below finds the data in array 
                //and remove it from array
                user.tasks.pull({_id : args._id});
                
                const task = await Task.findById(args._id);
                await user.save();
                await task.remove();
                // console.log(task)
                return {msg : "deleted" , title : task.title , _id : task._id}
            }

        } catch (err) {
            throw err;
        }
    },
    updateTask : async (args , req) => {
        // if(!req.isAuth) {
        //     throw new Error('unauthorized!')
        // }
        try {
            const task = await Task.findById(args._id);
            if(!task) {
                throw new Error('Task not found');
            } else {
                await Task.updateOne(
                    {_id : task._id},
                    {$set: {title:args.title , details:args.details}},
                    {new : true}
                );

                return true;

            }
        } catch (err) {
            throw err
        }
    }
}