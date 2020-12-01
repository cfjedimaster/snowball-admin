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


  let owner = JSON.parse(event.body);

  try {
    await saveOwner(owner);

    //todo - return object? more important on new perhaps
    return {
      statusCode: 200,
      body: ''
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}


async function saveOwner(owner) {
  const client = new faunadb.Client({ secret: process.env.FAUNADB })

  if(owner.id) {
    let id = owner.id;
    delete owner.id;
    console.log('called with '+JSON.stringify(owner));

    await client.query(
      q.Update(
        q.Ref(q.Collection('users'), id), 
        { data: owner }
      )
    );
  
  	return;
  } else {
    console.log('make a new owner');
    await client.query(
      q.Create(
        q.Collection('users'), 
        { data: owner }
      )
    );

    return;
  }
}


