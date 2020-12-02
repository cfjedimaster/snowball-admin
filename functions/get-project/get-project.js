const faunadb = require('faunadb'),
  q = faunadb.query;


/*
Things I need to fetch:

daysToGo
startingPrice
startingPrice
totalSavings
unitsSold
nextPriceDrop 
currentPrice
*/


// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

	const {identity, user} = context.clientContext;

	if(!user) {
		return {
			statusCode: 500,
			body:'Unauthenticated call to function.'
		}
	};

  let id = event.queryStringParameters.id;
  if(!id) {
    return { statusCode: 500, body: 'No id passed' }
  }

  try {
    console.log('get project '+id);
    let project = await getProject(id);


    return {
      statusCode: 200,
      body: JSON.stringify(project)
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}


async function getProject(id) {

	const client = new faunadb.Client({ secret: process.env.FAUNADB })

  console.log('lets load '+id);

    /*
    let projectOb = await client.query(
      q.Get(q.Ref(q.Collection('projects'), id))
    );
    console.log('projectob', projectOb);
    */

  let projectOb = await client.query(
    q.Let({
      project:q.Get(q.Ref(q.Collection('projects'), id)),
      ownerOb:q.Get(q.Select(['data','owner'],q.Var('project')))
    },
    {
        project:q.Var('project'),
        ownerOb:q.Var('ownerOb')
    })
  );


	let project = projectOb.project.data;
  console.log(project);
	//add the id
	project.id = projectOb.project.ref.id;
	project.owner = projectOb.ownerOb.data;
  project.owner.id = projectOb.ownerOb.ref.id;

  project.shipDate = new Date(await client.query(q.Format('%t', project.shipDate)));
  project.closeDate = new Date(await client.query(q.Format('%t', project.closeDate)));


	return project;
}


