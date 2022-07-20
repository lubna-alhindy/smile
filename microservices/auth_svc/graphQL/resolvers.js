const resolvers = {
	/// ------------------------- ///
	/// --------- Query --------- ///

	Query: {
		authorize: async (root ,args ,context) => {
			return !await context.models.rolePermissions.findOne({
				where: {
					roleName: args.roleName,
					permissionName: args.permissionName,
				}
			}) ? false : true;
		}
	},
};

module.exports = resolvers;
