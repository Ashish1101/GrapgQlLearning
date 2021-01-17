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
    }
}