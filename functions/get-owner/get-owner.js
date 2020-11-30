const faunadb = require('faunadb'),
  q = faunadb.query;


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
    let owner = await getOwner(id);

    return {
      statusCode: 200,
      body: JSON.stringify(owner)
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}


async function getOwner(id) {

	const client = new faunadb.Client({ secret: process.env.FAUNADB })

    
  let ownerOb = await client.query(
    q.Get(q.Ref(q.Collection('users'), id))
  );

	let owner = ownerOb.data;
	//add the id
	owner.id = ownerOb.ref.id;

	return owner;
}


