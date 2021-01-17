const User = require("../../models/User");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
	addUser: async (args) => {
		try {
		let user = await User.findOne({ email: args.email });
		if (user) {
			throw new Error("User already exists")
		}
		user = new User({
			email: args.email,
			password: args.password,
		});
		const salt = await bcryptjs.genSalt(10);
		user.password =  await bcryptjs.hash(args.password , salt);
		

		await user.save();
		return { ...user._doc, _id: user.id, date: user.date.toISOString() , msg:"user created" };
		} catch (err) {
			console.log(err)
			throw err
		}
	},

	login: async (args) => {
       try {
		   const user = await User.findOne({email:args.email});
		   if(!user) {
			   throw new Error("User not found");
		   }
		   const isMatch = await bcryptjs.compare(args.password,user.password);
		   if(!isMatch) {
			   throw new Error("password incorrect!")
		   }

		   const payload = {
			   userId : user.id
		   }
			 
		const token = jwt.sign(payload , 'secret' , {expiresIn : '1h'});

		return {userId : user.id , token : token, msg :"login succesfull"}
		   
		   
	   } catch (err) {
		   console.log(err)
		   throw err
	   }
	},
	deleteUser: async (args) => {
		if(!req.isAuth) {
            throw new Error("Unauthorized!")
        }
		try {
			console.log(args._id);
			const user = await User.findById(args._id);
			if (user) {
				const id = user.id;
				await user.remove();
				// return {msg: `user with id ${id} deleted`}
				return {...user._doc , msg:"user deleted"};
			} else {
				return { msg: "user not found" };
			}
		} catch (err) {
			return err;
		}
	},

	readUsers: async () => {
		try {
			const users = await User.find().populate("tasks");
			return users;
		} catch (err) {
			throw new Error(err);
		}
	},

	updateUser: async (args) => {
		if(!req.isAuth) {
            throw new Error("Unauthorized!")
        }
		try {
			const user = await User.findById(args.input._id);
			if (!user) {
				throw new Error("User not found");
			}
			await User.updateOne(
				{ _id: user.id },
				{ $set: { email: args.input.email } },
				{ new: true }
			);
			return { ...user._doc , msg:"user updated successFully" };
		} catch (err) {
            throw err
        }
	},
};
