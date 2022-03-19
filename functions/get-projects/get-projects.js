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

	let projectObs = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection('projects'))),
			q.Lambda('f', 
			  q.Let({
			    project:q.Get(q.Var('f')),
			    ownerOb:q.Get(q.Select(['data','owner'],q.Var('project'))),
			  },
			  {
			   project:q.Var('project'),
			   ownerOb:q.Var('ownerOb')
			  }
			 )
			)
		)
	);

  const data = await Promise.all(projectObs.data.map(async po => {
		let result = po.project.data;
		//add the id
		result.id = po.project.ref.id;
		result.owner = po.ownerOb.data;
	    result.updated = new Date(await client.query(q.Format('%t', result.updated)));
		return result;
	}));

	return {
		statusCode:200,
		body:JSON.stringify(data)
	};

}

module.exports = { handler }
