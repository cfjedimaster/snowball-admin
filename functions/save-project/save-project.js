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
    console.log(err);
    return { statusCode: 500, body: err.toString() }
  }
}


async function saveProject(project) {
  const client = new faunadb.Client({ secret: process.env.FAUNADB })

  console.log('called with '+JSON.stringify(project));

  /*
  convert closeDate, shipDate, created, updated
  ship and close date come in as date + time, we just need need date
  convert owner
  */
  project.closeDate = fixDate(project.closeDate);
  project.shipDate = fixDate(project.shipDate);
  project.updated = q.Now();

  project.owner =  q.Ref(q.Collection('users'), project.owner.id)

  //console.log(project);

  if(project.id) {
    console.log('set created to '+JSON.stringify(project.created));
    project.created = q.Time(project.created);
    let id = project.id;
    delete project.id;
    console.log('edit project',id);

    await client.query(
      q.Update(
        q.Ref(q.Collection('projects'), id), 
        { data: project }
      )
    );
  
  	return;
  } else {
    console.log('make a new project');
    project.created = q.Now();
    await client.query(
      q.Create(
        q.Collection('projects'), 
        { data: project }
      )
    );

    return;
  }
}

function fixDate(d) {
  let date = new Date(d);
  let month = date.getMonth()+1;
  if(month < 10) month = '0' + month;
  let day = date.getDate();
  if(day < 10) day = '0' + day;
  dateStr = date.getFullYear()+'-'+month+'-'+day;
  return q.Date(dateStr);
}


