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


  let project = JSON.parse(event.body);

  try {
    await saveProject(project);

    //todo - return object? more important on new perhaps
    return {
      statusCode: 200,
      body: ''
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}


async function saveProject(project) {
  const client = new faunadb.Client({ secret: process.env.FAUNADB })

  if(owner.id) {
    let id = owner.id;
    delete owner.id;
    console.log('called with '+JSON.stringify(project));

    await client.query(
      q.Update(
        q.Ref(q.Collection('projects'), id), 
        { data: project }
      )
    );
  
  	return;
  } else {
    console.log('make a new project');
    await client.query(
      q.Create(
        q.Collection('projects'), 
        { data: project }
      )
    );

    return;
  }
}


