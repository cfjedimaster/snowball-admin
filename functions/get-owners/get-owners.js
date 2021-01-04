const faunadb = require('faunadb'),
  q = faunadb.query;


const handler = async (event, context) => {

	const {identity, user} = context.clientContext;
	if(!user) {
		return {
			statusCode: 500,
			body:'Unauthenticated call to function.'
		}
	};

	const client = new faunadb.Client({ secret: process.env.FAUNADB })

	let ownerObs = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection('users'))),
  			q.Lambda(f => q.Get(f))
	    )
	);

  const data = await Promise.all(ownerObs.data.map(async po => {
		let result = po.data;
		//add the id
		result.id = po.ref.id;
		return result;
	}));

	return {
		statusCode:200,
		body:JSON.stringify(data)
	};


}

module.exports = { handler }
